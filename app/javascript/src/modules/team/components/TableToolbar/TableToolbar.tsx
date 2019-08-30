import React, {useState, useCallback, useEffect} from 'react';
import clsx from 'clsx';
import idx from 'idx';
import {Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import {Toolbar, Typography, Button, TextField} from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import DeleteIcon from '@material-ui/icons/DeleteForever';

import AutoSuggest from '../AutoSuggest';
import Dropdown from './components/Dropdown';

import * as cs from '../../../../constants/types';
import {useAddTeamMember} from '../../../../graphql/mutations/AddTeamMember';
import {useAllRoles} from '../../../../graphql/queries/AllRoles';
import {
  CompanyUsers_companyUsers_users_companies,
  CompanyUsers_companyUsers_users_teams,
  CompanyUsers_companyUsers_users_roles,
} from '../../../../graphql/queries/__generated__/CompanyUsers';

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      margin: '42px 31px 0px 31px',
    },
    grow: {
      flexGrow: 1,
    },
    invisible: {
      display: 'none',
    },
    title: {
      color: '#2C2C2C',
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: '24px',
    },
    primaryButton: {
      height: '42px',
      padding: '6px 24px 6px 24px',
      background: '#3A84FF',
      borderRadius: '3px',
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: '12px',
      color: '#FFFFFF',
      textAlign: 'center',
      textTransform: 'capitalize',
      '&:hover': {
        opacity: 0.7,
        background: '#3A84FF',
      },
    },
    deleteIcon: {
      display: 'flex',
      width: '42px',
      height: '42px',
      alignItems: 'center',
      justifyContent: 'center',
      '&:hover': {
        cursor: 'pointer',
        border: '1px solid #3A84FF',
        borderRadius: '3px',
      },
    },
    dropDown: {
      position: 'relative',
      margin: '0px 12px 0px 12px',
    },
    paper: {
      width: '300px',
      position: 'absolute',
      top: '42px',
      left: '0px',
      zIndex: 2,
      background: '#FFFFFF',
      padding: '24px',
      border: '1px solid #CACACA',
      borderRadius: '3px',
    },
    input: {
      display: 'block',
      width: '100%',
      marginTop: '6px',
      color: '#606060',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '12px',
      '& label': {
        color: '#606060',
        fontFamily: 'Montserrat',
        fontWeight: 600,
        fontSize: '12px',
      },
      '&:selected': {
        color: '#3A84FF',
      },
      '& div': {
        width: '100%',
      },
    },
    formTitle: {
      color: '#2C2C2C',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '12px',
      textTransform: 'capitalize',
    },
    menuItem: {
      padding: '12px',
      color: '#606060',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '12px',
      textTransform: 'capitalize',
      '&:hover': {
        cursor: 'pointer',
        background: '#EBF2FF',
      },
    },
    submitButton: {
      color: '#3A84FF',
      marginTop: '6px',
      padding: '6px 0px 6px 0px',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '12px',
      textTransform: 'capitalize',
    },
    primaryLabel: {
      padding: '6px 12px',
      color: '#3A84FF',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '12px',
      border: '2px solid #3A84FF',
      borderRadius: '3px',
    },
  })
);

interface StateProps {
  fullName: string;
  email: string;
  role: string;
  team: string;
}

interface TableToolbarProps {
  selected: number;
  company: string;
  handleDelete: () => void;
  setNotification: React.Dispatch<React.SetStateAction<cs.NotificationType | null>>;
  updateMemberList: (params: {
    id: string;
    fullName: string;
    companies: CompanyUsers_companyUsers_users_companies[] | null;
    teams: CompanyUsers_companyUsers_users_teams[] | null;
    roles: CompanyUsers_companyUsers_users_roles[] | null;
  }) => void;
}

const TableToolbar = (props: TableToolbarProps) => {
  const {
    selected,
    company,
    setNotification,
    handleDelete,
    updateMemberList,
  } = props;
  const classes = useToolbarStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [state, setState] = useState<StateProps>({
    fullName: '',
    email: '',
    role: '',
    team: '',
  });

  const {data, loading, error} = useAllRoles({});

  const [
    addTeamMember,
    {
      loading: addTeamMemberLoading,
      data: addTeamMemberRes,
      error: addTeamMemberError,
    },
  ] = useAddTeamMember({
    fullName: state.fullName,
    email: state.email,
    role: state.role,
    team: state.team,
    companyId: company,
  });

  useEffect(() => {
    const roles = idx(data, data => data.roles);

    if (loading || !roles) return;
    const userRole = roles.find(role => role.name === 'User');

    if (userRole) {
      setState({
        ...state,
        role: userRole.id,
      });
    }
  }, [idx(data, data => data.roles)]);

  useEffect(() => {
    const addMemberErrors = idx(
      addTeamMemberRes,
      addTeamMemberRes => addTeamMemberRes.addTeamMember.errors
    );

    if (!addMemberErrors || !addMemberErrors.length) return;
    setNotification({
      variant: 'warning',
      message: addMemberErrors[0].message,
    });
  }, [
    idx(
      addTeamMemberRes,
      addTeamMemberRes => addTeamMemberRes.addTeamMember.errors
    ),
  ]);

  useEffect(() => {
    const addedUser = idx(
      addTeamMemberRes,
      addTeamMemberRes => addTeamMemberRes.addTeamMember.user
    );

    if (addTeamMemberLoading || !addedUser) return;
    updateMemberList({
      id: addedUser.id,
      fullName: addedUser.fullName,
      companies: addedUser.companies,
      teams: addedUser.teams,
      roles: addedUser.roles,
    });
    setNotification({
      variant: 'success',
      message: 'Add team member successfully',
    });
  }, [
    addTeamMemberLoading,
    idx(
      addTeamMemberRes,
      addTeamMemberRes => addTeamMemberRes.addTeamMember.user
    ),
  ]);

  const handleChange = useCallback(
    event => {
      const {name, value} = event.target;
      setState(state => ({...state, [name]: value}));
    },
    [setState]
  );

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClickAway = (event: React.MouseEvent<unknown>) => {
    setOpen(false);
  };

  const handleChangeTeam = (newValue: string) => {
    setState(prev => ({
      ...prev,
      team: newValue,
    }));
  };

  const handleSubmit = useCallback(
    event => {
      setOpen(false);
      event.preventDefault();
      addTeamMember();
      setState({
        fullName: '',
        email: '',
        role: '5',
        team: '',
      });
    },
    [addTeamMember]
  );

  return (
    <Toolbar className={classes.root} disableGutters>
      <Typography className={classes.title} variant="h2">
        Team Management
      </Typography>
      <div className={classes.dropDown}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <div>
            <Button className={classes.primaryButton} onClick={handleToggle}>
              Invite member
            </Button>
            <form
              className={clsx(classes.paper, !open && classes.invisible)}
              onSubmit={handleSubmit}
            >
              <Typography className={classes.formTitle} variant="h6">
                New team member
              </Typography>
              <TextField
                id="name"
                name="fullName"
                label="Name"
                className={classes.input}
                value={state.fullName}
                onChange={handleChange}
                required
              />
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                className={classes.input}
                value={state.email}
                onChange={handleChange}
                autoFocus
                required
              />
              {data && data.roles && (
                <Dropdown
                  data={data.roles}
                  selected={state.role}
                  placeholder="Role"
                  handleChange={role =>
                    setState(prev => ({
                      ...prev,
                      role,
                    }))
                  }
                />
              )}
              <AutoSuggest value={state.team} handleChange={handleChangeTeam} />
              <Button type="submit" className={classes.submitButton}>
                Invite new team member
              </Button>
            </form>
          </div>
        </ClickAwayListener>
      </div>
      <div className={classes.grow} />
      {selected > 0 && (
        <Typography className={classes.primaryLabel} variant="h6">
          View {selected} member(s)
        </Typography>
      )}
      {selected > 0 && (
        <div className={classes.deleteIcon}>
          <DeleteIcon onClick={handleDelete} />
        </div>
      )}
    </Toolbar>
  );
};

export default TableToolbar;
