import React, { useState, useEffect } from 'react'
import idx from 'idx'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'

import { useGlobalState } from '../../store'
import { useCompanySettings } from '../../graphql/queries/CompanySettings'
import { useUpdateCompany } from '../../graphql/mutations/UpdateCompany'
import { CompanySettings_company } from '../../graphql/queries/__generated__/CompanySettings'

import FormPanel from './components/FormPanel'
import UploadPanel from './components/UploadPanel'

const panelWidth = 1095

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'flex', 
      height: 'calc(100vh - 64px)',
      padding: `72px calc((100% - ${panelWidth}px) / 2) 72px calc((100% - ${panelWidth}px) / 2)`
    }, 
    settingsPanel: {
      display: 'block',
      width: '772px'
    },
    uploadPanel: {
      display: 'block', 
      marginLeft: '72px'
    },
  })
)

export default function CompanySettings(props: {path?: string;}) {
  const classes = useStyles()
  const { state } = useGlobalState()
  const [company, setCompany] = useState<CompanySettings_company>({
    __typename: "Company",
    id: '',
    name: '',
    logoUrl: '',
    parent: null, 
    broker: null, 
    totalUsers: 0, 
    totalStorage: 0,
    subscription: null, 
    autoPdf: false, 
    autoWatermark: false, 
    previewOnly: false
  })

  const {data, error, loading} = useCompanySettings({id: state.selectedCompany})
  const [updateCompany] = useUpdateCompany({
    id: company.id, 
    name: company.name, 
    autoPdf: company.autoPdf as boolean, 
    autoWatermark: company.autoWatermark as boolean, 
    previewOnly: company.previewOnly as boolean
  })  

  useEffect(() => {
    const companyData = idx(data, data => data.company);

    if (loading || !companyData) return;

    setCompany({
      ...companyData
    })
  }, [loading, idx(data, data => data.company)])

  return (
    <div className={classes.root}>
      <div className={classes.settingsPanel}>
        <FormPanel 
          company={company} 
          setCompany={setCompany}
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
  )
}