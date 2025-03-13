import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import { MessageController } from './message.controller';
import auth from '../../middleware/auth';
import fileUploadHandler from '../../middleware/fileUploadHandler';

const router = express.Router();

router.post(
  '/',
  fileUploadHandler(),
  auth(USER_ROLES.USER, USER_ROLES.ADMIN),
  MessageController.sendMessage,
);
router.get(
  '/:id',
  auth(USER_ROLES.USER, USER_ROLES.ADMIN),
  MessageController.getMessage,
);

export const MessageRoutes = router;
