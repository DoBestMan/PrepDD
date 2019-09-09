import React from 'react';
import {Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import {
  Table, 
  TableBody, 
  TableCell, 
  TableRow, 
  Paper, 
  Typography,
} from '@material-ui/core';

import GetApp from '@material-ui/icons/GetApp';

const Excel = require('images/dummy/logos/excel.svg');

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '0px 24px 0px 24px',
    },
    grow: {
      flexGrow: 1,
    },
    flex: {
      display: 'flex',
      alignItems: 'center', 
    },
    icon: {
      marginRight: '12px', 
    },
    modified: {
      opacity: 0.5,
      color: '#606060',
    },
    download: {
      cursor: 'pointer', 
      marginLeft: '12px', 
    }
  })
);

const rows = [
  {
    title: '_title of excel doc_',
    modified: '12 hours ago',
  },
  {
    title: '_title of excel doc_',
    modified: '12 hours ago',
  },
  {
    title: '_title of excel doc_',
    modified: '12 hours ago',
  },
  {
    title: '_title of excel doc_',
    modified: '12 hours ago',
  },
  {
    title: '_title of excel doc_',
    modified: '12 hours ago',
  },
  {
    title: '_title of excel doc_',
    modified: '12 hours ago',
  },
  {
    title: '_title of excel doc_',
    modified: '12 hours ago',
  },
  {
    title: '_title of excel doc_',
    modified: '12 hours ago',
  },
  {
    title: '_title of excel doc_',
    modified: '12 hours ago',
  },
];

interface FilesPaneProps {
  value?: number;
  index?: number;
}

export default function FilesPane(props: FilesPaneProps) {
  const {value, index} = props;

  const classes = useStyles();

  return (
    <Paper
      className={classes.root}
      role="tabpanel"
      hidden={value !== index}
      id={`tab-${index}`}
      aria-labelledby={`tab-${index}`}
      elevation={0}
    >
      <Table>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={`files-${index}`}>
              <TableCell align="left">
                <div className={classes.flex}>
                  <img className={classes.icon} src={Excel} alt="Excel" /> 
                  <Typography variant="h6">
                    {row.title}
                  </Typography>
                  <div className={classes.grow} />
                  <Typography variant="h6" className={classes.modified}>
                    {row.modified}
                  </Typography>
                  <GetApp className={classes.download} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
