import React, {useState, useEffect} from 'react';
import idx from 'idx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';

import {useGlobalState} from '../../store';
import * as cs from '../../constants/types';
import {useCompanySettings} from '../../graphql/queries/CompanySettings';
import {useUpdateCompany} from '../../graphql/mutations/UpdateCompany';
import {CompanySettings_company} from '../../graphql/queries/__generated__/CompanySettings';

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
  const {state, dispatch} = useGlobalState();
  const [addedParent, setAddedParent] = useState<string>('');
  const [addedBroker, setAddedBroker] = useState<string>('');
  const [deletedParent, setDeletedParent] = useState<string>('');
  const [deletedBroker, setDeletedBroker] = useState<string>('');
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
    parentId: addedParent,
    brokerId: addedBroker,
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
    setAddedParent('');
    setAddedBroker('');
    setDeletedParent('');
    setDeletedBroker('');
    dispatch({
      type: 'SET_NOTIFICATION', 
      notification: {
        variant: 'success',
        message: 'Update company data successfully',
      }
    });
  }, [
    updateCompanyLoading,
    idx(
      updateCompanyRes,
      updateCompanyRes => updateCompanyRes.updateCompanySettings.company
    ),
  ]);

  useEffect(() => {
    const errors = idx(
      updateCompanyRes,
      updateCompanyRes => updateCompanyRes.updateCompanySettings.errors
    );

    if (!errors || !errors.length) return;
    dispatch({
      type: 'SET_NOTIFICATION', 
      notification: {
        variant: 'error',
        message: errors[0].message,
      }
    });
  }, [
    idx(
      updateCompanyRes,
      updateCompanyRes => updateCompanyRes.updateCompanySettings.errors
    ),
  ]);

  return (
    <div className={classes.root}>
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
        />
      </div>
    </div>
  );
}
