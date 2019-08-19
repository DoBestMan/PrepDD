import React from 'react'
import clsx from 'clsx'
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      position: 'relative', 
      display: 'inline-block', 
      width: '70px', 
      height: '36px',
    },
    switch: {
      position: 'absolute', 
      cursor: 'pointer', 
      padding: '4px', 
      top: '0px', 
      left: '0px', 
      right: '0px', 
      bottom: '0px',
      borderRadius: '3px',
      fontFamily: 'Montserrat',
      fontWeight: 'bold', 
      fontSize: '15px',
      color: '#FFFFFF',
    },
    switchOn: {
      backgroundColor: '#3A84FF',
      paddingTop: '7px', 
      paddingLeft: '6px', 
      '&:before': {
        position: 'absolute',
        content: '\"\"',
        height: '28px',
        width: '28px', 
        right: '4px', 
        bottom: '4px',
        backgroundColor: '#FFFFFF', 
      }
    },
    switchOff: {
      backgroundColor: '#D8D8D8',
      textAlign: 'right', 
      paddingTop: '7px', 
      paddingRight: '6px', 
      '&:before': {
        position: 'absolute',
        content: '\"\"',
        height: '28px',
        width: '28px', 
        left: '4px', 
        bottom: '4px',
        backgroundColor: '#FFFFFF', 
      }
    },
  })
)

interface SwitchFormProps {
  value: boolean | null;
  onChange?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function SwitchForm(props: SwitchFormProps) {
  const {value, onChange} = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div 
        className={clsx(classes.switch, value ? classes.switchOn : classes.switchOff)} 
        onClick={onChange}
      >
        {value ? "On" : "Off"}
      </div>
    </div>
  )
}