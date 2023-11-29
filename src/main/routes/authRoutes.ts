import { type Router } from 'express';
import { expressRouterAdapter } from '@/main/adapters/expressRouterAdapter';
import { makeSignUpController } from '@/main/factories/controllers/signup';

export default (router: Router): void => {
  router.post('/signup', expressRouterAdapter(makeSignUpController()));
};
