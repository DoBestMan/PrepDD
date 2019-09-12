import React, {useState} from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  Button, 
} from '@material-ui/core';
import RightIcon from '@material-ui/icons/KeyboardArrowRightSharp';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import * as cs from '../../../../../../constants/theme';
import InputForm from '../../../../../common/EditableInputForm';
import InviteForm from '../../../../../common/InviteForm';
import SwitchForm from './SwitchForm';
import NameLabel from '../../../../../common/NameLabel';

import {
  UserTasks_userTasks,
  UserTasks_userTasks_userOwners,
  UserTasks_userTasks_teamOwners,
  UserTasks_userTasks_reviewers,
} from '../../../../../../graphql/queries/__generated__/UserTasks';
import {
  SearchCompanyUsers_searchCompanyUsers_teams,
  SearchCompanyUsers_searchCompanyUsers_users,
} from '../../../../../common/__generated__/SearchCompanyUsers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '0px 24px 0px 24px', 
    },
    invisible: {
      display: 'none',
    },
    metaBox: {
      borderBottom: '1px solid #D8D8D8', 
      marginTop: '24px',
    },
    metaForm: {
      display: 'flex', 
      marginBottom: '24px', 
    }, 
    flex: {
      display: 'flex', 
    },
    grow: {
      flexGrow: 1, 
    },
    addButton: {
      border: '1px solid #D8D8D8',
      borderRadius: '3px',
      fontSize: '15px',
    },
    secondary: {
      color: '#606060', 
    },
    label: {
      minWidth: '80px', 
    }, 
    priority: {
      display: 'flex', 
      width: 'fit-content', 
      height: 'fit-content', 
      alignItems: 'center', 
      padding: '1px 6px 1px 0px',
      marginRight: '60px', 
      background: '#FFFFFF',
      border: '1px solid #D8D8D8',
      borderRadius: '3px',
      color: '#509E6D',    
    },
    date: {
      '& .MuiInput-root': {
        border: '1px solid #D8D8D8',
        borderRadius: '3px',
      },
      '& input': {
        fontFamily: cs.FONT.family,
        fontWeight: cs.FONT.weight.regular,
        fontSize: cs.FONT.size.xs,
        textTransform: 'none',
        paddingLeft: '12px', 
      },
      '&:selected': {
        color: '#3A84FF',
      },
      '& .MuiInput-underline:before, .MuiInput-underline:after, .MuiInput-underline:hover:not(.Mui-disabled):before': {
        border: 'none',
      },
    },
  })
);

interface OverviewPaneProps {
  value?: number;
  index?: number;
  task: UserTasks_userTasks;
}

export default function OverviewPane(props: OverviewPaneProps) {
  const {value, index, task} = props;
  const classes = useStyles();

  const [owners, setOwners] = useState<(SearchCompanyUsers_searchCompanyUsers_teams | SearchCompanyUsers_searchCompanyUsers_users)[]>([
    ...(task.userOwners || []).map(user => {
      return {
        __typename: "User",
        id: user.id,
        email: user.email, 
        fullName: user.fullName,
        profileUrl: user.profileUrl,
      } as SearchCompanyUsers_searchCompanyUsers_users;
    }), 
    ...(task.teamOwners || []).map(team => {
      return {
        __typename: "Team",
        id: team.id, 
        name: team.name, 
      } as SearchCompanyUsers_searchCompanyUsers_teams;
    }), 
  ]);

  const handleChange = () => {
    
  }

  return (
    <Paper
      className={clsx(classes.root, value !== index && classes.invisible)}
      aria-labelledby="Overview"
      elevation={0}
    >
      <InputForm
        value={task.name as string}
      />
      <div className={classes.metaBox}>
        <div className={classes.metaForm}>
          <Typography variant="h6" className={clsx(classes.secondary, classes.label)}>
            Owner
          </Typography>
          <div className={classes.flex} style={{flexWrap: 'wrap'}}>
            {owners &&
              owners.map(
                (
                  owner:
                    | SearchCompanyUsers_searchCompanyUsers_users
                    | SearchCompanyUsers_searchCompanyUsers_teams,
                  index: number
                ) => {
                  return owner.__typename === 'User' ? (
                    <NameLabel
                      key={index}
                      type="user"
                      label={owner.fullName}
                      logo={owner.profileUrl as string}
                    />
                  ) : (
                    <NameLabel
                      key={index}
                      label={owner.name}
                      selected
                    />
                  );
                }
              )}
            <InviteForm owners={owners} setOwners={setOwners} />
          </div>
        </div>

        <div className={classes.metaForm}>
          <Typography variant="h6" className={clsx(classes.secondary, classes.label)}>
            Reviewer
          </Typography>
          {task.reviewers && task.reviewers.map((reviewer: UserTasks_userTasks_reviewers) => {
            return (
              <NameLabel label={reviewer.fullName as string} selected />
            )
          })}
          <NameLabel
            type="user"
            label="Ruzza Stefano"
          />
          <NameLabel label="+" selected />
        </div>

        <div className={classes.metaForm} style={{alignItems: 'center'}}>
          <Typography variant="h6" className={clsx(classes.secondary, classes.label)}>
            Priority
          </Typography>
          <div className={classes.priority}>
            {task.priority === 'high' && (
              <RightIcon />
            )}
            <Typography variant="h6">{task.priority}</Typography>
          </div>
          <Typography variant="h6" className={clsx(classes.secondary, classes.label)}>
            Due date
          </Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              className={classes.date}
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              value="09-09-2019"
              onChange={handleChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
      
      <div style={{marginTop: '24px'}}>
        <div className={classes.metaForm}>
          <Typography variant="h6" className={classes.secondary}>
            Preview Only
          </Typography>
          <div className={classes.grow} />
          <SwitchForm value={true} />
        </div>
        <div className={classes.metaForm}>
          <Typography variant="h6" className={classes.secondary}>
            Automatic PDF
          </Typography>
          <div className={classes.grow} />
          <SwitchForm value={true} />
        </div>
        <div className={classes.metaForm}>
          <Typography variant="h6" className={classes.secondary}>
            Dynamic Watermark
          </Typography>
          <div className={classes.grow} />
          <SwitchForm value={false} />
        </div>
      </div>
    </Paper>
  );
}
