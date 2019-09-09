import React from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Card,
  Typography,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';

import InputForm from '../../../common/EditableInputForm';
import CompanyForm from './components/CompanyForm';
import SwitchForm from '../../../common/SwitchForm';
import StyledTableCell from './components/StyledTableCell';

import {useGlobalState} from '../../../../store';
import {CompanySettings_company} from '../../../../graphql/queries/__generated__/CompanySettings';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    title: {
      color: '#2C2C2C',
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: '26px',
    },
    table: {
      marginTop: '36px',
    },
    tableTitle: {
      color: '#2C2C2C',
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: '21px',
    },
    tableHeadCell: {
      padding: '12px 0px 12px 0px',
      color: '#606060',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '12px',
    },
    tableBody: {
      color: '#2C2C2C',
      fontFamily: 'Montserrat',
      fontSize: '15px',
    },
    flex: {
      display: 'flex',
      alignItems: 'center',
    },
    grow: {
      flexGrow: 1,
    },
  })
);

interface FormPanelProps {
  company: CompanySettings_company;
  setCompany: (value: React.SetStateAction<CompanySettings_company>) => void;
  setAddedParent: (value: React.SetStateAction<string>) => void;
  setAddedBroker: (value: React.SetStateAction<string>) => void;
  setDeletedParent: (value: React.SetStateAction<string>) => void;
  setDeletedBroker: (value: React.SetStateAction<string>) => void;
  handleUpdate: () => void;
}

export default function FormPanel(props: FormPanelProps) {
  const {
    company,
    setCompany,
    setAddedParent,
    setAddedBroker,
    setDeletedParent,
    setDeletedBroker,
    handleUpdate,
  } = props;
  const classes = useStyles();

  const {state, dispatch} = useGlobalState();

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompany({
      ...company,
      name: event.target.value,
    });
  };

  const handleUpdateName = () => {
    handleUpdate();

    if (state.currentUser.companies) {
      const index = state.currentUser.companies.findIndex(
        a => a.id === company.id
      );
      const newCompanies = state.currentUser.companies;

      newCompanies[index].name = company.name;
      dispatch({
        type: 'SET_CURRENT_USER',
        user: {
          ...state.currentUser,
          companies: newCompanies,
        },
      });
    }
  };

  const handleUpdateParent = async (newValue: string) => {
    await setAddedParent(newValue);
    handleUpdate();
  };

  const handleUpdateBroker = async (newValue: string) => {
    await setAddedBroker(newValue);
    handleUpdate();
  };

  const handleUpdateDeletedParent = async (newValue: string) => {
    await setDeletedParent(newValue);
    handleUpdate();
  };

  const handleUpdateDeletedBroker = async (newValue: string) => {
    await setDeletedBroker(newValue);
    handleUpdate();
  };

  const handleAutoPDF = async () => {
    await setCompany({...company, autoPdf: !company.autoPdf});
    handleUpdate();
  };

  const handleAutoWatermark = async () => {
    await setCompany({...company, autoWatermark: !company.autoWatermark});
    handleUpdate();
  };

  const handlePreviewOnly = async () => {
    await setCompany({...company, previewOnly: !company.previewOnly});
    handleUpdate();
  };

  return (
    <Card elevation={0}>
      <Typography className={classes.title} variant="h2">
        Company Settings
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <InputForm
            label="Company name"
            value={company.name}
            onChange={handleChangeName}
            onUpdate={handleUpdateName}
          />
        </Grid>
        <Grid item md={6}>
          <CompanyForm
            label="Parent company"
            placeholder="Search parent company..."
            companyData={company}
            companies={company.parents}
            currentCompanyId={state.selectedCompany}
            onUpdate={handleUpdateParent}
            onDelete={handleUpdateDeletedParent}
            setCompany={setCompany}
            parent
          />
        </Grid>
        <Grid item md={6}>
          <CompanyForm
            label="Broker"
            placeholder="Search broker..."
            companyData={company}
            companies={company.brokers}
            currentCompanyId={state.selectedCompany}
            onUpdate={handleUpdateBroker}
            onDelete={handleUpdateDeletedBroker}
            setCompany={setCompany}
          />
        </Grid>
        <Grid item md={12}>
          <div className={classes.table}>
            <Typography className={classes.tableTitle} variant="h2">
              Utilization Snapshot
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeadCell}>
                    Product feature
                  </TableCell>
                  <TableCell className={classes.tableHeadCell}>
                    Current
                  </TableCell>
                  <TableCell className={classes.tableHeadCell}>Max</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody}>
                <TableRow>
                  <StyledTableCell>
                    Total users this month(2 days remain)
                  </StyledTableCell>
                  <StyledTableCell>{company.totalUsers} users</StyledTableCell>
                  <StyledTableCell>
                    {company.subscription ? company.subscription.maxUsers : 0}{' '}
                    users
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Total storage used(GB)</StyledTableCell>
                  <StyledTableCell>{company.totalStorage} GB</StyledTableCell>
                  <StyledTableCell>
                    {company.subscription ? company.subscription.maxStorage : 0}{' '}
                    GB
                  </StyledTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Grid>
        <Grid item md={12}>
          <div className={classes.table}>
            <Typography className={classes.tableTitle} variant="h2">
              External File Sharing
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeadCell}>
                    Allow your users in your company to use these features when
                    sharing files externally
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <StyledTableCell>
                    <div className={classes.flex}>
                      <p>Automatic PDF</p>
                      <div className={classes.grow} />
                      <SwitchForm
                        value={company.autoPdf}
                        onChange={handleAutoPDF}
                      />
                    </div>
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>
                    <div className={classes.flex}>
                      <p>Dynamic watermarking</p>
                      <div className={classes.grow} />
                      <SwitchForm
                        value={company.autoWatermark}
                        onChange={handleAutoWatermark}
                      />
                    </div>
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>
                    <div className={classes.flex}>
                      <p>Preview only</p>
                      <div className={classes.grow} />
                      <SwitchForm
                        value={company.previewOnly}
                        onChange={handlePreviewOnly}
                      />
                    </div>
                  </StyledTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
}
