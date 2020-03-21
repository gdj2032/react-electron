interface RoutePathFormat {
  home: string;
}
function generatePath(path: string) {
  return `/app/${path}`;
}

const pathConfig: RoutePathFormat = {
  home: generatePath('home'),
};

export default pathConfig;
