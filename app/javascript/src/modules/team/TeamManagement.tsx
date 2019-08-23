import React, {useEffect, useMemo} from 'react'
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

import {useCompanyDetails} from '../../graphql/queries/CompanyDetails'
import {useTeamDetails} from '../../graphql/queries/TeamDetails'
import {useRemoveCompanyMember} from '../../graphql/mutations/RemoveCompanyMember'
import {CompanyDetails_company_users} from '../../graphql/queries/__generated__/CompanyDetails'
import {TeamDetails_team_users} from '../../graphql/queries/__generated__/TeamDetails'

interface Company {
  url: string;
  label: string;
}

interface Data {
  name: string;
  companies: Company[];
  teams: string[];
  role: string;
}

function createData(
  name: string, 
  companies: Company[], 
  teams: string[], 
  role: string
  ): Data {
  return { name, companies, teams, role }
}

const panelWidth=500

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
      width: `calc(100% - ${panelWidth}px)`,
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

export default function TeamManagement(props: {path?: string}) {
  const classes = useStyles()
  const [selected, setSelected] = React.useState<string[]>([])
  const [team, setTeam] = React.useState("")
  const [memberList, setMemberList] = React.useState<CompanyDetails_company_users[] | TeamDetails_team_users[]>([])

  const {state} = useGlobalState()
  const {loading, data, error} = useCompanyDetails({id: state.selectedCompany});
  const [removeCompanyMember] = useRemoveCompanyMember({
    companyId: state.selectedCompany, 
    userIds: selected
  })
  const responseTeam = useTeamDetails({id: team})

  useEffect(() => {
    setTeam("")
    setSelected([])
  }, [state.selectedCompany])

  useEffect(() => {
    const usersList = idx(data, data => data.company.users);

    if (loading || !usersList) return;
    usersList.sort(
      (a: CompanyDetails_company_users | TeamDetails_team_users, b: CompanyDetails_company_users | TeamDetails_team_users) => {
        if (+a.id > +b.id) return 1
        return -1
    })
    setMemberList(usersList)
  }, [idx(data, data => data.company.users)])

  useEffect(() => {
    const usersList = idx(responseTeam, responseTeam => responseTeam.data.team.users);

    if (!usersList) return;
    console.log("Team Fetch", usersList)
    setMemberList(usersList)
  }, [idx(responseTeam, responseTeam => responseTeam.data.team.users)])

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
      removeCompanyMember()
    }
  }

  const handleChangeTeam = (newTeam: string) => {
    setTeam(newTeam)
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
    (
      <div className={classes.root}>
        <Paper className={clsx(classes.paper, isOpen() && classes.paperShift)} elevation={0}>
          <TableToolbar 
            selected={selected.length}
            handleDelete={handleDelete}
            company={state.selectedCompany}
          />
          { data && data.company && data.company.teams && 
            <Searchbar data={data.company.teams} value={team} handleUpdate={handleChangeTeam} />
          }
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="Team Management Table">
              <TableHeader />
              <TableBody>
                { memberList && memberList.map(user => {
                    const isItemSelected = isSelected(user.id)
                    
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
                          { (user.teams && user.teams.length > 0) ? 
                            <div className={classes.flex}>
                              { user.teams.slice(0, 2).map(team => 
                                  <StyledItem 
                                    key={`${user.fullName}-${team.id}`}
                                    label={team.name} 
                                    selected={isItemSelected}
                                  />
                                )                      
                              }
                              { user.teams && user.teams.length > 2 &&
                                <ArrowTooltip 
                                  title={renderTooltipTitle(user.teams.map(a => a.name).slice(2))} 
                                  placement="top"
                                >
                                  <StyledItem
                                    label={`+${user.teams.length - 2}`}
                                    selected={isItemSelected}
                                  />
                                </ArrowTooltip>
                              }
                            </div> : "No Teams"
                          }
                          
                        </StyledTableCell>
                        { user.roles && user.roles[0].name && 
                          <StyledTableCell>{user.roles[0].name}</StyledTableCell>
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
          />
        }
      </div>
    )
}