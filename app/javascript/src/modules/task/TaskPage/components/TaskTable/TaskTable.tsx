import React, {useState, useEffect, useCallback} from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Tooltip, 
  List,
  ListItem,
  ClickAwayListener,
} from '@material-ui/core';
import SmsIcon from '@material-ui/icons/SmsOutlined';
import ListIcon from '@material-ui/icons/ListAlt';
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';
import RightIcon from '@material-ui/icons/KeyboardArrowRightSharp';

import DefaultUserImage from '../../../../common/DefaultUserImage';
import StyledItem from './components/StyledItem';
import StyledBadge from './components/StyledBadge';

import {useDropzone} from 'react-dropzone';
import {withRouter} from 'react-router';

import * as cs from '../../../../../constants/theme';
import {
  UserTasks_userTasks,
  UserTasks_userTasks_userOwners,
  UserTasks_userTasks_teamOwners,
} from '../../../../../graphql/queries/__generated__/UserTasks';
import {useUpdateTask} from '../../../../../graphql/mutations/UpdateTask';
import { useAddTaskOwners } from '../../../../../graphql/mutations/AddTaskOwners';

const options = [
  {label: 'All', value: 'all'},
  {label: 'High', value: 'high'},
  {label: 'Medium', value: 'medium'},
  {label: 'Low', value: 'Low'},
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 'calc(100vh - 138px)',
      overflow: 'auto',
    },
    table: {
      tableLayout: 'fixed',
      borderCollapse: 'separate',
    },
    filterList: {
      position: 'absolute',
      top: '18px',
      left: '3px',
      background: '#FFFFFF',
      border: '1px solid #D8D8D8',
      borderRadius: '3px',
      zIndex: 2,
    },
    stickyColumn: {
      position: 'sticky',
      top: '0px',
      backgroundColor: '#FFFFFF',
      zIndex: 1,
    },
    flex: {
      display: 'flex',
      alignItems: 'center',
    },
    relative: {
      position: 'relative', 
    },
    image: {
      position: 'absolute', 
      right: '0px', 
      width: '24px',
      height: '24px',
      marginRight: '12px',
      backgroundColor: '#2792A2',
      opacity: 0.6, 
      borderRadius: '50%', 
    },
    rejectStatus: {
      position: 'absolute',
      left: '-90px',
    },
    textFlow: {
      userSelect: 'none',
      display: 'inline-block',
      width: 'fit-content',
      maxWidth: 'calc(80%)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    noSelect: {
      userSelect: 'none',
    },
    unHoverRow: {
      opacity: 0.6,
    },
    hoverRow: {
      opacity: 1,
    },
    selectedRow: {
      backgroundColor: '#EBF2FF',
    },
    miniColumn: {
      paddingRight: '16px',
      width: '20px',
    },
    priorityColumn: {
      color: '#509E6D',
      paddingTop: '6px',
    },
    tooltip: {
      maxWidth: '500px', 
      color: '#FFFFFF', 
      fontFamily: cs.FONT.family, 
      fontSize: cs.FONT.size.xs, 
      fontWeight: cs.FONT.weight.regular, 
    }
  })
);

interface TaskTableProps {
  tasks: UserTasks_userTasks[];
  taskId: string;
  setCurrentTask: React.Dispatch<React.SetStateAction<UserTasks_userTasks>>;
  onScroll: (event: React.UIEvent<HTMLDivElement>) => void;
  multiTasks: string[];
  setMultiTasks: React.Dispatch<React.SetStateAction<string[]>>;
}

function TaskTable(props: any) {
  const {
    tasks,
    taskId,
    multiTasks,
    setCurrentTask,
    onScroll,
    setMultiTasks,
    setPaneIndex, 
    history,
  } = props;
  const classes = useStyles();

  const [openPriority, setOpenPriority] = useState<boolean>(false);
  const [hover, setHover] = useState<number>(-1);
  const [selectedTask, setSelectedTask] = useState<UserTasks_userTasks>({
    __typename: 'Task',
    id: '',
    name: '',
    priority: '',
    status: '',
    dueDate: '',
    updatedAt: '',
    listNumber: null,
    list: null,
    userOwners: null,
    teamOwners: null,
    userReviewers: null,
    teamReviewers: null,
  });

  const [
    updateTask,
    {loading: updateTaskLoading, data: updateTaskRes, error: updateTaskError},
  ] = useUpdateTask({
    id: selectedTask.id,
    name: selectedTask.name,
    status: selectedTask.status,
  });

  const handleClickPriority = (
    event: React.MouseEvent<HTMLDivElement>,
    task: UserTasks_userTasks
  ) => {
    event.stopPropagation();

    const asyncSetState = async (newTask: UserTasks_userTasks) => {
      await setSelectedTask(newTask);
      updateTask();
    };

    let updatedTask = task;
    switch (task.status) {
      case 'Rejected':
        updatedTask.status = 'Unstarted';
        break;
      case 'Unstarted':
        updatedTask.status = 'Start';
        break;
      case 'Start':
        updatedTask.status = 'Finish';
        break;
      case 'Finish':
        updatedTask.status = 'Deliver';
        break;
      case 'Deliver':
        updatedTask.status = 'Accept';
        break;
      case 'Accept':
        updatedTask.status = 'Completed';
        break;
      default:
        updatedTask.status = 'Reject';
        break;
    }
    asyncSetState(updatedTask);
  };

  const handleClickReject = (
    event: React.MouseEvent<HTMLDivElement>,
    task: UserTasks_userTasks
  ) => {
    const asyncSetState = async (task: UserTasks_userTasks) => {
      let updatedTask = task;
      
      switch (task.status) {
        case 'Deliver':
          await setPaneIndex(2);
          updatedTask.status = 'Reject';
          break;
        case 'Accept':
          await setPaneIndex(3);
          updatedTask.status = 'Reject';
          break;
      }

      await setSelectedTask(updatedTask);
      updateTask();
    };
    asyncSetState(task);
  }

  const handleClickRow = (e: any, task: UserTasks_userTasks) => {
    var pressed = e.nativeEvent.ctrlKey || e.nativeEvent.metaKey;
    updateMultipleSelection(task.id);
    if (!pressed) {
      if (task.id === taskId && task.status === 'Reject') {
        setMultiTasks([]);
        setCurrentTask({
          __typename: 'Task',
          id: '',
          name: '',
          priority: '',
          status: '',
          dueDate: '',
          updatedAt: '',
          listNumber: null,
          list: null,
          userOwners: null,
          teamOwners: null,
          userReviewers: null,
          teamReviewers: null,          
        });
      } else {
        updateCurrentTask(task);
      }
    }
  };

  const updateCurrentTask = (task: UserTasks_userTasks) => {
    setMultiTasks([task.id]);
    setCurrentTask(task);
  };

  const updateMultipleSelection = (taskId: string) => {
    if (multiTasks.includes(taskId)) {
      var taskIdRemoved = multiTasks.filter((id: string) => id !== taskId);
      setMultiTasks(taskIdRemoved);
    } else {
      setMultiTasks([...multiTasks, ...selectedTask.id, taskId]);
    }
  };

  const renderOthers = (isSelected: boolean, task: UserTasks_userTasks) => {
    return (
      <div
        className={clsx(
          classes.flex,
          isSelected ? classes.hoverRow : classes.unHoverRow
        )}
      >
        <div className={clsx(classes.flex, classes.relative)}>
          {task.teamOwners && 
            task.teamOwners.map((owner: UserTasks_userTasks_teamOwners, index: number) => {
              const isLast = task.userOwners && !task.userOwners.length && 
                task.teamOwners && task.teamOwners.length === index + 1;

              return (
                <DefaultUserImage 
                  key={owner.id} 
                  userName={owner.name} 
                  className={clsx(classes.image, isLast && classes.hoverRow)} 
                  style={{right: `${index * 12}px`}}
                />
              )
            })
          }
          {task.userOwners && task.userOwners.map((owner: UserTasks_userTasks_userOwners, index: number) => {            
            const teamOwners = task.teamOwners && task.teamOwners.length || 0;
            const isLast = task.userOwners && task.userOwners.length === index + 1;

            return owner.profileUrl ? (
              <img 
                src={owner.profileUrl} 
                className={clsx(classes.image, isLast && classes.hoverRow)} 
                style={{right: `${(index + teamOwners) * 12}px`}}
              />
            ) : (
              <DefaultUserImage 
                key={owner.id} 
                className={clsx(classes.image, isLast && classes.hoverRow)} 
                userName={owner.fullName} 
                style={{right: `${(index + teamOwners) * 12}px`}}
              />
            )
          })}
        </div>
        <StyledBadge
          variant="dot"
          color="primary"
          style={{marginRight: '12px'}}
        >
          <SmsIcon />
        </StyledBadge>
        <StyledBadge variant="dot" color="primary">
          <ListIcon />
        </StyledBadge>
      </div>
    );
  };

  return (
    <div className={classes.root} onScroll={onScroll}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell
              className={clsx(classes.miniColumn, classes.stickyColumn)}
            >
              <ClickAwayListener onClickAway={() => setOpenPriority(false)}>
                <div
                  style={{position: 'relative'}}
                  onClick={() => setOpenPriority(!openPriority)}
                >
                  <ArrowDownIcon />
                  {/* {openPriority && (
                    <List className={classes.filterList}>
                      {options.map(option => {
                        return (
                          <ListItem key={option.value}>
                            <Typography variant="h6">{option.label}</Typography>
                          </ListItem>
                        )
                      })}
                    </List>
                  )} */}
                </div>
              </ClickAwayListener>
            </TableCell>
            <TableCell
              className={clsx(classes.miniColumn, classes.stickyColumn)}
            >
              #
            </TableCell>
            <TableCell className={classes.stickyColumn}>Task</TableCell>
            <TableCell
              className={classes.stickyColumn}
              style={{width: '180px'}}
            >
              Status
            </TableCell>
            <TableCell
              className={classes.stickyColumn}
              style={{width: '200px'}}
            >
              Modified
            </TableCell>
            <TableCell
              className={classes.stickyColumn}
              style={{width: '150px'}}
            />
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks &&
            tasks.map((task: UserTasks_userTasks, index: number) => {
              const isSelected =
                hover === index || multiTasks.includes(String(task.id));

              return (
                <TaskTableRow
                  key={index}
                  taskId={taskId}
                  history={history}
                  onClick={(e: any) => handleClickRow(e, task)}
                  onMouseOver={() => setHover(index)}
                  index={index}
                  task={task}
                  isSelected={isSelected}
                  handleClickPriority={handleClickPriority}
                  handleClickReject={handleClickReject}
                  renderOthers={renderOthers}
                  classes={classes}
                  multiTasks={multiTasks}
                />
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}

/** pulling this out to access index **/
function TaskTableRow(props: any) {
  const {
    task,
    isSelected,
    classes,
    handleClickPriority,
    handleClickReject,
    renderOthers,
    onClick,
    onMouseOver,
    taskId,
    multiTasks,
    history,
  } = props;
  const onDrop = useCallback(acceptedFiles => {
    history.push({
      pathname: '/files',
      files: {
        files: acceptedFiles,
        taskId: task.id,
        listId: task.list.id,
      },
    });
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    noClick: true,
  });

  return (
    <TableRow
      className={clsx(
        (task.id === taskId || multiTasks.includes(task.id)) &&
          classes.selectedRow
      )}
      onMouseOver={onMouseOver}
      {...getRootProps({
        onClick: onClick,
      })}
    >
      <input {...getInputProps()} />
      <TableCell className={classes.priorityColumn}>
        {task.priority === 'high' && <RightIcon />}
      </TableCell>
      <TableCell className={classes.noSelect}>{task.listNumber}</TableCell>
      <TableCell>
        <Tooltip title={task.name} classes={{tooltip: classes.tooltip}}>
          <Typography variant="h6" className={classes.textFlow}>
            {task.name}
          </Typography>
        </Tooltip>
      </TableCell>
      <TableCell>
        <div className={classes.flex} style={{position: 'relative'}}>
          <StyledItem
            currentStatus={task.status as string}
            selected={isSelected}
            onClick={(event: React.MouseEvent<HTMLDivElement>) =>
              handleClickPriority(event, task)
            }
          />
          {isSelected &&
            (task.status === 'Deliver' || task.status === 'Accept') && (
              <StyledItem
                currentStatus="Reject"
                className={classes.rejectStatus}
                onClick={(event: React.MouseEvent<HTMLDivElement>) => handleClickReject(event, task)}
                selected
              />
            )}
        </div>
      </TableCell>
      <TableCell className={classes.noSelect}>{task.updatedAt}</TableCell>
      <TableCell>{renderOthers(isSelected, task)}</TableCell>
    </TableRow>
  );
}

export default withRouter(TaskTable);
