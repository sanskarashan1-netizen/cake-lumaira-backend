import express from 'express';
import * as OrderController from '../controllers/orderController.js';

const router = express.Router();

// Define routes
router.get('/', OrderController.getOrders);
router.post('/', OrderController.createOrder);
router.delete('/:id', OrderController.deleteOrder);
router.patch('/:id/status', OrderController.updateStatus);
router.patch('/:id', OrderController.updateOrder);

export default router;
