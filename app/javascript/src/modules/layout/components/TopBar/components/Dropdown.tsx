import React, { useEffect } from 'react';
import idx from 'idx';
import {makeStyles} from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import {useCurrentUser} from '../../../../../graphql/queries/CurrentUser'
import {useGlobalState} from '../../../../../store'

const G2Logo = require('images/dummy/logos/g2-logo.svg');
const MicrosoftLogo = require('images/dummy/logos/microsoft-logo.svg');
const PrepddLogo = require('images/logos/prepdd-logo.svg');

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  title: {
    display: 'none',
    width: 220, 
    boxSizing: 'border-box',
    padding: '18px 24px 19px 24px',
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
    top: 64, 
    left: 0
  },
  pl12: {
    paddingLeft: 12,
  },
}));

export default function Dropdown() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const {state, dispatch} = useGlobalState()
  const {data, loading, error} = useCurrentUser({})

  useEffect(() => {
    if (loading) return
    const owned = idx(data, data => data.currentUser.user.ownedCompanies)
    
    if (owned) {
      dispatch({
        type: 'SET_SELECTED_COMPANY', 
        companyId: owned[0].id
      })
      return
    }
    const companies = idx(data, data => data.currentUser.user.companies)
    if (companies) {
      dispatch({
        type: 'SET_SELECTED_COMPANY', 
        companyId: companies[0].id
      })
    }
  }, [loading])

  const toggleMenu = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleClick = (id: string) => {
    dispatch({
      type: 'SET_SELECTED_COMPANY', 
      companyId: id
    })
    setOpen(prev => !prev);
  }

  const renderCompanyName = () => {
    if (!state.selectedCompany) return "";

    const companies = idx(data, data => data.currentUser.user.ownedCompanies);
    
    if (!companies) return "";
    const selected = companies.find(company => company.id === state.selectedCompany);
    if (!selected) return ""
    return selected.name;
  }

  return (
    <div className={classes.root}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <Typography
            className={classes.title}
            variant="inherit"
            onClick={toggleMenu}
          >
            <span>
              { renderCompanyName() }
            </span>
            <div className={classes.grow} />
            <i className="fa fa-caret-down"></i>
          </Typography>
          {open ? (
            <Paper className={classes.paper}>
              { data && data.currentUser && data.currentUser.user && data.currentUser.user.ownedCompanies && 
                data.currentUser.user.ownedCompanies.map(company => {
                  return (
                    <Typography
                      key={company.id}
                      className={classes.title}
                      variant="inherit"
                      onClick={() => handleClick(company.id)}
                    >
                      <span>{company.name} </span>
                    </Typography>
                  )
                })
              }
              { data && data.currentUser && data.currentUser.user && data.currentUser.user.companies && 
                data.currentUser.user.companies.map(company => {
                  return (
                    <Typography
                      key={company.id}
                      className={classes.title}
                      variant="inherit"
                      onClick={() => handleClick(company.id)}
                    >
                      <span>{company.name} </span>
                    </Typography>
                  )
                })
              }
            </Paper>
          ) : null}
        </div>
      </ClickAwayListener>
    </div>
  );
}
