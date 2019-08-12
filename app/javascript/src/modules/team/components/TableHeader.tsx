import React from 'react'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import { 
  TableHead, 
  TableRow, 
  TableSortLabel
} from '@material-ui/core'

import StyledTableCell from '../../../components/StyledTableCell'
import StyledCheckBox from '../../../components/StyledCheckBox'

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

interface HeadRows {
  id: keyof Data;
  label: string;
}

const headRows: HeadRows[] = [
  { id: 'name', label: 'Name'}, 
  { id: 'companies', label: 'Company(s)'},
  { id: 'teams', label: 'Team(s)'}, 
  { id: 'role', label: 'Role'}
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    visuallyHidden: {
      border: 0, 
      clip: 'rect(0 0 0 0)',
      height: 1, 
      margin: -1, 
      overflow: 'hidden',
      padding: 0, 
      position: 'absolute', 
      top: 20, 
      width: 1
    },
  })
)

type Order = 'asc' | 'desc'

interface TableHeaderProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export default function TableHeader(props: TableHeaderProps) {
  const {
    order, 
    orderBy, 
    numSelected, 
    rowCount, 
    onRequestSort,
    onSelectAllClick, 
  } = props
  const classes = useStyles()

  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }
  
  return (
    <TableHead>
      <TableRow>
        <StyledTableCell padding="checkbox">
          <StyledCheckBox 
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{'aria-label': 'select all companies'}}
          />
        </StyledTableCell>
        {headRows.map(row => (
          <StyledTableCell
            key={row.id}
            align="left"
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
              {orderBy === row.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}