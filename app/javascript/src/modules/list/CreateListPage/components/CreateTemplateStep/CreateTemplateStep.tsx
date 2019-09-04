import React, {useState} from 'react';
import clsx from 'clsx';
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
import ReactDropzone from 'react-dropzone';

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
      height: '100%',
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
        section: '',
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
    }
  }

  const renderCheckbox = () => {
    const rowCount = selectedTemplate && selectedTemplate.tasks ?
      selectedTemplate.tasks.length : 0;

    return (
      <Checkbox 
        indeterminate={selected.length > 0 && selected.length < rowCount}
        checked={selected.length === rowCount}
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
              {selected.length} task(s)
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
          <Table style={{tableLayout: 'fixed'}}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  {renderCheckbox()}
                </TableCell>
                <TableCell>Task</TableCell>
                <TableCell style={{width: '200px'}}>Section</TableCell>
                <TableCell style={{width: '150px'}}>Priority</TableCell>
                <TableCell>Description</TableCell>
                <TableCell style={{width: '125px'}}>Example Files</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedTemplate.tasks && 
                selectedTemplate.tasks.map((item: AllTemplates_templateLists_tasks, index: number) => {
                  const isSelected = selected.indexOf(index) !== -1;

                  return (
                    <TableRow key={item.id}>
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
                          value={item.name as string} 
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, index)}
                        />
                      </TableCell>
                      <TableCell>
                        <InputForm 
                          name="section"
                          value={item.section as string} 
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, index)}
                        />
                      </TableCell>
                      <PriorityForm 
                        value={item.priority as string} 
                        onChange={(newValue: string) => handleChangePriority(newValue, index)}
                      />
                      <TableCell>
                        <InputForm 
                          name="description"
                          value={item.description as string} 
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
          <div className={classes.rightPane}>
            <Button variant="outlined" className={classes.uploadButton}>Download Template</Button>
            <ReactDropzone 
              multiple
              accept="application/*" 
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