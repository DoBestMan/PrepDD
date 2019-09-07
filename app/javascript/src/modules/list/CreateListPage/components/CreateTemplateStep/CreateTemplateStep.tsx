import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import idx from 'idx';
import axios from 'axios';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  ClickAwayListener,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Checkbox,
  TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import UploadIcon from '@material-ui/icons/CloudUpload';
import ReactDropzone from 'react-dropzone';

import InputForm from './components/InputForm';
import PriorityForm from './components/PriorityForm';
import PriorityInputForm from './components/PriorityInputForm';

import * as cs from '../../../../../constants/theme';
import {useGlobalState} from '../../../../../store';
import {TaskAttributes} from '../../../../../graphql/__generated__/globalTypes';
import {
  AllTemplates_templateLists,
  AllTemplates_templateLists_tasks,
} from '../../../../../graphql/queries/__generated__/AllTemplates';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      height: 'calc(100vh - 144px)',
      padding: '0px calc((100% - 1380px) / 2) 0px calc((100% - 1380px) / 2)',
      borderBottom: '1px solid #D8D8D8',
      overflow: 'auto',
    },
    footer: {
      height: '60px',
      padding: '0px calc((100% - 1380px) / 2) 0px calc((100% - 1380px) / 2)',
    },
    title: {
      marginRight: '270px',
      height: '42px',
    },
    flex: {
      display: 'flex',
      alignItems: 'center',
    },
    grow: {
      flexGrow: 1,
    },
    selection: {
      padding: '6px 12px',
      color: cs.COLORS.primary,
      border: `2px solid ${cs.COLORS.primary}`,
      borderRadius: '3px',
      marginRight: '12px',
    },
    deleteIcon: {
      cursor: 'pointer',
    },
    content: {
      display: 'flex',
      marginTop: '48px',
      height: 'calc(100% - 100px)',
    },
    styledTableCell: {
      paddingLeft: '0px',
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
    textFlow: {
      display: 'inline-block',
      width: 'fit-content',
      maxWidth: 'calc(80%)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    stickyHeader: {
      position: 'sticky',
      top: '0px',
      backgroundColor: '#FFFFFF',
      zIndex: 1,
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

interface CreateTemplateStepProps {
  selectedTemplate: AllTemplates_templateLists;
  setSelectedTemplate: React.Dispatch<
    React.SetStateAction<AllTemplates_templateLists>
  >;
  stepNumber: number;
  currentStep: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function CreateTemplateStep(props: CreateTemplateStepProps) {
  const {
    selectedTemplate,
    setSelectedTemplate,
    stepNumber,
    currentStep,
    setStep,
  } = props;
  const classes = useStyles();

  const {dispatch} = useGlobalState();
  const [selected, setSelected] = useState<number[]>([]);
  const [addable, setAddable] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<TaskAttributes>({
    name: '',
    description: '',
    priority: 'medium',
    status: 'To do',
    dueDate: Date(),
    section: '',
    isActive: true,
  });

  useEffect(() => {
    if (selectedTemplate.name === 'Blank Project') {
      setAddable(true);
    }
  }, [selectedTemplate.name]);

  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    if (event.target.checked && selectedTemplate && selectedTemplate.tasks) {
      const newSelecteds = selectedTemplate.tasks.map(
        (tasks: AllTemplates_templateLists_tasks, index: number) => index
      );
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  const handleDrop = (acceptedFiles: File[]) => {
    // Handle importing templates
    console.log("Accepted Files: ", acceptedFiles);
    const form_data = new FormData();
    acceptedFiles.map((file: File, index: number) => {
      form_data.append(`files[]`, file);
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
          let newTasks: AllTemplates_templateLists_tasks[] = [];

          await groups.map(async (group: any) => {
            const tasks = Object.values(group);
            const tempTasks = await tasks.map((task: any) => {
              return {
                __typename: 'Task',
                id: '',
                name: task.name,
                section: {
                  __typename: 'TaskSection',
                  id: '',
                  name: task.section,
                },
                description: task.description,
                priority: task.priority,
                status: 'Todo',
              } as AllTemplates_templateLists_tasks;
            });

            newTasks = newTasks.concat(tempTasks);
          });

          setSelectedTemplate({
            ...selectedTemplate,
            tasks: [...selectedTemplate.tasks, ...newTasks],
          });
          dispatch({
            type: 'SET_NOTIFICATION', 
            notification: {
              variant: 'success', 
              message: 'Importing tasks successfully'
            }
          });
        }
      })
      .catch(e => {
        console.log("Upload error: ", e);
        dispatch({
          type: 'SET_NOTIFICATION', 
          notification: {
            variant: 'success', 
            message: 'Importing tasks failed'
          }
        });
      });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let newTasks: AllTemplates_templateLists_tasks[] | null =
      selectedTemplate.tasks;
    const {name, value} = event.target;

    if (newTasks) {
      newTasks[index] = Object.assign({}, newTasks[index], {
        [name]: value,
      });

      setSelectedTemplate({
        ...selectedTemplate,
        tasks: newTasks,
      });
    }
  };

  const handleChangeSection = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let newTasks: AllTemplates_templateLists_tasks[] | null =
      selectedTemplate.tasks;
    const {value} = event.target;

    if (newTasks) {
      const newSection = newTasks[index].section || {
        __typename: 'TaskSection',
        id: '',
        name: '',
      };

      if (newSection && newSection.name !== null) {
        newSection.name = value;
        newTasks[index].section = newSection;
      }

      setSelectedTemplate({
        ...selectedTemplate,
        tasks: newTasks,
      });
    }
  };

  const handleChangePriority = (newValue: string, index: number) => {
    let newTasks: AllTemplates_templateLists_tasks[] | null = selectedTemplate.tasks;

    if (newTasks) {
      newTasks[index].priority = newValue;

      setSelectedTemplate({
        ...selectedTemplate,
        tasks: newTasks,
      });
    }
  };

  const handleAddTask = () => {
    setAddable(true);
    setNewTask({
      name: '',
      description: '',
      priority: 'medium',
      status: 'To do',
      dueDate: Date(),
      section: '',
      isActive: true,
    });
  };

  const handleDelete = () => {
    if (selectedTemplate && selectedTemplate.tasks) {
      const newTasks = selectedTemplate.tasks.filter(
        (task: AllTemplates_templateLists_tasks, index: number) => {
          return selected.indexOf(index) === -1;
        }
      );

      setSelectedTemplate({
        ...selectedTemplate,
        tasks: newTasks,
      });
      setSelected([]);
    }
  };

  const handleClickDownload = () => {
    // Exporting file
  };

  const handleChangeNewTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handleChangeNewTaskPriority = (newValue: string) => {
    setNewTask({
      ...newTask,
      priority: newValue,
    });
  };

  const handleFinishAdd = () => {
    setAddable(false);
    let newTasks: AllTemplates_templateLists_tasks[] | null =
      selectedTemplate.tasks;

    if (newTasks && (newTask.name || newTask.section || newTask.description)) {
      newTasks.push({
        __typename: 'Task',
        id: '',
        name: newTask.name,
        section: {
          __typename: 'TaskSection',
          id: '',
          name: newTask.section,
        },
        description: newTask.description,
        priority: newTask.priority,
        status: 'To do',
      });

      setSelectedTemplate({
        ...selectedTemplate,
        tasks: newTasks,
      });
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      handleFinishAdd();
    }
  };

  const renderCheckbox = () => {
    const rowCount =
      selectedTemplate && selectedTemplate.tasks
        ? selectedTemplate.tasks.length
        : 0;

    return (
      <Checkbox
        indeterminate={selected.length > 0 && selected.length < rowCount}
        checked={selected.length > 0 && selected.length === rowCount}
        onChange={handleSelectAllClick}
        color="primary"
      />
    );
  };

  return stepNumber === currentStep ? (
    <div>
      <div className={classes.body}>
        <div className={clsx(classes.flex, classes.title)}>
          <Typography variant="h2">{selectedTemplate.name}</Typography>
          <div className={classes.grow} />
          {selected.length > 0 && (
            <Typography variant="h4" className={classes.selection}>
              {selected.length} Task(s) Selected
            </Typography>
          )}
          {selected.length > 0 && (
            <DeleteIcon className={classes.deleteIcon} onClick={handleDelete} />
          )}
        </div>
        <div className={classes.content}>
          <div style={{overflow: 'auto'}}>
            <Table style={{tableLayout: 'fixed', borderCollapse: 'separate'}}>
              <TableHead>
                <TableRow>
                  <TableCell
                    padding="checkbox"
                    className={classes.stickyHeader}
                  >
                    {renderCheckbox()}
                  </TableCell>
                  <TableCell className={classes.stickyHeader}>Task</TableCell>
                  <TableCell
                    className={classes.stickyHeader}
                    style={{width: '200px'}}
                  >
                    Section
                  </TableCell>
                  <TableCell
                    className={classes.stickyHeader}
                    style={{width: '150px'}}
                  >
                    Priority
                  </TableCell>
                  <TableCell className={classes.stickyHeader}>
                    Description
                  </TableCell>
                  <TableCell
                    className={classes.stickyHeader}
                    style={{width: '125px'}}
                  >
                    Example Files
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedTemplate.tasks &&
                  selectedTemplate.tasks.map(
                    (item: AllTemplates_templateLists_tasks, index: number) => {
                      const isSelected = selected.indexOf(index) !== -1;

                      return (
                        <TableRow key={index}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isSelected}
                              color="primary"
                              onClick={(e: React.MouseEvent<unknown>) =>
                                handleClick(e, index)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <InputForm
                              name="name"
                              className={classes.textFlow}
                              value={item.name ? item.name : ''}
                              placeholder="Add task..."
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) => handleChange(event, index)}
                            />
                          </TableCell>
                          <TableCell>
                            <InputForm
                              name="section"
                              className={classes.textFlow}
                              value={
                                item.section
                                  ? item.section.name ? item.section.name : ''
                                  : ''
                              }
                              placeholder="Add section..."
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) => handleChangeSection(event, index)}
                            />
                          </TableCell>
                          <PriorityForm
                            value={item.priority as string}
                            onChange={(newValue: string) =>
                              handleChangePriority(newValue, index)
                            }
                          />
                          <TableCell>
                            <InputForm
                              name="description"
                              className={classes.textFlow}
                              value={item.description ? item.description : ''}
                              placeholder="Add description..."
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) => handleChange(event, index)}
                            />
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      );
                    }
                  )}
                {addable ? (
                  <ClickAwayListener onClickAway={handleFinishAdd}>
                    <TableRow>
                      <TableCell />
                      <TableCell>
                        <TextField
                          name="name"
                          className={classes.input}
                          value={newTask.name}
                          placeholder="Add task..."
                          onChange={handleChangeNewTask}
                          autoFocus
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="section"
                          className={classes.input}
                          value={newTask.section}
                          placeholder="Add section..."
                          onChange={handleChangeNewTask}
                        />
                      </TableCell>
                      <TableCell>
                        <PriorityInputForm
                          value={newTask.priority}
                          onChange={handleChangeNewTaskPriority}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="description"
                          className={classes.input}
                          value={newTask.description}
                          placeholder="Add description..."
                          onChange={handleChangeNewTask}
                          onKeyUp={handleKeyUp}
                        />
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  </ClickAwayListener>
                ) : null}
              </TableBody>
            </Table>
          </div>
          <div className={classes.rightPane}>
            <Button
              variant="outlined"
              className={classes.uploadButton}
              onClick={handleClickDownload}
            >
              Download Template
            </Button>
            <ReactDropzone
              accept="application/*"
              multiple
              onDrop={handleDrop}
            >
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
                      variant="h4"
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
        <div
          className={classes.flex}
          style={{paddingTop: '12px', paddingRight: '270px'}}
        >
          <Button onClick={handleAddTask}>+ Add task</Button>
          <div className={classes.grow} />
          <Button variant="contained" onClick={() => setStep(2)}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  ) : null;
}
