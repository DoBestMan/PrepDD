import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Toolbar,
  Typography,
  Button
 } from '@material-ui/core'
 import MoreIcon from '@material-ui/icons/MoreHoriz'
 import DeleteIcon from '@material-ui/icons/DeleteForever'

const useToolbarStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    margin: '42px 31px 0px 31px'
  },
  grow: {
    flexGrow: 1
  },
  title: {
    color: '#2C2C2C',
    fontFamily: 'Montserrat',
    fontWeight: 'bold', 
    fontSize: '24px'
  },
  primaryButton: {
    height: '42px', 
    padding: '6px 24px 6px 24px',
    margin: '0px 12px 0px 12px', 
    background: '#3A84FF',
    borderRadius: '3px',
    fontFamily: 'Montserrat',
    fontWeight: 'bold', 
    fontSize: '12px',
    color: '#FFFFFF',
    textAlign: 'center',
    textTransform: 'capitalize'
  },
  more: {
    color: '#606060'
  }
}))


const TableToolbar = () => {
  const classes = useToolbarStyles()

  return (
    <Toolbar className={classes.root} disableGutters>
      <Typography className={classes.title} variant="h2">Team Management</Typography>
      <Button className={classes.primaryButton}>Add member</Button>
      <MoreIcon className={classes.more} fontSize="large" />
      <div className={classes.grow} />
      <DeleteIcon />
    </Toolbar>
  )
}

export default TableToolbar