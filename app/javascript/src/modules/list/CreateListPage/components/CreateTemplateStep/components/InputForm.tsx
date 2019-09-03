import React, {useState} from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import UpdateIcon from '@material-ui/icons/Create';

import * as cs from '../../../../../../constants/theme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flex: {
      display: 'flex', 
      alignItems: 'center', 
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
    input: {
      border: 'none', 
      background: 'none', 
      fontFamily: cs.FONT.family, 
      fontSize: cs.FONT.size.xs, 
      fontWeight: cs.FONT.weight.regular, 
      '&:hover': {
        border: 'none',
      },
      '&:focus': {
        border: 'none',
        outline: 'none',
      },
    }
  })
);

interface InputFormProps {
  value: string;
}

export default function InputForm(props: InputFormProps) {
  const {value} = props;
  const classes = useStyles();
  const [editable, setEditable] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);

  const handleClick = () => {
    if (hover) {
      setEditable(true);
    }
  }

  return (
    <div 
      className={classes.flex}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      {editable ? (
        <ClickAwayListener onClickAway={() => setEditable(false)}>
          <input
            className={classes.input}
            value={value}
          />
        </ClickAwayListener>
      ): (
        <>
          {value}
          <UpdateIcon className={clsx(classes.update, hover && classes.visible)} />
        </>
      )}
    </div>
  )
}