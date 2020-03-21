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
  },
];

export default menuConfig;
