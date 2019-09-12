import React from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Paper, 
  Typography,
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  Checkbox, 
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteForever';

import * as cs from '../../../../../../constants/theme';
import NameLabel from '../../../../../common/NameLabel';
import StatusLabel from '../../../../../common/StatusLabel';
import TitleDropdown from './TitleDropdown';
import VersionDropdown from './VersionDropdown';

const Excel = require('images/dummy/logos/excel.svg');

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    table: {
      tableLayout: 'fixed',
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
    primary: {
      color: cs.COLORS.primary, 
    },
    filesPane: {
      marginTop: '24px', 
      padding: '6px',
      background: '#F2F2F2', 
      border: '1px solid #D8D8D8', 
      borderRadius: '3px', 
    }, 
    fileLabel: {
      height: '36px', 
      margin: '0px 6px 0px 0px', 
    }, 
    textarea: {
      width: '100%', 
      height: '100px', 
      marginTop: '24px', 
      padding: '12px', 
      resize: 'none', 
      fontFamily: cs.FONT.family, 
      fontSize: cs.FONT.size.xs, 
      fontWeight: cs.FONT.weight.regular, 
      border: '1px solid #D8D8D8', 
      borderRadius: '3px', 
    },
    selection: {
      marginTop: '24px', 
      height: '42px', 
      borderTop: '1px solid #D8D8D8', 
      borderBottom : '1px solid #D8D8D8', 
    }, 
    delete: {
      fontSize: '28px', 
      cursor: 'pointer', 
      '&:hover': {
        border: `1px solid ${cs.COLORS.primary}`, 
        borderRadius: '3px', 
      }
    }, 
    mr12: {
      marginRight: '12px', 
    }
  })
);

interface SingleTaskProps {
  value?: number;
  index?: number;
}

const options = [
  {
    label: 'Any powers of attorneys granted by the Company to a third party, granting such party the authority to bind the Company.', 
    value: 'Any powers of attorneys granted by the Company to a third party, granting such party the authority to bind the Company.', 
  }, 
  {
    label: 'The Company’s stock books or ledgers and current capitalization table (including restricted stock, options, RSUs, phantom stock and warrants).', 
    value: 'The Company’s stock books or ledgers and current capitalization table (including restricted stock, options, RSUs, phantom stock and warrants).', 
  }, 
  {
    label: 'Lists of all current owners of shares or convertible securities, including address, tax ID or SSN, number of shares owned, dates of issuance and full payment, the consideration received by the Company and applicable stop transfer orders or restrictive legends.', 
    value: 'Lists of all current owners of shares or convertible securities, including address, tax ID or SSN, number of shares owned, dates of issuance and full payment, the consideration received by the Company and applicable stop transfer orders or restrictive legends.', 
  }
]

export default function SingleTask(props: SingleTaskProps) {
  const {value, index} = props;
  const classes = useStyles();

  return (
    <Paper
      className={clsx(classes.root, value !== index && classes.invisible)}
      aria-labelledby="Single Task"
      elevation={0}
    >
      <div className={clsx(classes.filesPane, classes.flex)}>
        <NameLabel label="_excel file_" logo={Excel} className={classes.fileLabel} />
        <NameLabel label="_excel file_" logo={Excel} className={classes.fileLabel} />
        <NameLabel label="_excel file_" logo={Excel} className={classes.fileLabel} />
        <NameLabel label="_excel file_" logo={Excel} className={classes.fileLabel} />
      </div>

      <textarea 
        className={classes.textarea}
        placeholder="Add public comment or description..."
      />

      <div className={classes.flex} style={{marginTop: '24px'}}>
        <TitleDropdown
          options={options}
          value="Any powers of attorneys granted by the Company to a third party, granting such party the authority to bind the Company."
        />
        <TitleDropdown
          options={options}
          value="Any powers of attorneys granted by the Company to a third party, granting such party the authority to bind the Company."
        />
        <div className={classes.grow} />
        <StatusLabel currentStatus="Start" selected/>
      </div>

      <div className={clsx(classes.flex, classes.selection)}>
        <Typography variant="h6" className={classes.primary}>
          2 files selected
        </Typography>
        <div className={classes.grow} />
        <DeleteIcon className={classes.delete} />
      </div>

      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox color="primary" />
            </TableCell>
            <TableCell>File</TableCell>
            <TableCell>Public Comment</TableCell>
            <TableCell>Version</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox color="primary" />
            </TableCell>
            <TableCell>
              <div className={classes.flex}>
                <img width="18" height="18" src={Excel} className={classes.mr12} />
                <Typography variant="h6">File name</Typography>
              </div>
            </TableCell>
            <TableCell>
              Add...
            </TableCell>
            <TableCell>
              <VersionDropdown value="Update" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}
