import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import idx from 'idx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
} from '@material-ui/core';

import InternalIcon from '@material-ui/icons/Lock';
import ShareIcon from '@material-ui/icons/People';
import RequestIcon from '@material-ui/icons/Input';

import InputForm from './components/InputForm';
import OwnerForm from './components/OwnerForm';
import CompanyForm from './components/CompanyForm';
import Alert from './components/Alert';

import {canBeAdmin} from '../../../../../helpers/roleHelpers';
import {useGlobalState} from '../../../../../store';

import {ListType} from '../../../../../constants/types';
import {useCreateList} from '../../../../../graphql/mutations/CreateList';
import {useAddListOwner} from '../../../../../graphql/mutations/AddListOwner';
import {useInviteNewCompanyToList} from '../../../../../graphql/mutations/InviteNewCompanyToList';
import {
  AllTemplates_templateLists,
  AllTemplates_templateLists_tasks,
} from '../../../../../graphql/queries/__generated__/AllTemplates';
import {
  SearchCompanyUsers_searchCompanyUsers_users,
  SearchCompanyUsers_searchCompanyUsers_teams,
} from './components/__generated__/SearchCompanyUsers';
import {TaskAttributes} from '../../../../../graphql/__generated__/globalTypes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    body: {
      display: 'flex', 
      height: 'calc(100vh - 144px)',
      padding: '0px calc((100% - 1080px) / 2) 0px calc((100% - 1080px) / 2)',
      borderBottom: '1px solid #D8D8D8',
      overflow: 'auto',
    },
    pane: {
      width: '500px', 
      padding: '20px', 
    },
    footer: {
      height: '60px',
      padding: '0px calc((100% - 1080px) / 2) 0px calc((100% - 1080px) / 2)',
    },
    flex: {
      display: 'flex',
      alignItems: 'center',
    },
    grow: {
      flexGrow: 1,
    },
    secondary: {
      color: '#606060',
      marginTop: '24px',
      marginBottom: '12px',
    },
    sharingTitle: {
      color: '#606060',
      marginLeft: '3px',
    },
    icon: {
      fontSize: '15px',
      marginRight: '12px',
    },
    explanation: {
      color: '#606060',
      marginLeft: '32px',
    },
    grayRect: {
      width: '36px',
      height: '36px',
      backgroundColor: '#F2F2F2',
      border: '1px solid #D8D8D8',
      borderRadius: '3px',
      marginRight: '12px',
    },
    description: {
      width: '100%',
      height: '180px',
      borderRadius: '3px',
      resize: 'none',
      border: '1px solid #D8D8D8',
      color: '#2C2C2C',
      fontFamily: 'Montserrat',
      fontSize: '12px',
      fontWeight: 600,
    },
  })
);

interface CreateListStepProps {
  selectedTemplate: AllTemplates_templateLists;
  stepNumber: number;
  currentStep: number;
  history?: any;
}

interface NewCompanyType {
  newCompanyName: string;
  ownerEmail: string;
}

const CreateListStep = (props: any) => {
  const {
    selectedTemplate,
    stepNumber,
    currentStep,
    history,
  } = props;
  const classes = useStyles();

  const {state, dispatch} = useGlobalState();
  const [newTemplate, setNewTemplate] = useState<ListType>({
    name: '',
    description: '',
    requesterId: state.selectedCompany,
    responderId: '',
  });
  const [sharing, setSharing] = useState<string>('internal');
  const [owners, setOwners] = useState<(SearchCompanyUsers_searchCompanyUsers_users | SearchCompanyUsers_searchCompanyUsers_teams)[]>([]);
  const [listId, setListId] = useState<string>('');
  const [inviteCompany, setInviteCompany] = useState<NewCompanyType>({
    newCompanyName: '',
    ownerEmail: '',
  });

  const [createList, {loading, data, error}] = useCreateList({
    ...newTemplate,
    tasks:
      selectedTemplate && selectedTemplate.tasks
        ? selectedTemplate.tasks.map(
            (task: AllTemplates_templateLists_tasks) => {
              return {
                name: task.name ? task.name : '',
                description: task.description ? task.description : '',
                priority: task.priority ? task.priority : '',
                status: 'To do',
                dueDate: Date(),
                section: task && task.section ? task.section.name : '',
                isActive: true,
              } as TaskAttributes;
            }
          )
        : [],
  });
  const [
    inviteNewCompanyToList,
    {
      loading: inviteNewCompanyLoading,
      data: inviteNewCompanyRes,
      error: inviteNewCompanyError,
    },
  ] = useInviteNewCompanyToList({
    ...inviteCompany,
    listId,
    companyId: state.selectedCompany,
    isRequest: sharing === 'issue',
    isShare: sharing === 'share',
  });

  const getEmails = () => {
    const userArray = owners.filter(
      owner => owner.__typename === 'User'
    ) as SearchCompanyUsers_searchCompanyUsers_users[];

    return userArray.map(owner => owner.email);
  };

  const [
    addListOwner,
    {
      loading: addOwnerLoading, 
      data: addOwnerRes, 
      error: addOwnerError
    },
  ] = useAddListOwner({
    listId,
    companyId: state.selectedCompany,
    userEmails: getEmails(),
    teamIds: owners
              .filter(owner => owner.__typename === 'Team')
              .map(owner => owner.id),
  });

  useEffect(() => {
    const addSuccess = idx(
      addOwnerRes,
      addOwnerRes => addOwnerRes.addListOwner.success
    );
    const inviteSuccess = idx(
      inviteNewCompanyRes,
      inviteNewCompanyRes => inviteNewCompanyRes.inviteNewCompanyToList.success
    );

    if (addSuccess && (!inviteCompany.ownerEmail || inviteSuccess)) {
      dispatch({
        type: 'SET_NOTIFICATION', 
        notification: {
          variant: 'success',
          message: 'Create List successfully',
        }
      });
      history.goBack();
    }
  }, [
    addOwnerLoading,
    inviteNewCompanyLoading,
    idx(addOwnerRes, addOwnerRes => addOwnerRes.addListOwner.success),
    idx(
      inviteNewCompanyRes,
      inviteNewCompanyRes => inviteNewCompanyRes.inviteNewCompanyToList.success
    ),
  ]);

  useEffect(() => {
    setNewTemplate({
      ...newTemplate,
      name: selectedTemplate.name as string,
    });
  }, [selectedTemplate.name]);

  useEffect(() => {
    const response = idx(data, data => data.createList);
    if (loading || !response) return;

    if (response.list) {
      const createMetaData = async () => {
        if (!response || !response.list) return;
        await setListId(response.list.id);
        addListOwner();
        if (inviteCompany.ownerEmail) {
          inviteNewCompanyToList();
        }
      };

      createMetaData();
    } else if (response.errors && response.errors.length) {
      dispatch({
        type: 'SET_NOTIFICATION', 
        notification: {
          variant: 'error',
          message: response.errors[0].message,
        }
      });
    }
  }, [loading, idx(data, data => data.createList.list)]);

  useEffect(() => {
    const errors = idx(
      addOwnerRes,
      addOwnerRes => addOwnerRes.addListOwner.errors
    );

    if (errors && errors.length) {
      dispatch({
        type: 'SET_NOTIFICATION', 
        notification: {
          variant: 'error',
          message: errors[0].message,
        }
      });
    }
  }, [
    addOwnerLoading,
    idx(addOwnerRes, addOwnerRes => addOwnerRes.addListOwner.errors),
  ]);

  useEffect(() => {
    const errors = idx(
      inviteNewCompanyRes,
      inviteNewCompanyRes => inviteNewCompanyRes.inviteNewCompanyToList.errors
    );

    if (errors && errors.length) {
      dispatch({
        type: 'SET_NOTIFICATION', 
        notification: {
          variant: 'error',
          message: errors[0].message,
        }
      });
    }
  }, [
    inviteNewCompanyLoading,
    idx(
      inviteNewCompanyRes,
      inviteNewCompanyRes => inviteNewCompanyRes.inviteNewCompanyToList.errors
    ),
  ]);

  const getRole = () => {
    if (state && state.currentUser && state.currentUser.roles) {
      const findRole = state.currentUser.roles.find(
        role => role.companyId === state.selectedCompany
      );

      return findRole ? findRole.name : 'User';
    }
    return 'User';
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTemplate({
      ...newTemplate,
      name: event.target.value,
    });
  };

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewTemplate({
      ...newTemplate,
      description: event.target.value,
    });
  };

  const handleChangeSharing = (event: React.ChangeEvent<{}>, value: string) => {
    setSharing(value);

    if (value === 'internal' || value === 'issue') {
      setNewTemplate({
        ...newTemplate,
        requesterId: state.selectedCompany,
        responderId: '',
      });
    } else if (value === 'share') {
      setNewTemplate({
        ...newTemplate,
        requesterId: '',
        responderId: state.selectedCompany,
      });
    }
  };

  const handleCreate = () => {
    // Create List
    createList();
  };

  const InternalLabel = (
    <Typography variant="h6" className={classes.flex}>
      <InternalIcon className={classes.icon} />
      Internal
    </Typography>
  );
  const ShareLabel = (
    <Typography variant="h6" className={classes.flex}>
      <ShareIcon className={classes.icon} />
      Share
    </Typography>
  );
  const RequestLabel = (
    <Typography variant="h6" className={classes.flex}>
      <RequestIcon className={classes.icon} />
      Request
    </Typography>
  );

  return stepNumber == currentStep ? (
    <div>
      <div className={classes.body}>
        <div className={classes.pane}>
          <Typography variant="h2">Create List</Typography>
          <FormControl component="fieldset" style={{marginTop: '24px'}}>
            <Typography variant="h6" className={classes.sharingTitle}>
              Sharing
            </Typography>
            <RadioGroup
              aria-label="sharing"
              name="sharing"
              value={sharing}
              onChange={handleChangeSharing}
            >
              <FormControlLabel
                value="internal"
                label={InternalLabel}
                control={<Radio color="primary" />}
              />
              <Typography variant="h6" className={classes.explanation}>
                Collaborate within your company. Use this setting when sharing
                information with your colleagues
              </Typography>
              {canBeAdmin(getRole()) && (
                <>
                  <FormControlLabel
                    value="share"
                    label={ShareLabel}
                    control={<Radio color="primary" />}
                  />
                  <Typography variant="h6" className={classes.explanation}>
                    Send information to an external company. Use this setting
                    when your company has the primary responsibility for
                    providing the information in the task list.
                  </Typography>
                  <FormControlLabel
                    value="issue"
                    label={RequestLabel}
                    control={<Radio color="primary" />}
                  />
                  <Typography variant="h6" className={classes.explanation}>
                    Issue a request for information from an external company.
                    Use this setting when the other company is responsible for
                    providing most of the information in the task list.
                  </Typography>
                </>
              )}
            </RadioGroup>
          </FormControl>
          {sharing !== 'internal' && <Alert />}
        </div>
        <div className={classes.pane}>
          <Typography variant="h2">Sharing to List Type</Typography>

          <InputForm
            label="Title"
            value={newTemplate.name}
            onChange={handleChangeName}
          />

          <div>
            <Typography variant="h6" className={classes.secondary}>
              Template
            </Typography>
            <div className={classes.flex}>
              <div className={classes.grayRect} />
              <Typography variant="h6">{selectedTemplate.name}</Typography>
            </div>
          </div>

          <OwnerForm owners={owners} setOwners={setOwners} />
          {sharing !== 'internal' && (
            <CompanyForm
              sharing={sharing}
              newTemplate={newTemplate}
              setNewTemplate={setNewTemplate}
              inviteCompany={inviteCompany}
              setInviteCompany={setInviteCompany}
            />
          )}

          <div>
            <Typography variant="h6" className={classes.secondary}>
              Description
            </Typography>
            <textarea
              className={classes.description}
              value={newTemplate.description}
              onChange={handleChangeDescription}
            />
          </div>
        </div>
      </div>

      <div className={classes.footer}>
        <div className={classes.flex} style={{paddingTop: '12px'}}>
          <div className={classes.grow} />
          <Button variant="contained" onClick={handleCreate}>
            Create List
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default withRouter(CreateListStep);
