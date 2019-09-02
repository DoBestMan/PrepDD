import React, {useState} from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import UpdateIcon from '@material-ui/icons/Create';

import * as cs from '../../../../../../constants/theme';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    flex: {
      display: 'flex', 
      alignItems: 'center', 
    },
    status: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      marginRight: '6px',
    },
    high: {
      backgroundColor: '#2792A2',
    },
    medium: {
      backgroundColor: '#1969A5',
    },
    low: {
      backgroundColor: '#81AFFF',
    },
    update: {
      marginLeft: '12px', 
      color: cs.COLORS.primary, 
      fontSize: '15px', 
      cursor: 'pointer', 
      visibility: 'hidden'
    },
    visible: {
      visibility: 'visible', 
    },
  })
);

interface PriorityFormProps {
  value: string;
}

export default function PriorityForm(props: PriorityFormProps) {
  const {value} = props;
  const classes = useStyles();
  const [editable, setEditable] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  
  return (
    <div 
      className={classes.flex}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={clsx(
          classes.status,
          value === 'High'
            ? classes.high
            : value === 'Medium'
            ? classes.medium
            : classes.low
        )}
      />
      <Typography variant="h6">{value}</Typography>
      <UpdateIcon 
        className={clsx(classes.update, hover && classes.visible)} 
        onClick={() => setEditable(true)}
      />
    </div>
  )
}