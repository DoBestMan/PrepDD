import React from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';

import StyledTableRow from '../styled/StyledTableRow';
import StyledTableCell from '../styled/StyledTableCell';

type roleType = 'Member' | 'Admin';

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
  {id: 'name', label: 'Name'},
  {id: 'companies', label: 'Company(s)'},
  {id: 'teams', label: 'Team(s)'},
  {id: 'role', label: 'Role'},
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& th:first-child': {
        paddingLeft: '31px',
      },
    },
  })
);

export default function TableHeader() {
  const classes = useStyles();
  return (
    <TableHead className={classes.root}>
      <StyledTableRow>
        {headRows.map(row => (
          <StyledTableCell key={row.id} align="left" style={{zIndex: 1}}>
            {row.label}
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}
