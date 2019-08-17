import React, {useState} from 'react'
import clsx from 'clsx'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'

import UploadIcon from '@material-ui/icons/CloudUpload'

const MicrosoftLogo = require('images/dummy/logos/microsoft-logo.svg');

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      marginTop: '52px',
      width: '250px', 
      height: '250px',
      position: 'relative', 
      border: '1px solid #D8D8D8',
      borderRadius: '3px',
      padding: '12px'
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
    invisible: {
      display: 'none'
    }
  })
)

export default function UploadPanel() {
  const classes = useStyles()
  const [showUpload, setShowUpload] = useState(false)

  const handleOpenFile = () => {
    const input = document.getElementById("company-logo")

    if (input) input.click()
  }

  return (
    <div 
      className={classes.root}
      onMouseOver={() => setShowUpload(true)}
      onMouseOut={() => setShowUpload(false)}
    >
      <img src={MicrosoftLogo} width="226" height="226" alt="Microsoft" />
      <div 
        className={clsx(classes.uploadArea, !showUpload && classes.invisible)}
        onClick={handleOpenFile}
      >
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
    </div>
  )
}