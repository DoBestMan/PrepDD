import React from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Typography
} from '@material-ui/core';

import * as cs from '../../../../../constants/theme';
import DefaultUserImage from '../../../../common/DefaultUserImage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '12px 24px', 
      borderRadius: '3px',
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
    }
  })
);

interface MessageProps {
  data: {
    from: string; 
    to: string;
    content: string;
    time: string;
    status: boolean;
  }, 
  className?: string;
}

export default function Message(props: MessageProps) {
  const {data, className, ...others} = props;
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.flex}>
        <DefaultUserImage userName={data.from} className={classes.avatar} />
        <Typography variant="h6">
          {data.from}
        </Typography>
        <div className={classes.grow} />
        {data.status && (
          <div className={classes.status} />
        )}
        <Typography variant="h6" className={classes.secondary}>
          {data.time}
        </Typography>
      </div>
      <div className={classes.content}>
        <Typography variant="h6" color="textSecondary">
          <span className={classes.primary}>{data.to + ' '}</span>
          {data.content}
        </Typography>
      </div>
    </div>
  )
}