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
      width: '100%', 
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
  name?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputForm(props: InputFormProps) {
  const {value, name, className, onChange} = props;
  const classes = useStyles();
  const [editable, setEditable] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);

  const handleClick = () => {
    if (hover) {
      setEditable(true);
    }
  }

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.persist();
    if (event.keyCode === 13) {
      setEditable(false);
    }
  };

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
            type="text"
            name={name}
            className={classes.input}
            value={value}
            onChange={onChange}
            onKeyUp={handleKeyUp}
            autoFocus
          />
        </ClickAwayListener>
      ): (
        <>
          <div className={className}>{value}</div>
          <UpdateIcon className={clsx(classes.update, hover && classes.visible)} />
        </>
      )}
    </div>
  )
}