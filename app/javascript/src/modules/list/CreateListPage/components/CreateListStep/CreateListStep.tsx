import React from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Grid,
  Typography, 
  FormControl,
  FormControlLabel,
  RadioGroup, 
  Radio, 
  Button
} from '@material-ui/core';

import InternalIcon from '@material-ui/icons/Lock';
import ShareIcon from '@material-ui/icons/People';
import RequestIcon from '@material-ui/icons/Input';

import * as cs from '../../../../../constants/theme';
import InputForm from './components/InputForm';
import StyledItem from './components/StyledItem';
import Alert from './components/Alert';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {},
    body: {
      height: 'calc(100vh - 156px)',
      padding: '0px calc((100% - 1080px) / 2) 0px calc((100% - 1080px) / 2)', 
      borderBottom: '1px solid #D8D8D8',
      overflow: 'auto', 
    }, 
    footer: {
      height: '72px', 
      padding: '0px calc((100% - 1080px) / 2) 0px calc((100% - 1080px) / 2)', 
    },
    flex: {
      display: 'flex', 
      alignItems: 'center', 
    },
    grow: {
      flexGrow: 1, 
    },
    secondary: {
      color: '#606060', 
      marginTop: '48px', 
      marginBottom: '12px', 
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
    },
    grayRect: {
      width: '36px', 
      height: '36px', 
      backgroundColor: '#F2F2F2',
      border: '1px solid #D8D8D8',
      borderRadius: '3px',
      marginRight: '12px', 
    },
    description: {
      width: '100%', 
      height: '180px', 
      borderRadius: '3px',
      resize: 'none', 
      border: '1px solid #D8D8D8',
    },
    addButton: {
      border: '1px solid #D8D8D8',
      borderRadius: '3px', 
      fontSize: '15px', 
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
  const RequestLabel = (
    <Typography variant="h6" className={classes.flex}>
      <RequestIcon className={classes.icon} />
      Request
    </Typography>
  )

  return stepNumber == currentStep ? (
    <div>
      <div className={classes.body}>
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
                  Collaborate within your company. Use this setting when sharing information with your colleagues
                </Typography>
                <FormControlLabel value="share" control={<Radio color="primary" />} label={ShareLabel} />
                <Typography variant="h6" className={classes.explanation}>
                  Send information to an external company. Use this setting when your company has the primary responsibility for providing the information in the task list.
                </Typography>
                <FormControlLabel value="issue" control={<Radio color="primary" />} label={RequestLabel} />
                <Typography variant="h6" className={classes.explanation}>
                  Issue a request for information from an external company. Use this setting when the other company is responsible for providing most of the information in the task list.
                </Typography>
              </RadioGroup>
            </FormControl>
            <Alert />
          </Grid>
          <Grid item md={6}>
            <Typography variant="h2">List Details</Typography>

            <InputForm label="Title" value="PrepDD Series B" />

            <div>
              <Typography variant="h6" className={classes.secondary}>Template</Typography>
              <div className={classes.flex}>
                <div className={classes.grayRect} />
                <Typography variant="h6">Series B Diligence</Typography>
              </div>
            </div>

            <div>
              <Typography variant="h6" className={classes.secondary}>List owner(s)</Typography>
              <div className={classes.flex}>
                <StyledItem label="Tommy Boy" type="user" />
                <Button className={classes.addButton}>+</Button>
              </div>
            </div>

            <div>
              <Typography variant="h6" className={classes.secondary}>Issue to</Typography>
              <div className={classes.flex}>
                <StyledItem label="G2 Crowd" />
              </div>
            </div>

            <div>
              <Typography variant="h6" className={classes.secondary}>Description</Typography>
              <textarea className={classes.description} />
            </div>
          </Grid>
        </Grid>
      </div>
      
      <div className={classes.footer}>
        <div className={classes.flex} style={{paddingTop: '18px'}}>
          <div className={classes.grow} />
          <Button variant="contained">
            Create List
          </Button>
        </div>
      </div>
    </div>
  ): null;
};