import React from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Grid,
  Typography, 
  FormControl, 
  FormLabel, 
  FormControlLabel,
  RadioGroup, 
  Radio, 
} from '@material-ui/core';

import InternalIcon from '@material-ui/icons/Lock';
import ShareIcon from '@material-ui/icons/People';
import IssueIcon from '@material-ui/icons/Input';

import * as cs from '../../../../../constants/theme';
import InputForm from './components/InputForm';

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
    sharingTitle: {
      color: '#606060', 
      marginLeft: '3px', 
    },
    icon: {
      fontSize: '15px', 
      marginRight: '12px', 
    },
    explanation: {
      color: '#606060', 
      marginLeft: '32px', 
    }
  })
);

interface CreateListStepProps {
  stepNumber: number;
  currentStep: number;
};

export default function CreateListStep(props: CreateListStepProps) {
  const {stepNumber, currentStep} = props;
  const classes = useStyles();

  const InternalLabel = (
    <Typography variant="h6" className={classes.flex}>
      <InternalIcon className={classes.icon} />
      Internal
    </Typography>
  )
  const ShareLabel = (
    <Typography variant="h6" className={classes.flex}>
      <ShareIcon className={classes.icon} />
      Share
    </Typography>
  )
  const IssueLabel = (
    <Typography variant="h6" className={classes.flex}>
      <IssueIcon className={classes.icon} />
      Issue
    </Typography>
  )

  return stepNumber == currentStep ? (
    <div className={classes.root}>
      <Grid container spacing={6}>
        <Grid item md={6}>
          <Typography variant="h2">Create List</Typography>
          <FormControl component="fieldset" style={{marginTop: '48px'}}>
            <Typography variant="h6" className={classes.sharingTitle}>
              Sharing
            </Typography>
            <RadioGroup
              aria-label="sharing"
              name="sharing"
            >
              <FormControlLabel value="internal" control={<Radio color="primary" />} label={InternalLabel} />
              <Typography variant="h6" className={classes.explanation}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
              <FormControlLabel value="share" control={<Radio color="primary" />} label={ShareLabel} />
              <Typography variant="h6" className={classes.explanation}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
              <FormControlLabel value="issue" control={<Radio color="primary" />} label={IssueLabel} />
              <Typography variant="h6" className={classes.explanation}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item md={6}>
          <Typography variant="h2">List Details</Typography>
          <InputForm label="Title" value="PrepDD Series B" />
        </Grid>
      </Grid>
    </div>
  ): null;
};