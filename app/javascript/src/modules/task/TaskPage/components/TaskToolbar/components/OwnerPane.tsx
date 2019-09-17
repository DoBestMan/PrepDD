import React, {useState} from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Paper} from '@material-ui/core';

import NameLabel from '../../../../../common/NameLabel';
import InviteForm from '../../../../../common/InviteForm';

import {
  SearchCompanyUsers_searchCompanyUsers_users, 
  SearchCompanyUsers_searchCompanyUsers_teams  
} from '../../../../../../helpers/__generated__/SearchCompanyUsers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '24px', 
    },
    invisible: {
      display: 'none',
    },
    listArea: {
      display: 'flex', 
      alignItems: 'center', 
      borderBottom: '1px solid #D8D8D8',
    }
  })
);

interface NotificationPaneProps {
  value?: number;
  index?: number;
}

export default function NotificationPane(props: NotificationPaneProps) {
  const {value, index} = props;
  const classes = useStyles();

  const [owners, setOwners] = useState<(SearchCompanyUsers_searchCompanyUsers_users | SearchCompanyUsers_searchCompanyUsers_teams)[]>([]);

  return (
    <Paper
      className={clsx(classes.root, value !== index && classes.invisible)}
      aria-labelledby="Notification Settings"
      elevation={0}
    >
      <div className={classes.listArea}>
        <NameLabel type="user" label="Tom Kirby" selected />
      </div>

    </Paper>
  );
}
