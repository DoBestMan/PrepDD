import React from 'react';
import {Router as ReachRouter} from '@reach/router';
import ListPage from '../list';

export default function Router(props: {path: string}) {
  return (
    <ReachRouter>
      <ListPage path="/" />
    </ReachRouter>
  );
}
