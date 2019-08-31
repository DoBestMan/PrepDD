import React, {useState} from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Drawer, 
  Button,
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Paper, 
  ClickAwayListener
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/PlaylistAdd';
import TaskIcon from '@material-ui/icons/AddBox';
import TemplateIcon from '@material-ui/icons/LineWeight';

import {MainListItems, AdminListItems} from './components/NavItems';

const PrepddLogo = require('images/logos/prepdd-logo.svg');

const drawerWidth = 210;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mark: {
      fontFamily: 'Montserrat',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#0E3B5C',
      lineHeight: '48px',
    },
    primaryColor: {
      color: '#3A84FF',
    },
    drawerPaper: {
      boxSizing: 'border-box',
      width: drawerWidth,
      background: '#FFFFFF',
      border: '1px solid #D8D8D8',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      boxSizing: 'border-box',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: '72px',
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    createMenu: {
      width: '250px', 
      position: 'fixed', 
      top: '81px', 
      left: '185px', 
      border: '2px solid #D8D8D8', 
      zIndex: 1, 
    },
    createMenuClose: {
      left: '55px'
    },
    paddingOpen: {
      paddingLeft: 24,
      paddingRight: 24,
    },
    paddingClose: {
      paddingLeft: 18,
      paddingRight: 18,
    },
    marginOpen: {
      margin: '15px 24px 15px 24px',
    },
    marginClose: {
      margin: '15px 18px 15px 18px',
    },
  })
);

interface SideBarProps {
  open: boolean;
  setShowNarrow(showNarrow: boolean): void;
}

const SideBar = (props: SideBarProps) => {
  const {open, setShowNarrow} = props;
  const classes = useStyles();
  const [openCreateMenu, setOpenCreateMenu] = useState<boolean>(false);

  const handleClickListCreate = () => {
    // history.push('/create/list');
    setOpenCreateMenu(false);
  }

  const handleClickTaskCreate = () => {
    // history.push('/create/task');
    setOpenCreateMenu(false);
  }

  const handleClickTemplateCreate = () => {
    // history.push('/create/template');
    setOpenCreateMenu(false);

  }

  return (
    <Drawer
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      variant="permanent"
      open={open}
      onMouseOver={() => setShowNarrow(true)}
      onMouseOut={() => setShowNarrow(false)}
    >
      <List disablePadding>
        <ListItem
          className={clsx(classes.paddingOpen, !open && classes.paddingClose)}
          disableGutters
        >
          <ListItemIcon>
            <img src={PrepddLogo} alt="PrepDD" />
          </ListItemIcon>
          <ListItemText>
            <span className={classes.mark}>
              PREP<span className={classes.primaryColor}>DD</span>
            </span>
          </ListItemText>
        </ListItem>
        <ListItem
          className={clsx(classes.paddingOpen, !open && classes.paddingClose)}
          disableGutters
        >
          <Button variant="outlined" onClick={() => setOpenCreateMenu(!openCreateMenu)}>
            {open ? 'Create' : <AddIcon /> }
          </Button>
          {openCreateMenu && (
            <Paper 
              className={clsx(
                classes.createMenu,
                !open && classes.createMenuClose
              )} 
              elevation={0} 
              square
            >
              <List component="div" aria-labelledby="Create Menu">
                <ListItem onClick={handleClickListCreate}>
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText primary="New List" />
                </ListItem>
                <ListItem onClick={handleClickTaskCreate}>
                  <ListItemIcon>
                    <TaskIcon />
                  </ListItemIcon>
                  <ListItemText primary="New task" />
                </ListItem>
                <ListItem onClick={handleClickTemplateCreate}>
                  <ListItemIcon>
                    <TemplateIcon />
                  </ListItemIcon>
                  <ListItemText primary="New template" />
                </ListItem>
              </List>
            </Paper>
          )}
        </ListItem>
        <MainListItems open={open} />
      </List>
      <Divider
        className={clsx(classes.marginOpen, !open && classes.marginClose)}
      />
      <List disablePadding>
        <AdminListItems open={open} />
      </List>
    </Drawer>
  );
}

export default SideBar;
// export default withRouter(SideBar);