import React, {useState, useEffect, useCallback} from 'react'
import idx from 'idx'
import clsx from 'clsx'
import {Theme, createStyles, makeStyles} from '@material-ui/core/styles'
import {
  Drawer,
  Paper, 
  Table,
  TableHead,
  TableBody,
  Typography,
  Button,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/DeleteForever'

import LoadingFallback from '../../../../components/LoadingFallback'
import DefaultUserImage from '../../../../components/DefaultUserImage'
import Dropdown from '../../../../components/Dropdown'
import StyledItem from '../styled/StyledItem'
import StyledTableRow from '../styled/StyledTableRow'
import StyledTableCell from '../styled/StyledTableCell'
import InputForm from './components/InputForm'
import AutoSuggest from '../AutoSuggest'

import {useUserDetails} from '../../../../graphql/queries/UserDetails'
import {useAllRoles} from '../../../../graphql/queries/AllRoles'
import {UserDetails_user, UserDetails_user_teams} from '../../../../graphql/queries/__generated__/UserDetails'
import {useUpdateTeamMember} from '../../../../graphql/mutations/UpdateTeamMember'
import {useRemoveCompanyMember} from '../../../../graphql/mutations/RemoveCompanyMember'
import {useRemoveTeamMember} from '../../../../graphql/mutations/RemoveTeamMember'
import {useAddTeamMember} from '../../../../graphql/mutations/AddTeamMember'
import { 
  CompanyUsers_companyUsers_users_companies,
  CompanyUsers_companyUsers_users_teams,
  CompanyUsers_companyUsers_users_roles
} from '../../../../graphql/queries/__generated__/CompanyUsers'

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
      alignItems: 'center'
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
    },
    morePaper: {
      display: 'flex', 
      flexWrap: 'wrap', 
      width: '200px', 
      position: 'absolute', 
      top: '28px',
      right: '3px', 
      padding: '9px', 
      boxSizing: 'border-box', 
      border: '2px solid #D8D8D8',
      borderRadius: '3px',
    },
    addMember: {
      color: '#3A84FF',
      fontWeight: 600,
      fontSize: '15px',
      width: '25px', 
      height: '25px', 
      padding: '4px 6px 2px 6px', 
      border: '1px solid #FFFFFF',
      borderRadius: '3px'
    },
    addMemberHover: {
      position: 'relative', 
      padding: '2px 6px 2px 6px', 
      border: '1px solid #D8D8D8',
    },
    addPaper: {
      width: '200px', 
      background: '#FFFFFF', 
      position: 'absolute', 
      top: '24px',
      right: '-2px', 
      padding: '12px', 
      boxSizing: 'border-box', 
      border: '2px solid #D8D8D8',
      borderRadius: '3px',
    },
    addLink: {
      marginTop: '24px',
      color: '#3A84FF',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '12px',
      textTransform: 'capitalize'
    },
  })
)

interface DetailPaneProps {
  id: string;
  open: boolean;
  company: string;
  handleClose: () => void;
  setErrors: (value: React.SetStateAction<string>) => void;
  updateMemberList: (
    params: {
      id: string, 
      fullName: string, 
      profileUrl?: string, 
      companies: CompanyUsers_companyUsers_users_companies[] | null, 
      teams: CompanyUsers_companyUsers_users_teams[] | null, 
      roles: CompanyUsers_companyUsers_users_roles[] | null
    }
  ) => void;
}

interface UserProps extends UserDetails_user {
  role: string;
  team: string;
}

interface Role {
  id: string;
  name: string;
}

export default function DetailPane(props: DetailPaneProps) {
  const {
    id, 
    open, 
    company, 
    setErrors, 
    handleClose, 
    updateMemberList
  } = props
  const classes = useStyles()
  const [user, setUser] = useState<UserProps>({
    __typename: "User",
    id: '',
    email: '',
    fullName: '',
    profileUrl: '',
    roles: null, 
    teams: null, 
    companies: null, 
    role: '0', 
    team: ''
  })
  const [roles, setRoles] = useState<Role[]>([])
  const [companyId, setCompanyId] = useState<string>("")
  const [teamId, setTeamId] = useState<string>("")
  const [moreHover, setMoreHover] = useState<boolean>(false)
  const [addHover, setAddHover] = useState<boolean>(false)
  
  const {loading, data, error} = useUserDetails({id, })
  const rolesData = useAllRoles({})
  const [updateTeamMember, {
    loading: updateTeamMemberLoading, 
    data: updateTeamMemberRes, 
    error: updateTeamMemberError, 
  }] = useUpdateTeamMember({
    id: user.id,
    fullName: user.fullName, 
    companyId: company, 
    role: user.role, 
  })
  const [removeCompanyMember, {
    loading: removeCompanyMemberLoading, 
    data: removeCompanyMemberRes, 
    error: removeCompanyMemberError,
  }] = useRemoveCompanyMember({
    companyId: companyId || company, 
    userId: user.id, 
  })
  const [removeTeamMember, {
    loading: removeTeamMemberLoading, 
    data: removeTeamMemberRes, 
    error: removeTeammemberError, 
  }] = useRemoveTeamMember({
    teamId, 
    userId: user.id
  })
  const [addTeamMember, {
    loading: addTeamMemberLoading, 
    data: addTeamMemberRes, 
    error: addTeamMemberError
  }] = useAddTeamMember({
    companyId,
    fullName: user.fullName, 
    email: user.email, 
    role: user.role, 
    team: user.team,
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
      const findRole = currentUser.roles.filter(role => role.companyId === company)[0]

      setUser({
        ...user, 
        id: currentUser.id, 
        email: currentUser.email, 
        fullName: currentUser.fullName, 
        profileUrl: currentUser.profileUrl,
        role: findRole ? findRole.id : '0',
      })
    } else {
      setUser({
        ...user, 
        id: currentUser.id, 
        email: currentUser.email, 
        profileUrl: currentUser.profileUrl,
        fullName: currentUser.fullName,
      })
    }
  }, [loading, idx(data, data => data.user)])

  useEffect(() => {
    const updatedUser = idx(updateTeamMemberRes, updateTeamMemberRes => updateTeamMemberRes.updateTeamMember.user)
    
    if (updateTeamMemberLoading || !updatedUser) return
    handleUpdateMemberList(updatedUser as UserDetails_user)
  }, [updateTeamMemberLoading, idx(updateTeamMemberRes, updateTeamMemberRes => updateTeamMemberRes.updateTeamMember.user)])

  useEffect(() => {
    if (updateTeamMemberError) return
    setErrors("Update team member failed")
  }, [updateTeamMemberError])

  useEffect(() => {
    const addedUser = idx(addTeamMemberRes, addTeamMemberRes => addTeamMemberRes.addTeamMember.user)
    
    if (addTeamMemberLoading || !addedUser) return
    handleUpdateMemberList(addedUser as UserDetails_user)
  }, [addTeamMemberLoading, idx(addTeamMemberRes, addTeamMemberRes => addTeamMemberRes.addTeamMember.user)])

  useEffect(() => {
    if (addTeamMemberError) return
    setErrors("Add team member failed")
  }, [addTeamMemberError])

  useEffect(() => {
    const removedUser = idx(removeTeamMemberRes, removeTeamMemberRes => removeTeamMemberRes.removeTeamMember.user)
    
    if (removeTeamMemberLoading || !removedUser) return
    handleUpdateMemberList(removedUser as UserDetails_user)
  }, [removeTeamMemberLoading, idx(removeTeamMemberRes, removeTeamMemberRes => removeTeamMemberRes.removeTeamMember.user)])

  useEffect(() => {
    if (removeTeammemberError) return
    setErrors("Remove team member failed")
  }, [removeTeammemberError])

  useEffect(() => {
    const removedUser = idx(removeCompanyMemberRes, removeCompanyMemberRes => removeCompanyMemberRes.removeCompanyMember.user)
    
    if (removeCompanyMemberLoading || !removedUser) return
    handleUpdateMemberList(removedUser as UserDetails_user)

    if (companyId === company) {
      handleClose()
    }
  }, [removeCompanyMemberLoading, idx(removeCompanyMemberRes, removeCompanyMemberRes => removeCompanyMemberRes.removeCompanyMember.user)])

  useEffect(() => {
    if (removeCompanyMemberError) return
    setErrors("Remove company member failed")
  }, [removeCompanyMemberError])

  useEffect(() => {
    if (teamId && confirm("Are you going to remove this member?")) {
      removeTeamMember()
    }
  }, [teamId])

  const handleUpdateMemberList = (updatedUser: UserDetails_user) => {
    setUser({
      ...user, 
      ...updatedUser
    })
    updateMemberList({
      id: updatedUser.id, 
      fullName: updatedUser.fullName, 
      profileUrl: updatedUser.profileUrl as string,
      companies: updatedUser.companies as CompanyUsers_companyUsers_users_companies[] | null, 
      teams: updatedUser.teams, 
      roles: updatedUser.roles as CompanyUsers_companyUsers_users_roles[] | null
    })
  }

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      fullName: event.target.value
    })
  }

  const handleChangeRole = async (newRole: string) => {
    await setUser({
      ...user,
      role: newRole
    })

    updateTeamMember()
  }

  const handleDelete = async () => {
    if (confirm("Are you going to delete this member?")) {
      await setCompanyId(company)
      removeCompanyMember()
    }
  }

  const handleUpdateName = () => {
    updateTeamMember()
  }

  const handleRemoveCompany = () => {
    if (confirm("Are you going to delete this member?")) {
      removeCompanyMember()      
    }
  }

  const handleChangeTeam = (newValue: string) => {
    setUser({
      ...user, 
      team: newValue
    })
  }

  const handleAddTeamMember = (event: React.FormEvent<unknown>) => {
    event.preventDefault()
    addTeamMember()
    setAddHover(false)
    setUser({
      ...user, 
      team: ''
    })
  }

  const renderTeams = (teams: UserDetails_user_teams[]) => {
    if (!teams.length) {
      return "No teams"
    }

    const label = 
      teams && teams.length > 2 ?
        teams
          .slice(0, 2)
          .map(team => team.name)
          .join(', ')
          .concat(` +${teams.length - 2}`) :
        teams.map(team => team.name).join(', ');

    return (
      <div className={classes.flex}>
        { label && <span style={{marginRight: '12px'}}>{label}</span> }
        <div className={classes.grow} />
        <i className={clsx("fa fa-plus", classes.addMember)} />
      </div>
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
          { user.profileUrl ?
            <img
              className={classes.round}
              src={user.profileUrl}
              width="30"
              height="30"
              alt="Alana"
            /> : 
            <DefaultUserImage userName={user.fullName} />
          }
          <InputForm 
            value={user.fullName} 
            onChange={handleChangeName}
            onUpdate={handleUpdateName}
          />          
          <div className={classes.grow} />
          <DeleteIcon onClick={handleDelete} />
          <i 
            className="fa fa-times" 
            onClick={handleClose}
            style={{marginLeft: '6px', fontSize: '20px'}} 
          />
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
                let teams: UserDetails_user_teams[] = []
                
                if (data.user.teams) {
                  teams = data.user.teams.filter(team => team.companyId === company.id)
                }

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
                          handleClose={() => handleRemoveCompany()}
                          selected
                          close 
                        /> :
                        company.name
                      }
                    </StyledTableCell>
                    <StyledTableCell>
                      { isHover ? 
                        <div className={classes.flex}>
                          { !teams.length && "No teams"}
                          { teams && teams.slice(0, 2).map(team => 
                              <StyledItem 
                                key={`${user.fullName}-${team.id}`}
                                label={team.name} 
                                handleClose={() => setTeamId(team.id)}
                                selected
                                close
                              />
                            )
                          }
                          { teams && teams.length > 2 &&
                            <div 
                              onMouseOver={() => setMoreHover(true)}
                              onMouseLeave={() => setMoreHover(false)}
                              style={{position: 'relative'}}
                            >
                              <StyledItem label={`+${teams.length - 2}`} selected />
                              { moreHover && 
                                <Paper 
                                  className={classes.morePaper} 
                                  elevation={0}
                                  onMouseOver={() => setMoreHover(true)}
                                  onMouseLeave={() => setMoreHover(false)}
                                >
                                  { teams.slice(2).map(team => 
                                      <StyledItem 
                                        key={`${user.fullName}-${team.id}`}
                                        label={team.name} 
                                        handleClose={() => setTeamId(team.id)}
                                        selected
                                        close
                                      />
                                    )
                                  }
                                </Paper>
                              }
                            </div>
                          }
                          <div className={classes.grow} />
                          <div 
                            className={clsx(classes.addMember, classes.addMemberHover)}
                            onMouseOver={() => setAddHover(true)}
                            onMouseLeave={() => setAddHover(false)}
                          >
                            <i className="fa fa-plus" />
                            { addHover && 
                              <form 
                                className={classes.addPaper} 
                                onMouseOver={() => setAddHover(true)}
                                onMouseLeave={() => setAddHover(false)}
                                onSubmit={handleAddTeamMember}
                              >
                                <AutoSuggest
                                  value={user.team}
                                  handleChange={handleChangeTeam}                                  
                                />
                                <Button 
                                  type="submit"
                                  className={classes.addLink} 
                                >
                                  Add team
                                </Button>
                              </form>
                            }
                          </div>
                        </div> :
                        (teams && renderTeams(teams))
                      }
                    </StyledTableCell>
                  </StyledTableRow>
                )
              }
            )}
          </TableBody>
        </Table>
        <Button className={classes.resetButton}>Reset password</Button>
      </>
        
    </Drawer>
}
