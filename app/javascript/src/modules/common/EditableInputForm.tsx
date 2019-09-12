import React, {useState, useEffect} from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Typography from '@material-ui/core/Typography';
import UpdateIcon from '@material-ui/icons/Create';

import * as cs from '../../constants/theme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '24px',
      height: 'fit-content', 
    },
    title: {
      width: '100%', 
      height: 'fit-content', 
      borderBottom: '1px solid #D8D8D8', 
      wordBreak: 'break-all',
    },
    input: {
      width: '100%',
      color: '#000000',
      lineHeight: '24px',
      fontFamily: cs.FONT.family,
      fontSize: cs.FONT.size.sm,
      fontWeight: cs.FONT.weight.regular,
      outline: 'none',
      border: 'none',
      borderBottom: '1px solid #D8D8D8',      
    },
    nonEditable: {
      display: 'flex',
      height: 'fit-content',
      alignItems: 'center',
    },
    nonEditableIcon: {
      fontSize: '15px', 
      marginLeft: '12px',
      color: '#3A84FF',
      marginBottom: '-3px',
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
  onChange?: (newValue: string) => void;
  onUpdate?: () => void;
}

export default function EditableInputForm(props: EditableInputFormProps) {
  const {label, value, onChange, onUpdate} = props;
  const classes = useStyles();
  const [editable, setEditable] = useState<boolean>(false);

  useEffect(() => {
    if (!editable) return;

    let editableObj = document.getElementById("editor");

    if (editableObj) {
      editableObj.addEventListener('blur', (event) => {
        if (onChange && event.target && (event.target as HTMLDivElement).innerText)
          onChange((event.target as HTMLDivElement).innerText);
      }, false);
  
      editableObj.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
          if (onChange && event.target && (event.target as HTMLDivElement).innerText)
            onChange((event.target as HTMLDivElement).innerText);

          setEditable(false);
        }
      });
    }

    return () => {

      if (editableObj) {
        editableObj.removeEventListener('input', (event) => {
        }, false);
    
        editableObj.removeEventListener('keyup', (event) => {
        });
      }   
    };
  }, [editable]);

  const handleClickAway = () => {
    if (onUpdate && editable) onUpdate();
    setEditable(false);
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
          <div 
            id="editor"
            className={classes.input}
            contentEditable={true}
            suppressContentEditableWarning={true}
          >
            {value}
          </div>
        ) : (
          <div className={classes.nonEditable}>
            <Typography variant="h5" className={classes.title}>
              {value}
              <UpdateIcon
                className={classes.nonEditableIcon}
                onClick={() => setEditable(true)}
              />
            </Typography>
          </div>
        )}
      </ClickAwayListener>
    </div>
  );
}
