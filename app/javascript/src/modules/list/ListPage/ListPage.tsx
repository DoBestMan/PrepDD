import React from 'react';
import clsx from 'clsx';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import DetailPage from './components/DetailPage';
import EnhancedTableToolbar from './components/TableToolbar';
import EnhancedTableHead from './components/TableHead';
import {
  StyledButton,
  StyledTableRow,
  StyledTableCell,
} from './components/styled';
import useStyles from './style';

const G2Logo = require('images/dummy/logos/g2-logo.svg');
const PrepddLogo = require('images/logos/prepdd-logo.svg');
const Drag = require('images/dummy/logos/drag.svg');
const DragSelect = require('images/dummy/logos/drag-black.svg');

interface Data {
  company: string;
  name: string;
  status: string;
  statusText: string;
  modified: string;
}

function createData(
  company: string,
  name: string,
  status: string,
  statusText: string,
  modified: string
): Data {
  return {company, name, status, statusText, modified};
}

const rows = [
  createData(
    'G2 Crowd',
    'List Title',
    'high',
    '34/36 complete',
    'Edited 5 hours ago'
  ),
  createData('G2 Crowd', 'List Title', 'medium', '34/36 complete', 'Date/Time'),
  createData(
    'G2 Crowd',
    'Get this done now, please complete this one',
    'low',
    '34/36 complete',
    'Date/Time'
  ),
  createData(
    'G2 Crowd',
    'List Title',
    'high',
    '34/36 complete',
    'Edited 5 hours ago'
  ),
  createData(
    'G2 Crowd',
    'List Title',
    'high',
    '34/36 complete',
    'Edited 5 hours ago'
  ),
  createData(
    'G2 Crowd',
    'List Title',
    'high',
    '34/36 complete',
    'Edited 5 hours ago'
  ),
  createData(
    'G2 Crowd',
    'List Title',
    'high',
    'Complete',
    'Edited 5 hours ago'
  ),
  createData(
    'G2 Crowd',
    'A longer list title',
    'high',
    'Complete',
    'Edited 5 hours ago'
  ),
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
];

function desc<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort<T>(array: T[], cmp: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

type Order = 'asc' | 'desc';

function getSorting<K extends keyof any>(
  order: Order,
  orderBy: K
): (
  a: {[key in K]: number | string},
  b: {[key in K]: number | string}
) => number {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

export default function List(props: {path?: string}) {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('company');
  const [selected, setSelected] = React.useState<number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  function handleRequestSort(
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleSelectAllClick(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      const newSelecteds = rows.map((row: Data, index: number) => index);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  function handleClick(event: React.MouseEvent<unknown>, id: number) {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event: unknown, newPage: number) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const isOpen = () => selected.length > 0;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const renderStatus = (status: string) => {
    if (status === 'high') {
      return <div className={clsx(classes.high, classes.statusBadge)} />;
    } else if (status === 'medium') {
      return <div className={clsx(classes.medium, classes.statusBadge)} />;
    } else {
      return <div className={clsx(classes.low, classes.statusBadge)} />;
    }
  };

  return (
    <div className={classes.root}>
      <Paper
        className={clsx(classes.paper, isOpen() && classes.paperShift)}
        elevation={0}
      >
        <EnhancedTableToolbar />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
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
                .map((row: Data, index: number) => {
                  const isItemSelected = isSelected(index);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <StyledTableRow
                      hover
                      onClick={(event: React.MouseEvent<unknown>) =>
                        handleClick(event, index)
                      }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`table-${index}`}
                      selected={isItemSelected}
                    >
                      <StyledTableCell padding="checkbox">
                        <div className={classes.flex}>
                          {isItemSelected ? (
                            <img src={DragSelect} alt="Drag" />
                          ) : (
                            <img src={Drag} alt="Drag" />
                          )}
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{'aria-labelledby': labelId}}
                            color="primary"
                          />
                        </div>
                      </StyledTableCell>
                      <StyledTableCell id={labelId} scope="row">
                        <div className={classes.flex}>
                          {row.company === 'G2 Crowd' ? (
                            <img
                              src={G2Logo}
                              alt="G2 Crowd"
                              width="18"
                              height="18"
                            />
                          ) : (
                            <img
                              src={PrepddLogo}
                              alt="PrepDD"
                              width="18"
                              height="18"
                            />
                          )}
                          <div
                            className={classes.textFlow}
                            style={{marginLeft: '5px'}}
                          >
                            {row.company}
                          </div>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div className={classes.textFlow}>{row.name}</div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div className={classes.flex}>
                          {renderStatus(row.status)}
                          <div
                            className={classes.textFlow}
                            style={{marginLeft: '10px'}}
                          >
                            {row.statusText}
                          </div>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div
                          className={clsx(classes.flex, classes.alignCenter)}
                        >
                          <div className={classes.textFlow}>{row.modified}</div>
                          <div className={classes.grow} />
                          <StyledButton
                            className={clsx(
                              classes.invisibleButton,
                              isItemSelected && classes.visibleButton
                            )}
                            variant="outlined"
                            color="primary"
                            size="small"
                          >
                            View list
                          </StyledButton>
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              {emptyRows > 0 && (
                <StyledTableRow style={{height: 42 * emptyRows}}>
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
      <DetailPage open={isOpen()} />
    </div>
  );
}
