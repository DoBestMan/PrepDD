import React, {useState, useEffect, useCallback} from 'react'
import clsx from 'clsx'
import idx from 'idx'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import {
  Toolbar,
  Typography,
  Button,
  TextField,
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem
 } from '@material-ui/core'
 import ClickAwayListener from '@material-ui/core/ClickAwayListener'
 import DeleteIcon from '@material-ui/icons/DeleteForever'
//  import AutoSuggest from './AutoSuggest'
import { useAddTeamMember } from '../../../graphql/mutations/AddTeamMember';
import { navigate } from '@reach/router';

const useToolbarStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'flex',
      margin: '42px 31px 0px 31px'
    },
    grow: {
      flexGrow: 1
    },
    invisible: {
      display: 'none'
    },
    title: {
      color: '#2C2C2C',
      fontFamily: 'Montserrat',
      fontWeight: 'bold', 
      fontSize: '24px'
    },
    primaryButton: {
      height: '42px', 
      padding: '6px 24px 6px 24px',
      background: '#3A84FF',
      borderRadius: '3px',
      fontFamily: 'Montserrat',
      fontWeight: 'bold', 
      fontSize: '12px',
      color: '#FFFFFF',
      textAlign: 'center',
      textTransform: 'capitalize',
      '&:hover': {
        opacity: 0.7,
        background: '#3A84FF'
      }
    },
    deleteIcon: {
      display: 'flex', 
      width: '42px', 
      height: '42px',
      alignItems: 'center', 
      justifyContent: 'center', 
      '&:hover': {
        cursor: 'pointer', 
        border: '1px solid #3A84FF',
        borderRadius: '3px'
      }
    },
    dropDown: {
      position: 'relative',
      margin: '0px 12px 0px 12px'
    },
    paper: {
      width: '300px',
      position: 'absolute', 
      top: '42px', 
      left: '0px',
      zIndex: 1, 
      background: '#FFFFFF',
      padding: '24px',
      border: '1px solid #CACACA',
      borderRadius: '3px'
    },
    input: {
      display: 'block',
      width: '100%', 
      marginTop: '6px', 
      color: '#606060', 
      fontFamily: 'Montserrat', 
      fontWeight: 600, 
      fontSize: '12px',
      '& label': {
        color: '#606060', 
        fontFamily: 'Montserrat', 
        fontWeight: 600, 
        fontSize: '12px',
      },
      '&:selected': {
        color: '#3A84FF',
      },
      '& div': {
        width: '100%'
      }
    },
    formTitle: {
      color: '#2C2C2C',
      fontFamily: 'Montserrat', 
      fontWeight: 600, 
      fontSize: '12px',
      textTransform: 'capitalize'
    },
    submitButton: {
      color: '#3A84FF',
      marginTop: '6px',
      padding: '6px 0px 6px 0px',
      fontFamily: 'Montserrat', 
      fontWeight: 600, 
      fontSize: '12px',
      textTransform: 'capitalize'
    }
  })
)

interface StateProps {
  fullName: string;
  email: string;
  role: string;
  team: string;
}

interface TableToolbarProps {
  selected: number;
  handleDelete: () => void;
}

const TableToolbar = (props: TableToolbarProps) => {
  const { selected, handleDelete } = props
  const classes = useToolbarStyles()
  const [open, setOpen] = useState<boolean>(false)
  const [state, setState] = useState<StateProps>({
    fullName: '', 
    email: '', 
    role: '', 
    team: ''
  })

  const [addTeamMember, {data}] = useAddTeamMember({
    fullName: state.fullName, 
    email: state.email, 
    role: '', 
    team: '',
    companyId: '2'
  })

  const handleChange = useCallback(event => {
    const {name, value} = event.target
    setState(state => ({...state, [name]: value}))
  }, [setState])

  useEffect(() => {
    if (idx(data, data => data.addTeamMember.success)) {
      console.log(data)
      navigate('/app/team')
    }
  }, [data]);

  const handleToggle = () => {
    setOpen(!open)
  }

  const handleClickAway = (event: React.MouseEvent<unknown>) => {
    console.log(event)
    // if (event.target.tagName !== "LI")
    setOpen(false)
  }

  const handleChangeRole = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    setState(prev => ({
      ...prev,
      role: event.target.value as string,
    }));
  }

  const handleChangeTeam = (newValue: string) => {
    setState(prev => ({
      ...prev, 
      team: newValue
    }))
  }

  const handleSubmit = useCallback(event => {
    setOpen(false)
    event.preventDefault()
    addTeamMember()
  }, [addTeamMember])

  return (
    <Toolbar className={classes.root} disableGutters>
      <Typography className={classes.title} variant="h2">Team Management</Typography>
      <div className={classes.dropDown}>
        {/* <ClickAwayListener onClickAway={handleClickAway}> */}
          <div>
            <Button 
              className={classes.primaryButton}
              onClick={handleToggle}
            >
              Add member
            </Button>
            <form className={clsx(classes.paper, !open && classes.invisible)} onSubmit={handleSubmit}>
              <Typography className={classes.formTitle} variant="h6">
                New team member
              </Typography>
              <TextField 
                id="name"
                name="fullName"
                label="Name"
                className={classes.input}
                value={state.fullName}
                onChange={handleChange}
              />
              <TextField 
                id="email"
                name="email"
                label="Email"
                className={classes.input}
                value={state.email}
                onChange={handleChange}
                autoFocus
                required
              />
              <FormControl className={classes.input}>
                <InputLabel htmlFor="role">Role</InputLabel>
                <Select
                  value={state.role}
                  onChange={handleChangeRole}
                  inputProps={{
                    name: 'role', 
                    id: 'role'
                  }}
                >
                  <MenuItem value="1">User</MenuItem>
                  <MenuItem value="2">Admin</MenuItem>
                  <MenuItem value="3">Owner</MenuItem>
                </Select>
              </FormControl>
              <TextField 
                id="team"
                name="team"
                label="Team"
                className={classes.input}
                value={state.team}
                onChange={handleChange}
                autoFocus
                required
              />
              {/* <AutoSuggest
                value={state.team}
                handleChange={handleChangeTeam}
              /> */}
              <Button type="submit" className={classes.submitButton}>Create new team member</Button>
            </form>
          </div>
        {/* </ClickAwayListener> */}
      </div>
      <div className={classes.grow} />
      { (selected > 0) && 
        <div className={classes.deleteIcon}>
          <DeleteIcon onClick={handleDelete}/>
        </div>
      }
    </Toolbar>
  )
}

export default TableToolbar