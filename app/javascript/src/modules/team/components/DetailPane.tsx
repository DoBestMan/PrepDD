import React, {useState, useEffect} from 'react';
import idx from 'idx';
import {Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import {
  Drawer,
  Table,
  TableHead,
  TableBody,
  Typography,
  Button,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import CloseIcon from '@material-ui/icons/Close';

import LoadingFallback from '../../../components/LoadingFallback'
import Dropdown from '../../../components/Dropdown';
import StyledItem from './styled/StyledItem';
import StyledTableRow from './styled/StyledTableRow';
import StyledTableCell from './styled/StyledTableCell';
import InputForm from './InputForm'

import {useUserDetails} from '../../../graphql/queries/UserDetails'
import {useAllRoles} from '../../../graphql/queries/AllRoles'
import {UserDetails_user} from '../../../graphql/queries/__generated__/UserDetails'
import {useUpdateTeamMember} from '../../../graphql/mutations/UpdateTeamMember';
import {useRemoveCompanyMember} from '../../../graphql/mutations/RemoveCompanyMember';
import {useRemoveTeamMember} from '../../../graphql/mutations/RemoveTeamMember';

const DefaultPhoto = require('images/dummy/photos/Alana.jpg');

const panelWidth = 500;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: panelWidth,
      flexShrink: 0,
      color: '#606060',
      fontFamily: 'Montserrat',
      fontSize: '12px',
      fontWeight: 600,
    },
    flex: {
      display: 'flex',
    },
    grow: {
      flexGrow: 1,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '42px 31px 0px 31px',
    },
    drawerPaper: {
      width: panelWidth,
    },
    drawerSpacer: {
      marginTop: 64
    },
    round: {
      borderRadius: '50%',
    },
    title: {
      margin: '0px 6px 0px 12px',
      color: '#2C2C2C',
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: '24px',
    },
    roleForm: {
      margin: '36px 32px 0px 32px',
    },
    roleLabel: {
      color: '#606060',
      fontFamily: 'Montserrat',
      fontSize: '12px',
      fontWeight: 600,
    },
    table: {
      width: 'auto',
      margin: '24px 32px 0px 32px',
      color: '#606060',
      fontFamily: 'Montserrat',
      fontSize: '12px',
      fontWeight: 600,
    },
    primaryColor: {
      color: '#3A84FF',
    },
    addLink: {
      margin: '25px 31px 0px 31px',
      color: '#3A84FF',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '12px',
    },
    resetButton: {
      width: '170px',
      height: '42px',
      margin: '25px 31px 0px 31px',
      color: 'white',
      background: '#3A84FF',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '12px',
      textTransform: 'capitalize',
      '&:hover': {
        opacity: 0.7,
        background: '#3A84FF'
      }
    },
  })
);

interface DetailPaneProps {
  id: string;
  open: boolean;
  company: string;
  handleClose: () => void;
}

interface StateProps extends UserDetails_user {
  role: string;
}

interface Role {
  id: string;
  name: string;
}

export default function DetailPane(props: DetailPaneProps) {
  const {id, open, company, handleClose} = props;
  const classes = useStyles();
  const [state, setState] = useState<StateProps>({
    __typename: "User",
    id: '',
    fullName: '',
    role: '0', 
    roles: null,
    companies: null,
  });
  const [roles, setRoles] = useState<Role[]>([]);
  
  const {loading, data, error} = useUserDetails({id, })
  const rolesData = useAllRoles({})
  const [updateTeamMember] = useUpdateTeamMember({
    id: state.id,
    fullName: state.fullName, 
    companyId: company, 
    role: state.role, 
  })
  const [removeCompanyMember] = useRemoveCompanyMember({
    companyId: company, 
    userId: state.id, 
  })

  useEffect(() => {
    const rolesList = idx(rolesData, rolesData => rolesData.data.roles);

    if (!rolesList) return;
    const temp = rolesList.map(role => {
      const res = {
        id: role.id, 
        name: role.name
      }
      return res
    })
    setRoles(temp)
  }, [idx(rolesData, rolesData => rolesData.data.roles)])

  useEffect(() => {
    const currentUser = idx(data, data => data.user);

    if (loading || !currentUser) return;

    if (currentUser.roles) {
      setState({
        ...state, 
        id: currentUser.id, 
        fullName: currentUser.fullName, 
        role: currentUser.roles[0].id,
      })
    } else {
      setState({
        ...state, 
        id: currentUser.id, 
        fullName: currentUser.fullName,
      })
    }
  }, [data])

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      fullName: event.target.value
    })
  }

  const handleChangeRole = (newRole: string) => {
    setState({
      ...state,
      role: newRole
    })
    updateTeamMember()
  }

  const handleDelete = () => {
    if (confirm("Are you going to delete this member?")) {
      removeCompanyMember()
      handleClose()
    }
  }

  const handleUpdateName = () => {
    updateTeamMember()
  }

  return loading ?
    <LoadingFallback /> :
    <Drawer
      className={classes.root}
      variant="persistent"
      anchor="right"
      open={props.open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <>
        <div className={classes.drawerSpacer} />
        <div className={classes.drawerHeader}>
          <img
            className={classes.round}
            src={DefaultPhoto}
            width="30"
            height="30"
            alt="Alana"
          />
          <InputForm 
            value={state.fullName} 
            onChange={handleChangeName}
            onUpdate={handleUpdateName}
          />          
          <div className={classes.grow} />
          <DeleteIcon onClick={handleDelete} />
          <CloseIcon style={{marginLeft: '6px'}} onClick={handleClose}/>
        </div>

        <div className={classes.roleForm}>
          <div style={{width: 'fit-content'}}>
            <p className={classes.roleLabel}>Role</p>
            <Dropdown 
              options={roles} 
              selected={state.role}
              placeholder="Select role" 
              handleUpdate={handleChangeRole}
            />
          </div>
        </div>

        <Table className={classes.table}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Company(s)</StyledTableCell>
              <StyledTableCell>Team(s)</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            { data && data.user && data.user.companies && 
              data.user.companies.map(company => {
              return (
                <StyledTableRow key={company.id}>
                  <StyledTableCell>
                    <StyledItem label={company.name} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <div className={classes.flex}>
                      { company.teams && company.teams.map(team => {
                        return (
                          <StyledItem key={team.id} label={team.name} />
                        )
                      })}
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
        <Typography className={classes.addLink} variant="h6">
          Add new company & team
        </Typography>
        <Button className={classes.resetButton}>Reset password</Button>
      </>
        
    </Drawer>
}
