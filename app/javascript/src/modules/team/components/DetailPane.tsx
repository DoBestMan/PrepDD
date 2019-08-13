import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import CreateIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/DeleteForever'
import CloseIcon from '@material-ui/icons/Close'

const panelWidth=594

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      width: panelWidth, 
      flexShrink: 0, 
    },
    flex: {
      display: 'flex'
    }, 
    grow: {
      flexGrow: 1
    },
    drawer: {
      display: 'flex', 
      padding: '42px 31px 0px 31px'
    },
    drawerPaper: {
      width: panelWidth
    },
    drawerSpacer: {
      marginTop: 73
    },
    round: {
      borderRadius: '50%'
    },
    title: {
      marginLeft: '12px',
      marginRight: '6px',
      color: '#2C2C2C',
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: '24px'
    }
  })
)

export default function DetailPane(props: {open: boolean}) {
  const { open } = props
  const classes = useStyles()

  return (
    <Drawer
      className={classes.root}
      variant="persistent"
      anchor="right"
      open={props.open}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerSpacer} />
      <div className={classes.drawer}>
        <img
          className={classes.round}
          src="../assets/img/photos/Alana.jpg"
          width="30"
          height="30"
          alt="Alana"
        />
        <Typography className={classes.title} variant="h2">
          Guy Number 1
        </Typography>
        <CreateIcon />
        <div className={classes.grow} />
        <DeleteIcon />
        <CloseIcon />
      </div>
    </Drawer>
  )
}