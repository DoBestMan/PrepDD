import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const G2Logo = require('images/dummy/logos/g2-logo.svg');
const MicrosoftLogo = require('images/dummy/logos/microsoft-logo.svg');
const PrepddLogo = require('images/logos/prepdd-logo.svg');

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  title: {
    display: 'none',
    width: 250,
    boxSizing: 'border-box',
    padding: '24px 24px 19px 24px',
    borderRight: '1px solid #D8D8D8',
    fontFamily: 'Montserrat',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2C2C2C',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
    '&:hover': {
      cursor: 'pointer',
      background: '#EBF2FF',
    },
  },
  grow: {
    flexGrow: 1,
  },
  paper: {
    position: 'absolute',
    top: 73,
    left: 0,
  },
  pl12: {
    paddingLeft: 12,
  },
}));

export default function Dropdown() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const toggleMenu = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <Typography
            className={classes.title}
            variant="inherit"
            onClick={toggleMenu}
          >
            <img src={MicrosoftLogo} alt="Microsoft" />
            <span className={classes.pl12}>Microsoft</span>
            <div className={classes.grow} />
            <i className="fa fa-caret-down"></i>
          </Typography>
          {open ? (
            <Paper className={classes.paper}>
              <Typography
                className={classes.title}
                variant="inherit"
                onClick={toggleMenu}
              >
                <img src={MicrosoftLogo} alt="Microsoft" />
                <span className={classes.pl12}>Microsoft</span>
              </Typography>
              <Typography
                className={classes.title}
                variant="inherit"
                onClick={toggleMenu}
              >
                <img src={PrepddLogo} alt="PrepDD" width="24" height="24" />
                <span className={classes.pl12}>PrepDD</span>
              </Typography>
              <Typography
                className={classes.title}
                variant="inherit"
                onClick={toggleMenu}
              >
                <img src={G2Logo} alt="Microsoft" width="24" height="24" />
                <span className={classes.pl12}>G2 Crowd</span>
              </Typography>
            </Paper>
          ) : null}
        </div>
      </ClickAwayListener>
    </div>
  );
}
