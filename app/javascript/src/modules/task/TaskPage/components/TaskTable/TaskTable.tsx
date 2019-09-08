import React from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
} from '@material-ui/core';

import StyledItem from './components/StyledItem';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {},
  })
);

const data = [
  { name: 'Task Title', status: 'Completed', modified: 'Edited 5 hours ago' }, 
  { name: 'Task Title', status: 'Delivered', modified: 'Date/Time' }, 
  { name: 'A longer task', status: 'Finished', modified: 'Date/Time' }, 
  { name: 'Task Title', status: 'In Progress', modified: 'Edited 5 hours ago' }, 
  { name: 'Task Title', status: 'Not Started', modified: 'Edited 5 hours ago' }, 
  { name: 'Task Title', status: 'Rejected', modified: 'Edited 5 hours ago' }, 
  { name: 'Task Title', status: 'Not Started', modified: 'Edited 5 hours ago' }, 
  { name: 'Task Title', status: 'Not Started', modified: 'Edited 5 hours ago' }, 
  { name: 'Task Title', status: 'Not Started', modified: 'Edited 5 hours ago' }, 
  { name: 'Task Title', status: 'Not Started', modified: 'Edited 5 hours ago' }, 
]

export default function TaskTable() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>Task</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Modified</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {data && data.map((item: any, index: number) => {
          return (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <StyledItem status={item.status} />
              </TableCell>
              <TableCell>{item.modified}</TableCell>
              <TableCell />
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  )
}