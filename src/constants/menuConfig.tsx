import pathConfig from 'routes/pathConfig';

export interface NavFormat {
  label: string;
  route: string;
  icon?: string;
  children?: NavFormat[];
}

const menuConfig = [
  {
    label: '首页',
    route: pathConfig.home,
    icon: 'icon_home',
    children: [
      {
        label: 'Home',
        route: pathConfig.home,
        // icon: 'base',
      },
      {
        label: '动画',
        route: pathConfig.animate,
        // icon: 'base',
      },
      {
        label: '分享',
        route: pathConfig.share,
        // icon: 'base',
      },
    ],
  },
  {
    label: 'ReduxPage',
    route: pathConfig.redux,
    icon: 'icon_redux',
  },
  {
    label: 'RN插件',
    route: pathConfig.rnplugins,
    icon: 'icon_rn',
  },
];

export default menuConfig;
