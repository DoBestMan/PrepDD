import React from 'react';
import {Router as ReachRouter, Link} from '@reach/router';
import SignInPage from './SignInPage';

const Home = props => <div>Home</div>;
const Dash = props => <div>Dash</div>;
const NotFound = props => <div>404 Not Found</div>;

export default function Router() {
  return (
    <ReachRouter>
      <Home path="/" />
      <Dash path="/dashboard" />
      <SignInPage path="/signin" />
      <NotFound default />
    </ReachRouter>
  );
}
