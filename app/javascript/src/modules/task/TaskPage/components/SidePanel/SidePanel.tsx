import React from 'react';
import {Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import {
  Drawer, 
} from '@material-ui/core';

import Panel from '../../../../common/Panel';
import OverviewPane from './components/OverviewPane';
import FilesPane from './components/FilesPane';
import PublicPane from './components/PublicPane';
import InternalPane from './components/InternalPane';
import TimelinePane from './components/TimelinePane';

const panelWidth = 500;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: panelWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: panelWidth,
    },
    drawerSpacer: {
      marginTop: 64,
    },
  })
);

const labels = ["Overview", "Files", "Public", "Internal", "Timeline"];

export default function ListDetailPage(props: {open: boolean}) {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={props.open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerSpacer} />
      <h1>Side Panel</h1>
      <Panel labels={labels}>
        <OverviewPane />
        <FilesPane />
        <PublicPane />
        <InternalPane />
        <TimelinePane />
      </Panel>
    </Drawer>
  );
}
