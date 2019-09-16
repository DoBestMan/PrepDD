import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import idx from 'idx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ClickAwayListener,
} from '@material-ui/core';
import RightIcon from '@material-ui/icons/KeyboardArrowRightSharp';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import * as cs from '../../../../../../constants/theme';
import InputForm from '../../../../../common/EditableInputForm';
import InviteForm from '../../../../../common/InviteForm';
import SwitchForm from './SwitchForm';
import NameLabel from '../../../../../common/NameLabel';

import {UserTasks_userTasks} from '../../../../../../graphql/queries/__generated__/UserTasks';
import {
  SearchCompanyUsers_searchCompanyUsers_teams,
  SearchCompanyUsers_searchCompanyUsers_users,
} from '../../../../../common/__generated__/SearchCompanyUsers';
import {useUpdateTask} from '../../../../../../graphql/mutations/UpdateTask';
import {useAddTaskOwners} from '../../../../../../graphql/mutations/AddTaskOwners';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '0px 24px 0px 24px',
    },
    invisible: {
      display: 'none',
    },
    metaBox: {
      borderBottom: '1px solid #D8D8D8',
      marginTop: '24px',
    },
    metaForm: {
      display: 'flex',
      marginBottom: '24px',
    },
    flex: {
      display: 'flex',
    },
    grow: {
      flexGrow: 1,
    },
    addButton: {
      border: '1px solid #D8D8D8',
      borderRadius: '3px',
      fontSize: '15px',
    },
    secondary: {
      color: '#606060',
    },
    label: {
      minWidth: '80px',
    },
    priority: {
      display: 'flex',
      width: 'fit-content',
      height: '28px',
      cursor: 'pointer',
      color: '#509E6D',
      background: '#FFFFFF',
      alignItems: 'center',
      padding: '1px 6px 1px 0px',
      marginRight: '60px',
      border: '1px solid #D8D8D8',
      borderRadius: '3px',
    },
    transform: {
      textTransform: 'capitalize',
      paddingLeft: '6px',
    },
    priorityDropdown: {
      position: 'absolute',
      top: '27px',
      left: '0px',
      width: 'max-content',
      color: '#509E6D',
      background: '#FFFFFF',
      border: '1px solid #D8D8D8',
      borderRadius: '3px',
    },
    date: {
      '& .MuiInput-root': {
        border: '1px solid #D8D8D8',
        borderRadius: '3px',
      },
      '& input': {
        fontFamily: cs.FONT.family,
        fontWeight: cs.FONT.weight.regular,
        fontSize: cs.FONT.size.xs,
        textTransform: 'none',
        paddingLeft: '12px',
      },
      '&:selected': {
        color: '#3A84FF',
      },
      '& .MuiInput-underline:before, .MuiInput-underline:after, .MuiInput-underline:hover:not(.Mui-disabled):before': {
        border: 'none',
      },
    },
    morePaper: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '200px',
      position: 'absolute',
      top: '28px',
      right: '3px',
      padding: '9px',
      boxSizing: 'border-box',
      border: '2px solid #D8D8D8',
      borderRadius: '3px',
    },
  })
);

interface OverviewPaneProps {
  value?: number;
  index?: number;
  task: UserTasks_userTasks;
  tasks: UserTasks_userTasks[];
  setTask: React.Dispatch<React.SetStateAction<UserTasks_userTasks>>;
  setTasks: React.Dispatch<React.SetStateAction<UserTasks_userTasks[]>>;
}

export default function OverviewPane(props: OverviewPaneProps) {
  const {value, index, task, tasks, setTask, setTasks} = props;
  const classes = useStyles();

  const [openPriority, setOpenPriority] = useState<boolean>(false);
  const [moreHover, setMoreHover] = useState<boolean>(false);

  const [owners, setOwners] = useState<
    (
      | SearchCompanyUsers_searchCompanyUsers_teams
      | SearchCompanyUsers_searchCompanyUsers_users)[]
  >([]);

  const [reviewers, setReviewers] = useState<
    (
      | SearchCompanyUsers_searchCompanyUsers_teams
      | SearchCompanyUsers_searchCompanyUsers_users)[]
  >([
    ...(task.userOwners || []).map(user => {
      return {
        __typename: 'User',
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        profileUrl: user.profileUrl,
      } as SearchCompanyUsers_searchCompanyUsers_users;
    }),
    ...(task.teamOwners || []).map(team => {
      return {
        __typename: 'Team',
        id: team.id,
        name: team.name,
      } as SearchCompanyUsers_searchCompanyUsers_teams;
    }),
  ]);

  const [
    updateTask,
    {loading: updateTaskLoading, data: updateTaskRes, error: updateTaskError},
  ] = useUpdateTask({
    id: task.id,
    name: task.name,
    priority: task.priority,
  });

  const [
    addTaskOwners,
    {loading: addTaskLoading, data: addTaskRes, error: addTaskError},
  ] = useAddTaskOwners({
    taskID: task.id,
    userOwners: (owners.filter(
      owner => owner.__typename === 'User'
    ) as SearchCompanyUsers_searchCompanyUsers_users[]).map(
      owner => owner.email || ''
    ),
    userReviewers: [],
    teamOwners: owners
      .filter(owner => owner.__typename === 'Team')
      .map(owner => owner.id),
    teamReviewers: [],
  });

  useEffect(() => {
    setOwners([
      ...(task.userOwners || []).map(user => {
        return {
          __typename: 'User',
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          profileUrl: user.profileUrl,
        } as SearchCompanyUsers_searchCompanyUsers_users;
      }),
      ...(task.teamOwners || []).map(team => {
        return {
          __typename: 'Team',
          id: team.id,
          name: team.name,
        } as SearchCompanyUsers_searchCompanyUsers_teams;
      }),
    ]);

    console.log("User Owners: ", task.userOwners);
    console.log("Task Owners: ", task.teamOwners);
  }, [task.userOwners, task.teamOwners]);

  useEffect(() => {
    if (task.id) {
      addTaskOwners();
    }
  }, [owners]);

  useEffect(() => {
    const fetchTask = idx(
      addTaskRes,
      addTaskRes => addTaskRes.addTaskOwners.task
    );

    if (addTaskLoading || !fetchTask) return;
    updateTaskList(fetchTask as UserTasks_userTasks);
  }, [
    addTaskLoading,
    idx(addTaskRes, addTaskRes => addTaskRes.addTaskOwners.task),
  ]);

  const updateTaskList = (updateTask: UserTasks_userTasks) => {
    const findIndex = tasks.findIndex(each => each.id === updateTask.id);

    if (findIndex >= 0) {
      let newTasks = tasks;

      newTasks[findIndex] = updateTask;
      setTasks(newTasks);
    }
  };

  const handleChangeName = (newValue: string) => {
    const asyncSetState = async () => {
      await setTask({
        ...task,
        name: newValue,
      });

      updateTask();
      updateTaskList(task);
    };

    asyncSetState();
  };

  const handleRemoveOwner = (removeId: number) => {};

  const handleChangePriority = (newPriority: string) => {
    const asyncSetState = async () => {
      await setTask({
        ...task,
        priority: newPriority,
      });

      updateTask();
      updateTaskList(task);
      setOpenPriority(false);
    };

    asyncSetState();
  };

  const handleChangeDate = (newDate: Date | null) => {
    // const asyncSetState = async () => {
    //   if (newDate) {
    //     await setTask({
    //       ...task,
    //       dueDate: Date.toString(),
    //     });
    //     updateTask();
    //     updateTaskList(task);
    //   }
    // };
    // asyncSetState();
  };

  return (
    <Paper
      className={clsx(classes.root, value !== index && classes.invisible)}
      aria-labelledby="Overview"
      elevation={0}
    >
      <InputForm value={task.name as string} onChange={handleChangeName} />
      <div className={classes.metaBox}>
        <div className={classes.metaForm}>
          <Typography
            variant="h6"
            className={clsx(classes.secondary, classes.label)}
          >
            Owner
          </Typography>
          <div className={classes.flex} style={{flexWrap: 'wrap'}}>
            {owners &&
              owners
                .slice(0, 5)
                .map(
                (
                  owner:
                    | SearchCompanyUsers_searchCompanyUsers_users
                    | SearchCompanyUsers_searchCompanyUsers_teams,
                  index: number
                ) => {
                  return owner.__typename === 'User' ? (
                    <NameLabel
                      key={index}
                      type="user"
                      label={owner.fullName}
                      logo={owner.profileUrl as string}
                      onClose={() => handleRemoveOwner(index)}
                    />
                  ) : (
                    <NameLabel
                      key={index}
                      label={owner.name}
                      onClose={() => handleRemoveOwner(index)}
                    />
                  );
                }
              )}

              {owners && owners.length > 5 && (
                <div 
                  onMouseOver={() => setMoreHover(true)}
                  onMouseLeave={() => setMoreHover(false)}
                  style={{position: 'relative'}}                  
                >
                  <NameLabel 
                    label={`${owners.length - 5}`}
                  />
                  {moreHover && (
                    <Paper
                      className={classes.morePaper}
                      elevation={0}
                      onMouseOver={() => setMoreHover(true)}
                      onMouseLeave={() => setMoreHover(false)}
                    >
                      {owners
                        .slice(2)
                        .map(
                          (
                            owner:
                              | SearchCompanyUsers_searchCompanyUsers_users
                              | SearchCompanyUsers_searchCompanyUsers_teams,
                            index: number
                          ) => {
                            return owner.__typename === 'User' ? (
                              <NameLabel
                                key={index}
                                type="user"
                                label={owner.fullName}
                                logo={owner.profileUrl as string}
                                onClose={() => handleRemoveOwner(index)}
                              />
                            ) : (
                              <NameLabel
                                key={index}
                                label={owner.name}
                                onClose={() => handleRemoveOwner(index)}
                              />
                            );
                          }
                        )}
                    </Paper>                    
                  )}
                </div>
              )}

            <InviteForm owners={owners} setOwners={setOwners} size="small" />
          </div>
        </div>

        <div className={classes.metaForm}>
          <Typography
            variant="h6"
            className={clsx(classes.secondary, classes.label)}
          >
            Reviewer
          </Typography>
          <div className={classes.flex} style={{flexWrap: 'wrap'}}>
            {reviewers &&
              reviewers.map(
                (
                  reviewer:
                    | SearchCompanyUsers_searchCompanyUsers_users
                    | SearchCompanyUsers_searchCompanyUsers_teams,
                  index: number
                ) => {
                  return reviewer.__typename === 'User' ? (
                    <NameLabel
                      key={index}
                      type="user"
                      label={reviewer.fullName}
                      logo={reviewer.profileUrl as string}
                    />
                  ) : (
                    <NameLabel key={index} label={reviewer.name} selected />
                  );
                }
              )}
            <InviteForm
              owners={reviewers}
              setOwners={setReviewers}
              size="small"
            />
          </div>
        </div>

        <div className={classes.metaForm} style={{alignItems: 'center'}}>
          <Typography
            variant="h6"
            className={clsx(classes.secondary, classes.label)}
          >
            Priority
          </Typography>
          <ClickAwayListener onClickAway={() => setOpenPriority(false)}>
            <div style={{position: 'relative'}}>
              <div
                className={classes.priority}
                onClick={() => setOpenPriority(!openPriority)}
              >
                {task.priority === 'high' && <RightIcon />}
                <Typography variant="h6" className={classes.transform}>
                  {task.priority}
                </Typography>
              </div>

              {openPriority && (
                <List className={classes.priorityDropdown}>
                  <ListItem onClick={() => handleChangePriority('high')}>
                    <RightIcon />
                    <Typography variant="h6">High</Typography>
                  </ListItem>
                  <ListItem onClick={() => handleChangePriority('medium')}>
                    <Typography variant="h6">Medium</Typography>
                  </ListItem>
                  <ListItem onClick={() => handleChangePriority('low')}>
                    <Typography variant="h6">Low</Typography>
                  </ListItem>
                </List>
              )}
            </div>
          </ClickAwayListener>

          <Typography
            variant="h6"
            className={clsx(classes.secondary, classes.label)}
          >
            Due date
          </Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              className={classes.date}
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              value="2019-09-13"
              onChange={handleChangeDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>

      <div style={{marginTop: '24px'}}>
        <div className={classes.metaForm}>
          <Typography variant="h6" className={classes.secondary}>
            Preview Only
          </Typography>
          <div className={classes.grow} />
          <SwitchForm value={true} />
        </div>
        <div className={classes.metaForm}>
          <Typography variant="h6" className={classes.secondary}>
            Automatic PDF
          </Typography>
          <div className={classes.grow} />
          <SwitchForm value={true} />
        </div>
        <div className={classes.metaForm}>
          <Typography variant="h6" className={classes.secondary}>
            Dynamic Watermark
          </Typography>
          <div className={classes.grow} />
          <SwitchForm value={false} />
        </div>
      </div>
    </Paper>
  );
}
