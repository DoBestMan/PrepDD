import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { deepPurple } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const options = [
    'Parent Company',
    'Broker',
    'Assign broker',
];

const ITEM_HEIGHT = 48;

const useStyles = makeStyles(theme => ({
    root: {
        width: '80%',
        marginLeft: '10%',
        marginTop: theme.spacing(3),
        alignItems: 'center',
        overflowX: 'auto',
    },
    button: {
        margin: theme.spacing(1),
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
    search: {
        // display: 'inline',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        border: '1px solid lightgray',
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 300,
        },
    },
    selectDrop: {
        display: 'inline',
    }

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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <Paper className={classes.root}>

            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'Search' }}
                />

                <Button variant="contained" color="primary" className={classes.button}>
                    Add member
                </Button>


                <div className={classes.selectDrop}>
                    <IconButton
                        aria-label="More"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: 200,
                            },
                        }}
                    >
                        {options.map(option => (
                            <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
            </div>

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
