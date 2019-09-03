import React, {useState} from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Grid,
  Typography, 
  FormControl,
  FormControlLabel,
  RadioGroup, 
  Radio, 
  Button,
  ClickAwayListener,
  Paper, 
  TextField, 
} from '@material-ui/core';

import InternalIcon from '@material-ui/icons/Lock';
import ShareIcon from '@material-ui/icons/People';
import RequestIcon from '@material-ui/icons/Input';

import * as cs from '../../../../../constants/theme';
import {canBeAdmin} from '../../../../../helpers/roleHelpers';
import {useGlobalState} from '../../../../../store';
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
    },
    addPanel: {
      position: 'absolute', 
      width: '280px', 
      top: '35px', 
      left: '0px',
      padding: '12px 24px 18px', 
      backgroundColor: '#FFFFFF',
      border: '2px solid #D8D8D8',
      borderRadius: '3px', 
    }, 
    input: {
      display: 'block',
      width: '100%',
      marginTop: '6px',
      color: '#606060',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '12px',
      textTransform: 'none',
      '& label': {
        color: '#606060',
        fontFamily: 'Montserrat',
        fontWeight: 600,
        fontSize: '12px',
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
    }, 
    addLink: {
      marginTop: '6px', 
      paddingLeft: '0px',
      paddingRight: '0px', 
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
  const [openAddPanel, setOpenAddPanel] = useState<boolean>(false);
  const [openInvitePanel, setOpenInvitePanel] = useState<boolean>(false);
  const {state} = useGlobalState();

  const role = () => {
    if (state && state.currentUser && state.currentUser.roles) {
      const findRole = state.currentUser.roles.find(role => role.companyId === state.selectedCompany);

      return findRole ? findRole.name : 'User';
    }
    return 'User';
  };

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

  const handleCloseAll = () => {
    setOpenAddPanel(false);
    setOpenInvitePanel(false);
  }

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
                {canBeAdmin(role()) && (
                  <>
                    <FormControlLabel value="share" control={<Radio color="primary" />} label={ShareLabel} />
                    <Typography variant="h6" className={classes.explanation}>
                      Send information to an external company. Use this setting when your company has the primary responsibility for providing the information in the task list.
                    </Typography>
                  </>
                )}
                {canBeAdmin(role()) && (
                  <>
                    <FormControlLabel value="issue" control={<Radio color="primary" />} label={RequestLabel} />
                    <Typography variant="h6" className={classes.explanation}>
                      Issue a request for information from an external company. Use this setting when the other company is responsible for providing most of the information in the task list.
                    </Typography>
                  </>
                )}
              </RadioGroup>
            </FormControl>
            {canBeAdmin(role()) && (
              <Alert />
            )}
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
                <div 
                  style={{position: 'relative'}}
                  onMouseOver={() => setOpenAddPanel(true)}
                  onMouseLeave={handleCloseAll}
                >
                  <Button 
                    className={classes.addButton} 
                  >+</Button>
                  {openAddPanel ? (
                    <ClickAwayListener onClickAway={() => setOpenAddPanel(false)}>
                      <Paper
                        className={classes.addPanel}
                        elevation={0}
                        onMouseOver={() => setOpenAddPanel(true)}
                        onMouseLeave={handleCloseAll}
                      >
                        <TextField 
                          className={classes.input}
                          placeholder="Search by name or email"
                        />
                        {openInvitePanel ? (
                          <form>
                            <Typography variant="h6" style={{marginTop: '24px'}}>New owner</Typography>
                            <TextField 
                              className={classes.input}
                              label="Name"
                            />
                            <TextField 
                              className={classes.input}
                              label="Email"
                              required
                            />
                            <Button type="submit" className={classes.addLink}>
                              Invite new owner
                            </Button>
                          </form>
                        ): (
                          <Button 
                            className={classes.addLink}
                            onClick={() => setOpenInvitePanel(true)}
                          >+ Add owner</Button>
                        )}
                      </Paper>
                    </ClickAwayListener>
                  ) : null}
                </div>                
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