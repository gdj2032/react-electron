import * as React from 'react';
import Header from 'component/Header';
import Aside from 'component/Aside';
import { Route, Switch } from 'react-router-dom';
import routeConfig from 'routes/routeConfig';
import './index.scss';

const PrimaryLayout = () => (
    <div className="m-primaryLayout-wrap">
        <Header/>
        <Aside/>
        <div className="m-layout-body">
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
    </div>
);

export default PrimaryLayout;
