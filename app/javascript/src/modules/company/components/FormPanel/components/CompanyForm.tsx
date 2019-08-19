import React, {useState} from'react'
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles'

import {CompanySettings_company_parent, CompanySettings_company_broker} from '../../../../../graphql/queries/__generated__/CompanySettings'
import StyledItem from './StyledItem'

const G2Logo = require('images/dummy/logos/g2-logo.svg')
const PrepDDLogo = require('images/logos/prepdd-logo.svg')

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '24px',
      color: '#606060',
      fontFamily: 'Montserrat',
      fontWeight: 600, 
      fontSize: '12px', 
      textTransform: 'capitalize'      
    },
    companyList: {
      display: 'flex',
      height: '36px', 
      alignItems: 'center', 
      borderBottom: '1px solid #D8D8D8', 
      fontFamily: 'Montserrat',
      fontWeight: 600, 
      fontSize: '15px', 
      textTransform: 'capitalize',
    }
  })
)

interface CompanyFormProps {
  label: string;
  placeholder: string;
  company: CompanySettings_company_parent | CompanySettings_company_broker | null;
}

export default function CompanyForm(props: CompanyFormProps) {
  const {label, placeholder, company} = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <p>{label}</p>
      <div className={classes.companyList}>
        { company ?
          <StyledItem key={label} label={label} /> :
          placeholder
        }
      </div>
    </div>
  )
}