import express from 'express';
import * as HeroController from '../controllers/heroController.js';

const router = express.Router();

router.get('/', HeroController.getSlides);
router.post('/', HeroController.createSlide);
router.patch('/:id', HeroController.updateSlide);
router.put('/:id', HeroController.updateSlide);
router.delete('/:id', HeroController.deleteSlide);

export default router;
