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

type roleType = 'Member' | 'Admin'

interface Company {
  url: string;
  label: string;
}

interface Data {
  name: string;
  companies: Company[];
  teams: string[];
  role: roleType;
}

function createData(
  name: string, 
  companies: Company[], 
  teams: string[], 
  role: roleType
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },
    flex: {
      display: 'flex'
    },
    grow: {
      flexGrow: 1
    },
    paper: {

    },
    paperShift: {

    },
    tableWrapper: {

    },
    table: {

    },
  })
)

function desc<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function stableSort<T>(array: T[], cmp: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

type Order = 'asc' | 'desc'

function getSorting<K extends keyof any>(
  order: Order, 
  orderBy: K
  ): (a: { [key in K]: number | string }, b: { [key in K]: number | string }) => number {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy)
}

export default function TeamManagement(props: {path?: string}) {
  const classes = useStyles()
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>('name')
  const [selected, setSelected] = React.useState<number[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  function handleRequestSort(event: React.MouseEvent<unknown>, property: keyof Data) {
    const isDesc = orderBy === property && order === 'desc'
    setOrder(isDesc ? 'asc' : 'desc')
    setOrderBy(property)
  }

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
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            {/* <TableBody>
              { stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                      <TableCell>
                        <StyledCheckBox checked={isItemSelected}/>
                      </TableCell>
                      <TableCell>
                        <div className={classes.flex}>
                          <img src="../assets/img/photos/Alana.jpg" width="30" height="30" alt="Alana" />
                          <div style={{marginLeft: "18px"}}>{row.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        { 
                          row.companies.map(company => {
                            <StyledItem logo={company.url} label={company.label} />
                          })
                        }
                      </TableCell>
                      <TableCell>
                        { row.teams.map(team => {
                            <StyledItem label={team} />
                          })                          
                        }
                      </TableCell>
                      <TableCell>{row.role}</TableCell>
                    </StyledTableRow>
                  )
                })
              }
            </TableBody> */}
          </Table>
        </div>
      </Paper>
    </div>
  )
}