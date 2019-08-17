import React, {useState} from 'react'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'

import FormPanel from './components/FormPanel'
import UploadPanel from './components/UploadPanel'

const panelWidth = 1095

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'flex', 
      height: 'calc(100vh - 64px)',
      padding: `72px calc((100% - ${panelWidth}px) / 2) 72px calc((100% - ${panelWidth}px) / 2)`
    }, 
    settingsPanel: {
      display: 'block',
      width: '772px'
    },
    uploadPanel: {
      display: 'block', 
      marginLeft: '72px'
    },
  })
)

export default function CompanySettings(props: {path?: string;}) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.settingsPanel}>
        <FormPanel />
      </div>
      <div className={classes.uploadPanel}>
        <UploadPanel />
      </div>
    </div>
  )
}