import React from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Container, 
  Typography,
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
} from '@material-ui/core';

import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      height: 'calc(100vh - 162px)', 
      borderBottom: '1px solid #D8D8D8'
    }, 
    title: {
      display: 'flex', 
      alignItems: 'center', 
    },
    content: {
      marginTop: '48px', 
    }
  })
);

const data = [
  {
    task: 'Task Title', 
    section: 'Section Name', 
    priority: 'High', 
    description: 'Description text', 
  },
  {
    task: 'Task Title', 
    section: 'Section Name', 
    priority: 'High', 
    description: 'Add...', 
  },
  {
    task: 'Task Title', 
    section: 'Section Name', 
    priority: 'High', 
    description: 'Add...', 
  },
  {
    task: 'Task Title', 
    section: 'Section Name', 
    priority: 'High', 
    description: 'Add...', 
  },
  {
    task: 'Task Title', 
    section: 'Section Name', 
    priority: 'High', 
    description: 'Add...', 
  },
]

export default function Body() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.title}>
          <Typography variant="h2">
            Select List
          </Typography>
          <ArrowDownIcon fontSize="large" />
        </div>
        <div className={classes.content}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell>Section</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Description</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{item.task}</TableCell>
                    <TableCell>{item.section}</TableCell>
                    <TableCell>{item.priority}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell />
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </Container>
    </div>
  )
}