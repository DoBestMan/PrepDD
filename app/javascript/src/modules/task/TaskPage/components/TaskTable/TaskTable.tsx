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
import {UserTasks_userTasks} from '../../../../../graphql/queries/__generated__/UserTasks';
import {useUpdateTask} from '../../../../../graphql/mutations/UpdateTask';

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
    image: {
      width: '24px',
      height: '24px',
      marginRight: '12px',
      backgroundColor: '#2792A2',
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
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
    setOpen,
    setCurrentTask,
    onScroll,
    setMultiTasks,
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
        updatedTask.status = 'Rejected';
        break;
    }
    asyncSetState(updatedTask);
  };

  const handleClickRow = (e: any, task: UserTasks_userTasks) => {
    var pressed = e.nativeEvent.ctrlKey || e.nativeEvent.metaKey;
    pressed ? updateMultipleSelection(task.id) : updateCurrentTask(task);
  };

  const updateCurrentTask = (task: UserTasks_userTasks) => {
    setMultiTasks([]);
    setOpen((open: boolean) => !open);
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

  // If the user is holding shift and selecting tasks, close the side panel
  useEffect(() => {
    if (multiTasks.length) {
      setOpen((o: boolean) => false);
    }
  }, [multiTasks]);

  const renderOthers = (isSelected: boolean) => {
    return (
      <div
        className={clsx(
          classes.flex,
          isSelected ? classes.hoverRow : classes.unHoverRow
        )}
      >
        <DefaultUserImage userName="F" className={classes.image} />
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
                  taskId={taskId}
                  history={history}
                  onClick={(e: any) => handleClickRow(e, task)}
                  onMouseOver={() => setHover(index)}
                  index={index}
                  task={task}
                  isSelected={isSelected}
                  key={index}
                  handleClickPriority={handleClickPriority}
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
                currentStatus="Rejected"
                selected
                className={classes.rejectStatus}
              />
            )}
        </div>
      </TableCell>
      <TableCell className={classes.noSelect}>{task.updatedAt}</TableCell>
      <TableCell>{renderOthers(isSelected)}</TableCell>
    </TableRow>
  );
}

export default withRouter(TaskTable);
