import React, {useEffect} from 'react';
import idx from 'idx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import {useGlobalState} from '../../../../../store';
import {useUpdateUserData} from '../../../../../graphql/mutations/UpdateUserData';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
    },
    title: {
      display: 'none',
      width: '180px',
      height: '64px',
      boxSizing: 'border-box',
      padding: '0px 24px 0px 24px',
      borderRight: '1px solid #D8D8D8',
      alignItems: 'center',
      color: '#2C2C2C',
      fontFamily: 'Montserrat',
      fontSize: '15px',
      fontWeight: 'bold',
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
      left: 0,
    },
    pl12: {
      paddingLeft: 12,
    },
  })
);

export default function Dropdown() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const {state, dispatch} = useGlobalState();
  const [updateUserData] = useUpdateUserData({
    email: state.currentUser.email,
    fullName: state.currentUser.fullName,
    displayName: state.currentUser.displayName as string,
    lastViewedCompanyId: state.selectedCompany,
  });

  const toggleMenu = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleClick = async (id: string) => {
    await dispatch({
      type: 'SET_SELECTED_COMPANY',
      companyId: id,
    });
    await dispatch({
      type: 'SET_CURRENT_USER',
      user: {
        ...state.currentUser,
        lastViewedCompanyId: id,
      },
    });

    updateUserData();
    setOpen(prev => !prev);
  };

  const renderCompanyName = () => {
    if (!state.selectedCompany || !state.currentUser.companies) return '';

    const selected = state.currentUser.companies.find(
      company => company.id === state.selectedCompany
    );
    if (!selected) return '';

    return selected.name;
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
            <span>{renderCompanyName()}</span>
            <div className={classes.grow} />
            <i className="fa fa-caret-down"></i>
          </Typography>
          {open ? (
            <Paper className={classes.paper}>
              {state.currentUser.companies &&
                state.currentUser.companies.map(company => {
                  return (
                    <Typography
                      key={company.id}
                      className={classes.title}
                      variant="inherit"
                      onClick={() => handleClick(company.id)}
                    >
                      <span>{company.name} </span>
                    </Typography>
                  );
                })}
            </Paper>
          ) : null}
        </div>
      </ClickAwayListener>
    </div>
  );
}
