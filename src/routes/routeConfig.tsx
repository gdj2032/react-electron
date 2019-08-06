import { RouteProps } from 'react-router-dom';
import {
  HomePage, ReduxPage, AnimatePage, RNPluginsPage, SharePage
} from 'pages';
import pathConfig from './pathConfig';

const routeConfig: CustomRouteProps [] = [
    {
        path: pathConfig.home,
        component: HomePage,
        exact: true,
    },
    {
      path: pathConfig.animate,
      component: AnimatePage,
      exact: true,
    },
    {
      path: pathConfig.share,
      component: SharePage,
      exact: true,
    },
    {
      path: pathConfig.redux,
      component: ReduxPage,
      exact: true,
    },
    {
      path: pathConfig.rnplugins,
      component: RNPluginsPage,
      exact: true,
    },
    // {
    //     path: [`${pathConfig.productEdit}/:productId/:categoryType`, pathConfig.productEdit],
    //     component: ProductEditPage,
    //     exact: true,
    // },
];

interface CustomRouteProps extends RouteProps {
  path: string | string[];
}

export default routeConfig;
