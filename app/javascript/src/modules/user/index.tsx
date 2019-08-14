import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import Panel from '../../components/Panel'
import ProfilePane from './components/ProfilePane'
import NotificationPane from './components/NotificationPane'

const useStyle = makeStyles({
  root: {
    display: 'block',
    padding: `84px calc((100% - 1050px) / 2) 0px calc((100% - 1050px) / 2)`,
    height: 'calc(100vh - 73px)'
  },
  title: {
    color: '#2C2C2C',
    fontFamily: 'Montserrat',
    fontSize: '24px',
    fontWeight: 'bold'
  }
})

const labels = [
  'Personal Information', 
  'Notification Settings'
]

export default function Profile(props: {path: string}) {
  const classes = useStyle()

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h2">
        Profile
      </Typography>
      <Panel title="Profile" labels={labels}>
        <ProfilePane />
        <NotificationPane />
      </Panel>
    </div>
  )
}