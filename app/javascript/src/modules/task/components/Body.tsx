import React from 'react';
import clsx from 'clsx';
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
  Badge,
} from '@material-ui/core';

import DefaultUserImage from '../../common/DefaultUserImage';
import StyledBadge from './StyledBadge';

import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';
import UploadIcon from '@material-ui/icons/CloudUpload';
import SmsIcon from '@material-ui/icons/SmsOutlined';
import ListIcon from '@material-ui/icons/ListAlt';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 'calc(100vh - 162px)',
      borderBottom: '1px solid #D8D8D8',
    },
    flex: {
      display: 'flex',
      alignItems: 'center',
    },
    content: {
      display: 'flex',
      marginTop: '48px',
    },
    rightPane: {
      minWidth: '200px',
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
    uploadButton: {
      width: '100%', 
      height: '42px', 
      padding: '0px',       
    },
    uploadLabelColor: {
      color: '#D8D8D8',
    },
    image: {
      width: '24px',
      height: '24px',
      marginRight: '12px',
      backgroundColor: '#2792A2',
    },
    badge: {
      width: '8px',
      height: '8px',
      backgroundColor: '#6EB81D',
    },
    statusLabelColor: {
      color: '#606060',
    },
    status: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      marginRight: '6px',
    },
    high: {
      backgroundColor: '#2792A2',
    },
    medium: {
      backgroundColor: '#1969A5',
    },
    low: {
      backgroundColor: '#81AFFF',
    },
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
];

export default function Body() {
  const classes = useStyles();

  const renderPriority = (priority: string) => {
    return (
      <div className={classes.flex}>
        <div
          className={clsx(
            classes.status,
            priority === 'High'
              ? classes.high
              : priority === 'Medium'
              ? classes.medium
              : classes.low
          )}
        />
        <Typography variant="h6">{priority}</Typography>
      </div>
    );
  };

  const renderOthers = () => {
    return (
      <div className={classes.flex}>
        <DefaultUserImage userName="F" className={classes.image} />
        <StyledBadge
          variant="dot"
          color="primary"
          style={{marginRight: '12px'}}
        >
          <SmsIcon />
        </StyledBadge>
        <StyledBadge variant="dot" color="primary">
          <ListIcon />
        </StyledBadge>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.flex}>
          <Typography variant="h2">Select List</Typography>
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
                    <TableCell>{renderPriority(item.priority)}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell align="right">{renderOthers()}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className={classes.rightPane}>
            <Button variant="outlined" className={classes.uploadButton}>Download Template</Button>
            <div className={classes.uploadArea}>
              <UploadIcon style={{fontSize: '120px'}} />
              <br />
              <Typography variant="h4" className={classes.uploadLabelColor}>
                Drag and Drop/
                <br />
                Import Tasks
              </Typography>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
