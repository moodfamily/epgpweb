import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import './i18n';
import { Members } from './Members';
import { EPGPEvents } from './EPGPEvents';

export const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact={true} component={Members} />
      <Route
        path="/events/:name"
        exact={true}
        render={({ match }) => <EPGPEvents name={match.params['name']} />} />
    </BrowserRouter>
  );
};
