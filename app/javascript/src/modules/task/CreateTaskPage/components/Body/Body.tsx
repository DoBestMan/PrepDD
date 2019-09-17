import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import idx from 'idx';
import axios from 'axios';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TextField,
  ClickAwayListener,
} from '@material-ui/core';
import ReactDropzone from 'react-dropzone';

import UploadIcon from '@material-ui/icons/CloudUpload';
import Dropdown from './components/Dropdown';

import * as cs from '../../../../../constants/theme';
import {useGlobalState} from '../../../../../store';

import {TaskAttributes} from '../../../../../graphql/__generated__/globalTypes';
import {useAllTemplates} from '../../../../../graphql/queries/AllTemplates';
import {useCreateTask} from '../../../../../graphql/mutations/CreateTask';
import {AllTemplates_templateLists} from '../../../../../graphql/queries/__generated__/AllTemplates';
import PriorityForm from './components/PriorityForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      height: 'calc(100vh - 144px)',
      padding: '0px calc((100% - 1380px) / 2) 0px calc((100% - 1380px) / 2)',
      borderBottom: '1px solid #D8D8D8',
    },
    footer: {
      height: '60px',
      padding: '0px calc((100% - 1380px) / 2) 0px calc((100% - 1380px) / 2)',
    },
    flex: {
      display: 'flex',
      alignItems: 'center',
    },
    content: {
      display: 'flex',
      marginTop: '48px',
    },
    rightPane: {
      minWidth: '200px',
      marginLeft: '72px',
    },
    uploadButton: {
      width: '100%',
      height: '42px',
      padding: '0px',
    },
    uploadArea: {
      width: '100%',
      height: '350px',
      border: '2px dashed #D8D8D8',
      borderRadius: '3px',
      marginTop: '30px',
      paddingTop: '50px',
      color: '#D8D8D8',
      textAlign: 'center',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    uploadLabelColor: {
      color: '#D8D8D8',
    },
    uploadActive: {
      background: '#EBF2FF',
      borderColor: '#3A84FF',
    },
    statusLabelColor: {
      color: '#606060',
    },
    status: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      marginRight: '6px',
    },
    high: {
      backgroundColor: '#2792A2',
    },
    medium: {
      backgroundColor: '#FFFFFF',
      border: '1px solid #2792A2',
    },
    low: {
      backgroundColor: '#FFFFFF',
      border: '1px solid #2792A2',
    },
    textFlow: {
      display: 'inline-block',
      width: 'fit-content',
      maxWidth: 'calc(80%)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    input: {
      display: 'block',
      width: '100%',
      marginTop: '6px',
      color: '#606060',
      fontFamily: cs.FONT.family,
      fontWeight: cs.FONT.weight.regular,
      fontSize: cs.FONT.size.xs,
      textTransform: 'none',
      border: 'none',
      '& label': {
        color: '#606060',
        fontFamily: cs.FONT.family,
        fontWeight: cs.FONT.weight.regular,
        fontSize: cs.FONT.size.xs,
      },
      '&:selected': {
        color: '#3A84FF',
      },
      '& input::placeholder': {
        fontSize: '12px',
      },
      '& div': {
        width: '100%',
      },
      '& .MuiInput-underline:before, .MuiInput-underline:after, .MuiInput-underline:hover:not(.Mui-disabled):before': {
        border: 'none',
      },
    },
  })
);

export default function Body() {
  const classes = useStyles();

  const {dispatch} = useGlobalState();
  const [lists, setLists] = useState<AllTemplates_templateLists[]>([]);
  const [listId, setListId] = useState<string>('');
  const [newTasks, setNewTasks] = useState<TaskAttributes[]>([]);
  const [newTask, setNewTask] = useState<TaskAttributes>({
    name: '',
    description: '',
    priority: 'medium',
    status: 'To do',
    dueDate: Date(),
    section: '',
    isActive: true,
  });
  const [creatingTasks, setCreatingTasks] = useState<TaskAttributes[]>([]);
  const [editable, setEditable] = useState<boolean>(false);

  const {loading, data, error} = useAllTemplates({});
  const [
    createTask,
    {loading: createTaskLoading, data: createTaskRes, error: createTaskError},
  ] = useCreateTask({
    listId,
    tasks: creatingTasks,
  });

  useEffect(() => {
    const templateLists = idx(data, data => data.templateLists);

    if (loading || !templateLists) return;
    setLists(templateLists);
  }, [loading, idx(data, data => data.templateLists)]);

  useEffect(() => {
    const response = idx(
      createTaskRes,
      createTaskRes => createTaskRes.createTask
    );

    if (createTaskLoading || !response) return;

    if (response && response.success) {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: {
          variant: 'success',
          message: 'Create new task successfully',
        },
      });
    } else if (response && response.errors && response.errors.length) {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: {
          variant: 'success',
          message: response.errors[0].message,
        },
      });
    }
  }, [
    createTaskLoading,
    idx(createTaskRes, createTaskRes => createTaskRes.createTask),
  ]);

  const handleCreate = async () => {
    setEditable(false);
    await setCreatingTasks([newTask]);
    newTasks.push(newTask);
    createTask();
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      handleCreate();
    }
  };

  const handleDrop = (acceptedFiles: File[]) => {
    // Handle importing templates
    const form_data = new FormData();
    acceptedFiles.map(file => {
      form_data.append('files[]', file);
    });

    axios
      .post('/api/import_task', form_data, {
        headers: {
          'x-api-key': 'jKXFpXpMXYeeI0aCPfh14w',
        },
      })
      .then(async res => {
        const taskGroups = idx(res, res => res.data.tasks);
        if (taskGroups) {
          const groups = Object.values(taskGroups);
          let addingTasks: TaskAttributes[] = [];
          await groups.map(async (group: any) => {
            const tasks = Object.values(group);
            const tempTasks = await tasks.map((task: any) => {
              return {
                name: task.name ? task.name : '',
                description: task.description ? task.description : '',
                priority: task.priority ? task.priority : 'medium',
                status: 'To do',
                dueDate: Date(),
                section: task.section ? task.section : '',
                isActive: true,
              } as TaskAttributes;
            });

            addingTasks = addingTasks.concat(tempTasks);
          });

          setCreatingTasks(addingTasks);
          setNewTasks([...newTasks, ...addingTasks]);
          createTask();
        }
      });
  };

  const handleAddTask = () => {
    if (!listId) {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: {
          variant: 'error',
          message: 'Please select list',
        },
      });
      return;
    }

    setNewTask({
      name: '',
      description: '',
      priority: 'medium',
      status: 'To do',
      dueDate: Date(),
      section: '',
      isActive: true,
    });
    setEditable(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handleChangePriority = (newValue: string) => {
    setNewTask({
      ...newTask,
      priority: newValue,
    });
  };

  const handleClickDownload = () => {
    // Exporting filese
  };

  const renderPriority = (priority: string) => {
    return (
      <div className={classes.flex} style={{textTransform: 'capitalize'}}>
        <div
          className={clsx(
            classes.status,
            priority === 'high'
              ? classes.high
              : priority === 'medium'
              ? classes.medium
              : classes.low
          )}
        />
        <Typography variant="h6">{priority}</Typography>
      </div>
    );
  };

  return (
    <div>
      <div className={classes.body}>
        <Dropdown data={lists} listId={listId} setListId={setListId} />
        <div className={classes.content}>
          <Table style={{tableLayout: 'fixed'}}>
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell style={{width: '200px'}}>Section</TableCell>
                <TableCell style={{width: '150px'}}>Priority</TableCell>
                <TableCell>Description</TableCell>
                <TableCell style={{width: '125px'}}>Example Files</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newTasks.map((task: TaskAttributes, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <div className={classes.textFlow}>{task.name}</div>
                    </TableCell>
                    <TableCell>
                      <div className={classes.textFlow}>{task.section}</div>
                    </TableCell>
                    <TableCell>{renderPriority(task.priority)}</TableCell>
                    <TableCell>
                      <div className={classes.textFlow}>{task.description}</div>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                );
              })}
              {editable && (
                <ClickAwayListener onClickAway={handleCreate}>
                  <TableRow>
                    <TableCell>
                      <TextField
                        name="name"
                        className={classes.input}
                        value={newTask.name}
                        placeholder="Add task..."
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => handleChange(event)}
                        autoFocus
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="section"
                        className={classes.input}
                        value={newTask.section}
                        placeholder="Add section..."
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => handleChange(event)}
                      />
                    </TableCell>
                    <TableCell>
                      <PriorityForm
                        value={newTask.priority}
                        onChange={handleChangePriority}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="description"
                        className={classes.input}
                        value={newTask.description}
                        placeholder="Add description..."
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => handleChange(event)}
                        onKeyUp={handleKeyUp}
                      />
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </ClickAwayListener>
              )}
            </TableBody>
          </Table>
          <div className={classes.rightPane}>
            <Button
              variant="outlined"
              className={classes.uploadButton}
              onClick={handleClickDownload}
            >
              Download Template
            </Button>
            <ReactDropzone multiple onDrop={handleDrop}>
              {({getRootProps, getInputProps, isDragActive}) => (
                <div
                  {...getRootProps()}
                  className={clsx(
                    classes.uploadArea,
                    isDragActive && classes.uploadActive
                  )}
                >
                  <input {...getInputProps()} />
                  <div>
                    <UploadIcon style={{fontSize: '120px'}} />
                    <br />
                    <Typography
                      variant="h3"
                      className={classes.uploadLabelColor}
                    >
                      Drag and Drop/
                      <br />
                      Import Tasks
                    </Typography>
                  </div>
                </div>
              )}
            </ReactDropzone>
          </div>
        </div>
      </div>
      <div className={classes.footer}>
        <div className={classes.flex} style={{paddingTop: '12px'}}>
          <Button onClick={handleAddTask}>+ Add task</Button>
        </div>
      </div>
    </div>
  );
}
