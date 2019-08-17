import React, {useState} from 'react'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import {
  Card, 
  Typography,
  Grid,
  Table, 
  TableHead,
  TableBody,  
  TableRow, 
  TableCell
} from '@material-ui/core'

import InputForm from './components/InputForm'
import CompanyForm from './components/CompanyForm'
import SwitchForm from './components/SwitchForm'
import StyledTableRow from './components/StyledTableRow'
import StyledTableCell from './components/StyledTableCell'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {

    },
    title: {
      color: '#2C2C2C',
      fontFamily: 'Montserrat',
      fontWeight: 'bold', 
      fontSize: '26px'
    },
    table: {
      marginTop: '36px',
    },
    tableTitle: {
      color: '#2C2C2C',
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: '21px'
    },
    tableHeadCell: {
      padding: '12px 0px 12px 0px',
      color: '#606060',
      fontFamily: 'Montserrat',
      fontWeight: 600, 
      fontSize: '12px'
    },
    tableBody: {
      color: '#2C2C2C',
      fontFamily: 'Montserrat',
      fontSize: '15px'
    },
    flex: {
      display: 'flex',
      alignItems: 'center'
    },
    grow: {
      flexGrow: 1
    }
  })
)

export default function FormPanel() {
  const classes = useStyles()

  return (
    <Card elevation={0}>
      <Typography className={classes.title} variant="h2">
        Company Settings
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <InputForm label="Company name" value="Microsoft" />
        </Grid>
        <Grid item md={6}>
          <CompanyForm 
            label="Parent company" 
            placeholder="Assign parent company..."
          />
        </Grid>
        <Grid item md={6}>
          <CompanyForm
            label="Broker"
            placeholder="Assign broker..."            
          />
        </Grid>
        <Grid item md={12}>
          <div className={classes.table}>
            <Typography className={classes.tableTitle} variant="h2">
              Utilization Snapshot
            </Typography>            
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeadCell}>Product feature</TableCell>
                  <TableCell className={classes.tableHeadCell}>Current</TableCell>
                  <TableCell className={classes.tableHeadCell}>Max</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody}>
                <TableRow>
                  <StyledTableCell>Total users this month(2 days remain)</StyledTableCell>
                  <StyledTableCell>5 users</StyledTableCell>
                  <StyledTableCell>7 users</StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Total storage used(GB)</StyledTableCell>
                  <StyledTableCell>5.25 GB</StyledTableCell>
                  <StyledTableCell>7 GB</StyledTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Grid>
        <Grid item md={12}>
          <div className={classes.table}>
            <Typography className={classes.tableTitle} variant="h2">
              External File Sharing
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeadCell}>
                    Allow your users in your company to use these features when sharing files externally
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <StyledTableCell>
                    <div className={classes.flex}>
                      <p>Automatic PDF</p>
                      <div className={classes.grow} />
                      <SwitchForm value={true} />
                    </div>
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>
                    <div className={classes.flex}>
                      <p>Dynamic watermarking</p> 
                      <div className={classes.grow} />
                      <SwitchForm value={false} />
                    </div>
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>
                    <div className={classes.flex}>
                      <p>Preview only</p>
                      <div className={classes.grow} />
                      <SwitchForm value={true} />
                    </div>
                  </StyledTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Grid>
      </Grid>
    </Card>
  )
}