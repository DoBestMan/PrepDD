import React, {useState, useEffect, SyntheticEvent} from 'react';
import idx from 'idx';
import Snackbar from '@material-ui/core/Snackbar';

import Router from '../../modules/route';
import LoadingFallback from '../../modules/common/LoadingFallback';
import FlashMessage from '../../modules/common/FlashMessage';

import {useCurrentUser} from '../../graphql/queries/CurrentUser';
import {useGlobalState} from '../../store';

export default function App() {
  const {data, loading, error} = useCurrentUser({});
  const {state, dispatch} = useGlobalState();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);

  useEffect(() => {
    const currentUser = idx(data, data => data.currentUser.user);

    if (loading) return;
    setLoaded(true);
    if (!currentUser) return;

    dispatch({
      type: 'SET_CURRENT_USER',
      user: currentUser,
    });

    if (currentUser.lastViewedCompanyId) {
      dispatch({
        type: 'SET_SELECTED_COMPANY',
        companyId: currentUser.lastViewedCompanyId,
      });
    } else if (currentUser.ownedCompanies) {
      dispatch({
        type: 'SET_SELECTED_COMPANY',
        companyId: currentUser.ownedCompanies[0].id,
      });
    } else if (currentUser.companies) {
      dispatch({
        type: 'SET_SELECTED_COMPANY',
        companyId: currentUser.companies[0].id,
      });
    }
  }, [loading]);

  useEffect(() => {
    if (state.notification.message) {
      setNotificationOpen(true);
    }
  }, [state.notification.message]);

  const handleCloseNotification = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotificationOpen(false);
  };

  return !loaded ? (
    <LoadingFallback />
  ) : (
    <>
      {state.notification.message && (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={notificationOpen}
          autoHideDuration={2000}
          onClose={handleCloseNotification}
        >
          <FlashMessage
            variant={state.notification.variant}
            message={state.notification.message}
            onClose={handleCloseNotification}
          />
        </Snackbar>
      )}
      <Router />
    </>
  );
}
