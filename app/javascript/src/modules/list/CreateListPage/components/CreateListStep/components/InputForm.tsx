import React, {useState} from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Typography from '@material-ui/core/Typography';

import UpdateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '48px',
      color: '#606060',
      fontFamily: 'Montserrat',
      fontSize: '12px',
      textTransform: 'capitalize',
    },
    input: {
      width: '100%',
      height: '36px',
      color: '#000000',
      fontFamily: 'Montserrat',
      fontSize: '24px',
      fontWeight: 'bold',
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
    nonEditableInput: {
      color: '#000000',
      fontFamily: 'Montserrat',
      fontSize: '24px',
      fontWeight: 600,
    },
    nonEditableIcon: {
      marginLeft: '12px',
      color: '#3A84FF',
    },
  })
);

interface InputFormProps {
  label: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputForm(props: InputFormProps) {
  const {label, value, onChange} = props;
  const classes = useStyles();
  const [editable, setEditable] = useState<boolean>(false);

  const handleClickAway = () => {
    setEditable(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.persist();
    if (event.keyCode === 13) {
      setEditable(false);
    }
  };

  console.log("Label, Value: ", label, value);
  return (
    <div className={classes.root}>
      <p style={{marginBottom: '3px'}}>{label}</p>
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
            <Typography className={classes.nonEditableInput} variant="h6">
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
