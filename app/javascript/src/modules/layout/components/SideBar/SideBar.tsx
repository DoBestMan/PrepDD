import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
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
  ClickAwayListener,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/PlaylistAdd';
import TaskIcon from '@material-ui/icons/AddBox';
import TemplateIcon from '@material-ui/icons/LineWeight';

import {MainListItems, AdminListItems} from './components/NavItems';
import {useGlobalState} from '../../../../store';
import {isSuperAdmin} from '../../../../helpers/roleHelpers';

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
    logo: {
      display: 'flex', 
      marginTop: '24px', 
      marginBottom: '12px', 
    },
    createMenu: {
      width: '250px',
      position: 'fixed',
      top: '85px',
      left: '185px',
      border: '1px solid #D8D8D8',
      zIndex: 1,
    },
    createMenuClose: {
      left: '55px',
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

const SideBar = (props: any) => {
  const {open, setShowNarrow, history} = props;
  const classes = useStyles();
  const [openCreateMenu, setOpenCreateMenu] = useState<boolean>(false);
  const {state} = useGlobalState();

  const role = () => {
    if (state && state.currentUser && state.currentUser.roles) {
      const findRole = state.currentUser.roles.find(role => role.companyId === state.selectedCompany);

      return findRole ? findRole.name : 'User';
    }
    return 'User';
  };

  const handleClickListCreate = () => {
    history.push('/create/list');
    setOpenCreateMenu(false);
  };

  const handleClickTaskCreate = () => {
    history.push('/create/task');
    setOpenCreateMenu(false);
  };

  const handleClickTemplateCreate = () => {
    history.push('/create/template');
    setOpenCreateMenu(false);
  };

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
      <div className={clsx(classes.logo, classes.paddingOpen, !open && classes.paddingClose)}>
        <img src={PrepddLogo} alt="PrepDD" style={{marginRight: '12px'}}/>
        <span className={classes.mark}>
          PREP<span className={classes.primaryColor}>DD</span>
        </span>
      </div>
      <div className={clsx(classes.paddingOpen, !open && classes.paddingClose)}>
        <Button 
          variant="outlined" 
          onClick={() => setOpenCreateMenu(!openCreateMenu)}
          style={{width: '100%'}}
        >
          {open ? "Create" : <AddIcon />}
        </Button>
        {openCreateMenu && (
          <ClickAwayListener onClickAway={() => setOpenCreateMenu(false)}>
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
                {isSuperAdmin(role()) && (
                  <ListItem onClick={handleClickTemplateCreate}>
                    <ListItemIcon>
                      <TemplateIcon />
                    </ListItemIcon>
                    <ListItemText primary="New template" />
                  </ListItem>
                )}
              </List>
            </Paper>
          </ClickAwayListener>
          
        )}
      </div>
      <List disablePadding style={{marginTop: '12px'}}>
        <MainListItems open={open} />
      </List>
      <Divider className={clsx(classes.marginOpen, !open && classes.marginClose)} />
      <List disablePadding>
        <AdminListItems open={open} />
      </List>
    </Drawer>
  );
};

export default withRouter(SideBar);
