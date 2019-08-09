import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

// import StyledTabs from '../../components/common/StyledTabs'
// import StyledTab from '../../components/common/StyledTab'

const useStyle = makeStyles({
  root: {
    display: 'block',
    padding: '84px 274px 0px 274px'
  },
  title: {
    color: '#2C2C2C',
    fontFamily: 'Montserrat',
    fontSize: '24px'
  }
})

export default function Profile(props: {path: string}) {
  const classes = useStyle()
  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h2">
        Profile
      </Typography>
    </div>
  )
}