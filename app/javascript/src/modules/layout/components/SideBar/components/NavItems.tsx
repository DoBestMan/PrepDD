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
      fontSize: '12px',
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
    },

    textFlow: {
      whiteSpace: 'nowrap',
      overflow: 'hidden', 
      textOverflow: 'ellipsis'
    }
  })
);

const mainPages = [
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
  },
  {
    title: 'Files', 
    href: '/app/files',
    icon: <LayersIcon />
  }
]

const adminPages = [
  {
    title: 'Profile',
    href: '/app/user', 
    icon: <Person />
  },
  {
    title: 'Team Management', 
    href: '/app/team', 
    icon: <SupervisorAccount />
  },
  {
    title: 'Company Settings', 
    href: '/app/company', 
    icon: <Settings />
  },
  {
    title: 'Billing', 
    href: '/app/billing', 
    icon: <Cached />
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
      { mainPages.map(item => (
          <ListItem 
            key={item.title}
            className={classes.item} 
            activeclassname={classes.active}
            component={CustomerLink}
            to={item.href}
            disableGutters
          >
            <div className={classes.icon}>
              {item.icon}
            </div>
            <div className={clsx(classes.textFlow, !open && classes.invisible)}>{item.title}</div>
          </ListItem>
        ))
      }
    </React.Fragment>
  )
}

export const AdminListItems = (props: {open: boolean}) => {
  const {open} = props
  const classes = useStyles()

  return (
    <React.Fragment>
      { adminPages.map(item => (
          <ListItem 
            key={item.title}
            className={classes.item} 
            activeclassname={classes.active}
            component={CustomerLink}
            to={item.href}
            disableGutters
          >
            <div className={classes.icon}>
              {item.icon}
            </div>
            <div className={clsx(classes.textFlow, !open && classes.invisible)}>{item.title}</div>
          </ListItem>
        ))
      }
    </React.Fragment>
  )
}