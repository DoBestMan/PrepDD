import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';

const StyledTabs = withStyles({
  root: {
    borderBottom: '1px solid #D8D8D8',
  },
  indicator: {
    backgroundColor: '#3A84FF',
    borderRadius: '3px 3px 0 0',
  },
})(Tabs);

export default StyledTabs;
