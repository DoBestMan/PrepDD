import React from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Paper,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {}, 
    invisible: {
      display: 'none', 
    }
  })
);

interface GeneralTemplatesPaneProps {
  value?: number; 
  index?: number;
}

export default function GeneralTemplatesPane(props: GeneralTemplatesPaneProps) {
  const {value, index} = props;
  const classes = useStyles();

  return (
    <Paper
      className={clsx(classes.root, value !== index && classes.invisible)}
      aria-labelledby="General Templates"
      elevation={0}
    >
      <h1>General Templates</h1>
    </Paper>
  );
};