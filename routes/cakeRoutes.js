import express from 'express';
import { getCakes, createCake, updateCake, deleteCake } from '../controllers/cakeController.js';

const router = express.Router();

router.get('/', getCakes);
router.post('/', createCake);
router.patch('/:id', updateCake);
router.put('/:id', updateCake);
router.delete('/:id', deleteCake);

export default router;
