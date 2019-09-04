import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import idx from 'idx';
import {gql} from 'apollo-boost';
import {useLazyQuery} from '@apollo/react-hooks';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  ClickAwayListener, 
  Typography, 
  Button, 
  Paper, 
  List, 
  ListItem, 
  ListItemText,
  TextField, 
} from '@material-ui/core';

import StyledItem from './StyledItem';
import DefaultUserImage from '../../../../../common/DefaultUserImage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative', 
    }, 
    flex: {
      display: 'flex', 
      alignItems: 'center', 
    },
    clickalbleArea: {
      height: '36px',
      flexGrow: 1, 
    },
    secondary: {
      color: '#606060', 
      marginTop: '24px', 
      marginBottom: '12px', 
    },
    addPanel: {
      position: 'absolute', 
      width: '280px', 
      top: '33px', 
      left: '0px',
      padding: '12px 24px 18px', 
      backgroundColor: '#FFFFFF',
      border: '2px solid #D8D8D8',
      borderRadius: '3px', 
      zIndex: 1, 
    }, 
    input: {
      display: 'block',
      width: '100%',
      marginTop: '6px',
      color: '#606060',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '12px',
      textTransform: 'none',
      '& label': {
        color: '#606060',
        fontFamily: 'Montserrat',
        fontWeight: 600,
        fontSize: '12px',
      },
      '&:selected': {
        color: '#3A84FF',
      },
      '& input::placeholder': {
        fontSize: '12px',
      },
      '& div': {
        width: '100%',
      },
    }, 
    addLink: {
      marginTop: '6px', 
      paddingLeft: '0px',
      paddingRight: '0px', 
    }
  })
);

export default function CompanyForm() {
  const classes = useStyles();
  const [searchString, setSearchString] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [openInvitePanel, setOpenInvitePanel] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      // Search companies...
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.secondary}>Issue to</Typography>
      <div className={classes.flex}>
        <StyledItem 
          label="G2 Crowd"
        />
        <div className={classes.clickalbleArea} onClick={() => setOpen(true)}/>
      </div>
      {open ? (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Paper
            className={classes.addPanel}
            elevation={0}
          >
            <TextField 
              className={classes.input}
              placeholder="Search company..."
              value={searchString}
              onChange={handleChange}
              onKeyUp={handleKeyUp}
            />
            <List component="div" aria-labelledby="Invite new">
              <ListItem 
                disableGutters
              >
                <ListItemText primary="G2 Crowd" style={{marginLeft: '12px'}} />
              </ListItem>
            </List>
            {openInvitePanel ? (
              <form>
                <Typography variant="h6" style={{marginTop: '24px'}}>New user and company</Typography>
                <TextField 
                  className={classes.input}
                  label="Email"
                  required
                />
                <TextField 
                  className={classes.input}
                  label="Company"
                  required
                />
                <Button type="submit" className={classes.addLink}>
                  Invite new user and company
                </Button>
              </form>
            ): (
              <Button 
                className={classes.addLink}
                onClick={() => setOpenInvitePanel(true)}
              >+ Add owner</Button>
            )}
          </Paper>
        </ClickAwayListener>
      ) : null}
    </div>
  )
}