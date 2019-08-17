import React, {useState, useEffect, useCallback} from 'react'
import clsx from 'clsx'
import {Theme, createStyles, makeStyles} from '@material-ui/core/styles'
import {
  Drawer,
  Typography,
  Card, 
  Grid
} from '@material-ui/core'

import InputForm from '../../../components/InputForm'
import Dropdown from '../../../components/Dropdown'

const panelWidth = 500

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      width: panelWidth,
      flexShrink: 0,
      color: '#606060',
      fontFamily: 'Montserrat',
      fontSize: '12px',
      fontWeight: 600,      
    },
    flex: {
      display: 'flex',
    },
    grow: {
      flexGrow: 1,
    },
    drawerHeader: {
      padding: '72px 31px 0px 31px',
      color: '#2C2C2C',
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: '24px',
      textTransform: 'capitalize'
    },
    drawerPaper: {
      width: panelWidth,
    },
    drawerSpacer: {
      marginTop: 64
    },
    form: {
      padding: '36px 31px 0px 31px', 
    },
  })
)

interface StateProps {
  fullName: string;
  email: string;
  team: string;
  role: string;
}

const teams = [
  { label: 'Finance', value: 'Finance'},
  { label: 'Legal', value: 'Legal'}, 
  { label: 'Equity', value: 'Equity'}
] 

const roles = [
  { value: 'Owner', label: 'Owner' },
  { value: 'Admin', label: 'Admin' }, 
  { value: 'Member', label: 'Member' }
]

export default function AddMemberPane(props: {open: boolean;}) {
  const {open} = props
  const classes = useStyles()
  const [state, setState] = useState<StateProps>({
    fullName: '', 
    email: '',
    team: '', 
    role: '' 
  })

  const handleChange = useCallback(
    event => {
      const {name, value} = event.target;

      setState(state => ({...state, [name]: value}));
    },
    [setState]
  );

  return (
    <Drawer
      className={classes.root}
      variant="persistent"
      anchor="right"
      open={props.open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerSpacer} />
      <Typography className={classes.drawerHeader} variant="h2">
        Add new member
      </Typography>
      <Card className={classes.form} elevation={0}>
        <form autoComplete="off">
          <Grid container spacing={2}>
            <Grid item md={6}>
              <InputForm
                value={state.fullName}
                label="Full name"
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
              />              
            </Grid>
            <Grid item md={6}>
              <InputForm
                value={state.email}
                label="Email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={6}>
              <p>Team</p>
              <Dropdown options={teams} placeholder="Select all teams" />
            </Grid>
            <Grid item md={6}>
              <p>Role</p>
              <Dropdown options={roles} placeholder="Select Role" />
            </Grid>
          </Grid>
        </form>
      </Card>
    </Drawer>
  )
}