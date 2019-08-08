import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import PersonAdd from '@material-ui/icons/PersonAdd'
import AttachFile from '@material-ui/icons/AttachFile'
import GetApp from '@material-ui/icons/GetApp'
import Delete from '@material-ui/icons/DeleteForever'
import More from '@material-ui/icons/MoreHoriz'

const useToolbarStyles = makeStyles(theme => ({
  root: {
    padding: '12px 12px 12px 24px',
    borderBottom: '1px solid #D8D8D8'
  },
  grow: {
    flexGrow: 1
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
    fontFamily: 'Helvetica',
    fontSize: '18px',
    fontWeight: 800,
    color: '#2C2C2C'
  },
}))


const EnhancedTableToolbar = () => {
  const classes = useToolbarStyles()

  return (
    <Toolbar className={classes.root}>
      <div className={classes.title}>
        Lists
      </div>
      <div className={classes.grow} />
      <div className={classes.actions}>
        <IconButton aria-label="filter list">
          <PersonAdd />
        </IconButton>
        <IconButton aria-label="filter list">
          <AttachFile />
        </IconButton>
        <IconButton aria-label="filter list">
          <GetApp />
        </IconButton>
        <IconButton aria-label="filter list">
          <Delete />
        </IconButton>
        <IconButton aria-label="filter list">
          <More />
        </IconButton>
      </div>
    </Toolbar>
  )
}

export default EnhancedTableToolbar