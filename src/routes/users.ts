import { Router } from 'express';
import {
  getUsers,
  postUser,
  updateUser,
  deleteAllUsers,
  deleteUser,
} from '../controllers/users';

const router = Router();

router.get('/users', getUsers);
router.post('/create-user', postUser);
router.put('/update-user', updateUser);
router.delete('/delete-user/:id', deleteUser);
router.delete('/delete-all-users', deleteAllUsers);

export default router;
