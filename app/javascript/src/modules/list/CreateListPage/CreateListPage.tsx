import React, {useState} from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';

import Header from './components/Header';
import SelectTemplateStep from './components/SelectTemplateStep';
import CreateTemplateStep from './components/CreateTemplateStep';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {}, 
  })
);

export default function CreateListPage() {
  const classes = useStyles();
  const [step, setStep] = useState<number>(0);
  
  return (
    <div className={classes.root}>
      <Header step={step} setStep={setStep} />
      <SelectTemplateStep
        stepNumber={0}
        currentStep={step}
        setStep={setStep}
      />
      <CreateTemplateStep
        stepNumber={1}
        currentStep={step}
        setStep={setStep}
      />
    </div>
  );
};