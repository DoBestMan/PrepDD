import React from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Container, 
  Typography, 
  Button, 
} from '@material-ui/core';

import Panel from '../../../../../components/Panel';
import GeneralTemplatesPane from './components/GeneralTemplatesPane';
import FinancePane from './components/FinancePane';
import LegalPane from './components/LegalPane';
import MAPane from './components/MAPane';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {}, 
    flex: {
      display: 'flex', 
      alignItems: 'center', 
    }, 
    grow: {
      flexGrow: 1, 
    }, 
    createButton: {
      width: '210px'
    }
  })
);

const labels = [
  "General Templates", 
  "Finance", 
  "Legal", 
  "M&A"
]

export default function Body() {
  const classes = useStyles();

  return (
    <Container>
      <div className={classes.flex}>
        <Typography variant="h2">
          New List
        </Typography>
        <div className={classes.grow} />
        <Button variant="contained" className={classes.createButton}>
          Create blank project
        </Button>
      </div>
      <Panel title="Create List" labels={labels}>
        <GeneralTemplatesPane />
        <FinancePane />
        <LegalPane />
        <MAPane />
      </Panel>
    </Container>
  )
}