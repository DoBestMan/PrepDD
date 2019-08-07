import React from 'react'
import clsx from 'clsx'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from '@material-ui/core/Paper'

import DetailPage from './components/DetailPage'
import EnhancedTableToolbar from './components/TableToolbar'
import EnhancedTableHead from './components/TableHead'
import {
  StyledButton, 
  StyledTableRow, 
  StyledTableCell, 
  StyledCheckBox
} from './components/styled'
import useStyles from './style'

function createData(company, name, status, statusText, modified) {
  return { company, name, status, statusText, modified}
}

const rows = [
  createData('G2 Crowd', 'List Title', 'high', '34/36 complete', 'Edited 5 hours ago'),
  createData('G2 Crowd', 'List Title', 'medium', '34/36 complete', 'Date/Time'),
  createData('G2 Crowd', 'Get this done now, pl...', 'low', '34/36 complete', 'Date/Time'),
  createData('G2 Crowd', 'List Title', 'high', '34/36 complete', 'Edited 5 hours ago'),
  createData('G2 Crowd', 'List Title', 'high', '34/36 complete', 'Edited 5 hours ago'),
  createData('G2 Crowd', 'List Title', 'high', '34/36 complete', 'Edited 5 hours ago'),
  createData('G2 Crowd', 'List Title', 'high', 'Complete', 'Edited 5 hours ago'),
  createData('G2 Crowd', 'A longer list title', 'high', 'Complete', 'Edited 5 hours ago'),
  createData('PrepDD', 'List Title', 'high', 'Complete', 'Edited 5 hours ago'),
  createData('PrepDD', 'List Title', 'high', 'Complete', 'Edited 5 hours ago'),
  createData('PrepDD', 'List Title', 'high', 'Complete', 'Edited 5 hours ago'),
  createData('PrepDD', 'List Title', 'high', 'Complete', 'Edited 5 hours ago'),
  createData('PrepDD', 'List Title', 'high', 'Complete', 'Edited 5 hours ago'),
  createData('PrepDD', 'List Title', 'high', 'Complete', 'Edited 5 hours ago'),
  createData('PrepDD', 'List Title', 'high', 'Complete', 'Edited 5 hours ago'),
  createData('PrepDD', 'List Title', 'high', 'Complete', 'Edited 5 hours ago'),
  createData('PrepDD', 'List Title', 'high', 'Complete', 'Edited 5 hours ago'),
  createData('PrepDD', 'List Title', 'high', 'Complete', 'Edited 5 hours ago'),
]

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy)
}

export default function EnhancedTable() {
  const classes = useStyles()
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('company')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc'
    setOrder(isDesc ? 'asc' : 'desc')
    setOrderBy(property)
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rows.map((row, index) => index)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  function handleClick(event, name) {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
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

  function handleChangePage(event, newPage) {
    setPage(newPage)
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const isSelected = id => selected.indexOf(id) !== -1

  const isOpen = () => selected.length > 0

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  const renderStatus = (status) => {
    if (status === 'high') {
      return <div className={clsx(classes.high, classes.statusBadge)} />
    } else if (status === 'medium') {
      return <div className={clsx(classes.medium, classes.statusBadge)} />
    } else {
      return <div className={clsx(classes.low, classes.statusBadge)} />
    }
  }

  return (
    <div className={classes.root}>
      <Paper className={clsx(classes.paper, isOpen() && classes.paperShift)} elevation={0}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(index)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <StyledTableRow
                      hover
                      onClick={event => handleClick(event, index)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`table-${index}`}
                      selected={isItemSelected}
                    >
                      <StyledTableCell padding="checkbox">
                        <div className={classes.flex}>
                          { isItemSelected ?
                            <img src="../assets/img/logos/drag-black.svg" alt="Drag" /> :
                            <img src="../assets/img/logos/drag.svg" alt="Drag" />
                          }
                          <StyledCheckBox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </div>
                      </StyledTableCell>
                      <StyledTableCell id={labelId} scope="row">
                        <div className={classes.flex}>
                          { row.company === "G2 Crowd" ?
                            <img src="../assets/img/logos/g2-logo.svg" alt="G2 Crowd" width="18" height="18" /> :
                            <img src="../assets/img/logos/prepdd-logo.svg" alt="PrepDD" width="18" height="18" />
                          }
                          <span style={{marginLeft: "5px"}}>{row.company}</span>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>{row.name}</StyledTableCell>
                      <StyledTableCell>
                        <div className={classes.flex}>
                          {renderStatus(row.status)}
                          <span style={{marginLeft: "10px"}}>{row.statusText}</span>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div className={clsx(classes.flex, classes.alignCenter)}>
                          <span>{row.modified}</span>
                          <div className={classes.grow} />
                          <StyledButton
                            className={clsx(classes.invisibleButton, isItemSelected && classes.visibleButton)}
                            variant="outlined" 
                            color="primary"
                            size="small"
                          >
                            View list
                          </StyledButton>
                        </div>                        
                      </StyledTableCell>
                    </StyledTableRow>
                  )
                })}
              {emptyRows > 0 && (
                <StyledTableRow style={{ height: 51 * emptyRows }}>
                  <StyledTableCell colSpan={6} />
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
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
      </Paper>
      <DetailPage open={isOpen()}/>
    </div>
  )
}
