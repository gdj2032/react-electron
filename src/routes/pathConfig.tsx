interface RoutePathFormat {
  home: string;
  animate: string;
  share: string;
  redux: string;
  rnplugins: string;
}
function generatePath(path: string) {
  return `/app/${path}`;
}

const pathConfig: RoutePathFormat = {
  home: generatePath('home'),
  animate: generatePath('animate'),
  share: generatePath('share'),
  redux: generatePath('redux'),
  rnplugins: generatePath('rnplugins'),
};

export default pathConfig;
