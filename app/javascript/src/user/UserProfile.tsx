import React from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


function TabContainer(props) {
  return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
  );
}

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > div': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#635ee7',
    },
  },
})

const StyledTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    color: '#fff',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  table: {
    minWidth: 650,
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  typography: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: '#2e1534',
  },
  avatar: {
    margin: 10,
  },
  denseFirst: {
    marginRight: '4%',
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  smallAvatar: {
    margin: 10,
    width: 35,
    height: 35,
  },
  textField: {
    marginTop: 20,
  },
  textCustom: {
    marginLeft: '4%',
  },
  button: {
    marginTop: 20,
  },
  companyTable: {
    marginTop: 30,
  },
  companyAvatar: {
    display: 'inline-flex',
    width: '100%'
  },
  companyName: {
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 16,
    marginLeft: 10,
  }
}));

function createData(companies, teams) {
  return { companies, teams };
}


const rows = [
  createData('PrepDD', 'Finance, Legal, Equity'),
  createData('G2 Crowd', 'M&M, Debt')
];


export default function CustomizedTabs(props: {path?: string}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function FormRow(props: {path?: string}) {
    return (
        <React.Fragment>
          <Grid item xs={1}>
            <Paper className={classes.paper}>
              <Avatar alt="Remy Sharp" src="/images/avatar.jpg" className={classes.bigAvatar} />
            </Paper>
          </Grid>
          <Grid item xs={7}>
            <Paper className={classes.paper}>
              <TextField
                  id="outlined-dense"
                  label="First Name"
                  className={clsx(classes.textField)}
                  margin="dense"
                  variant="outlined"
                  type={"text"}
                  style = {{width: '48%'}}
                  value={'Aijaz Khan'}
              />


              <TextField
                  id="outlined-dense"
                  label="Last Name"
                  className={clsx(classes.textCustom, classes.textField)}
                  margin="dense"
                  variant="outlined"
                  type={"text"}
                  style = {{width: '48%'}}
              />

              <TextField
                  id="outlined-dense"
                  label="Company Name"
                  className={clsx(classes.textField)}
                  margin="dense"
                  variant="outlined"
                  type={"text"}
                  fullWidth={true}
              />

              <TextField
                  id="outlined-dense"
                  label="Bio"
                  className={clsx(classes.textField)}
                  margin="dense"
                  variant="outlined"
                  multiline={true}
                  rows={2}
                  rowsMax={4}
                  fullWidth={true}
              />

              <TextField
                  id="outlined-dense"
                  label="Email"
                  className={clsx(classes.textField)}
                  margin="dense"
                  variant="outlined"
                  type={"text"}
                  fullWidth={true}
              />

              <div className={classes.companyTable}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Company (s) </TableCell>
                      <TableCell align="left">Team(s)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.companies}>
                          <TableCell className={clsx(classes.companyAvatar)} component="th" scope="row">
                            <Avatar alt="Remy Sharp" src="/images/avatar.jpg" className={classes.smallAvatar} />
                            <Typography className={clsx(classes.companyName)} variant="h6" component="h6">
                              {row.companies}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography className={clsx(classes.companyName)} variant="h6" component="h6">
                              {row.teams}
                            </Typography>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div>
                <Button variant="contained" color="primary" className={clsx(classes.button)}>
                  Save Changes
                </Button>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h6" gutterBottom>
              Password must contain
            </Typography>
            <FormControlLabel disabled control={<Checkbox checked value="checkedD" />}
                              label="At least 1 uppercase letter" />
            <FormControlLabel disabled control={<Checkbox checked value="checkedD" />}
                              label="At least 1 special character" />
            <FormControlLabel disabled control={<Checkbox checked value="checkedD" />}
                              label="More than 8 total characters" />

            <TextField
                id="outlined-dense"
                label="Password"
                className={clsx(classes.textField)}
                margin="dense"
                variant="outlined"
                type={"password"}
                value={"password"}
            />

            <TextField
                id="outlined-dense"
                label="Confirm Password"
                className={clsx(classes.textField)}
                margin="dense"
                variant="outlined"
                type={"password"}
                value={"password"}
            />
            <div>
              <Button variant="contained" color="primary" className={clsx(classes.button)}>
                Update Password
              </Button>
            </div>
          </Grid>
        </React.Fragment>
    );
  }

  return (
      <div className={classes.root}>
        <div className={classes.demo1}>
          <Typography variant="h5" component="h2">
            Profile
          </Typography>
          <AntTabs value={value} onChange={handleChange}>
            {/*<AntTab label={"Personal Information"} />*/}
            {/*<AntTab label={"Notification Settings"} />*/}
          </AntTabs>
        </div>

        {value === 0 && <TabContainer>
          <Grid container spacing={1}>
            <Grid container item xs={12} spacing={3}>
              <FormRow />
            </Grid>
          </Grid>
        </TabContainer>}
        {value === 1 && <TabContainer>
          Notification Settings
        </TabContainer>}

      </div>
  );
}
