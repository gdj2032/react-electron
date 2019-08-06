import * as React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import PrimaryLayout from 'containers/primaryLayout';

class CustomRoute extends React.Component{

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/app" component={PrimaryLayout} />
          <Redirect to="/app/home" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default CustomRoute;
