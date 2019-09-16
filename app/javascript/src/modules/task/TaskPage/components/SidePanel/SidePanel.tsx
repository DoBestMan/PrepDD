import React, {useState} from 'react';
import clsx from 'clsx';
import {Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import {
  Drawer,
  Typography, 
  ClickAwayListener,
  List, 
  ListItem,
} from '@material-ui/core';
import RightIcon from '@material-ui/icons/KeyboardArrowRightSharp';
import MoreIcon from '@material-ui/icons/MoreHoriz';

import Panel from '../../../../common/Panel';
import OverviewPane from './components/OverviewPane';
import FilesPane from './components/FilesPane';
import PublicPane from './components/PublicPane';
import InternalPane from './components/InternalPane';
import TimelinePane from './components/TimelinePane';
import StyledItem from '../TaskTable/components/StyledItem';

import {UserTasks_userTasks} from '../../../../../graphql/queries/__generated__/UserTasks';
import {useUpdateTask} from '../../../../../graphql/mutations/UpdateTask';

const panelWidth = 500;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: panelWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: panelWidth,
    },
    drawerSpacer: {
      marginTop: 64,
    },
    drawerHeader: {
      padding: '24px 24px 0px 16px',
    },
    flex: {
      display: 'flex',
      alignItems: 'center',
    },
    grow: {
      flexGrow: 1,
    },
    priority: {
      color: '#509E6D',
    },
    light: {
      fontWeight: 400,
    },
    statusBlock: {
      marginTop: '12px',
      paddingLeft: '8px',
      position: 'relative', 
    },
    textFlow: {
      display: 'inline-block',
      width: 'fit-content',
      maxWidth: 'calc(80%)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    dropdown: {
      position: 'absolute', 
      top: '29px', 
      left: '8px',
      backgroundColor: '#FFFFFF', 
      border: '1px solid #D8D8D8', 
      borderRadius: '3px', 
      zIndex: 1, 
    }
  })
);

const labels = [
  {label: 'Overview'}, 
  {label: 'Files'}, 
  {label: 'Public'}, 
  {label: 'Internal'}, 
  {label: 'Timeline'},
];

const status = ['Rejected', 'Start', 'Finish', 'Deliver', 'Accept', 'Completed'];

interface TaskDetailPageProps {
  open: boolean;
  selectedTask: UserTasks_userTasks;
  tasks: UserTasks_userTasks[];
  setSelectedTask: React.Dispatch<React.SetStateAction<UserTasks_userTasks>>;
  setTasks: React.Dispatch<React.SetStateAction<UserTasks_userTasks[]>>;
}

export default function TaskDetailPage(props: TaskDetailPageProps) {
  const {open, selectedTask, tasks, setSelectedTask, setTasks} = props;
  const classes = useStyles();

  const [openStatus, setOpenStatus] = useState<boolean>(false);

  const [
    updateTask,
    {loading: updateTaskLoading, data: updateTaskRes, error: updateTaskError},
  ] = useUpdateTask({
    id: selectedTask.id,
    status: selectedTask.status
  });

  const updateTaskList = (updateTask: UserTasks_userTasks) => {
    const findIndex = tasks.findIndex(each => each.id === updateTask.id);

    if (findIndex >= 0) {
      let newTasks = tasks;

      newTasks[findIndex] = updateTask;
      setTasks(newTasks);
    }
  };

  const handleClickStatus = (newStatus: string) => {
    // Handle click status
    const asyncSetState = async () => {
      setOpenStatus(false);
      await setSelectedTask({
        ...selectedTask, 
        status: newStatus, 
      });
      updateTask();
      updateTaskList(selectedTask);
    };
    
    asyncSetState();
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerSpacer} />
      <div className={classes.drawerHeader}>
        <div className={classes.flex}>
          {selectedTask.priority === 'high' && (
            <RightIcon className={classes.priority} />
          )}
          <Typography variant="h2" className={classes.textFlow}>
            {selectedTask.listNumber ? selectedTask.listNumber + ' ' : ' '}
            <span className={classes.light}>{selectedTask.name}</span>
          </Typography>
        </div>
        <div className={clsx(classes.flex, classes.statusBlock)}>
          <StyledItem 
            currentStatus={selectedTask.status as string} 
            onClick={() => setOpenStatus(!openStatus)}
            selected
          />
          {openStatus && (
            <ClickAwayListener onClickAway={() => setOpenStatus(false)}>
              <List className={classes.dropdown}>
                {status.map((each: string, index: number) => {
                  return (
                    <ListItem key={index}>
                      <StyledItem 
                        currentStatus={each}
                        onClick={() => handleClickStatus(each)}
                      />
                    </ListItem>
                  )
                })}
              </List>
            </ClickAwayListener>
          )}
          <div className={classes.grow} />
          <MoreIcon />
        </div>
      </div>
      <Panel labels={labels} padding>
        <OverviewPane
          task={selectedTask}
          tasks={tasks}
          setTask={setSelectedTask}
          setTasks={setTasks}
        />
        <FilesPane />
        <PublicPane taskId={selectedTask.id} />
        <InternalPane taskId={selectedTask.id} />
        <TimelinePane />
      </Panel>
    </Drawer>
  );
}
