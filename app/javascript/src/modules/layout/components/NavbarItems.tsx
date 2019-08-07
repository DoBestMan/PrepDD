import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import ListItemText from '@material-ui/core/ListItemText'
import AccessTime from '@material-ui/icons/AccessTime'
import ListAlt from '@material-ui/icons/ListAlt'
import CheckBox from '@material-ui/icons/CheckBox'
import LayersIcon from '@material-ui/icons/Layers'
import Person from '@material-ui/icons/Person'
import SupervisorAccount from '@material-ui/icons/SupervisorAccount'
import Settings from '@material-ui/icons/Settings'
import Cached from '@material-ui/icons/Cached'

import {
  StyledListItem, 
  StyledListItemIcon, 
  StyledListItemText,
  StyledListSubheader,
} from './styled'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block'
  },
  selected: {
    color: 'white'
  },
  selectedText: {
    fontFamily: 'Helvetica',
    fontWeight: 800, 
    fontSize: '15px',
    color: 'white'    
  },
  invisible: {
    display: 'none'
  }
}))

export const MainListItems = (props) => {
  const { open } = props
  const classes = useStyles()

  return (
    <React.Fragment>
      <StyledListItem button disableGutters>
        <StyledListItemIcon>
          <AccessTime />
        </StyledListItemIcon>
        <StyledListItemText 
          primary="Priority" 
          classes={{root: clsx(!open && classes.invisible)}}
        >
        </StyledListItemText>
      </StyledListItem>
      <StyledListItem 
        button 
        disableGutters 
        selected
      >
        <StyledListItemIcon>
          <ListAlt color="primary" classes={{colorPrimary: classes.selected}} />
        </StyledListItemIcon>
        <ListItemText 
          primary="Lists"
          classes={{root: clsx(!open && classes.invisible), primary: classes.selectedText}}
        >
        </ListItemText>
      </StyledListItem>
      <StyledListItem button disableGutters>
        <StyledListItemIcon>
          <CheckBox />
        </StyledListItemIcon>
        <StyledListItemText 
          primary="Tasks"
          classes={{root: clsx(!open && classes.invisible)}}
        >
        </StyledListItemText>
      </StyledListItem>
      <StyledListItem button disableGutters>
        <StyledListItemIcon>
          <LayersIcon />
        </StyledListItemIcon>
        <StyledListItemText 
          primary="Files"
          classes={{root: clsx(!open && classes.invisible)}}
        >
        </StyledListItemText>
      </StyledListItem>
    </React.Fragment>
  )
}

export const AdminListItems = (props) => {
  const {open} = props
  const classes = useStyles()

  return (
    <React.Fragment>
      <StyledListSubheader classes={{root: clsx(!open && classes.invisible)}}>ADMIN</StyledListSubheader>
      <StyledListItem button disableGutters>
        <StyledListItemIcon>
          <Person />
        </StyledListItemIcon>
        <StyledListItemText 
          primary="Profile"
          classes={{root: clsx(!open && classes.invisible)}}
        >
        </StyledListItemText>
      </StyledListItem>
      <StyledListItem button disableGutters>
        <StyledListItemIcon>
          <SupervisorAccount />
        </StyledListItemIcon>
        <StyledListItemText 
          primary="Team Management"
          classes={{root: clsx(!open && classes.invisible)}}
        >
        </StyledListItemText>
      </StyledListItem>
      <StyledListItem button disableGutters>
        <StyledListItemIcon>
          <Settings />
        </StyledListItemIcon>
        <StyledListItemText 
          primary="Company Settings"
          classes={{root: clsx(!open && classes.invisible)}}
        >
        </StyledListItemText>
      </StyledListItem>
      <StyledListItem button disableGutters>
        <StyledListItemIcon>
          <Cached />
        </StyledListItemIcon>
        <StyledListItemText 
          primary="Billing"
          classes={{root: clsx(!open && classes.invisible)}}
        >
        </StyledListItemText>
      </StyledListItem>
    </React.Fragment>
  )
}