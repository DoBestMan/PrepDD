import React, { useEffect } from 'react'
import clsx from 'clsx'
import idx from 'idx'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import {
  Paper,
  Card,
  Grid,
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell,
  Button, 
  Typography
} from '@material-ui/core'
import CameraIcon from '@material-ui/icons/CameraAlt'

import InputForm from './components/InputForm'
import CheckBox from './components/CheckBox'

import { getCurrentUser } from '../../../../graphql/queries/auth'

const rows = [
  {
    company: 'G2 Crowd', 
    team: ['Finance', 'Legal', 'Equity']
  }, 
  {
    company: 'PrepDD', 
    team: ['M&A', 'Debt']
  }
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      paddingTop: '36px'
    },
    invisible: {
      display: 'none'
    },
    profilePhoto: {
      position: 'relative'
    },
    photo: {
      width: '120px', 
      height: '120px',
      borderRadius: '50%'
    },
    uploadArea: {
      position: 'absolute', 
      width: '120px',
      height: '60px',
      backgroundColor: 'rgba(48, 48, 48, 0.5)',
      borderBottomLeftRadius: '120px', 
      borderBottomRightRadius: '120px',
      clip: 'rect(12px, 120px, 60px, 0px)',
      top: '60px',
      left: '0px'
    },
    uploadLabel: {
      marginTop: '15px',
      textAlign: 'center',
      color: 'white',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '12px'
    },
    profile: {
      padding: '0px 36px 0px 36px', 
      fontFamily: 'Montserrat',
      fontSize: '12px',
      color: '#606060',
      lineHeight: '20px'
    },
    passwordForm: {
      width: '493px', 
      paddingLeft: '36px'
    },
    passwordFormTitle: {
      color: '#606060',
      fontFamily: 'Montserrat',
      fontSize: '12px',
      fontWeight: 600, 
      lineHeight: '20px'      
    },
    controlLabel: {
      fontFamily: 'Montserrat',
      fontWeight: 'bold', 
      fontSize: '12px',
      color: '#2C2C2C',
      lineHeight: '20px'    
    },
    primaryButton: {
      height: '42px', 
      padding: '12px 36px 12px 36px',
      background: '#3A84FF',
      borderRadius: '3px',
      fontFamily: 'Montserrat',
      fontWeight: 'bold', 
      fontSize: '12px',
      color: '#FFFFFF',
      textAlign: 'center',
      textTransform: 'capitalize',
      '&:hover': {
        opacity: 0.7,
        background: '#3A84FF'
      }
    },
    tableHead: {
      paddingLeft: 0, 
      paddingRight: 0,
      color: '#606060', 
      fontFamily: 'Montserrat', 
      fontWeight: 600, 
      fontSize: '12px'
    },
    tableCell: {
      padding: '12px 0px 12px 0px',
      color: '#2C2C2C',
      fontFamily: 'Montserrat', 
      fontSize: '12px', 
      fontWeight: 600,
    }, 
    flex: {
      display: 'flex'
    }
  })
)

interface StateType {
  fullName: string;
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
  hasUppercase: boolean;
  hasSpecialChar: boolean;
  hasEightChar: boolean;
}

export default function ProfilePane(props: {value?: number, index?: number}) {
  const { value, index } = props
  const classes = useStyles()
  const [state, setState] = React.useState<StateType>({
    fullName: '', 
    displayName: '', 
    email: '', 
    password: '', 
    confirmPassword: '', 
    hasUppercase: false, 
    hasSpecialChar: false, 
    hasEightChar: false
  })
  const [show, setShow] = React.useState<boolean>(false)

  const { loading, data } = getCurrentUser({})

  useEffect(() => {
    const currentUser = idx(data, data => data.currentUser.user)

    if (loading || !currentUser) return

    console.log(loading, currentUser)

    setState({
      ...state, 
      fullName: currentUser.fullName, 
      displayName: currentUser.displayName, 
      email: currentUser.email
    })
  }, [loading])

  const handleChange = React.useCallback(event => {
    const { name, value } = event.target

    setState(state => ({...state, [name]: value}))
    if (name == 'password') {
      if (value.match(/[A-Z]/)) {
        setState(state => ({...state, hasUppercase: true}))
      } else {
        setState(state => ({...state, hasUppercase: false}))
      }

      if (value.length >= 8) {
        setState(state => ({...state, hasEightChar: true}))
      } else {
        setState(state => ({...state, hasEightChar: false}))
      }

      if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)) {
        setState(state => ({...state, hasSpecialChar: true}))
      } else {
        setState(state => ({...state, hasSpecialChar: false}))
      }
    }    
  }, [setState])

  const handleClickAway = () => setShow(false)

  return (
    <Paper
      className={clsx(classes.root, (value !== index) && classes.invisible)}
      aria-labelledby="Personal Information"
      elevation={0}
    >      
      <div 
        className={classes.profilePhoto}
        onMouseOver={() => setShow(true)}
        onMouseOut={() => setShow(false)}
      >
        <img className={classes.photo} src="../assets/img/photos/Alana.jpg" alt="Alana" />
        <div className={clsx(classes.uploadArea, !show && classes.invisible)}>
          <div className={classes.uploadLabel}>
            <CameraIcon fontSize="small" />
            <br />
            Update
          </div>
        </div>
      </div>
      
      <Card className={classes.profile} elevation={0}>
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
                value={state.displayName}
                label="Display name"
                name="displayName"
                placeholder="Display Name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={12}>
              <InputForm
                value={state.email}
                label="Email address"
                name="email"
                placeholder="example.123@gmail.com"
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={12}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHead}>Company(s)</TableCell>
                    <TableCell className={classes.tableHead}>Team(s)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody >
                { rows.map(row => (
                  <TableRow key={row.company}>
                    <TableCell className={classes.tableCell}>
                      <div className={classes.flex}>
                        { row.company === 'G2 Crowd' ?
                          <img src="../assets/img/logos/g2-logo.svg" width="18" height="18" alt="G2" /> :
                          <img src="../assets/img/logos/prepdd-logo.svg" width="18" height="18" alt="PREPDD" />
                        }                      
                        <div style={{marginLeft: '7px'}}>{row.company}</div>                        
                      </div>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {row.team.join(', ')}
                    </TableCell>
                  </TableRow>
                ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </form>
      </Card>
      <Card className={classes.passwordForm} elevation={0}>
        <Typography className={classes.passwordFormTitle} variant="h6" gutterBottom>
          Password must contain
        </Typography>
        <CheckBox checked={state.hasUppercase} label="At least 1 uppercase letter" />
        <CheckBox checked={state.hasSpecialChar} label="At least 1 special character" />
        <CheckBox checked={state.hasEightChar} label="At least 8 total characters" />
        
        <InputForm
          value={state.password}
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          style={{marginTop: '24px', marginBottom: '24px'}}
        />
        <InputForm
          value={state.confirmPassword}
          label="Confirm password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={handleChange}
          style={{marginBottom: '36px'}}
        />
        <Button className={classes.primaryButton} variant="contained">
          Update password
        </Button>
      </Card>
    </Paper>
  )
}