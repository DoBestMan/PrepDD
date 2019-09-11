import React from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      display: 'inline-block',
      width: '50px',
      height: '30px',
    },
    switch: {
      position: 'absolute',
      cursor: 'pointer',
      padding: '4px',
      top: '0px',
      left: '0px',
      right: '0px',
      bottom: '0px',
      borderRadius: '3px',
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: '12px',
      color: '#FFFFFF',
    },
    switchOn: {
      backgroundColor: '#3A84FF',
      paddingTop: '7px',
      paddingLeft: '5px',
      '&:before': {
        position: 'absolute',
        content: '\"\"',
        height: '18px',
        width: '18px',
        right: '4px',
        bottom: '6px',
        backgroundColor: '#FFFFFF',
      },
    },
    switchOff: {
      backgroundColor: '#D8D8D8',
      textAlign: 'right',
      paddingTop: '7px',
      paddingRight: '6px',
      '&:before': {
        position: 'absolute',
        content: '\"\"',
        height: '18px',
        width: '18px',
        left: '4px',
        bottom: '6px',
        backgroundColor: '#FFFFFF',
      },
    },
  })
);

interface SwitchFormProps {
  value: boolean | null;
  onChange?: () => void;
}

export default function SwitchForm(props: SwitchFormProps) {
  const {value, onChange} = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div
        className={clsx(
          classes.switch,
          value ? classes.switchOn : classes.switchOff
        )}
        onClick={onChange}
      >
        {value ? 'On' : 'Off'}
      </div>
    </div>
  );
}
