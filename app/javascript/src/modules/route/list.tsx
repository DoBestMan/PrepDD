import React from 'react';
import {Router as ReachRouter} from '@reach/router';
import ListPage from '../list';

export default function Router() {
  return (
    <ReachRouter>
      <ListPage path="/" />
    </ReachRouter>
  );
}
