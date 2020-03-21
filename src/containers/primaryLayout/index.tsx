import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import routeConfig from 'routes/routeConfig';
import './index.scss';

const PrimaryLayout = () => (
  <div className="m-primaryLayout-wrap">
    <Switch>
      {
        routeConfig.map((route: any) => (
          <Route
            path={route.path}
            component={route.component}
            exact={route.exact}
            key={route.path}
          />
        ))
      }
    </Switch>
  </div>
);

export default PrimaryLayout;
