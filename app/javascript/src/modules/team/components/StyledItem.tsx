import React from 'react'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'flex', 
      marginRight: '6px',
      padding: '3px 6px 3px 6px',
      background: '#FFFFFF',
      border: '1px solid #F2F2F2',
      borderRadius: '1px'
    },
    label: {
      marginLeft: '6px',
      color: '#606060',
      fontFamily: 'Montserrat', 
      fontSize: '12px', 
      fontWeight: 600
    },
    selected: {
      color: '#2C2C2C'
    }
  })
)

interface StyledItemProps {
  logo?: string;
  label: string;
  selected: boolean;
}

export default function StyledItem(props: StyledItemProps) {
  const { logo, label, selected } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      { logo && <img src={logo} width="18" height="18" alt={label} />}
      <div className={clsx(classes.label, selected && classes.selected)}>{label}</div>
    </div>
  )
}