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
import {UserTasks_userTasks} from '../../../graphql/queries/__generated__/UserTasks';

const PANEL_WIDTH = 500;
const LIMIT = 12;

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    paper: {
      width: '100%',
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

  const {loading, data, error} = useUserLists({});
  const {
    loading: taskLoading, 
    data: taskRes, 
    error: taskError, 
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
    const tasks = idx(taskRes, taskRes => taskRes.userTasks);

    if (loading || !tasks) return;
    setTasks(tasks);
  }, [taskLoading, idx(taskRes, taskRes => taskRes.userTasks)])

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
        setOpen={setOpenSidePanel} 
      />
      <SidePanel open={openSidePanel} />
    </div>
  )
}