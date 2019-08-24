import React, {useEffect} from 'react';
import clsx from 'clsx';
import axios from 'axios';
import ReactDropzone, { useDropzone } from 'react-dropzone';
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

import { useGlobalState } from '../../../../store'
import { useUpdateUserPassword } from '../../../../graphql/mutations/UpdateUserPassword'
import { useUpdateUserData } from '../../../../graphql/mutations/UpdateUserData'
import { CurrentUser_currentUser_user_teams } from '../../../../graphql/queries/__generated__/CurrentUser'

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
      justifyContent: 'center',
      '&:focus': {
        outline: 'none'
      }
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

interface UserType {
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
  const { state, dispatch } = useGlobalState()
  const [user, setUser] = React.useState<UserType>({
    email: state.currentUser.email as string,
    fullName: state.currentUser.fullName as string,
    displayName: state.currentUser.displayName as string,
    profile_url: state.currentUser.profileUrl as string, 
    oldPassword: '',
    password: '',
    confirmPassword: '',
    hasUppercase: false,
    hasSpecialChar: false,
    hasEightChar: false,
  });
  const [show, setShow] = React.useState<boolean>(false);

  const [updateUserPassword] = useUpdateUserPassword({ 
    oldPassword: user.oldPassword, 
    password: user.password
  })

  const [updateUserData] = useUpdateUserData({
    fullName: user.fullName, 
    displayName: user.displayName, 
    email: user.email
  })

  const handleChange = React.useCallback(
    event => {
      const {name, value} = event.target;

      setUser(user => ({...user, [name]: value}));
      if (name == 'password') {
        if (value.match(/[A-Z]/)) {
          setUser(user => ({...user, hasUppercase: true}));
        } else {
          setUser(user => ({...user, hasUppercase: false}));
        }

        if (value.length >= 8) {
          setUser(user => ({...user, hasEightChar: true}));
        } else {
          setUser(user => ({...user, hasEightChar: false}));
        }

        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)) {
          setUser(user => ({...user, hasSpecialChar: true}));
        } else {
          setUser(user => ({...user, hasSpecialChar: false}));
        }
      }
    },
    [setUser]
  );

  const handleChangePassword = () => {
    if (user.password !== user.confirmPassword) {
      alert("Password is not matched")
      setUser(user => ({
        ...user, 
        confirmPassword: ''
      }))
      return
    }
    if (!user.hasEightChar || !user.hasSpecialChar || !user.hasUppercase) {
      alert("Password is invalid")
      setUser(user => ({
        ...user, 
        confirmPassword: ''
      }))
      return      
    }

    updateUserPassword()

    setUser(user => ({
      ...user, 
      oldPassword: '',
      password: '', 
      confirmPassword: ''
    }))
    dispatch({
      type: 'SET_CURRENT_USER', 
      user: {
        ...state.currentUser,
        fullName: user.fullName, 
        displayName: user.displayName, 
        email: user.email
      }
    })
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

  const handleDrop = (acceptedFiles: File[]) => {
    console.log(acceptedFiles);

    const user_data = new FormData()
    user_data.append('profile_picture', acceptedFiles[0])
    user_data.append('id', state.currentUser.id)

    axios.post("/api/update_user_profile", user_data, {
        headers: {
          'x-api-key': 'jKXFpXpMXYeeI0aCPfh14w'
        },
    }).then(res => {
      setUser({
        ...user, 
        profile_url: res.data.profile_url
      })

      dispatch({
        type: 'SET_CURRENT_USER', 
        user: {
          ...state.currentUser,
          profileUrl: res.data.profile_url
        }
      })
    })
  }

  const renderDropzone = () => {
    return (
      <ReactDropzone
        accept="image/*"
        onDrop={handleDrop}
      >
        {({getRootProps, getInputProps}) => (
            <div {...getRootProps()} className={classes.defaultPhoto}>
              <input {...getInputProps()}/>
              { user.profile_url ?
                <div
                  onMouseOver={() => setShow(true)}
                  onMouseOut={() => setShow(false)}
                >
                  <img src={user.profile_url} className={classes.photo} />
                  <div 
                    className={clsx(classes.uploadArea, !show && classes.invisible)}
                  >
                    <div className={classes.uploadLabel}>
                      <CameraIcon fontSize="small" />
                      <br />
                      Update
                    </div>
                  </div>
                </div> :
                <div className={classes.defaultPhotoName}>
                  <UploadIcon style={{fontSize: '48px'}} />
                  <br />
                  <span>Upload photo</span>
                </div>                
              }
            </div>
        )}
      </ReactDropzone>
    )
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
        { renderDropzone() }        
      </div>

      <Card className={classes.profile} elevation={0}>
        <form autoComplete="off">
          <Grid container spacing={2}>
            <Grid item md={6}>
              <InputForm
                value={user.fullName}
                label="Full name"
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
                onBlur={handleChangeDetails}
              />
            </Grid>
            <Grid item md={6}>
              <InputForm
                value={user.displayName}
                label="Display name"
                name="displayName"
                placeholder="Display Name"
                onChange={handleChange}
                onBlur={handleChangeDetails}
              />
            </Grid>
            <Grid item md={12}>
              <InputForm
                value={user.email}
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
                  { state.currentUser.companies && 
                    state.currentUser.companies.map(company => {
                      let teams:CurrentUser_currentUser_user_teams[] = []
                      
                      if (state.currentUser.teams) {
                        teams = state.currentUser.teams.filter(team => team.companyId === company.id)
                      }

                      return (
                        <TableRow key={company.name}>
                          <TableCell className={classes.tableCell}>
                            <div className={classes.flex}>
                              <div>{company.name}</div>                        
                            </div>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            { (teams && teams.length > 0) ?
                              teams.map(team => team.name).join(', ') :
                              "No Teams"
                            }
                          </TableCell>
                        </TableRow>
                      )
                    })
                  }
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
          checked={user.hasUppercase}
          label="At least 1 uppercase letter"
        />
        <CheckBox
          checked={user.hasSpecialChar}
          label="At least 1 special character"
        />
        <CheckBox
          checked={user.hasEightChar}
          label="At least 8 total characters"
        />

        <InputForm
          value={user.oldPassword}
          label="Current password"
          name="oldPassword"
          type="password"
          placeholder="Current password"
          onChange={handleChange}
          style={{marginTop: '24px', marginBottom: '24px'}}
        />
        <InputForm
          value={user.password}
          label="New Password"
          name="password"
          type="password"
          placeholder="New password"
          onChange={handleChange}
          style={{marginTop: '24px', marginBottom: '24px'}}
        />
        <InputForm
          value={user.confirmPassword}
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
