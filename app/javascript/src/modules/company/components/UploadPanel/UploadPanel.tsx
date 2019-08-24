import React, {useState} from 'react'
import clsx from 'clsx'
import axios from 'axios'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import ReactDropzone from 'react-dropzone'

import UploadIcon from '@material-ui/icons/CloudUpload'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      marginTop: '52px',
      width: '250px', 
      height: '250px',
      position: 'relative', 
      border: '2px dashed #D8D8D8',
      borderRadius: '3px',
      padding: '12px',
      '&:focus': {
        outline: 'none'
      }
    },
    uploadArea: {
      width: '250px', 
      height: '42px', 
      position: 'absolute', 
      top: '208px', 
      left: '0px', 
      backgroundColor: 'rgba(48, 48, 48, 0.5)',
      '&:hover': {
        cursor: 'pointer'
      }
    },
    uploadLabel: {
      display: 'flex',
      height: 'inherit', 
      alignItems: 'center', 
      justifyContent: 'center', 
      color: '#FFFFFF',
      fontFamily: 'Montserrat', 
      fontSize: '15px',
      fontWeight: 600, 
    },
    uploadFileLabel: {
      color: '#D8D8D8', 
      fontFamily: 'Montserrat', 
      fontSize: '18px', 
      fontWeight: 'bold',
      textAlign: 'center'
    },
    invisible: {
      display: 'none'
    }
  })
)

export default function UploadPanel(props: {url?: string}) {
  const { url } = props
  const classes = useStyles()
  const [showUpload, setShowUpload] = useState(false)



  const handleDrop = (acceptedFiles: File[]) => {
    console.log(acceptedFiles);

    const user_data = new FormData()
    user_data.append('profile_picture', acceptedFiles[0])
    // user_data.append('id', state.currentUser.id)

    // axios.post("/api/update_user_profile", user_data, {
    //     headers: {
    //       'x-api-key': 'jKXFpXpMXYeeI0aCPfh14w'
    //     },
    // }).then(res => {
    //   setUser({
    //     ...user, 
    //     profile_url: res.data.profile_url
    //   })

    //   dispatch({
    //     type: 'SET_CURRENT_USER', 
    //     user: {
    //       ...state.currentUser,
    //       profileUrl: res.data.profile_url
    //     }
    //   })
    // })
  }

  return (
    <ReactDropzone
      accept="image/*"
      onDrop={handleDrop}
    >
      {({getRootProps, getInputProps}) => (
        <div {...getRootProps()} className={classes.root}>
          <input {...getInputProps()} />
          { url ?
            <div
              onMouseOver={() => setShowUpload(true)}
              onMouseOut={() => setShowUpload(false)}              
            >
              <img src={url} width="226" height="226" alt="Microsoft" />
              <div className={clsx(classes.uploadArea, !showUpload && classes.invisible)}>
                <div className={classes.uploadLabel}>
                  <UploadIcon />
                  <span style={{marginLeft: '12px'}}>Update Logo</span>
                </div>
                <input 
                  id="company-logo" 
                  className={classes.invisible} 
                  type="file" 
                />
              </div>
            </div> :
            <div className={classes.uploadFileLabel}>
              <UploadIcon style={{fontSize: '120px'}} />
              <br />
              <span>Drag ang Drop/<br />upload logo</span>
            </div> 
          }
        </div>
      )}
    </ReactDropzone>
  )
}