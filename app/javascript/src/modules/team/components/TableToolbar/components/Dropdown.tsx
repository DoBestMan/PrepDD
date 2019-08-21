import React from 'react'
import clsx from 'clsx'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import {
  ClickAwayListener,
  Paper
} from '@material-ui/core'

import {AllRoles_roles} from '../../../../../graphql/queries/__generated__/AllRoles'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      position: 'relative',
      borderBottom: '1px solid darkgray'
    },
    grow: {
      flexGrow: 1, 
    },
    paper: {
      width: '100%', 
      position: 'absolute',
      top: '54px', 
      left: '0px',
      zIndex: 1
    },
    invisible: {
      display: 'none'
    }, 
    selectedItem: {
      display: 'flex', 
      height: '48px', 
      padding: '6px 0px 7px 0px',
      alignItems: 'flex-end', 
      boxSizing: 'border-box', 
      color: '#606060',
      fontFamily: 'Montserrat',
      fontWeight: 600, 
      fontSize: '12px',
      textTransform: 'capitalize', 
    },
    item: {
      padding: '12px', 
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
  id: string;
  name: string;
}

interface DropdownProps {
  data: AllRoles_roles[];
  selected: string;
  placeholder?: string;
  handleChange?: (role: string) => void;
}

export default function Dropdown(props: DropdownProps) {
  const { data, selected, placeholder, handleChange } = props
  const classes = useStyles()
  const [open, setOpen] = React.useState<boolean>(false)

  const options = data.map(role => ({
    id: role.id, 
    name: role.name
  }))

  const renderLabel = () => {
    const res = options.find(option => option.id === selected);
    if (res) return res.name;
    return placeholder;
  }

  const toggleMenu = () => setOpen(prev => !prev)

  const handleClick = (role: string) => {
    setOpen(prev => !prev)
    if (handleChange) handleChange(role)
  }

  const handleClickAway = () => setOpen(false)

  return (
    <div className={classes.root}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <div 
            className={classes.selectedItem} 
            onClick={toggleMenu}
          >
            {renderLabel()}
            <div className={classes.grow} />
            <i className="fa fa-caret-down"></i>
          </div>
          <Paper className={clsx(classes.paper, !open && classes.invisible)}>
            { options && options.map(option => (
                <div 
                  key={option.id} 
                  className={classes.item} 
                  onClick={() => handleClick(option.id)}
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