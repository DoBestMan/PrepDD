import React from 'react'
import clsx from 'clsx'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import CheckCircle from '@material-ui/icons/CheckCircle'
import { mergeClasses } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      marginTop: '8px'
    },
    unCheckedCircle: {
      width: '18px', 
      height: '18px',
      color: 'green',
      opacity: 0.1
    },
    unCheckedLabel: {
      color: '#2C2C2C', 
      fontFamily: 'Montserrat', 
      fontWeight: 'normal',
      fontSize: '12px', 
      marginLeft: '10px'
    }, 
    checkedCircle: {
      opacity: 1
    },
    checkedLabel: {
      fontWeight: 'bold'
    }
  })
)

interface CheckBoxProps {
  label?: string;
  checked?: boolean;
}

export default function CheckBox(props: CheckBoxProps) {
  const { label, checked } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CheckCircle className={clsx(classes.unCheckedCircle, checked && classes.checkedCircle)} />
      <span className={clsx(classes.unCheckedLabel, checked && classes.checkedLabel)}>{label}</span>
    </div>
  )
}