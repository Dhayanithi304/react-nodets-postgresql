import express from 'express'
import { get_all, get_one, insert_role } from '../controller/RoleController';

const router = express.Router()

router.get('/get_all', get_all);
router.get('/get_one', get_one);
router.post('/insert_role', insert_role);

export const RoleRoute = router