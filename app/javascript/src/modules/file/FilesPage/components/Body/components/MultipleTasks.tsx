import React from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Paper, 
  Typography,
  Table, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell, 
  Checkbox, 
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteForever';

import * as cs from '../../../../../../constants/theme';
import VersionDropdown from './VersionDropdown';
import StatusLabel from '../../../../../common/StatusLabel';

const Excel = require('images/dummy/logos/excel.svg');

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    invisible: {
      display: 'none',
    },
    primary: {
      color: cs.COLORS.primary, 
    }, 
    flex: {
      display: 'flex', 
      alignItems: 'center', 
    }, 
    grow: {
      flexGrow: 1, 
    }, 
    selection: {
      width: '100%', 
      height: '56px', 
      borderBottom: '1px solid #D8D8D8', 
    },
    delete: {
      color: cs.COLORS.primary, 
      fontSize: '28px', 
      '&:hover': {
        border: `1px solid ${cs.COLORS.primary}`, 
        borderRadius: '3px', 
      }
    }
  })
);

interface MultipleTasksProps {
  value?: number;
  index?: number;
}

export default function MultipleTasks(props: MultipleTasksProps) {
  const {value, index} = props;
  const classes = useStyles();

  return (
    <Paper
      className={clsx(classes.root, value !== index && classes.invisible)}
      aria-labelledby="Multiple Tasks"
      elevation={0}
    >
      <div className={clsx(classes.selection, classes.flex)}>
        <Typography variant="h6" className={classes.primary}>
          2 files selected
        </Typography>
        <div className={classes.grow} />
        <DeleteIcon className={classes.delete} />
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox color="primary" />
            </TableCell>
            <TableCell>File</TableCell>
            <TableCell>List</TableCell>
            <TableCell>Task</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Comment</TableCell>
            <TableCell>Version</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox color="primary" />
            </TableCell>
            <TableCell>
              <div className={classes.flex}>
                <img src={Excel} width="18" height="18" />
                <Typography variant="h6">File name</Typography>
              </div>
            </TableCell>
            <TableCell>List Title</TableCell>
            <TableCell>Task Title</TableCell>
            <TableCell>
              <StatusLabel currentStatus="Start" selected />
            </TableCell>
            <TableCell>Add...</TableCell>
            <TableCell>
              <VersionDropdown value="Update" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}
