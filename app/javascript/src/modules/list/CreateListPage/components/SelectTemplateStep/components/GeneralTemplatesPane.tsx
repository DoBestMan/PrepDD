import React, {useState} from 'react';
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

import * as cs from '../../../../../../constants/theme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '36px', 
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
    tableCell: {
      paddingTop: '12px', 
      paddingBottom: '12px', 
    },
    selectedCell: {
      fontWeight: cs.FONT.weight.bold, 
    }
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
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function GeneralTemplatesPane(props: GeneralTemplatesPaneProps) {
  const {value, index, setStep} = props;
  const classes = useStyles();
  const [selected, setSelected] = useState<number>(-1);

  return (
    <Paper
      className={clsx(classes.root, value !== index && classes.invisible)}
      aria-labelledby="General Templates"
      elevation={0}
    >
      <Table>
        <TableBody>
          {data.map((item: any, index: number) => {
            const isSelected = selected === index;

            return (
              <TableRow 
                key={index} 
                onClick={() => setStep(1)}
                onMouseOver={() => setSelected(index)}
                onMouseOut={() => setSelected(-1)}
              >
                <TableCell className={clsx(classes.flex, classes.tableCell, isSelected && classes.selectedCell)}>
                  <div className={classes.grayRect} />
                  <span>{item.name}</span>
                  <div className={classes.grow} />
                  <ArrowRightIcon className={clsx(!isSelected && classes.invisible)}/>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};