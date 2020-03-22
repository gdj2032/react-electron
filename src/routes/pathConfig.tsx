interface RoutePathFormat {
  home: string;
  book: string;
}
function generatePath(path: string) {
  return `/app/${path}`;
}

const pathConfig: RoutePathFormat = {
  home: generatePath('home'),
  book: generatePath('book'),
};

export default pathConfig;
