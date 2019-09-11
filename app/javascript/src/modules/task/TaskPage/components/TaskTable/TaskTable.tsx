import React, {useState} from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Paper, 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  Typography, 
} from '@material-ui/core';
import SmsIcon from '@material-ui/icons/SmsOutlined';
import ListIcon from '@material-ui/icons/ListAlt';
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';
import RightIcon from '@material-ui/icons/KeyboardArrowRightSharp';

import DefaultUserImage from '../../../../common/DefaultUserImage';
import StyledItem from './components/StyledItem';
import StyledBadge from './components/StyledBadge';

import {UserTasks_userTasks} from '../../../../../graphql/queries/__generated__/UserTasks'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      height: 'calc(100vh - 138px)', 
      overflow: 'auto', 
    },
    table: {
      tableLayout: 'fixed', 
    },
    flex: {
      display: 'flex', 
      alignItems: 'center', 
    },
    image: {
      width: '24px', 
      height: '24px', 
      marginRight: '12px', 
      backgroundColor: '#2792A2', 
    },
    textFlow: {
      display: 'inline-block',
      width: 'fit-content',
      maxWidth: 'calc(80%)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    unHoverRow: {
      opacity: 0.6, 
    },
    hoverRow: {
      opacity: 1, 
    }, 
    miniColumn: {
      paddingRight: '16px', 
      width: '20px', 
    },
    priorityColumn: {
      color: '#509E6D',
      paddingTop: '6px',
    },
  })
);

interface TaskTableProps {
  tasks: UserTasks_userTasks[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TaskTable(props: TaskTableProps) {
  const {
    tasks, 
    setOpen
  } = props;
  const classes = useStyles();
  const [hover, setHover] = useState<number>(-1);

  const renderOthers = (isSelected: boolean) => {
    return (
      <div className={clsx(classes.flex, isSelected ? classes.hoverRow : classes.unHoverRow)}>
        <DefaultUserImage userName="F" className={classes.image} />
        <StyledBadge variant="dot" color="primary" style={{marginRight: '12px'}}>
          <SmsIcon />
        </StyledBadge>
        <StyledBadge variant="dot" color="primary">
          <ListIcon />
        </StyledBadge>
      </div>
    )
  }

  return (
    <Paper
      className={classes.root}
      elevation={0}
    >
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.miniColumn}>
              <ArrowDownIcon />
            </TableCell>
            <TableCell className={classes.miniColumn}>#</TableCell>
            <TableCell>Task</TableCell>
            <TableCell style={{width: '180px'}} >Status</TableCell>
            <TableCell style={{width: '200px'}} >Modified</TableCell>
            <TableCell align="right" style={{width: '150px'}} />
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks && tasks.map((task: UserTasks_userTasks, index: number) => {
            const isSelected = hover === index;

            return (
              <TableRow 
                key={index} 
                onClick={() => setOpen(open => !open)}
                onMouseOver={() => setHover(index)}
              >
                <TableCell className={classes.priorityColumn}>
                  {task.priority === 'high' && <RightIcon />}
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Typography variant="h6" className={classes.textFlow}>
                    {task.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <StyledItem currentStatus={task.status as string} selected={isSelected} />
                </TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>{renderOthers(isSelected)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  )
}