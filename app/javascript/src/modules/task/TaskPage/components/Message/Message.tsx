import React from 'react';
import clsx from 'clsx';
import idx from 'idx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';

import * as cs from '../../../../../constants/theme';
import DefaultUserImage from '../../../../common/DefaultUserImage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '12px',
      borderRadius: '3px',
    },
    mb12: {
      marginBottom: '12px', 
    },
    flex: {
      display: 'flex',
      alignItems: 'center',
    },
    grow: {
      flexGrow: 1,
    },
    avatar: {
      width: '18px',
      height: '18px',
      fontSize: '9px',
      backgroundColor: 'rgba(42,137,75,0.80)',
      marginRight: '12px',
    },
    status: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: '#6EB81D',
      marginRight: '12px',
    },
    primary: {
      color: cs.COLORS.primary,
    },
    secondary: {
      color: '#606060',
      opacity: 0.5,
    },
    content: {
      marginTop: '12px',
      marginLeft: '30px',
    },
  })
);

interface MessageProps {
  data: {
    message: string;
    status: boolean;
    user: any;
    createdAt: string;
  };
  padding?: boolean;
  className?: string;
}

export default function Message(props: MessageProps) {
  const {data, className, padding, ...others} = props;
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className, padding && classes.mb12)}>
      <div className={classes.flex}>
        <DefaultUserImage
          userName={(data.user && data.user.fullName) || ''}
          className={classes.avatar}
        />
        <Typography variant="h6">{data.user && data.user.fullName}</Typography>
        <div className={classes.grow} />
        {data.status && <div className={classes.status} />}
        <Typography variant="h6" className={classes.secondary}>
          {data.createdAt}
        </Typography>
      </div>
      <div className={classes.content}>
        <Typography variant="h6" color="textSecondary">
          {false && <span className={classes.primary}> </span>}
          {data.message}
        </Typography>
      </div>
    </div>
  );
}
