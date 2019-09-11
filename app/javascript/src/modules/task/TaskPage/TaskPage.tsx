import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import idx from 'idx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';

import TaskToolbar from './components/TaskToolbar';
import TaskTable from './components/TaskTable';
import SidePanel from './components/SidePanel';

import {useUserLists} from '../../../graphql/queries/UserLists';
import {UserLists_userLists_lists} from '../../../graphql/queries/__generated__/UserLists';

const PANEL_WIDTH = 500;

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

  const {loading, data, error} = useUserLists({});

  useEffect(() => {
    const lists = idx(data, data => data.userLists.lists);

    if (loading || !lists) return;
    setLists(lists);
  }, [loading, idx(data, data => data.userLists.lists)])

  return (
    <div className={clsx(classes.paper, openSidePanel && classes.paperShift)}>
      <TaskToolbar lists={lists}/>
      <TaskTable setOpen={setOpenSidePanel} />
      <SidePanel open={openSidePanel} />
    </div>
  )
}