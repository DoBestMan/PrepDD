import React, {useState, useEffect, SyntheticEvent} from 'react';
import idx from 'idx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Snackbar} from '@material-ui/core';

import {useGlobalState} from '../../store';
import * as cs from '../../constants/types';
import {useCompanySettings} from '../../graphql/queries/CompanySettings';
import {useUpdateCompany} from '../../graphql/mutations/UpdateCompany';
import {CompanySettings_company} from '../../graphql/queries/__generated__/CompanySettings';

import FlashMessage from '../common/FlashMessage'
import FormPanel from './components/FormPanel';
import UploadPanel from './components/UploadPanel';

const panelWidth = 1095;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: 'calc(100vh - 64px)',
      margin: `72px calc((100% - ${panelWidth}px) / 2) 72px calc((100% - ${panelWidth}px) / 2)`,
    },
    settingsPanel: {
      display: 'block',
      width: '772px',
    },
    uploadPanel: {
      display: 'block',
      marginLeft: '72px',
    },
  })
);

export default function CompanySettings(props: {path?: string}) {
  const classes = useStyles();
  const {state} = useGlobalState();
  const [addedParent, setAddedParent] = useState<string>('');
  const [addedBroker, setAddedBroker] = useState<string>('');
  const [deletedParent, setDeletedParent] = useState<string>('');
  const [deletedBroker, setDeletedBroker] = useState<string>('');
  const [notification, setNotification] = useState<cs.NotificationType | null>(null);
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [company, setCompany] = useState<CompanySettings_company>({
    __typename: 'Company',
    id: '',
    name: '',
    logoUrl: '',
    parents: null,
    brokers: null,
    totalUsers: 0,
    totalStorage: 0,
    subscription: null,
    autoPdf: false,
    autoWatermark: false,
    previewOnly: false,
  });

  const {data, error, loading} = useCompanySettings({
    id: state.selectedCompany,
  });
  const [
    updateCompany,
    {
      loading: updateCompanyLoading,
      data: updateCompanyRes,
      error: updateCompanyError,
    },
  ] = useUpdateCompany({
    id: company.id,
    name: company.name,
    parentName: addedParent,
    brokerName: addedBroker,
    autoPdf: company.autoPdf as boolean,
    autoWatermark: company.autoWatermark as boolean,
    previewOnly: company.previewOnly as boolean,
    deleteParentId: deletedParent,
    deleteBrokerId: deletedBroker,
  });

  useEffect(() => {
    const companyData = idx(data, data => data.company);

    if (loading || !companyData) return;

    setCompany({
      ...companyData,
    });
  }, [loading, idx(data, data => data.company)]);

  useEffect(() => {
    const companyData = idx(
      updateCompanyRes,
      updateCompanyRes => updateCompanyRes.updateCompanySettings.company
    );

    if (loading || !companyData) return;

    setCompany({
      ...companyData,
    });
    setNotification({
      variant: 'success', 
      message: 'Update company data successfully'
    })
    setAddedParent('');
    setAddedBroker('');
    setDeletedParent('');
    setDeletedBroker('');
  }, [
    updateCompanyLoading,
    idx(
      updateCompanyRes,
      updateCompanyRes => updateCompanyRes.updateCompanySettings.company
    ),
  ]);

  useEffect(() => {
    const errors = idx(updateCompanyRes, updateCompanyRes => updateCompanyRes.updateCompanySettings.errors);

    if (!errors || !errors.length) return;
    setNotification({
      variant: 'warning', 
      message: errors[0].message
    })
  }, [idx(updateCompanyRes, updateCompanyRes => updateCompanyRes.updateCompanySettings.errors)]);

  useEffect(() => {
    if (notification) {
      setNotificationOpen(true);
    }
  }, [notification]);

  const handleCloseNotification = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotificationOpen(false);
  };

  return (
    <div className={classes.root}>
      {notification && (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={notificationOpen}
          autoHideDuration={3000}
          onClose={handleCloseNotification}
        >
          <FlashMessage
            variant={notification.variant}
            message={notification.message}
            onClose={handleCloseNotification}
          />
        </Snackbar>
      )}
      <div className={classes.settingsPanel}>
        <FormPanel
          company={company}
          setCompany={setCompany}
          setAddedParent={setAddedParent}
          setAddedBroker={setAddedBroker}
          setDeletedParent={setDeletedParent}
          setDeletedBroker={setDeletedBroker}
          handleUpdate={() => updateCompany()}
        />
      </div>
      <div className={classes.uploadPanel}>
        <UploadPanel 
          company={company} 
          setCompany={setCompany} 
          setNotification={setNotification}
        />
      </div>
    </div>
  );
}
