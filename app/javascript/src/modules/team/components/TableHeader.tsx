import React from 'react'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import { 
  TableHead
} from '@material-ui/core'

import StyledTableRow from './styled/StyledTableRow'
import StyledTableCell from './styled/StyledTableCell'

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

export default function TableHeader() {  
  return (
    <TableHead>
      <StyledTableRow>
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