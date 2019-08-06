import React from 'react'
import PropTypes from 'prop-types'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'

import {
  StyledTableCell, 
  StyledCheckBox
} from './styled/content'

const headRows = [
  { id: 'company', numeric: false, disablePadding: true, label: 'Company' },
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'statusText', numeric: false, disablePadding: true, label: 'Status' },
  { id: 'modified', numeric: false, disablePadding: true, label: 'Modified' }
]

const EnhancedTableHead = (props) => {
  const { 
    classes, 
    onSelectAllClick, 
    order, 
    orderBy, 
    numSelected, 
    rowCount, 
    onRequestSort 
  } = props

  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell padding="checkbox">
          <img src="assets/img/logos/drag.svg" alt="Drag" className={classes.invisibleButton} />
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

EnhancedTableHead.props = {
  classes: PropTypes.object.isRequired, 
  numSelected: PropTypes.number.isRequired, 
  onRequestSort: PropTypes.func.isRequired, 
  onSelectAllClick: PropTypes.func.isRequired, 
  order: PropTypes.oneOf(['asc', 'desc']).isRequired, 
  orderBy: PropTypes.string.isRequired, 
  rowCount: PropTypes.number.isRequired
}

export default EnhancedTableHead