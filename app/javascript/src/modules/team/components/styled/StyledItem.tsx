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
  selected?: boolean;
}

const StyledItem = React.forwardRef((props: StyledItemProps, ref: React.Ref<HTMLDivElement>) => {
  const { logo, label, selected, ...other } = props
  const classes = useStyles()

  return (
    <div  {...other} className={classes.root} ref={ref}>
      { logo && <img src={logo} width="18" height="18" style={{marginRight: '6px'}} alt={label} />}
      <div className={clsx(classes.label, selected && classes.selected)}>{label}</div>
    </div>
  )
})

export default StyledItem
