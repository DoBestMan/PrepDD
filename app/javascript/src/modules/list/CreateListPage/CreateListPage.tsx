import React, {useState, useEffect} from 'react';
import idx from 'idx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';

import Header from './components/Header';
import SelectTemplateStep from './components/SelectTemplateStep';
import CreateTemplateStep from './components/CreateTemplateStep';

import {useAllTemplates} from '../../../graphql/queries/AllTemplates';
import {AllTemplates_templateLists} from '../../../graphql/queries/__generated__/AllTemplates';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {}, 
  })
);

export default function CreateListPage() {
  const classes = useStyles();
  const [step, setStep] = useState<number>(0);
  const [selectedTemplate, setSelectedTemplate] = useState<AllTemplates_templateLists | null>(null);

  const {loading, data, error} = useAllTemplates({});

  useEffect(() => {
    const lists = idx(data, data => data.templateLists);

    if (loading || !lists) return;
  }, [loading, idx(data, data => data.templateLists)])
  
  return data && (
    <div className={classes.root}>
      <Header step={step} setStep={setStep} />
      <SelectTemplateStep
        data={data.templateLists}
        setSelectedTemplate={setSelectedTemplate}
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