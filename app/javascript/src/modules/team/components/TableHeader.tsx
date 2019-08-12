import React from 'react'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import { 
  TableHead
} from '@material-ui/core'

import StyledTableRow from './StyledTableRow'
import StyledTableCell from './StyledTableCell'
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

interface TableHeaderProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  rowCount: number;
}

export default function TableHeader(props: TableHeaderProps) {
  const {
    numSelected, 
    rowCount, 
    onSelectAllClick, 
  } = props
  const classes = useStyles()
  
  return (
    <TableHead>
      <StyledTableRow>
        <StyledTableCell>
          <StyledCheckBox 
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{'aria-label': 'select all members'}}
          />
        </StyledTableCell>
        {headRows.map(row => (
          <StyledTableCell
            key={row.id}
            align="left"
          >
            {row.label}
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  )
}