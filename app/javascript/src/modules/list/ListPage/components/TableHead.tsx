import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useStyles from '../style';

import {StyledTableCell} from './styled';

const Drag = require('images/dummy/logos/drag.svg');

interface Data {
  company: string;
  name: string;
  status: string;
  statusText: string;
  modified: string;
}

interface HeadRow {
  id: keyof Data;
  label: string;
}

const headRows: HeadRow[] = [
  {id: 'company', label: 'Company'},
  {id: 'name', label: 'Name'},
  {id: 'statusText', label: 'Status'},
  {id: 'modified', label: 'Modified'},
];

type Order = 'asc' | 'desc';

interface EnhancedTableHeadProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const EnhancedTableHead = (props: EnhancedTableHeadProps) => {
  const {
    classes,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    onSelectAllClick,
  } = props;

  const createSortHandler = (property: keyof Data) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell padding="checkbox">
          <div className={classes.flex}>
            <img src={Drag} alt="Drag" className={classes.invisibleButton} />
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{'aria-label': 'select all companies'}}
              color="primary"
            />
          </div>
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
  );
};

export default EnhancedTableHead;
