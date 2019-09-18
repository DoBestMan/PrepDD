import React, {useState} from 'react';
import idx from 'idx';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import { 
  ClickAwayListener,
  Typography, 
} from '@material-ui/core';

import Panel from '../../../../../common/Panel';
import OwnerPane from './OwnerPane';
import ReviewerPane from './ReviewerPane';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      position: 'absolute', 
      width: '300px', 
      top: '45px', 
      right: '12px',
      backgroundColor: '#FFFFFF', 
      border: '2px solid #D8D8D8', 
      borderRadius: '3px',
      zIndex: 2, 
    },
    title: {
      padding: '24px 24px 0px 24px', 
    }, 
  })
);

const labels = [
  {label: 'Owner'}, 
  {label: 'Reviewer'}, 
];

interface AddUsersModalProps {
  setOpenAddUsersModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddUsersModal(props: AddUsersModalProps) {
  const {setOpenAddUsersModal} = props;
  const classes = useStyles();

  return (
    <ClickAwayListener onClickAway={() => setOpenAddUsersModal(false)}>
      <div className={classes.root}>
        <div className={classes.title}>
          <Typography variant="h4">
            Task Assignments
          </Typography>
        </div>
        <Panel labels={labels} padding>
          <OwnerPane />
          <ReviewerPane />
        </Panel>
      </div>
    </ClickAwayListener>
  )
}