import React, {useEffect} from 'react';
import clsx from 'clsx';
import idx from 'idx';
import axios from 'axios';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
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
  Typography,
} from '@material-ui/core';
import CameraIcon from '@material-ui/icons/CameraAlt';
import UploadIcon from '@material-ui/icons/CloudUpload';

import InputForm from '../../../../components/InputForm';
import CheckBox from './components/CheckBox';

import { useCurrentUser } from '../../../../graphql/queries/CurrentUser'
import { useUpdateUserPassword } from '../../../../graphql/mutations/UpdateUserPassword'
import { useUpdateUserData } from '../../../../graphql/mutations/UpdateUserData'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      paddingTop: '36px',
    },
    invisible: {
      display: 'none',
    },
    profilePhoto: {
      width: '120px',
      height: '120px',
      position: 'relative',
    },
    photo: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
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
      left: '0px',
    },
    uploadLabel: {
      marginTop: '15px',
      textAlign: 'center',
      color: 'white',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '12px',
    },
    profile: {
      padding: '0px 36px 0px 36px',
      fontFamily: 'Montserrat',
      fontSize: '12px',
      color: '#606060',
      lineHeight: '20px',
    },
    passwordForm: {
      minWidth: '250px', 
      paddingLeft: '36px'
    },
    passwordFormTitle: {
      color: '#606060',
      fontFamily: 'Montserrat',
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: '20px',
    },
    controlLabel: {
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: '12px',
      color: '#2C2C2C',
      lineHeight: '20px',
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
      fontSize: '12px',
    },
    tableCell: {
      padding: '12px 0px 12px 0px',
      color: '#2C2C2C',
      fontFamily: 'Montserrat', 
      fontSize: '12px', 
      fontWeight: 600,
    },
    flex: {
      display: 'flex',
    },
    defaultPhoto: {
      display: 'flex', 
      width: '120px', 
      height: '120px',
      border: '2px dashed #D8D8D8',
      borderRadius: '50%', 
      alignItems: 'center',
      justifyContent: 'center'
    }, 
    defaultPhotoName: {
      color: '#D8D8D8', 
      fontFamily: 'Montserrat', 
      fontSize: '12px', 
      fontWeight: 'bold',
      textAlign: 'center'
    }
  })
);

interface StateType {
  email: string;
  fullName: string;
  displayName: string;
  profile_url: string;
  oldPassword: string;
  password: string;
  confirmPassword: string;
  hasUppercase: boolean;
  hasSpecialChar: boolean;
  hasEightChar: boolean;
}

export default function ProfilePane(props: {value?: number; index?: number}) {
  const {value, index} = props;
  const classes = useStyles();
  const [state, setState] = React.useState<StateType>({
    email: '',
    fullName: '',
    displayName: '',
    profile_url: '', 
    oldPassword: '',
    password: '',
    confirmPassword: '',
    hasUppercase: false,
    hasSpecialChar: false,
    hasEightChar: false,
  });
  const [show, setShow] = React.useState<boolean>(false);

  const { loading, data } = useCurrentUser({})

  const [updateUserPassword] = useUpdateUserPassword({ 
    oldPassword: state.oldPassword, 
    password: state.password
  })

  const [updateUserData] = useUpdateUserData({
    fullName: state.fullName, 
    displayName: state.displayName, 
    email: state.email
  })

  useEffect(() => {
    const currentUser = idx(data, data => data.currentUser.user);

    if (loading || !currentUser) return;

    setState({
      ...state, 
      email: currentUser.email,
      fullName: currentUser.fullName, 
      displayName: currentUser.displayName || currentUser.fullName.split(' ')[0], 
      profile_url: currentUser.profileUrl as string
    })
  }, [idx(data, data => data.currentUser.user)])

  const handleChange = React.useCallback(
    event => {
      const {name, value} = event.target;

      setState(state => ({...state, [name]: value}));
      if (name == 'password') {
        if (value.match(/[A-Z]/)) {
          setState(state => ({...state, hasUppercase: true}));
        } else {
          setState(state => ({...state, hasUppercase: false}));
        }

        if (value.length >= 8) {
          setState(state => ({...state, hasEightChar: true}));
        } else {
          setState(state => ({...state, hasEightChar: false}));
        }

        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)) {
          setState(state => ({...state, hasSpecialChar: true}));
        } else {
          setState(state => ({...state, hasSpecialChar: false}));
        }
      }
    },
    [setState]
  );

  const handleChangePassword = () => {
    if (state.password !== state.confirmPassword) {
      alert("Password is not matched")
      setState(state => ({
        ...state, 
        confirmPassword: ''
      }))
      return
    }
    if (!state.hasEightChar || !state.hasSpecialChar || !state.hasUppercase) {
      alert("Password is invalid")
      setState(state => ({
        ...state, 
        confirmPassword: ''
      }))
      return      
    }

    updateUserPassword()
    setState(state => ({
      ...state, 
      oldPassword: '',
      password: '', 
      confirmPassword: ''
    }))
  }

  const handleChangeDetails = () => {
    updateUserData()
  }

  const handleOpenFile = () => {
    const fileInstance = document.getElementById("file-input")

    if (fileInstance) {
      fileInstance.click()
    }
  }

  const handleChangePhoto = (event: React.SyntheticEvent<HTMLInputElement>) => {
    event.persist()
    const {
      currentTarget: { validity, files}
    } = event
    const currentUser = idx(data, data => data.currentUser.user)

    if (validity.valid && files && currentUser) {
      const user_data = new FormData()
      user_data.append('profile_picture', files[0])
      user_data.append('id', currentUser.id)

      axios.post("/api/update_user_profile", user_data, {
          headers: {
            'x-api-key': 'jKXFpXpMXYeeI0aCPfh14w'
          },
      }).then(res => {
        setState({
          ...state, 
          profile_url: res.data.profile_url
        })
      })
    }
  }

  return (
    <Paper
      className={clsx(classes.root, value !== index && classes.invisible)}
      aria-labelledby="Personal Information"
      elevation={0}
    >
      <div
        className={classes.profilePhoto}
        onMouseOver={() => setShow(true)}
        onMouseOut={() => setShow(false)}
      >
        { 
          state.profile_url ?
          <img src={state.profile_url} className={classes.photo} /> : (
            <div className={classes.defaultPhoto}>
              <div className={classes.defaultPhotoName}>
                <UploadIcon style={{fontSize: '48px'}} />
                <br />
                <span>Upload photo</span>
              </div>
            </div>
          )
        }
        <div 
          className={clsx(classes.uploadArea, !show && classes.invisible)}
          onClick={handleOpenFile}
        >
          <div className={classes.uploadLabel}>
            <CameraIcon fontSize="small" />
            <br />
            Update
          </div>
          <input 
            id="file-input" 
            className={classes.invisible} 
            type="file" 
            onChange={e => handleChangePhoto(e)}
          />
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
                onBlur={handleChangeDetails}
              />
            </Grid>
            <Grid item md={6}>
              <InputForm
                value={state.displayName}
                label="Display name"
                name="displayName"
                placeholder="Display Name"
                onChange={handleChange}
                onBlur={handleChangeDetails}
              />
            </Grid>
            <Grid item md={12}>
              <InputForm
                value={state.email}
                label="Email address"
                name="email"
                placeholder="example.123@gmail.com"
                onChange={handleChange}
                onBlur={handleChangeDetails}
              />
            </Grid>
            <Grid item md={12}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHead}>
                      Company(s)
                    </TableCell>
                    <TableCell className={classes.tableHead}>Team(s)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody >
                  { data && data.currentUser && data.currentUser.user && data.currentUser.user.companies && 
                    data.currentUser.user.companies.map(company => (
                    <TableRow key={company.name}>
                      <TableCell className={classes.tableCell}>
                        <div className={classes.flex}>
                          <div>{company.name}</div>                        
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        { (company.teams.length > 0) ?
                          company.teams.map(team => team.name).join(', ') :
                          "No Teams"
                        }
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
        <Typography
          className={classes.passwordFormTitle}
          variant="h6"
          gutterBottom
        >
          Password must contain
        </Typography>
        <CheckBox
          checked={state.hasUppercase}
          label="At least 1 uppercase letter"
        />
        <CheckBox
          checked={state.hasSpecialChar}
          label="At least 1 special character"
        />
        <CheckBox
          checked={state.hasEightChar}
          label="At least 8 total characters"
        />

        <InputForm
          value={state.oldPassword}
          label="Current password"
          name="oldPassword"
          type="password"
          placeholder="Current password"
          onChange={handleChange}
          style={{marginTop: '24px', marginBottom: '24px'}}
        />
        <InputForm
          value={state.password}
          label="New Password"
          name="password"
          type="password"
          placeholder="New password"
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
        <Button 
          className={classes.primaryButton} variant="contained" 
          onClick={handleChangePassword}
          fullWidth
        >
          Update password
        </Button>
      </Card>
    </Paper>
  );
}
