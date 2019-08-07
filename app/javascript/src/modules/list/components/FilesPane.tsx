import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import GetApp from '@material-ui/icons/GetApp'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '0px 24px 0px 24px'
  },
  grow: {
    flexGrow: 1
  },
  flex: {
    display: 'flex'
  },
  title: {
    marginLeft: '10px'
  },
  modify: {
    opacity: '0.5',
    fontFamily: 'Helvetica',
    fontSize: '15px',
    color: '#606060',
    lineHeight: '20px',
    marginRight: '20px'
  }
}))

const rows = [
  {
    title: '_title of excel doc_',
    modified: '12 hours ago'
  },
  {
    title: '_title of excel doc_',
    modified: '12 hours ago'
  },
  {
    title: '_title of excel doc_',
    modified: '12 hours ago'
  },
  {
    title: '_title of excel doc_',
    modified: '12 hours ago'
  },
  {
    title: '_title of excel doc_',
    modified: '12 hours ago'
  },
  {
    title: '_title of excel doc_',
    modified: '12 hours ago'
  },
  {
    title: '_title of excel doc_',
    modified: '12 hours ago'
  },
  {
    title: '_title of excel doc_',
    modified: '12 hours ago'
  },
  {
    title: '_title of excel doc_',
    modified: '12 hours ago'
  }
]

export default function FilesPane(props) {
  const { children, value, index, ...other } = props

  const classes = useStyles()

  return (
    <Paper 
      className={classes.root}
      role="tabpanel"
      hidden={value !== index}
      id={`tab-${index}`}
      aria-labelledby={`tab-${index}`}
      elevation={0}
      {...other}
    >
      <Table>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={`files-${index}`}>
              <TableCell alight="left">
                <div className={classes.flex}>
                  <img src="../assets/img/logos/excel.svg" alt="Excel" />
                  <span className={classes.title}>{row.title}</span>
                  <div className={classes.grow} />
                  <span className={classes.modify}>{row.modified}</span>
                  <GetApp />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}