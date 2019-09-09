import React from 'react';
import clsx from 'clsx';
import {Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import {
  Drawer, 
  Typography, 
} from '@material-ui/core';
import RightIcon from '@material-ui/icons/KeyboardArrowRightSharp';
import MoreIcon from '@material-ui/icons/MoreHoriz';

import Panel from '../../../../common/Panel';
import OverviewPane from './components/OverviewPane';
import FilesPane from './components/FilesPane';
import PublicPane from './components/PublicPane';
import InternalPane from './components/InternalPane';
import TimelinePane from './components/TimelinePane';
import StyledItem from '../TaskTable/components/StyledItem';

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
    drawerHeader: {
      padding: '24px 24px 0px 16px', 
    }, 
    flex: {
      display: 'flex', 
      alignItems: 'center', 
    },
    grow: {
      flexGrow: 1, 
    },
    priority: {
      color: '#509E6D',
    },
    light: {
      fontWeight: 400, 
    }, 
    statusBlock: {
      marginTop: '12px', 
      paddingLeft: '8px', 
    }
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
      <div className={classes.drawerHeader}>
        <div className={classes.flex}>
          <RightIcon className={classes.priority} />
          <Typography variant="h2">
            R-903 <span className={classes.light}>Series B Funding</span>
          </Typography>
        </div>
        <div className={clsx(classes.flex, classes.statusBlock)}>
          <StyledItem status="Finished" selected />
          <div className={classes.grow} />
          <MoreIcon />
        </div>
      </div>
      <Panel labels={labels} padding>
        <OverviewPane />
        <FilesPane />
        <PublicPane />
        <InternalPane />
        <TimelinePane />
      </Panel>
    </Drawer>
  );
}
