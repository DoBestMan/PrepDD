import React from 'react';
import clsx from 'clsx';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add'

import { MainListItems, AdminListItems } from './components/NavItems'
import StyledButton from './components/StyledButton';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    mark: {
      fontFamily: 'Helvetica',
      fontSize: '18px',
      fontWeight: 800, 
      color: '#0E3B5C',
      lineHeight: '48px'
    },
    primaryColor: {
      color: '#3A84FF'
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
    paddingOpen: {
      paddingLeft: 24,
      paddingRight: 24
    },
    paddingClose: {
      paddingLeft: 18, 
      paddingRight: 18
    },
    marginOpen: {
      margin: '15px 24px 0px 24px'
    },
    marginClose: {
      margin: '15px 18px 0px 18px'
    },
  })
);

export default function SideBar(props: {open: boolean}) {
  const { open } = props;
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <List disablePadding>
        <ListItem className={clsx(classes.paddingOpen, !open && classes.paddingClose)} disableGutters>
          <ListItemIcon>
            <img src="../assets/img/logos/prepdd-logo.svg" alt="PrepDD"/>
          </ListItemIcon>
          <ListItemText>
            <span className={classes.mark}>
              PREP<span className={classes.primaryColor}>DD</span>
            </span>
          </ListItemText>
        </ListItem>
        <ListItem className={clsx(classes.paddingOpen, !open && classes.paddingClose)} disableGutters>
          {open ?
            <StyledButton variant="outlined" color="primary">Create</StyledButton> :
            <StyledButton variant="outlined" color="primary" style={{height: "36px"}}>
              <AddIcon />
            </StyledButton>
          }
        </ListItem>          
        <MainListItems open={open} />
      </List>
      <Divider className={clsx(classes.marginOpen, !open && classes.marginClose)}/>
      <List disablePadding>
        <AdminListItems open={open} />
      </List>
    </Drawer>
  );
}
    