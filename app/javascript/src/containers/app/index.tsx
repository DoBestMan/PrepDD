import React, {useState, useEffect} from 'react';
import idx from 'idx';

import Router from '../../modules/route';
import LoadingFallback from '../../modules/common/LoadingFallback';

import {useCurrentUser} from '../../graphql/queries/CurrentUser';
import {useGlobalState} from '../../store';

export default function App() {
  const {data, loading, error} = useCurrentUser({});
  const {state, dispatch} = useGlobalState();
  const [loaded, setLoaded] = useState<boolean>(false);

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

  return !loaded ? <LoadingFallback /> : <Router />;
}
