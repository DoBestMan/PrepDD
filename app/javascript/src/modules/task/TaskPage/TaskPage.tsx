import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import idx from 'idx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';

import TaskToolbar from './components/TaskToolbar';
import TaskTable from './components/TaskTable';
import SidePanel from './components/SidePanel';

import {useUserLists} from '../../../graphql/queries/UserLists';
import {useUserTasks} from '../../../graphql/queries/UserTasks';
import {UserLists_userLists_lists} from '../../../graphql/queries/__generated__/UserLists';
import {
  UserTasks, 
  UserTasksVariables,
  UserTasks_userTasks
} from '../../../graphql/queries/__generated__/UserTasks';

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
  const [openSidePanel, setOpenSidePanel] = useState<boolean>(false);
  const [lists, setLists] = useState<UserLists_userLists_lists[]>([]);
  const [tasks, setTasks] = useState<UserTasks_userTasks[]>([]);

  const [selectedLists, setSelectedLists] = useState<string[]>([]);
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [selectedTask, setSelectedTask] = useState<UserTasks_userTasks>({
    __typename: "Task",
    id: '',
    name: '',
    priority: '',
    status: '',
    dueDate: '',
    updatedAt: '',
    userOwners: null, 
    teamOwners: null, 
    reviewers: null, 
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

  useEffect(() => {
    const lists = idx(data, data => data.userLists.lists);

    if (loading || !lists) return;
    setLists(lists);
  }, [loading, idx(data, data => data.userLists.lists)]);

  useEffect(() => {
    let tasks = idx(taskRes, taskRes => taskRes.userTasks);

    if (taskLoading || !tasks) return;
    setTasks(tasks);
  }, [idx(taskRes, taskRes => taskRes.userTasks)]);

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

  return (
    <div className={clsx(classes.paper, openSidePanel && classes.paperShift)}>
      <TaskToolbar 
        lists={lists}
        selectedLists={selectedLists}
        selectedSections={selectedSections}
        setSelectedLists={setSelectedLists}
        setSelectedSections={setSelectedSections} 
      />
      <TaskTable 
        tasks={tasks}
        taskId={selectedTask.id}
        setOpen={setOpenSidePanel}
        setCurrentTask={setSelectedTask}
        onScroll={handleScroll}
      />
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