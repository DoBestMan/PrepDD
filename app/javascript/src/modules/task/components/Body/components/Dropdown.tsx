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
import {AllTemplates_templateLists} from '../../../../../graphql/queries/__generated__/AllTemplates';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: 'fit-content',
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
      minWidth: '100%',
    },
  })
);

interface DropdownProps {
  data: AllTemplates_templateLists[];
  listId: string;
  setListId: React.Dispatch<React.SetStateAction<string>>;
}

export default function Dropdown(props: DropdownProps) {
  const {data, listId, setListId} = props;
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = (newId: string) => {
    setListId(newId);
    setOpen(false);
  };

  const renderListName = () => {
    const selectList = data.find(item => item.id === listId);

    if (selectList) return selectList.name;
    return 'Select List';
  };

  return (
    <div className={classes.root}>
      <div className={classes.flex} onClick={() => setOpen(!open)}>
        <Typography variant="h2">{renderListName()}</Typography>
        <ArrowDownIcon fontSize="large" />
      </div>
      {open && (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Paper className={classes.paper} elevation={0} square>
            <List>
              {data &&
                data.map((item: AllTemplates_templateLists) => {
                  return (
                    <ListItem
                      key={item.id}
                      onClick={() => handleClick(item.id)}
                    >
                      <ListItemText primary={item.name} />
                    </ListItem>
                  );
                })}
              {(!data || !data.length) && (
                <ListItem>
                  <ListItemText primary="No available lists" />
                </ListItem>
              )}
            </List>
          </Paper>
        </ClickAwayListener>
      )}
    </div>
  );
}
