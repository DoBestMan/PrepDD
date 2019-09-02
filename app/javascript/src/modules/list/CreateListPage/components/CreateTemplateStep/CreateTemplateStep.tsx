import React from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from '@material-ui/core';

import UploadIcon from '@material-ui/icons/CloudUpload';
import StyledCheckBox from '../../../../../components/StyledCheckBox';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      height: 'calc(100vh - 168px)',
      padding: '0px calc((100% - 1380px) / 2) 0px calc((100% - 1380px) / 2)', 
      borderBottom: '1px solid #D8D8D8',
    },
    footer: {
      height: '72px', 
      padding: '0px calc((100% - 1380px) / 2) 0px calc((100% - 1380px) / 2)', 
    },
    flex: {
      display: 'flex',
      alignItems: 'center',
    },
    grow: {
      flexGrow: 1, 
    },
    content: {
      display: 'flex',
      marginTop: '48px',
    },
    styledTableCell: {
      paddingLeft: '0px', 
      alignItems: 'center', 
    },
    rightPane: {
      minWidth: '250px',
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
    },
    uploadLabelColor: {
      color: '#D8D8D8',
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
      backgroundColor: '#1969A5',
    },
    low: {
      backgroundColor: '#81AFFF',
    },
  })
);

const data = [
  {
    task: 'Task Title',
    section: 'Section Name',
    priority: 'High',
    description: 'Description text',
  },
  {
    task: 'Task Title',
    section: 'Section Name',
    priority: 'High',
    description: 'Add...',
  },
  {
    task: 'Task Title',
    section: 'Section Name',
    priority: 'High',
    description: 'Add...',
  },
  {
    task: 'Task Title',
    section: 'Section Name',
    priority: 'High',
    description: 'Add...',
  },
  {
    task: 'Task Title',
    section: 'Section Name',
    priority: 'High',
    description: 'Add...',
  },
];

interface CreateTemplateStepProps {
  stepNumber: number;
  currentStep: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;  
}

export default function CreateTemplateStep(props: CreateTemplateStepProps) {
  const {stepNumber, currentStep, setStep} = props;
  const classes = useStyles();

  const renderPriority = (priority: string) => {
    return (
      <div className={classes.flex}>
        <div
          className={clsx(
            classes.status,
            priority === 'High'
              ? classes.high
              : priority === 'Medium'
              ? classes.medium
              : classes.low
          )}
        />
        <Typography variant="h6">{priority}</Typography>
      </div>
    );
  };

  return stepNumber === currentStep ? (
    <div>
      <div className={classes.body}>
        <Typography variant="h2">Template name</Typography>
        <div className={classes.content}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.styledTableCell}>
                  <StyledCheckBox style={{marginRight: '24px'}}/>
                  Task
                </TableCell>
                <TableCell>Section</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Example Files</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className={classes.styledTableCell}>
                      <StyledCheckBox style={{marginRight: '24px'}}/>
                      {item.task}
                    </TableCell>
                    <TableCell>{item.section}</TableCell>
                    <TableCell>{renderPriority(item.priority)}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className={classes.rightPane}>
            <Button variant="outlined" className={classes.uploadButton}>Download Import Template</Button>
            <div className={classes.uploadArea}>
              <UploadIcon style={{fontSize: '120px'}} />
              <br />
              <Typography variant="h4" className={classes.uploadLabelColor}>
                Drag and Drop/
                <br />
                Import Tasks
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.footer}>
        <div className={classes.flex} style={{paddingTop: '18px', paddingRight: '328px'}}>
          <Button>+ Add task</Button>
          <div className={classes.grow} />
          <Button variant="contained" onClick={() => setStep(2)}>
            Create List
          </Button>
        </div>
      </div>
    </div>
  ) : null;
}