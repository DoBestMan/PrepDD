import React from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Container, 
  Typography, 
  Button, 
} from '@material-ui/core';

import Panel from '../../../../../components/Panel';
import GeneralTemplatesPane from './components/GeneralTemplatesPane';
import FinancePane from './components/FinancePane';
import LegalPane from './components/LegalPane';
import MAPane from './components/MAPane';

import {
  AllTemplates_templateLists,
  AllTemplates_templateLists_tasks,
} from '../../../../../graphql/queries/__generated__/AllTemplates';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'block', 
      margin: '0px calc((100% - 1080px) / 2) 0px calc((100% - 1080px) / 2)', 
    }, 
    flex: {
      display: 'flex', 
      alignItems: 'center', 
    }, 
    grow: {
      flexGrow: 1, 
    }, 
  })
);

const labels = [
  "General Templates", 
  "Finance", 
  "Legal", 
  "M&A"
]

interface SelectTemplateStepProps {
  data: AllTemplates_templateLists[];
  setSelectedTemplate: React.Dispatch<React.SetStateAction<AllTemplates_templateLists>>;
  stepNumber: number;
  currentStep: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function SelectTemplateStep(props: SelectTemplateStepProps) {
  const {
    data, 
    setSelectedTemplate,
    stepNumber, 
    currentStep, 
    setStep
  } = props;
  const classes = useStyles();

  return stepNumber === currentStep ? (
    <div className={classes.root}>
      <div className={classes.flex}>
        <Typography variant="h2">
          New List
        </Typography>
        <div className={classes.grow} />
        <Button variant="contained" onClick={() => setStep(1)}>
          Create blank project
        </Button>
      </div>
      <Panel title="Create List" labels={labels}>
        <GeneralTemplatesPane 
          data={data}
          setSelectedTemplate={setSelectedTemplate}
          setStep={setStep} 
        />
        <FinancePane />
        <LegalPane />
        <MAPane />
      </Panel>
    </div>
  ) : null;
}