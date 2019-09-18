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
      padding: '36px 36px 24px 36px',
    },
    grow: {
      flexGrow: 1,
    },
    back: {
      color: cs.COLORS.primary,
      cursor: 'pointer',
    },
    close: {
      color: '#D8D8D8',
      cursor: 'pointer',
    },
    secondary: {
      color: '#D8D8D8',
    },
  })
);

const Header = (props: any) => {
  const {history} = props;
  const classes = useStyles();

  const handleClose = () => {
    history.goBack();
  };

  return (
    <div className={classes.root}>
      <ArrowLeftIcon className={classes.secondary} />
      <Typography variant="h3" className={classes.back} onClick={handleClose}>
        Back
      </Typography>
      <div className={classes.grow} />
      <CloseIcon className={classes.close} onClick={handleClose} />
    </div>
  );
};

export default withRouter(Header);
