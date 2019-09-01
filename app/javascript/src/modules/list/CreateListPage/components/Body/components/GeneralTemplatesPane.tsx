import React from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Paper,
  Table, 
  TableBody, 
  TableRow, 
  TableCell, 
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '12px', 
    }, 
    invisible: {
      display: 'none', 
    },
    flex: {
      display: 'flex', 
      alignItems: 'center', 
    },
    grow: {
      flexGrow: 1,
    },
    grayRect: {
      width: '36px', 
      height: '36px', 
      backgroundColor: '#F2F2F2',
      border: '1px solid #D8D8D8',
      borderRadius: '3px',
      marginRight: '12px', 
    },
  })
);

const data = [
  { name: 'Series B Diligence' }, 
  { name: 'Series B Diligence' }, 
  { name: 'Series B Diligence' }, 
  { name: 'Series B Diligence' }, 
  { name: 'Series B Diligence' }, 
  { name: 'Series B Diligence' }, 
]

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
      <Table>
        <TableBody>
          {data.map((item: any, index: number) => {
            return (
              <TableRow key={index}>
                <TableCell className={classes.flex}>
                  <div className={classes.grayRect} />
                  <span>{item.name}</span>
                  <div className={classes.grow} />
                  <ArrowRightIcon />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};