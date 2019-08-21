import React from 'react'
import clsx from 'clsx'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'flex', 
      width: 'fit-content',
      alignItems: 'center', 
      margin: '3px', 
      padding: '3px 6px 3px 6px',
      background: '#FFFFFF',
      border: '1px solid #D8D8D8',
      borderRadius: '3px'
    },
    label: {
      color: '#606060',
      fontFamily: 'Montserrat', 
      fontSize: '12px', 
      fontWeight: 600
    },
    selected: {
      color: '#2C2C2C'
    }, 
    close: {
      fontSize: '12px', 
      marginLeft: '6px'
    }
  })
)

interface StyledItemProps {
  logo?: string;
  label: string;
  selected?: boolean;
  close?: boolean;
  handleClose?: () => void;
}

const StyledItem = React.forwardRef((props: StyledItemProps, ref: React.Ref<HTMLDivElement>) => {
  const { logo, label, selected, close, handleClose, ...other } = props
  const classes = useStyles()

  return (
    <div  {...other} className={classes.root} ref={ref}>
      { logo && <img src={logo} width="18" height="18" style={{marginRight: '6px'}} alt={label} />}
      <div className={clsx(classes.label, selected && classes.selected)}>{label}</div>
      { close && <i className={clsx(classes.close, "fa fa-times")} onClick={handleClose} /> }
    </div>
  )
})

export default StyledItem
