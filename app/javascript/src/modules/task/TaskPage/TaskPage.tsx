import React, {useState} from 'react';
import clsx from 'clsx';
import idx from 'idx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';

import TaskToolbar from './components/TaskToolbar';
import TaskTable from './components/TaskTable';
import SidePanel from './components/SidePanel';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {},
  })
);

export default function TaskPage() {
  const classes  = useStyles();
  const [openSidePanel, setOpenSidePanel] = useState<boolean>(false);

  return (
    <div className={classes.root}>
      <TaskToolbar />
      <TaskTable open={openSidePanel} setOpen={setOpenSidePanel} />
      <SidePanel open={openSidePanel} />
    </div>
  )
}