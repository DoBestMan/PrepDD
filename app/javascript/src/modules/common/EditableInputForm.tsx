import React, {useState} from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Typography from '@material-ui/core/Typography';
import UpdateIcon from '@material-ui/icons/Create';

import * as cs from '../../constants/theme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '24px',
    },
    input: {
      width: '100%',
      height: '36px',
      color: '#000000',
      fontFamily: cs.FONT.family,
      fontSize: cs.FONT.size.md,
      fontWeight: cs.FONT.weight.bold,
      border: 'none',
      borderBottom: '1px solid #D8D8D8',
      '&::placeholder': {
        color: '#red',
      },
      '&:hover': {
        border: 'none',
        borderBottom: '1px solid #D8D8D8',
      },
      '&:focus': {
        border: 'none',
        borderBottom: '1px solid #D8D8D8',
        outline: 'none',
      },
    },
    nonEditable: {
      display: 'flex',
      height: '36px',
      alignItems: 'center',
      borderBottom: '1px solid #D8D8D8',
    },
    nonEditableIcon: {
      marginLeft: '12px',
      color: '#3A84FF',
    },
    secondary: {
      color: '#606060',
      marginTop: '24px',
      marginBottom: '12px',
    },
  })
);

interface EditableInputFormProps {
  label?: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdate?: () => void;
}

export default function EditableInputForm(props: EditableInputFormProps) {
  const {label, value, onChange, onUpdate} = props;
  const classes = useStyles();
  const [editable, setEditable] = useState<boolean>(false);

  const handleClickAway = () => {
    if (onUpdate && editable) onUpdate();
    setEditable(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.persist();
    if (event.keyCode === 13) {
      setEditable(false);
    }
  };

  return (
    <div className={classes.root}>
      {label && (
        <Typography variant="h6" className={classes.secondary}>
          {label}
        </Typography>
      )}
      <ClickAwayListener onClickAway={handleClickAway}>
        {editable ? (
          <input
            type="text"
            className={classes.input}
            value={value}
            onChange={onChange}
            onKeyUp={handleKeyUp}
          />
        ) : (
          <div className={classes.nonEditable}>
            <Typography variant="h4">
              {value}
            </Typography>
            <UpdateIcon
              className={classes.nonEditableIcon}
              fontSize="small"
              onClick={() => setEditable(true)}
            />
          </div>
        )}
      </ClickAwayListener>
    </div>
  );
}
