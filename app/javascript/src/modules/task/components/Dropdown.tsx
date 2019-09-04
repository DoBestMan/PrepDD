import React, {useState} from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  ClickAwayListener, 
  Typography,
  Paper, 
  List, 
  ListItem, 
  ListItemText,
} from '@material-ui/core';
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';
import {
  AllTemplates_templateLists, 
} from '../../../graphql/queries/__generated__/AllTemplates'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      position: 'relative', 
    },
    flex: {
      display: 'flex', 
      alignItems: 'center', 
    }, 
    paper: {
      position: 'absolute', 
      top: '33px', 
      left: '0px', 
      border: '1px solid #D8D8D8',
      minWidth: '155px', 
    }
  })
);

interface DropdownProps {
  data: AllTemplates_templateLists[];
  selected: AllTemplates_templateLists | null;
  setSelected: React.Dispatch<React.SetStateAction<AllTemplates_templateLists | null>>;
}

export default function Dropdown(props: DropdownProps) {
  const {data, selected, setSelected} = props;
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = (newValue: AllTemplates_templateLists) => {
    setSelected(newValue);
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <div className={classes.flex} onClick={() => setOpen(!open)}>
        <Typography variant="h2">
          {selected ? selected.name : "Select List"}
        </Typography>
        <ArrowDownIcon fontSize="large" />
      </div>
      {open && (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Paper
            className={classes.paper}
            elevation={0}
            square
          >
            <List>
              {data && data.map((item: AllTemplates_templateLists) => {
                return (
                  <ListItem onClick={() => handleClick(item)}>
                    <ListItemText primary={item.name} />
                  </ListItem>
                )
              })}
            </List>
          </Paper>
        </ClickAwayListener>
      )}
    </div>
  )
}