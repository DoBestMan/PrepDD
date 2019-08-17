import React from 'react'
import clsx from 'clsx'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import {
  ClickAwayListener,
  Paper,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      position: 'relative',
      border: '1px solid #CACACA',
      borderRadius: '3px'
    },
    paper: {
      width: '-webkit-fill-available', 
      position: 'absolute',
      top: 42, 
      left: 0
    },
    invisible: {
      display: 'none'
    }, 
    item: {
      display: 'flex', 
      padding: '12px', 
      alignItems: 'center', 
      color: '#606060',
      fontFamily: 'Montserrat',
      fontWeight: 600, 
      fontSize: '12px',
      textTransform: 'capitalize', 
      '&:hover': {
        cursor: 'pointer',
        background: '#EBF2FF'
      }
    }
  })
)

interface Option {
  value: String; 
  label: String;
}

interface DropdownProps {
  options: Option[];
  selected?: String;
  placeholder?: String;
}

export default function Dropdown(props: DropdownProps) {
  const { options, selected, placeholder } = props
  const classes = useStyles()
  const [open, setOpen] = React.useState<boolean>(false)

  const findSelected = (findValue: String) => options.find(option => option.value === findValue)

  const [selectedItem, setSelectedItem] = React.useState<Option | null>(null)

  const toggleMenu = () => setOpen(prev => !prev)

  const handleClickAway = () => setOpen(false)

  console.log(options)
  return (
    <div className={classes.root}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <div className={classes.item} onClick={toggleMenu} style={{width: 'max-content'}}>
            { selectedItem ? selectedItem.label : placeholder }
            <i className="fa fa-caret-down" style={{marginLeft: '12px'}}></i>
          </div>
          <Paper className={clsx(classes.paper, !open && classes.invisible)}>
            { options && options.map((option: Option, index: number) => (
                <div key={index} className={classes.item} onClick={toggleMenu}>
                  {option.label}
                </div>
              ))
            }
          </Paper>
        </div>
      </ClickAwayListener>
    </div>
  )
}