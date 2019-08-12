import React from 'react'
import clsx from 'clsx'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import {
  Paper,
  Table,
  TableBody,
  TableCell
} from '@material-ui/core'

import TableToolbar from './components/TableToolbar'
import Searchbar from './components/Searchbar'
import TableHeader from './components/TableHeader'
import StyledTableRow from './components/StyledTableRow'
import StyledTableCell from './components/StyledTableCell'
import StyledCheckBox from '../../components/StyledCheckBox'
import StyledItem from './components/StyledItem'

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

const rows = [
  createData('Guy Number 1', [{url: '../assets/img/logos/g2-logo.svg', label: 'G2 Crowd'}, {url: '../assets/img/logos/drip-logo.svg', label: 'Drip'}], ['Finance', 'Legal', 'Human Resource'], 'Member'),
  createData('Guy Number 2', [{url: '../assets/img/logos/domo-logo.svg', label: 'Domo'}], ['Finance'], 'Admin'),
  createData('Guy Number 1', [{url: '../assets/img/logos/g2-logo.svg', label: 'G2 Crowd'}, {url: '../assets/img/logos/drip-logo.svg', label: 'Drip'}], ['Finance', 'Legal', 'Human Resource'], 'Member'),
  createData('Guy Number 2', [{url: '../assets/img/logos/domo-logo.svg', label: 'Domo'}], ['Finance'], 'Admin'),
  createData('Guy Number 1', [{url: '../assets/img/logos/g2-logo.svg', label: 'G2 Crowd'}, {url: '../assets/img/logos/drip-logo.svg', label: 'Drip'}], ['Finance', 'Legal', 'Human Resource'], 'Member'),
  createData('Guy Number 2', [{url: '../assets/img/logos/domo-logo.svg', label: 'Domo'}], ['Finance'], 'Admin'),
  createData('Guy Number 1', [{url: '../assets/img/logos/g2-logo.svg', label: 'G2 Crowd'}, {url: '../assets/img/logos/drip-logo.svg', label: 'Drip'}], ['Finance', 'Legal', 'Human Resource'], 'Member'),
  createData('Guy Number 2', [{url: '../assets/img/logos/domo-logo.svg', label: 'Domo'}], ['Finance'], 'Admin'),
  createData('Guy Number 1', [{url: '../assets/img/logos/g2-logo.svg', label: 'G2 Crowd'}, {url: '../assets/img/logos/drip-logo.svg', label: 'Drip'}], ['Finance', 'Legal', 'Human Resource'], 'Member'),
  createData('Guy Number 2', [{url: '../assets/img/logos/domo-logo.svg', label: 'Domo'}], ['Finance'], 'Admin'),
  createData('Guy Number 1', [{url: '../assets/img/logos/g2-logo.svg', label: 'G2 Crowd'}, {url: '../assets/img/logos/drip-logo.svg', label: 'Drip'}], ['Finance', 'Legal', 'Human Resource'], 'Member'),
  createData('Guy Number 2', [{url: '../assets/img/logos/domo-logo.svg', label: 'Domo'}], ['Finance'], 'Admin'),
  createData('Guy Number 1', [{url: '../assets/img/logos/g2-logo.svg', label: 'G2 Crowd'}, {url: '../assets/img/logos/drip-logo.svg', label: 'Drip'}], ['Finance', 'Legal', 'Human Resource'], 'Member'),
  createData('Guy Number 2', [{url: '../assets/img/logos/domo-logo.svg', label: 'Domo'}], ['Finance'], 'Admin'),
]

const panelWidth=594

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
    }
  })
)

export default function TeamManagement(props: {path?: string}) {
  const classes = useStyles()
  const [selected, setSelected] = React.useState<number[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  function handleSelectAllClick(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      const newSelecteds = rows.map((row: Data, index: number) => index)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  function handleClick(event: React.MouseEvent<unknown>, id: number) {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

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
  }

  function handleChangePage(event: unknown, newPage: number) {
    setPage(newPage)
  }

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const isSelected = (id: number) => selected.indexOf(id) !== -1

  const isOpen = () => selected.length > 0

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  return (
    <div className={classes.root}>
      <Paper className={clsx(classes.paper, isOpen() && classes.paperShift)} elevation={0}>
        <TableToolbar />
        <Searchbar />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="Team Management Table">
            <TableHeader
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              { rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: Data, index: number) => {
                  const isItemSelected = isSelected(index)
                  
                  return (
                    <StyledTableRow
                      hover
                      onClick={(event: React.MouseEvent<unknown>) => handleClick(event, index)}
                      role="team member"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`member-${index}`}
                      selected={isItemSelected}
                    >
                      <StyledTableCell style={{width: '20px'}}>
                        <StyledCheckBox checked={isItemSelected}/>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div className={classes.flex}>
                          <img 
                            className={classes.round} 
                            src="../assets/img/photos/Alana.jpg" 
                            width="30" 
                            height="30" 
                            alt="Alana" 
                          />
                          <div style={{marginLeft: "18px"}}>{row.name}</div>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div className={classes.flex}>
                          { row.companies.map(company => 
                              <StyledItem logo={company.url} label={company.label} selected={isItemSelected} />
                            )
                          }
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div className={classes.flex}>
                          { row.teams.map(team => 
                              <StyledItem label={team} selected={isItemSelected}  />
                            )                          
                          }
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>{row.role}</StyledTableCell>
                    </StyledTableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </div>
      </Paper>
    </div>
  )
}