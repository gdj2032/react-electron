import { RouteProps } from 'react-router-dom';
import {
  HomePage, BookPage
} from 'pages';
import pathConfig from './pathConfig';

const routeConfig: CustomRouteProps[] = [
  {
    path: pathConfig.home,
    component: HomePage,
    exact: true,
  },
  {
    path: [`${pathConfig.book}/:id`, pathConfig.book],
    component: BookPage,
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
