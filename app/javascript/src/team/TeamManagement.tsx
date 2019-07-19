import React from 'react';
import clsx from 'clsx';
import {fade, makeStyles, useTheme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {deepPurple} from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const options = ['Parent Company', 'Broker', 'Assign broker'];

const drawerWidth = 240;
const ITEM_HEIGHT = 48;

const useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
    marginLeft: '10%',
    marginTop: theme.spacing(3),
    alignItems: 'center',
    overflowX: 'auto',
  },
  rootShifted: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  list: {
    width: 450,
  },
  fullList: {
    width: 'auto',
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
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

function createData(name, team, role, company) {
  return {name, team, role, company};
}

const rows = [
  createData('User One', 'PrepDD', 'Admin', 'PrepDD'),
  createData('User Two', 'design', 'Member', 'PrepDD'),
  createData('User Three', 'SS', 'Member', 'PrepDD'),
];

export default function TeamManagement(props: {path?: string}) {
  const classes = useStyles();
  const theme = useTheme();

  const [state, setState] = React.useState({
    right: false,
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open2 = Boolean(anchorEl);

  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <Paper className={clsx(classes.root, classes.rootShifted)}>
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
          inputProps={{'aria-label': 'Search'}}
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
            open={open2}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: 200,
              },
            }}
          >
            {options.map(option => (
              <MenuItem
                key={option}
                selected={option === 'Pyxis'}
                onClick={handleClose}
              >
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
              <TableCell
                className={classes.avatarCustom}
                component="th"
                scope="row"
              >
                <Avatar className={classes.purpleAvatar}>A</Avatar>
                <Typography
                  className={classes.nameCustom}
                  variant="body2"
                  gutterBottom
                >
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

      <div className={classes.root}>
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            Persistent drawer
          </Typography>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>

          <div>
            <Avatar className={classes.purpleAvatar}>A</Avatar>
            <Typography
              className={classes.nameCustom}
              variant="body2"
              gutterBottom
            >
              Test User 1 (In Progress)
            </Typography>
          </div>
        </Drawer>
      </div>
    </Paper>
  );
}
