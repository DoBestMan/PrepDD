import React, {useState} from 'react';
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
    },
    uploadLabelColor: {
      color: '#D8D8D8',
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

  return stepNumber === currentStep ? (
    <div>
      <div className={classes.body}>
        <Typography variant="h2">{selectedTemplate.name}</Typography>
        <div className={classes.content}>
          <Table style={{tableLayout: 'fixed'}}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <StyledCheckBox/>
                </TableCell>
                <TableCell>Task</TableCell>
                <TableCell>Section</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Example Files</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedTemplate.tasks && 
                selectedTemplate.tasks.map((item: AllTemplates_templateLists_tasks) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell padding="checkbox">
                        <StyledCheckBox/>
                      </TableCell>
                      <TableCell>
                        <InputForm value={item.name as string} />
                      </TableCell>
                      <TableCell>
                        <InputForm value={item.section as string} />
                      </TableCell>
                      <TableCell>
                        <PriorityForm value={item.priority as string} />
                      </TableCell>
                      <TableCell>
                        <InputForm value={item.description as string} />
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
        <div className={classes.flex} style={{paddingTop: '18px', paddingRight: '270px'}}>
          <Button>+ Add task</Button>
          <div className={classes.grow} />
          <Button variant="contained" onClick={() => setStep(2)}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  ) : null;
}