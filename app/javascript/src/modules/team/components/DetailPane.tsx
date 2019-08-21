import React, {useState, useEffect} from 'react'
import idx from 'idx'
import {Theme, createStyles, makeStyles} from '@material-ui/core/styles'
import {
  Drawer,
  Table,
  TableHead,
  TableBody,
  Typography,
  Button,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/DeleteForever'
import CloseIcon from '@material-ui/icons/Close'

import LoadingFallback from '../../../components/LoadingFallback'
import Dropdown from '../../../components/Dropdown'
import StyledItem from './styled/StyledItem'
import StyledTableRow from './styled/StyledTableRow'
import StyledTableCell from './styled/StyledTableCell'
import InputForm from './InputForm'
import ArrowTooltip from './ArrowTooltip'

import {useUserDetails} from '../../../graphql/queries/UserDetails'
import {useAllRoles} from '../../../graphql/queries/AllRoles'
import {UserDetails_user} from '../../../graphql/queries/__generated__/UserDetails'
import {useUpdateTeamMember} from '../../../graphql/mutations/UpdateTeamMember'
import {useRemoveCompanyMember} from '../../../graphql/mutations/RemoveCompanyMember'
import {useRemoveTeamMember} from '../../../graphql/mutations/RemoveTeamMember'

const DefaultPhoto = require('images/dummy/photos/Alana.jpg')

const panelWidth = 500

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
      display: 'flex', 
      width: 'fit-content',
      alignItems: 'center', 
      margin: '36px 32px 0px 32px',
    },
    roleLabel: {
      color: '#606060',
      fontFamily: 'Montserrat',
      fontSize: '12px',
      fontWeight: 600,
      marginRight: '12px', 
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
    label: {
      color: 'white', 
      fontSize: '12px', 
      fontWeight: 600, 
      textTransform: 'capitalize'
    }
  })
)

interface DetailPaneProps {
  id: string
  open: boolean
  company: string
  handleClose: () => void
}

interface UserProps extends UserDetails_user {
  role: string
}

interface Role {
  id: string
  name: string
}

export default function DetailPane(props: DetailPaneProps) {
  const {id, open, company, handleClose} = props
  const classes = useStyles()
  const [user, setUser] = useState<UserProps>({
    __typename: "User",
    id: '',
    fullName: '',
    role: '0', 
    roles: null,
    companies: null,
  })
  const [roles, setRoles] = useState<Role[]>([])
  const [companyId, setCompanyId] = useState<string>("")
  const [teamId, setTeamId] = useState<string>("")
  
  const {loading, data, error} = useUserDetails({id, })
  const rolesData = useAllRoles({})
  const [updateTeamMember] = useUpdateTeamMember({
    id: user.id,
    fullName: user.fullName, 
    companyId: company, 
    role: user.role, 
  })
  const [removeCompanyMember] = useRemoveCompanyMember({
    companyId, 
    userId: user.id, 
  })
  const [removeTeamMember] = useRemoveTeamMember({
    teamId, 
    userId: user.id
  })

  useEffect(() => {
    const rolesList = idx(rolesData, rolesData => rolesData.data.roles)

    if (!rolesList) return
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
    const currentUser = idx(data, data => data.user)

    if (loading || !currentUser) return

    if (currentUser.roles) {
      setUser({
        ...user, 
        id: currentUser.id, 
        fullName: currentUser.fullName, 
        role: currentUser.roles[0].id,
      })
    } else {
      setUser({
        ...user, 
        id: currentUser.id, 
        fullName: currentUser.fullName,
      })
    }
  }, [data])

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      fullName: event.target.value
    })
  }

  const handleChangeRole = (newRole: string) => {
    setUser({
      ...user,
      role: newRole
    })
    updateTeamMember()
  }

  const handleDelete = () => {
    if (confirm("Are you going to delete this member?")) {
      setCompanyId(company)
      removeCompanyMember()
      handleClose()
    }
  }

  const handleUpdateName = () => {
    updateTeamMember()
  }

  const handleRemoveCompany = (id: string) => {
    if (confirm("Are you going to delete this member?")) {
      removeCompanyMember()      
    }
  }

  const handleRemoveTeam = (id: string) => {
    setTeamId(id)

    removeTeamMember()
  }

  const renderTooltipTitle = (options: String[]) => {
    return (
      <React.Fragment>
        { options.map((option: String, index: number) => 
          <p key={index} className={classes.label}>{option}</p>
        )}
      </React.Fragment>
    )
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
            value={user.fullName} 
            onChange={handleChangeName}
            onUpdate={handleUpdateName}
          />          
          <div className={classes.grow} />
          <DeleteIcon onClick={handleDelete} />
          <i className="fa fa-times" style={{marginLeft: '6px', fontSize: '20px'}} />
        </div>

        <div className={classes.roleForm}>
          <p className={classes.roleLabel}>Role</p>
          <Dropdown 
            options={roles} 
            selected={user.role}
            placeholder="Select role" 
            handleUpdate={handleChangeRole}
            small
          />
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
                const isHover = (companyId === company.id)

                return (
                  <StyledTableRow 
                    key={company.id} 
                    onMouseOver={() => setCompanyId(company.id)}
                    onMouseLeave={() => setCompanyId("")}
                  >
                    <StyledTableCell style={{width: '200px'}}>
                      { isHover ?
                        <StyledItem 
                          label={company.name} 
                          handleClose={() => handleRemoveCompany(company.id)}
                          close /> :
                        company.name
                      }
                    </StyledTableCell>
                    <StyledTableCell>
                      { isHover ? 
                        <div className={classes.flex}>
                          { company.teams && company.teams.slice(0, 2).map(team => 
                              <StyledItem 
                                key={`${user.fullName}-${team.id}`}
                                label={team.name} 
                                handleClose={() => handleRemoveTeam(team.id)}
                                close
                              />
                            )                      
                          }
                          { company.teams && company.teams.length > 2 &&
                            <ArrowTooltip 
                              title={renderTooltipTitle(company.teams.map(a => a.name).slice(2))} 
                              placement="top"
                            >
                              <StyledItem
                                label={`+${company.teams.length - 2}`}
                              />
                            </ArrowTooltip>
                          }
                        </div> :
                        (company.teams && company.teams.map(team => team.name).join(', '))
                      }
                    </StyledTableCell>
                  </StyledTableRow>
                )
              }
            )}
          </TableBody>
        </Table>
        <Typography className={classes.addLink} variant="h6">
          Add new company & team
        </Typography>
        <Button className={classes.resetButton}>Reset password</Button>
      </>
        
    </Drawer>
}
