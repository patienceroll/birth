export type RouteName = keyof RouteNamesType;

export type RouteNamesType = {
  birth: 'birth';
  sets: 'sets';
  birthModify: 'birthModify';
};

const RouteNames: RouteNamesType = {
  birth: 'birth',
  sets: 'sets',
  birthModify: 'birthModify',
};

export default RouteNames;
