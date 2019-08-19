import React from 'react'
import clsx from 'clsx'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import {
  ClickAwayListener,
  Paper,
  Typography
} from '@material-ui/core'

import {AllRoles_roles} from '../graphql/queries/__generated__/AllRoles'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      position: 'relative',
      border: '1px solid #CACACA',
      borderRadius: '3px'
    },
    paper: {
      position: 'absolute',
      top: 42, 
      left: 0,
      zIndex: 1
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

interface DropdownProps {
  options: AllRoles_roles[];
  selected: string;
  placeholder?: string;
  onChange?: (role: AllRoles_roles) => void;
}

export default function Dropdown(props: DropdownProps) {
  const { options, selected, placeholder, onChange } = props
  const classes = useStyles()
  const [open, setOpen] = React.useState<boolean>(false)

  const findSelected = (findValue: String): (AllRoles_roles | null) => {
    const res = options.find(option => option.name === findValue);

    if (res) return res;
    return null;    
  }

  const [selectedItem, setSelectedItem] = React.useState<AllRoles_roles | null>(findSelected(selected))

  console.log("options:", options)

  const toggleMenu = () => setOpen(prev => !prev)

  const handleClick = (role: AllRoles_roles) => {
    setOpen(prev => !prev)
    if (onChange) onChange(role)
  }

  const handleClickAway = () => setOpen(false)

  return (
    <div className={classes.root}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <div className={classes.item} onClick={toggleMenu} style={{width: 'max-content'}}>
            { selectedItem ? selectedItem.name : placeholder }
            <i className="fa fa-caret-down" style={{marginLeft: '12px'}}></i>
          </div>
          <Paper className={clsx(classes.paper, !open && classes.invisible)}>
            { options && options.map(option => (
                <div 
                  key={option.id} 
                  className={classes.item} 
                  onClick={() => handleClick(option)}
                >
                  {option.name}
                </div>
              ))
            }
          </Paper>
        </div>
      </ClickAwayListener>
    </div>
  )
}