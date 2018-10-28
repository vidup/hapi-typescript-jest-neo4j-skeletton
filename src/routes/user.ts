import { User } from '../models';
const routePrefix = '/user';

export default [
  {
    method: 'GET',
    path: '/',
    handler: () => {
      return User.getAll();
    }
  }
].map(r => ({
  ...r,
  path: `${routePrefix}${r.path}`
}));
