import React from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Drawer, 
  List, 
  Divider, 
  Button,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import {MainListItems, AdminListItems} from './components/NavItems';
import StyledButton from './components/StyledButton';

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

export default function SideBar(props: SideBarProps) {
  const {open, setShowNarrow} = props;
  const classes = useStyles();

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
        <Button variant="outlined">
          {open ? "Create" : <AddIcon />}
        </Button>
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
}
