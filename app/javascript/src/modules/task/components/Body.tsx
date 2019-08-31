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
  Button, 
} from '@material-ui/core';

import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';
import UploadIcon from '@material-ui/icons/CloudUpload';

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
      display: 'flex', 
      marginTop: '48px', 
    }, 
    rightPane: {
      minWidth: '270px', 
      marginLeft: '72px', 
    }, 
    uploadArea: {
      width: '100%', 
      height: '100%', 
      border: '2px dashed #D8D8D8', 
      borderRadius: '3px', 
      marginTop: '30px', 
      paddingTop: '50px', 
      color: '#D8D8D8', 
      textAlign: 'center', 
    }, 
    secondary: {
      color: '#D8D8D8', 
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
          <div className={classes.rightPane}>
            <Button variant="outlined">
              Download Import Template
            </Button>
            <div className={classes.uploadArea}>
              <UploadIcon style={{fontSize: '120px'}} />
              <br />
              <Typography variant="h4" className={classes.secondary}>
                Drag and Drop/
                <br />
                Import Tasks
              </Typography>           
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}