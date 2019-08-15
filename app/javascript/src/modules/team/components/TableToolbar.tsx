import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Toolbar,
  Typography,
  Button
 } from '@material-ui/core'
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
  deleteIcon: {
    display: 'flex', 
    width: '42px', 
    height: '42px',
    alignItems: 'center', 
    justifyContent: 'center', 
    '&:hover': {
      cursor: 'pointer', 
      border: '1px solid #3A84FF',
      borderRadius: '3px'
    }
  }
}))


const TableToolbar = (props: {selected: number;}) => {
  const { selected } = props
  const classes = useToolbarStyles()

  console.log(selected)
  return (
    <Toolbar className={classes.root} disableGutters>
      <Typography className={classes.title} variant="h2">Team Management</Typography>
      <Button className={classes.primaryButton}>Add member</Button>
      <div className={classes.grow} />
      { (selected > 0) && 
        <div className={classes.deleteIcon}>
          <DeleteIcon />
        </div>
      }
    </Toolbar>
  )
}

export default TableToolbar