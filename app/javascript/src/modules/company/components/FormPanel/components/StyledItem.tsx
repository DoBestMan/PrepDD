import React from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';

import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      marginRight: '6px',
      marginBottom: '6px',
      padding: '3px 6px 3px 6px',
      background: '#FFFFFF',
      border: '1px solid #D8D8D8',
      borderRadius: '3px',
      alignItems: 'center',
    },
    label: {
      color: '#2C2C2C',
      fontFamily: 'Montserrat',
      fontSize: '12px',
      fontWeight: 600,
    },
    close: {
      fontSize: '15px',
      marginLeft: '12px',
    },
  })
);

interface StyledItemProps {
  logo?: string | null;
  label: string;
  onClose?: () => void;
}

const StyledItem = React.forwardRef(
  (props: StyledItemProps, ref: React.Ref<HTMLDivElement>) => {
    const {logo, label, onClose, ...other} = props;
    const classes = useStyles();

    const handleClick = () => {
      if (confirm('Are you going to delete this company?') && onClose) {
        onClose();
      }
    };

    return (
      <div {...other} className={classes.root} ref={ref}>
        {logo && (
          <img
            src={logo}
            width="18"
            height="18"
            style={{marginRight: '6px'}}
            alt={label}
          />
        )}
        <div className={classes.label}>{label}</div>
        {onClose && (
          <CloseIcon className={classes.close} onClick={handleClick} />
        )}
      </div>
    );
  }
);

export default StyledItem;
