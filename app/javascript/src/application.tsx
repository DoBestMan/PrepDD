import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';

const r: any = React;
const ConcurrentMode = r.unstable_ConcurrentMode;

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    // <React.StrictMode>
    <ConcurrentMode>
      <Router />
    </ConcurrentMode>,
    // </React.StrictMode>
    document.body.appendChild(document.createElement('div'))
  );
});
