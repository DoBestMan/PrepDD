import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { deepPurple } from '@material-ui/core/colors';
// import SearchBar from 'material-ui-search-bar'


const useStyles = makeStyles(theme => ({
    root: {
        width: '80%',
        marginLeft: '10%',
        marginTop: theme.spacing(3),
        alignItems: 'center',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    avatar: {
        display: 'inline',
        margin: 10,
    },
    purpleAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepPurple[500],
    },
    nameCustom: {
        marginLeft: 20,
        marginTop: 15,
    },
    avatarCustom: {
        display: 'inline-flex',
        width: '100%',
    },

}));

function createData(name, team, role, company) {
    return { name, team, role, company };
}

const rows = [
    createData('User One', 'PrepDD', 'Admin', 'PrepDD'),
    createData('User Two', 'design', 'Member', 'PrepDD'),
    createData('User Three', 'SS', 'Member', 'PrepDD'),
];

export default function TeamManagement(props: {path?: string}) {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Company(s)</TableCell>
                        <TableCell align="right">Team&nbsp;(g)</TableCell>
                        <TableCell align="right">Role&nbsp;(g)</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.name}>
                            <TableCell className={classes.avatarCustom} component="th" scope="row">
                                <Avatar className={classes.purpleAvatar}>A</Avatar>
                                <Typography className={classes.nameCustom} variant="body2" gutterBottom>
                                    {row.name}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">{row.company}</TableCell>
                            <TableCell align="right">{row.team}</TableCell>
                            <TableCell align="right">{row.role}</TableCell>
                            <TableCell align="right">Click</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}
