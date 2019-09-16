import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import idx from 'idx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import { ClickAwayListener } from '@material-ui/core';

import TaskToolbar from './components/TaskToolbar';
import TaskTable from './components/TaskTable';
import SidePanel from './components/SidePanel';
import ConfirmModal from '../../common/ConfirmModal';

import {useUserLists} from '../../../graphql/queries/UserLists';
import {useUserTasks} from '../../../graphql/queries/UserTasks';
import {UserLists_userLists_lists} from '../../../graphql/queries/__generated__/UserLists';
import {
  UserTasks, 
  UserTasksVariables,
  UserTasks_userTasks
} from '../../../graphql/queries/__generated__/UserTasks';

import deleteTasks from '../../../graphql/mutations/DeleteTasks';

const PANEL_WIDTH = 500;
const LIMIT = 20;

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    paper: {
      width: '100%',
      height: 'calc(100vh - 80px)',
      marginBottom: theme.spacing(2),
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    paperShift: {
      width: `calc(100% - ${PANEL_WIDTH}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  })
);

export default function TaskPage() {
  const classes  = useStyles();
	/* description of initial state */
  const [openSidePanel, setOpenSidePanel] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [addUsersModal, setAddUsersModal] = useState<boolean>(false);
  const [lists, setLists] = useState<UserLists_userLists_lists[]>([]);
  const [tasks, setTasks] = useState<UserTasks_userTasks[]>([]);
  const [selectedLists, setSelectedLists] = useState<string[]>([]);
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [multiTasks, setMultiTasks] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<UserTasks_userTasks>({
    __typename: "Task",
    id: '',
    name: '',
    priority: '',
    status: '',
    dueDate: '',
    updatedAt: '',
    listNumber: null,
    userOwners: null,
    teamOwners: null,
    userReviewers: null,
    teamReviewers: null,
  });

  const {loading, data, error} = useUserLists({});
  const {
    loading: taskLoading, 
    data: taskRes, 
    error: taskError, 
    fetchMore, 
  } = useUserTasks({
    listIds: selectedLists, 
    sectionIds: selectedSections, 
    limit: LIMIT,
    offset: 0, 
  });

	const [doDelete, {
		loading: deleteLoading,
		data: deleteData,
		error: deleteError
	}] = deleteTasks({taskIds: multiTasks})

  useEffect(() => {
    const lists = idx(data, data => data.userLists.lists);

    if (loading || !lists) return;
    setLists(lists);
    setSelectedLists(lists.map(l => l.id))
  }, [loading, idx(data, data => data.userLists.lists)]);

  useEffect(() => {
    let tasks = idx(taskRes, taskRes => taskRes.userTasks);

    if (taskLoading || !tasks) return;
    setTasks(tasks);
  }, [idx(taskRes, taskRes => taskRes.userTasks)]);

	const openDeleteModal = () => setDeleteModal(true)
	const closeDeleteModal = () => setDeleteModal(false)

	const openAddUsersModal = () => setAddUsersModal(true)
	const closeAddUsersModal = () => setAddUsersModal(false)

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    event.persist();
    const scrollHeight = (event.target as HTMLDivElement).scrollHeight;
    const scrollTop = (event.target as HTMLDivElement).scrollTop;
    const height = (event.target as HTMLDivElement).clientHeight;
    const delta = 10;

    if (scrollTop + height + delta >= scrollHeight && !taskLoading) {
      loadMore();
    }
  };

  const loadMore = () => {
    fetchMore({
      variables: {
        listIds: selectedLists, 
        sectionIds: selectedSections, 
        limit: LIMIT,
        offset: tasks.length, 
      },
      updateQuery: (
        previousQueryResult: UserTasks,
        options: {
          fetchMoreResult?: UserTasks;
          variables?: UserTasksVariables;
        }
      ) => {
        const fetchMoreResult = idx(
          options,
          options => options.fetchMoreResult
        );

        if (!fetchMoreResult) return previousQueryResult;

        return {
          userTasks: [
            ...previousQueryResult.userTasks,
            ...fetchMoreResult.userTasks,
          ],
        };
      },
    });
  };

	/* performs the batch delete */
	/* uses: state of multiTasks (ids of tasks user has selected) 
           state of tasks 
     updates state - tasks - removes tasks deleted
	                 - multiTasks - clears them out, new selection
  */
	const batchDelete = () => {
		doDelete();
		tasks.filter(t => multiTasks.includes(t.id));
		setTasks(tasks);
		setMultiTasks([]);
		closeDeleteModal();
	}

	/* the click away listener is to empty the multiple select array when
   * the user clicks out of the main panel */
	const handleClickAway = (e: React.MouseEvent<Document, MouseEvent>) => {
		setMultiTasks([]);
	}

  return (
    <div className={clsx(classes.paper, openSidePanel && classes.paperShift)}>
			<ClickAwayListener onClickAway={handleClickAway}>
			<div>
      <TaskToolbar 
        lists={lists}
        selectedLists={selectedLists}
        selectedSections={selectedSections}
        setSelectedLists={setSelectedLists}
        setSelectedSections={setSelectedSections} 
				openDeleteModal={openDeleteModal}
				addUsersModal={addUsersModal}
				openAddUsersModal={openAddUsersModal}
				multiTasks={multiTasks}
      />
			{ deleteModal && 
			<ConfirmModal 
				confirmMessage={'Are you sure you want to delete the following:${}'}
				confirmAction={batchDelete}
				denyAction={closeDeleteModal}
			/> 
			}
      <TaskTable 
        tasks={tasks}
        taskId={selectedTask.id}
	      multiTasks={multiTasks}
	      setMultiTasks={setMultiTasks}
        setOpen={setOpenSidePanel}
        setCurrentTask={setSelectedTask}
        onScroll={handleScroll}
      />
			</div>
			</ClickAwayListener>
      <SidePanel 
        open={openSidePanel} 
        selectedTask={selectedTask} 
        setSelectedTask={setSelectedTask}
        tasks={tasks}
        setTasks={setTasks}
      />
    </div>
  );
}
