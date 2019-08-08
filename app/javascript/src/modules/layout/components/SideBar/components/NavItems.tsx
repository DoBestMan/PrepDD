import React from 'react'
import clsx from 'clsx'
import { Link } from '@reach/router';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import AccessTime from '@material-ui/icons/AccessTime'
import ListAlt from '@material-ui/icons/ListAlt'
import CheckBox from '@material-ui/icons/CheckBox'
import LayersIcon from '@material-ui/icons/Layers'
import Person from '@material-ui/icons/Person'
import SupervisorAccount from '@material-ui/icons/SupervisorAccount'
import Settings from '@material-ui/icons/Settings'
import Cached from '@material-ui/icons/Cached'

import StyledListSubheader from './StyledListSubheader';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'block'
    },
    invisible: {
      display: 'none'
    },
    item: {
      display: 'flex',
      padding: '9px 24px 9px 24px',
      color: '#2C2C2C',
      justifyContent: 'flex-start',
      textTransform: 'none',
      letterSpacing: 0,
      width: '100%',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '15px',
      '&$selected, &$selected:hover': {
        color: '#FFFFFF',
        background: '#3A84FF'
      },
      '&:hover': {
        background: '#EBF2FF'
      }
    },
    icon: {
      color: '#2C2C2C',
      width: 24,
      height: 24,
      display: 'flex',
      alignItems: 'center',
      marginRight: theme.spacing(1)
    },
    active: {
      color: '#FFFFFF',
      background: '#3A84FF',
      fontWeight: 'bold',
      '& $icon': {
        color: 'white'
      },
      '&:hover': {
        background: '#3A84FF'
      }
    }
  })
);

const MainPages = [
  {
    title: 'Priority', 
    href: '/app',
    icon: <AccessTime />
  },
  {
    title: 'Lists', 
    href: '/app/lists', 
    icon: <ListAlt />
  },
  {
    title: 'Tasks', 
    href: '/app/tasks', 
    icon: <CheckBox />
  }
]

const CustomerLink = React.forwardRef((props: any, ref: any) => (
  <Link 
    ref={ref}
    style={{ flexGrow: 1 }}
    {...props}
    getProps = {({ isCurrent }) => {
      return {
        className: isCurrent ? `${props.className} ${props.activeclassname}` : props.className
      }
    }}
  />
));

export const MainListItems = (props: {open: boolean}) => {
  const { open } = props
  const classes = useStyles({})

  return (
    <React.Fragment>
      <ListItem 
        className={classes.item} 
        activeclassname={classes.active}
        component={CustomerLink}
        to={'/app'}
        disableGutters
      >
        <div className={classes.icon}>
          <AccessTime />
        </div>
        <span className={clsx(!open && classes.invisible)}>Priority</span>
      </ListItem>
      <ListItem 
        className={classes.item} 
        activeclassname={classes.active}
        component={CustomerLink}
        to={'/app/list'}
        disableGutters
      >
        <div className={classes.icon}>
          <ListAlt />
        </div>
        <span className={clsx(!open && classes.invisible)}>Lists</span>
      </ListItem>
      <ListItem 
        className={classes.item} 
        activeclassname={classes.active}
        component={CustomerLink}
        to={'/app/tasks'}
        disableGutters
      >
        <div className={classes.icon}>
          <CheckBox />
        </div>
        <span className={clsx(!open && classes.invisible)}>Tasks</span>
      </ListItem>
      <ListItem 
        className={classes.item} 
        activeclassname={classes.active}
        component={CustomerLink}
        to={'/app/files'}
        disableGutters
      >
        <div className={classes.icon}>
          <LayersIcon />
        </div>
        <span className={clsx(!open && classes.invisible)}>Files</span>
      </ListItem>
    </React.Fragment>
  )
}

export const AdminListItems = (props: {open: boolean}) => {
  const {open} = props
  const classes = useStyles()

  return (
    <React.Fragment>
      <StyledListSubheader classes={{root: clsx(!open && classes.invisible)}}>ADMIN</StyledListSubheader>
      <ListItem 
        className={classes.item}
        activeclassname={classes.active} 
        component={CustomerLink}
        to={'/app/user'}
        disableGutters
      >
        <div className={classes.icon}>
          <Person />
        </div>
        <span className={clsx(!open && classes.invisible)}>Profile</span>
      </ListItem>
      <ListItem 
        className={classes.item}   
        activeclassname={classes.active}   
        component={CustomerLink}
        to={'/app/team'} 
        disableGutters
      >
        <div className={classes.icon}>
          <SupervisorAccount />
        </div>
        <span className={clsx(!open && classes.invisible)}>Team Management</span>
      </ListItem>
      <ListItem 
        className={classes.item}
        activeclassname={classes.active}
        component={CustomerLink}
        to={'/app/settings'}
        disableGutters>
        <div className={classes.icon}>
          <Settings />
        </div>
        <span className={clsx(!open && classes.invisible)}>Company Settings</span>
      </ListItem>
      <ListItem 
        className={classes.item} 
        activeclassname={classes.active}
        component={CustomerLink}
        to={'/app/bill'}
        disableGutters>
        <div className={classes.icon}>
          <Cached />
        </div>
        <span className={clsx(!open && classes.invisible)}>Billing</span>
      </ListItem>
    </React.Fragment>
  )
}