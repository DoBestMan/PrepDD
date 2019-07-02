import React from 'react';
import {Router as ReachRouter, Link} from '@reach/router';
import SignInPage from './SignInPage';

let Home = props => <div>Home</div>;
let Dash = props => <div>Dash</div>;

export default function Router() {
  return (
    <ReachRouter>
      <Home path="/" />
      <Dash path="dashboard" />
      <SignInPage path="/signin" />
    </ReachRouter>
  );
}
