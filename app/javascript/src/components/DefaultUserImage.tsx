import React from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: '30px',
      height: '30px',
      position: 'relative',
      borderRadius: '50%',
      background: '#AFAFAF',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Montserrat',
      fontSize: '12px',
      fontWeight: 'bold',
    },
    label: {
      color: '#FFFFFF',
    },
  })
);

interface DefaultUserImageProps {
  className?: string;
  userName: string;
}

export default function DefaultUserImage(props: DefaultUserImageProps) {
  const {className, userName} = props;
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <p className={classes.label}>
        {userName
          .split(' ')
          .slice(0, 2)
          .map(name => name[0])
          .join('')}
      </p>
    </div>
  );
}
