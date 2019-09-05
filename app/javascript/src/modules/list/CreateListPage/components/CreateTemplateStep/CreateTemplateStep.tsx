import React, {useState} from 'react';
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
  Checkbox, 
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import ReactDropzone, { DropzoneRef } from 'react-dropzone';

import UploadIcon from '@material-ui/icons/CloudUpload';
import InputForm from './components/InputForm';
import PriorityForm from './components/PriorityForm';

import {
  AllTemplates_templateLists,
  AllTemplates_templateLists_tasks,
} from '../../../../../graphql/queries/__generated__/AllTemplates';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      height: 'calc(100vh - 156px)',
      padding: '0px calc((100% - 1380px) / 2) 0px calc((100% - 1380px) / 2)', 
      borderBottom: '1px solid #D8D8D8',
      overflow: 'auto',
    },
    footer: {
      height: '72px', 
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
      color: '#3A84FF',
      border: '2px solid #3A84FF',
      borderRadius: '3px', 
      marginRight: '12px', 
    },
    deleteIcon: {
      cursor: 'pointer', 
    },
    content: {
      display: 'flex',
      marginTop: '48px',
      height: 'calc(100% - 100px)'
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
    }
  })
);

interface CreateTemplateStepProps {
  selectedTemplate: AllTemplates_templateLists;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<AllTemplates_templateLists>>;
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
    setStep
  } = props;
  const classes = useStyles();
  const [selected, setSelected] = useState<number[]>([]);
  const dropzone = React.createRef<DropzoneRef>();

  function handleSelectAllClick(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
    if (event.target.checked && selectedTemplate && selectedTemplate.tasks) {
      const newSelecteds = selectedTemplate.tasks.map((tasks: AllTemplates_templateLists_tasks, index: number) => index);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  function handleClick(event: React.MouseEvent<unknown>, id: number) {
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
                __typename: "Task",
                id: '',
                name: task.name, 
                section: {
                  __typename: "TaskSection",
                  id: '', 
                  name: task.section,                 
                }, 
                description: task.description, 
                priority: task.priority, 
                status: 'Todo'  
              } as AllTemplates_templateLists_tasks;
            });

            newTasks = newTasks.concat(tempTasks);
          })

          setSelectedTemplate({
            ...selectedTemplate, 
            tasks: [
              ...selectedTemplate.tasks, 
              ...newTasks, 
            ]
          }) 
        }
      })
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let newTasks: AllTemplates_templateLists_tasks[] | null = selectedTemplate.tasks;
    const {name, value} = event.target;

    if (newTasks) {
      newTasks[index] = Object.assign({}, newTasks[index], {
        [name]: value, 
      });

      setSelectedTemplate({
        ...selectedTemplate, 
        tasks: newTasks, 
      })
    }
  }

  const handleChangeSection = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let newTasks: AllTemplates_templateLists_tasks[] | null = selectedTemplate.tasks;
    const {value} = event.target;

    if (newTasks) {
      const newSection = newTasks[index].section || {
        __typename: "TaskSection",
        id: '', 
        name: ''
      };
      if (newSection && newSection.name !== null) {
        newSection.name = value;
        newTasks[index].section = newSection;
      }

      setSelectedTemplate({
        ...selectedTemplate, 
        tasks: newTasks, 
      })
    }
  }

  const handleChangePriority = (newValue: string, index: number) => {
    let newTasks: AllTemplates_templateLists_tasks[] | null = selectedTemplate.tasks;

    if (newTasks) {
      newTasks[index].priority = newValue;

      setSelectedTemplate({
        ...selectedTemplate, 
        tasks: newTasks, 
      })
    }
  }

  const handleAddTask = () => {
    let newTasks: AllTemplates_templateLists_tasks[] | null = selectedTemplate.tasks;

    if (newTasks) {
      newTasks.push({
        __typename: "Task",
        id: '',
        name: '',
        section: {
          __typename: "TaskSection",
          id: '', 
          name: '', 
        },
        description: '',
        priority: 'medium',
        status: '',
      })
      setSelectedTemplate({
        ...selectedTemplate, 
        tasks: newTasks, 
      })
    }
  }

  const handleDelete = () => {
    if (selectedTemplate && selectedTemplate.tasks) {
      const newTasks = selectedTemplate.tasks.filter((task: AllTemplates_templateLists_tasks, index: number) => {
        return selected.indexOf(index) === -1;
      })

      setSelectedTemplate({
        ...selectedTemplate, 
        tasks: newTasks, 
      })
      setSelected([]);
    }
  }

  const handleClickDownload = () => {
    if (dropzone && dropzone.current) {
      dropzone.current.open();
    }
  }

  const renderCheckbox = () => {
    const rowCount = selectedTemplate && selectedTemplate.tasks ?
      selectedTemplate.tasks.length : 0;

    return (
      <Checkbox 
        indeterminate={selected.length > 0 && selected.length < rowCount}
        checked={selected.length > 0 && selected.length === rowCount}
        onChange={handleSelectAllClick}
        color="primary" 
      />
    )
  }

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
            <DeleteIcon 
              className={classes.deleteIcon} 
              onClick={handleDelete}
            />
          )}
        </div>
        <div className={classes.content}>
          <div style={{overflow: 'auto'}}>
            <Table style={{tableLayout: 'fixed', borderCollapse: 'separate'}}>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" className={classes.stickyHeader}>
                    {renderCheckbox()}
                  </TableCell>
                  <TableCell className={classes.stickyHeader}>Task</TableCell>
                  <TableCell className={classes.stickyHeader} style={{width: '200px'}}>Section</TableCell>
                  <TableCell className={classes.stickyHeader} style={{width: '150px'}}>Priority</TableCell>
                  <TableCell className={classes.stickyHeader}>Description</TableCell>
                  <TableCell className={classes.stickyHeader} style={{width: '125px'}}>Example Files</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedTemplate.tasks && 
                  selectedTemplate.tasks.map((item: AllTemplates_templateLists_tasks, index: number) => {
                    const isSelected = selected.indexOf(index) !== -1;

                    return (
                      <TableRow key={index}>
                        <TableCell padding="checkbox">
                          <Checkbox 
                            checked={isSelected} 
                            color="primary" 
                            onClick={(e: React.MouseEvent<unknown>) => handleClick(e, index)}
                          />
                        </TableCell>
                        <TableCell>
                          <InputForm 
                            name="name"
                            className={classes.textFlow}
                            value={item.name as string} 
                            placeholder="Add task..."
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, index)}
                          />
                        </TableCell>
                        <TableCell>
                          <InputForm 
                            name="section"
                            className={classes.textFlow}
                            value={item.section ? item.section.name as string : ""}
                            placeholder="Add section..."
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeSection(event, index)}
                          />
                        </TableCell>
                        <PriorityForm 
                          value={item.priority as string} 
                          onChange={(newValue: string) => handleChangePriority(newValue, index)}
                        />
                        <TableCell>
                          <InputForm 
                            name="description"
                            className={classes.textFlow}
                            value={item.description as string} 
                            placeholder="Add description..."
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, index)}
                          />
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    );
                  })
                }
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
              ref={dropzone}
              onDrop={handleDrop}
            >
              {({getRootProps, getInputProps, isDragActive}) => (
                <div
                  {...getRootProps()}
                  className={clsx(classes.uploadArea, isDragActive && classes.uploadActive)}
                >
                  <input {...getInputProps()} />
                  <div>
                    <UploadIcon style={{fontSize: '120px'}} />
                    <br />
                    <Typography variant="h4" className={classes.uploadLabelColor}>
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
        <div className={classes.flex} style={{paddingTop: '18px', paddingRight: '270px'}}>
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