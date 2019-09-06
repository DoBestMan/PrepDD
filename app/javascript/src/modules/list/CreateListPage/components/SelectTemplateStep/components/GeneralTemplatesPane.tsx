import React, {useState} from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Paper,
  Table, 
  TableBody, 
  TableRow, 
  TableCell,
  Typography, 
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import * as cs from '../../../../../../constants/theme';

import {
  AllTemplates_templateLists,
  AllTemplates_templateLists_tasks,
} from '../../../../../../graphql/queries/__generated__/AllTemplates';

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

interface GeneralTemplatesPaneProps {
  value?: number; 
  index?: number;
  data: AllTemplates_templateLists[];
  setSelectedTemplate: React.Dispatch<React.SetStateAction<AllTemplates_templateLists>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function GeneralTemplatesPane(props: GeneralTemplatesPaneProps) {
  const {
    value, 
    index, 
    data, 
    setSelectedTemplate, 
    setStep
  } = props;
  const classes = useStyles();
  const [selected, setSelected] = useState<number>(-1);

  const handleClick = (template: AllTemplates_templateLists) => {
    setStep(1);
    setSelectedTemplate(template);
  }

  return (
    <Paper
      className={clsx(classes.root, value !== index && classes.invisible)}
      aria-labelledby="General Templates"
      elevation={0}
    >
      {data && data.length ? (
        <Table>
          <TableBody>
            {data && data.map((item: AllTemplates_templateLists, index: number) => {
              const isSelected = selected === index;

              return (
                <TableRow 
                  key={item.id} 
                  onClick={() => handleClick(item)}
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
      ): (
        <Typography variant="h2">No available lists</Typography>
      )}
      
    </Paper>
  );
};