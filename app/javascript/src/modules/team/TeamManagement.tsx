import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import idx from 'idx'
import _ from 'lodash'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import {
  Paper,
  Table,
  TableBody
} from '@material-ui/core'

import LoadingFallback from '../../components/LoadingFallback'
import DefaultUserImage from '../../components/DefaultUserImage'
import TableToolbar from './components/TableToolbar'
import Searchbar from './components/Searchbar'
import TableHeader from './components/TableHeader'
import DetailPane from './components/DetailPane'
import StyledTableRow from './components/styled/StyledTableRow'
import StyledTableCell from './components/styled/StyledTableCell'
import StyledItem from './components/styled/StyledItem'
import ArrowTooltip from './components/ArrowTooltip'

import {useGlobalState} from '../../store'

import {useCompanyUsers} from '../../graphql/queries/CompanyUsers'
import {useRemoveCompanyMember} from '../../graphql/mutations/RemoveCompanyMember'
import {
  CompanyUsers_companyUsers_users, 
  CompanyUsers, 
  CompanyUsersVariables,
  CompanyUsers_companyUsers_users_companies, 
  CompanyUsers_companyUsers_users_roles,
  CompanyUsers_companyUsers_users_teams, 
} from '../../graphql/queries/__generated__/CompanyUsers' 
import FlashMessage from '../common/FlashMessage';

const PANEL_WIDTH = 500
const LIMIT = 20

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    flex: {
      display: 'flex'
    },
    grow: {
      flexGrow: 1
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp, 
        duration: theme.transitions.duration.leavingScreen
      })
    },
    paperShift: {
      width: `calc(100% - ${PANEL_WIDTH}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut, 
        duration: theme.transitions.duration.enteringScreen
      })
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    table: {
      minWidth: 750
    },
    round: {
      borderRadius: '50%'
    },
    label: {
      color: 'white', 
      fontSize: '12px', 
      fontWeight: 600, 
      textTransform: 'capitalize'
    }
  })
)

interface UpdateTeamMemberProps {
  id: string;
  fullName: string;
  profileUrl?: string;
  companies: CompanyUsers_companyUsers_users_companies[] | null;
  teams: CompanyUsers_companyUsers_users_teams[] | null;
  roles: CompanyUsers_companyUsers_users_roles[] | null;
}

export default function TeamManagement(props: {path?: string}) {
  const classes = useStyles()
  const [selected, setSelected] = useState<string[]>([])
  const [team, setTeam] = useState("")
  const [memberList, setMemberList] = useState<CompanyUsers_companyUsers_users[]>([])
  const [filteredName, setFilteredName] = useState<string>("")
  const [errors, setErrors] = useState<string>("")
  
  const {state} = useGlobalState()
  const {loading, data, error, fetchMore} = useCompanyUsers({
    companyId: state.selectedCompany,
    teamId: team, 
    limit: LIMIT, 
    offset: 0
  });
  const [removeCompanyMember] = useRemoveCompanyMember({
    companyId: state.selectedCompany, 
    userIds: selected
  })

  // useEffect(() => {
  //   const handleOnScroll = () => {
  //     console.log("Scroll Event")

  //     let scrollTop = (document.documentElement && document.documentElement.scrollTop) ||
  //       document.body.scrollTop
  //     let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) ||
  //       document.body.scrollHeight
  //     let clientHeight = document.documentElement.clientHeight || window.innerHeight
  //     let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

  //     if (scrolledToBottom) {
  //       console.log("Scroll Bottom")
  //       fetchMore({
  //         variables: {
  //           companyId: state.selectedCompany,
  //           teamId: team, 
  //           limit: LIMIT, 
  //           offset: memberList.length
  //         },
  //         updateQuery: (previousQueryResult: CompanyUsers, options: {
  //           fetchMoreResult?: CompanyUsers;
  //           variables?: CompanyUsersVariables;
  //         }) => {
  //           const fetchMoreResult = idx(options, options => options.fetchMoreResult)
    
  //           if (!fetchMoreResult)
  //             return previousQueryResult
    
  //           return {
  //             companyUsers: {
  //               ...previousQueryResult.companyUsers, 
  //               users: [
  //                 ...previousQueryResult.companyUsers.users,
  //                 ...fetchMoreResult.companyUsers.users
  //               ]
  //             }
  //           }
    
  //         }
  //       })
  //     }
  //   }

  //   console.log("Add Event Listener")
  //   window.addEventListener("scroll", handleOnScroll, true)

  //   return () => {
  //     console.log("Remove Event Listener")
  //     window.removeEventListener("scroll", handleOnScroll, true)
  //   }
  // }, [])

  useEffect(() => {
    setTeam("")
    setSelected([])
  }, [state.selectedCompany])

  useEffect(() => {
    const usersList = idx(data, data => data.companyUsers.users);

    if (loading || !usersList) return;
    setMemberList(usersList)
    console.log("After fetching list", usersList)
  }, [idx(data, data => data.companyUsers.users)])

  const handleClick = (event: React.MouseEvent<HTMLTableRowElement>, id: string) => {
    event.persist()

    if (event.metaKey || event.ctrlKey) {
      const selectedIndex = selected.indexOf(id);
      let newSelected: string[] = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id)
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1))
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1))
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1), 
        )
      }
  
      setSelected(newSelected)
    } else if (event.shiftKey) {
      let newSelected: string[] = selected

      if (selected.length > 0) {
        let startIndex = memberList.findIndex(member => member.id === id)
        let endIndex = memberList.findIndex(member => member.id === selected[selected.length - 1])
        startIndex > endIndex ? endIndex -= 1 : endIndex += 1
        newSelected = newSelected.concat(_.range(startIndex, endIndex).map(index => memberList[index].id))
      } else {
        let endIndex = memberList.findIndex(member => member.id === id)
        newSelected = newSelected.concat(_.range(0, endIndex + 1).map(index => memberList[index].id))
      }

      newSelected = newSelected.filter(
        (member: string, index: number, self: string[]) => self.indexOf(member) === index
      )

      setSelected(newSelected)
    } else {
      const selectedIndex = selected.indexOf(id)
      let newSelected: string[] = [];

      if (selectedIndex === -1) {
        newSelected.push(id)
      } else if (selectedIndex >= 0 && selected.length > 1) {
        newSelected.push(id)
      }

      setSelected(newSelected)
    }
  }

  const handleDelete = () => {
    if (confirm("Are you going to delete team members?")) {
      removeCompanyMember();

      let newMemberList = memberList
      selected.map(id => {
        newMemberList = newMemberList.filter(member => member.id !== id)
      })

      setSelected([])
      setMemberList(newMemberList)
    }
  }

  const handleChangeTeam = (newTeam: string) => {
    setTeam(newTeam)
  }

  const updateTeamMemberList = (params: UpdateTeamMemberProps) => {

    const findMember = memberList.findIndex(member => member.id === params.id)

    if (findMember >= 0) {
      // Update member
      let newList: CompanyUsers_companyUsers_users[] = memberList

      if (params.companies && params.companies.find(company => company.id === state.selectedCompany)) {
        newList[findMember] = {
          ...params,
          __typename: 'User',
        } as CompanyUsers_companyUsers_users
      } else {
        newList = newList.filter((member, index) => index !== findMember)
      }
      setMemberList([
        ...newList
      ])
    } else {
      // Add member
      setMemberList([
        ...memberList, 
        {
          ...params,
          __typename: 'User',
          profileUrl: '',
        } as CompanyUsers_companyUsers_users
      ])
    }
  }

  const isSelected = (id: string) => selected.indexOf(id) !== -1

  const isOpen = () => selected.length > 0

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
    error ?
    <FlashMessage
      variant="warning"
      message="Loading error"
    /> : (
    <div className={classes.root}>
      { errors && 
        <FlashMessage
          variant="warning"
          message={errors}
        />
      }
      <Paper className={clsx(classes.paper, isOpen() && classes.paperShift)} elevation={0}>
        <TableToolbar 
          selected={selected.length}
          handleDelete={handleDelete}
          company={state.selectedCompany}
          updateMemberList={updateTeamMemberList}
          setErrors={setErrors}
        />
        { data && data.companyUsers.company && data.companyUsers.company.teams && 
          <Searchbar 
            data={data.companyUsers.company.teams} 
            filteredName={filteredName}
            handleChangeFiltered={(newValue) => setFilteredName(newValue)}
            value={team} 
            handleUpdate={handleChangeTeam} 
          />
        }
        <div className={classes.tableWrapper}>
          <Table 
            className={classes.table} 
            aria-labelledby="Team Management Table"
          >
            <TableHeader />
            <TableBody>
              { memberList && 
                memberList
                .filter(member => member.fullName.includes(filteredName))
                .map(user => {
                  const isItemSelected = isSelected(user.id)
                  let role: CompanyUsers_companyUsers_users_roles | null = null
                  let teams: CompanyUsers_companyUsers_users_teams[] = []

                  if (user.teams) {
                    teams = user.teams.filter(team => team.companyId === state.selectedCompany)
                  }
                  
                  if (user.roles) {
                    role = user.roles.filter(role => role.companyId === state.selectedCompany)[0]
                  }
                  
                  return (
                    <StyledTableRow
                      key={`member-${user.id}`} 
                      role="team member"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}
                      onClick={(event: React.MouseEvent<HTMLTableRowElement>) => handleClick(event, user.id)}
                      hover
                    >
                      <StyledTableCell style={{paddingLeft: '31px'}}>
                        <div className={classes.flex} style={{alignItems: 'center'}}>
                          { user.profileUrl ?
                            <img 
                              className={classes.round} 
                              src={user.profileUrl}
                              width="30" 
                              height="30" 
                              alt="Alana" 
                            /> : 
                            <DefaultUserImage width={30} height={30} userName={user.fullName} />
                          }
                          <span style={{marginLeft: '18px'}}>{user.fullName}</span>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div className={classes.flex}>
                          { user.companies && user.companies.slice(0, 2).map(company => 
                              <StyledItem 
                                key={`${user.fullName}-${company.id}`}
                                label={company.name} 
                                selected={isItemSelected}
                              />
                            )
                          }
                          { user.companies && user.companies.length > 2 &&
                            <ArrowTooltip 
                              title={renderTooltipTitle(user.companies.map(a => a.name).slice(2))} 
                              placement="top"
                            >
                              <StyledItem
                                label={`+${user.companies.length - 2}`}
                                selected={isItemSelected}
                              />
                            </ArrowTooltip>
                          }
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>
                        { (teams.length > 0) ? 
                          <div className={classes.flex}>
                            { teams.slice(0, 2).map(team => 
                                <StyledItem 
                                  key={`${user.fullName}-${team.id}`}
                                  label={team.name} 
                                  selected={isItemSelected}
                                />
                              )
                            }
                            { teams && teams.length > 2 &&
                              <ArrowTooltip 
                                title={renderTooltipTitle(teams.map(a => a.name).slice(2))} 
                                placement="top"
                              >
                                <StyledItem
                                  label={`+${teams.length - 2}`}
                                  selected={isItemSelected}
                                />
                              </ArrowTooltip>
                            }
                          </div> : "No Teams"
                        }
                        
                      </StyledTableCell>
                      { role && 
                        <StyledTableCell>{role.name}</StyledTableCell>
                      }
                    </StyledTableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </div>
      </Paper>

      { selected.length > 0 && 
        <DetailPane 
          id={selected[0]} 
          open={isOpen()} 
          company={state.selectedCompany}
          handleClose={() => setSelected([])}
          updateMemberList={updateTeamMemberList}
          setErrors={setErrors}
        />
      }
    </div>
  )
}