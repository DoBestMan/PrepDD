import React from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import DefaultUserImage from '../../../../../common/DefaultUserImage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: 'fit-content',
      height: '36px', 
      alignItems: 'center',
      marginRight: '12px', 
      padding: '3px 6px 3px 6px',
      background: '#FFFFFF',
      border: '1px solid #D8D8D8',
      borderRadius: '3px',
    },
    label: {
      color: '#2C2C2C',
      fontFamily: 'Montserrat',
      fontSize: '12px',
      fontWeight: 600,
    },
    selected: {
      color: '#2C2C2C',
    },
    image: {
      width: '18px', 
      height: '18px', 
      backgroundColor: '#2792A2',
      fontSize: '9px',
      marginRight: '6px', 
    }
  })
);

interface StyledItemProps {
  logo?: string;
  label: string;
  selected?: boolean;
  type?: "user" | "company";
}

const StyledItem = React.forwardRef(
  (props: StyledItemProps, ref: React.Ref<HTMLDivElement>) => {
    const {logo, label, selected, type, ...other} = props;
    const classes = useStyles();

    return (
      <div {...other} className={classes.root} ref={ref}>
        {logo ? (
          <img
            src={logo}
            width="18"
            height="18"
            style={{marginRight: '6px'}}
            alt={label}
          />
        ): type === "user" && (
          <DefaultUserImage userName={label} className={classes.image} />
        )}
        <div className={clsx(classes.label, selected && classes.selected)}>
          {label}
        </div>
      </div>
    );
  }
);

export default StyledItem;
