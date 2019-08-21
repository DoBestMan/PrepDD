import React, {useEffect} from 'react'
import clsx from 'clsx'
import idx from 'idx'
import _ from 'lodash'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import {
  Paper,
  Table,
  TableBody,
  TablePagination
} from '@material-ui/core'

import LoadingFallback from '../../components/LoadingFallback'
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
import { canNotDefineSchemaWithinExtensionMessage } from 'graphql/validation/rules/LoneSchemaDefinition';

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

const DefaultPhoto = require('images/dummy/photos/Alana.jpg')
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
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [team, setTeam] = React.useState("")
  const [memberList, setMemberList] = React.useState<CompanyDetails_company_users[] | TeamDetails_team_users[]>([])

  const {state} = useGlobalState()
  const { loading, data, error } = useCompanyDetails({id: state.selectedCompany})
  const [removeCompanyMember] = useRemoveCompanyMember({
    companyId: state.selectedCompany, 
    userIds: selected
  })

  useEffect(() => {
    const usersList = idx(data, data => data.company.users);

    if (loading || !usersList) return;
    setMemberList(usersList)
  }, [idx(data, data => data.company.users)])

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleDelete = () => {
    if (confirm("Are you going to delete team members?")) {
      removeCompanyMember()
    }
  }

  const handleChangeTeam = (newTeam: string) => {
    setTeam(newTeam)
    // useTeamDetails({id: newTeam})
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
                { memberList && memberList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: CompanyDetails_company_users, index: number) => {
                    const isItemSelected = isSelected(row.id)
                    
                    return (
                      <StyledTableRow
                        hover
                        onClick={(event: React.MouseEvent<HTMLTableRowElement>) => handleClick(event, row.id)}
                        role="team member"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={`member-${row.id}`}
                        selected={isItemSelected}
                      >
                        <StyledTableCell>
                          <div className={classes.flex} style={{alignItems: 'center'}}>
                            <img 
                              className={classes.round} 
                              src={DefaultPhoto}
                              width="30" 
                              height="30" 
                              alt="Alana" 
                            />
                            <span style={{marginLeft: '18px'}}>{row.fullName}</span>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell>
                          <div className={classes.flex}>
                            { row.companies && row.companies.slice(0, 2).map(company => 
                                <StyledItem 
                                  key={`${row.fullName}-${company.id}`}
                                  label={company.name} 
                                  selected={isItemSelected}
                                />
                              )
                            }
                            { row.companies && row.companies.length > 2 &&
                              <ArrowTooltip 
                                title={renderTooltipTitle(row.companies.map(a => a.name).slice(2))} 
                                placement="top"
                              >
                                <StyledItem
                                  label={`+${row.companies.length - 2}`}
                                  selected={isItemSelected}
                                />
                              </ArrowTooltip>
                            }
                          </div>
                        </StyledTableCell>
                        <StyledTableCell>
                          <div className={classes.flex}>
                            { row.teams && row.teams.slice(0, 2).map(team => 
                                <StyledItem 
                                  key={`${row.fullName}-${team.id}`}
                                  label={team.name} 
                                  selected={isItemSelected}
                                />
                              )                      
                            }
                            { row.teams && row.teams.length > 2 &&
                              <ArrowTooltip 
                                title={renderTooltipTitle(row.teams.map(a => a.name).slice(2))} 
                                placement="top"
                              >
                                <StyledItem
                                  label={`+${row.teams.length - 2}`}
                                  selected={isItemSelected}
                                />
                              </ArrowTooltip>
                            }
                          </div>
                        </StyledTableCell>
                        { row.roles && row.roles[0].name && 
                          <StyledTableCell>{row.roles[0].name}</StyledTableCell>
                        }
                      </StyledTableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </div>

          { memberList && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={memberList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'previous page',
              }}
              nextIconButtonProps={{
                'aria-label': 'next page',
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          )}
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