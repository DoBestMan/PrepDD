import React from 'react';
import {withRouter} from 'react-router-dom';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import CloseIcon from '@material-ui/icons/Close';

import * as cs from '../../../../../constants/theme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '36px', 
    },
    back: {
      color: cs.COLORS.primary, 
      cursor: 'pointer', 
    },
    close: {
      color: '#D8D8D8',
      cursor: 'pointer', 
    },
    grow: {
      flexGrow: 1,
    },
    secondary: {
      color: '#D8D8D8',
    }
  })
);

const Header = (props: any) => {
  const {history} = props;
  const classes = useStyles();

  const handleClickBack = () => {
    history.goBack();
  }

  return (
    <div className={classes.root}>
      <ArrowLeftIcon className={classes.secondary} />
      <Typography 
        variant="h4" 
        className={classes.back}
        onClick={handleClickBack}
      >
        Back
      </Typography>
      <div className={classes.grow} />
      <CloseIcon className={classes.close} onClick={handleClickBack} />
    </div>
  );
}

export default withRouter(Header);