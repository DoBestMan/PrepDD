import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
        marginTop: 50,
        marginLeft: '10%',
    },
    paper: {
        paper: {
            padding: theme.spacing(2),
            textAlign: 'left',
            color: theme.palette.text.secondary,
        },
    },
    companySection: {
        marginTop: 20,
    },
    table: {
        minWidth: 650,
        marginTop: 50,
    },
}));



export default function CompanySettings(props: {path?: string}) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: true,
        checkedC: false,
    });

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5" gutterBottom>
                            Company Settings
                        </Typography>

                        <Typography variant="body1" gutterBottom>
                            Company Name
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            PrepDD
                        </Typography>

                        <Divider/>

                        <Grid className={classes.companySection} container spacing={3}>
                            <Grid xs={6}>
                                <Typography variant="body1" gutterBottom>
                                    Parent Company
                                </Typography>

                                <Typography variant="h6" gutterBottom>
                                    PrepDD
                                </Typography>
                                <Divider/>
                            </Grid>

                            <Grid xs={6}>
                                <Typography variant="body1" gutterBottom>
                                    Broker
                                </Typography>

                                <Typography variant="h6" gutterBottom>
                                    PrepDD...
                                </Typography>
                                <Divider/>
                            </Grid>
                        </Grid>

                        <Table className={classes.table}>
                            <TableHead>
                                <Typography variant="h5" gutterBottom>
                                    Utilization Snapshot
                                </Typography>
                                <TableRow>
                                    <TableCell>Product feature</TableCell>
                                    <TableCell align="left">Current</TableCell>
                                    <TableCell align="left">Max</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                    <TableRow key={'company-uti'}>
                                        <TableCell component="th" scope="row">
                                            <Typography variant="h6" gutterBottom>
                                                Total users this month (2 days remain)
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography variant="h6" gutterBottom>
                                                5 Users
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography variant="h6" gutterBottom>
                                               7 Users
                                            </Typography>
                                        </TableCell>
                                    </TableRow>

                                <TableRow key={'company-snap'}>
                                        <TableCell component="th" scope="row">
                                            <Typography variant="h6" gutterBottom>
                                                Total storage used (GB)
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography variant="h6" gutterBottom>
                                                5.5 GB
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography variant="h6" gutterBottom>
                                               10GB
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                            </TableBody>
                        </Table>


                        <Table className={classes.table}>
                            <TableHead>
                                <Typography variant="h5" gutterBottom>
                                    External File Sharing
                                </Typography>

                                <Typography variant="body2" gutterBottom>
                                    Allow your users in your company to use these features when sharing files externally
                                </Typography>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow key={'company-uti'}>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="h6" gutterBottom>
                                            Total users this month (2 days remain)
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Switch
                                            checked={state.checkedA}
                                            onChange={handleChange('checkedA')}
                                            value="checkedA"
                                            color="primary"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow key={'company-snap'}>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="h6" gutterBottom>
                                            Total storage used (GB)
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Switch
                                            checked={state.checkedB}
                                            onChange={handleChange('checkedB')}
                                            value="checkedB"
                                            color="primary"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow key={'company-snap'}>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="h6" gutterBottom>
                                            Total storage used (GB)
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Switch
                                            checked={state.checkedC}
                                            onChange={handleChange('checkedC')}
                                            value="checkedC"
                                            color="primary"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>

                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <TableCell component="th" scope="row">
                            <Typography variant="h6" gutterBottom>
                                Company Logo(WIP)
                            </Typography>
                        </TableCell>
                    </Paper>
                </Grid>
            </Grid>

        </div>
    );
}
