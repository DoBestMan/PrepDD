import React, {useState, useEffect} from 'react';
import idx from 'idx';
import {Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import {
  Drawer,
  Table,
  TableHead,
  TableBody,
  Typography,
  Button,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import CloseIcon from '@material-ui/icons/Close';

import LoadingFallback from '../../../components/LoadingFallback'
import Dropdown from '../../../components/Dropdown';
import StyledItem from './styled/StyledItem';
import StyledTableRow from './styled/StyledTableRow';
import StyledTableCell from './styled/StyledTableCell';

import {useUserDetails} from '../../../graphql/queries/UserDetails'

const DefaultPhoto = require('images/dummy/photos/Alana.jpg');
const G2Logo = require('images/dummy/logos/g2-logo.svg');
const PrepddLogo = require('images/logos/prepdd-logo.svg');
const DripLogo = require('images/dummy/logos/drip-logo.svg');

const panelWidth = 500;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: panelWidth,
      flexShrink: 0,
      color: '#606060',
      fontFamily: 'Montserrat',
      fontSize: '12px',
      fontWeight: 600,
    },
    flex: {
      display: 'flex',
    },
    grow: {
      flexGrow: 1,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '42px 31px 0px 31px',
    },
    drawerPaper: {
      width: panelWidth,
    },
    drawerSpacer: {
      marginTop: 64
    },
    round: {
      borderRadius: '50%',
    },
    title: {
      margin: '0px 6px 0px 12px',
      color: '#2C2C2C',
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: '24px',
    },
    roleForm: {
      margin: '36px 32px 0px 32px',
    },
    roleLabel: {
      color: '#606060',
      fontFamily: 'Montserrat',
      fontSize: '12px',
      fontWeight: 600,
    },
    table: {
      width: 'auto',
      margin: '24px 32px 0px 32px',
      color: '#606060',
      fontFamily: 'Montserrat',
      fontSize: '12px',
      fontWeight: 600,
    },
    primaryColor: {
      color: '#3A84FF',
    },
    addLink: {
      margin: '25px 31px 0px 31px',
      color: '#3A84FF',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '12px',
    },
    resetButton: {
      width: '170px',
      height: '42px',
      margin: '25px 31px 0px 31px',
      color: 'white',
      background: '#3A84FF',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '12px',
      textTransform: 'capitalize',
    },
  })
);

const options = [
  {label: 'Member', value: 'Member'},
  {label: 'Admin', value: 'Admin'},
];

interface DetailPaneProps {
  id: string;
  open: boolean;
}

interface StateProps {
  id: string;
  fullName: string;
  roles: {id: string; name: string}[];
  companies: {id: string; name: string}[];
}

export default function DetailPane(props: DetailPaneProps) {
  const {id, open} = props;
  const classes = useStyles();
  const [state, setState] = useState<StateProps>({
    id: '',
    fullName: '',
    roles: [], 
    companies: []
  })

  const {loading, data, error} = useUserDetails({id, })

  useEffect(() => {
    const currentUser = idx(data, data => data.user);

    if (loading || !currentUser) return;

    console.log(data, currentUser);

    setState({
      ...state, 
      fullName: currentUser.fullName
    })
  }, [loading])

  return (loading ?
    <LoadingFallback /> :
    (
      <Drawer
        className={classes.root}
        variant="persistent"
        anchor="right"
        open={props.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        ((!data || error) ?
          <h1>Error</h1> :
          (
            <>
              <div className={classes.drawerSpacer} />
              <div className={classes.drawerHeader}>
                <img
                  className={classes.round}
                  src={DefaultPhoto}
                  width="30"
                  height="30"
                  alt="Alana"
                />
                <Typography className={classes.title} variant="h2">
                  {state.fullName || "Guy Number1"}
                </Typography>
                <CreateIcon className={classes.primaryColor} />
                <div className={classes.grow} />
                <DeleteIcon />
                <CloseIcon style={{marginLeft: '6px'}} />
              </div>

              <div className={classes.roleForm}>
                <div style={{width: 'fit-content'}}>
                  <p className={classes.roleLabel}>Role</p>
                  <Dropdown options={options} placeholder={state.roles[0].name} />
                </div>
              </div>

              <Table className={classes.table}>
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Company(s)</StyledTableCell>
                    <StyledTableCell>Team(s)</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell>
                      <StyledItem logo={G2Logo} label="G2 Crowd" />
                    </StyledTableCell>
                    <StyledTableCell>
                      <div className={classes.flex}>
                        <StyledItem label="Finance" />
                        <StyledItem label="Legal" />
                        <StyledItem label="+1" />
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell>
                      <div className={classes.flex} style={{alignItems: 'center'}}>
                        <img
                          src={DripLogo}
                          width="18"
                          height="18"
                          alt="Drip"
                        />
                        <div style={{marginLeft: '6px'}}>Drip</div>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell>Finance, Legal</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell>
                      <div className={classes.flex} style={{alignItems: 'center'}}>
                        <img src={PrepddLogo} width="18" height="18" alt="g2" />
                        <div style={{marginLeft: '6px'}}>Advocately</div>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell>Finance</StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
              <Typography className={classes.addLink} variant="h6">
                Add new company & team
              </Typography>
              <Button className={classes.resetButton}>Reset password</Button>
            </>
          )
        )        
      </Drawer>
    )
  );
}
