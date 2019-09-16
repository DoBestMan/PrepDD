import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import idx from 'idx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ClickAwayListener,
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
import NameLabel from '../../../../../common/NameLabel';

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
      height: '28px',
      cursor: 'pointer',
      color: '#509E6D',
      background: '#FFFFFF',
      alignItems: 'center',
      padding: '1px 6px 1px 0px',
      marginRight: '60px',
      border: '1px solid #D8D8D8',
      borderRadius: '3px',
    },
    transform: {
      textTransform: 'capitalize',
      paddingLeft: '6px',
    },
    priorityDropdown: {
      position: 'absolute',
      top: '27px',
      left: '0px',
      width: 'max-content',
      color: '#509E6D',
      background: '#FFFFFF',
      border: '1px solid #D8D8D8',
      borderRadius: '3px',
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

interface AddUsersModalProps {
  test: string;
}

function AddUsersModal(props: AddUsersModalProps) {
  const classes = useStyles();

  const [owners, setOwners] = useState<any>([]);
  const [reviewers, setReviewers] = useState<any>([]);

  const handleRemoveOwner = () => null;

  return (
    <div>
      <div className={classes.metaForm}>
        <Typography
          variant="h6"
          className={clsx(classes.secondary, classes.label)}
        >
          Owner
        </Typography>
        <div className={classes.flex} style={{flexWrap: 'wrap'}}>
          {owners &&
            owners.map((owner: any, index: number) => {
              return true ? (
                <NameLabel
                  key={index}
                  type="user"
                  label={owner.fullName}
                  logo={owner.profileUrl as string}
                  onClose={() => handleRemoveOwner()}
                />
              ) : (
                <NameLabel
                  key={index}
                  label={owner.name}
                  onClose={() => handleRemoveOwner()}
                />
              );
            })}
          <InviteForm owners={owners} setOwners={setOwners} size="small" />
        </div>
      </div>

      <div className={classes.metaForm}>
        <Typography
          variant="h6"
          className={clsx(classes.secondary, classes.label)}
        >
          Reviewer
        </Typography>
        <div className={classes.flex} style={{flexWrap: 'wrap'}}>
          {reviewers &&
            reviewers.map((reviewer: any, index: number) => {
              return reviewer.__typename === 'User' ? (
                <NameLabel
                  key={index}
                  type="user"
                  label={reviewer.fullName}
                  logo={reviewer.profileUrl as string}
                />
              ) : (
                <NameLabel key={index} label={reviewer.name} selected />
              );
            })}
          <InviteForm
            owners={reviewers}
            setOwners={setReviewers}
            size="small"
          />
        </div>
      </div>
    </div>
  );
}

export default AddUsersModal;
