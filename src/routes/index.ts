import express from 'express';
import { UserRouter } from '../app/modules/user/user.route';
import { AuthRouter } from '../app/modules/auth/auth.route';
import { ProductRouter } from '../app/modules/products/products.route';
import { CartRoute } from '../app/modules/cart/cart.route';
import { MessageRouter } from '../app/modules/message/message.route';
import { ChatRouter } from '../app/modules/chat/chat.route';

const router = express.Router();
const routes = [
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/products',
    route: ProductRouter,
  },
  {
    path: '/cart',
    route: CartRoute,
  },
  {
    path: '/messages',
    route: MessageRouter,
  },
  {
    path: '/chat',
    route: ChatRouter,
  },
];

routes.forEach((element) => {
  if (element?.path && element?.route) {
    router.use(element?.path, element?.route);
  }
});

export default router;
