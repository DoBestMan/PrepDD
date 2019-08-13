import React from 'react'
import {Router as ReachRouter} from '@reach/router'
import ManagementPage from '../team'

export default function Router(props: {path: string}) {
  return (
    <ReachRouter>
      <ManagementPage path="/" />
    </ReachRouter>
  );
}
