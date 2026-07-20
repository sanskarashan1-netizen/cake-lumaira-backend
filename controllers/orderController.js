import * as OrderModel from '../models/orderModel.js';

// GET all orders
export const getOrders = async (req, res) => {
  try {
    const { _sort, _order } = req.query;
    const orders = await OrderModel.getAllOrders(_sort, _order);
    res.json(orders);
  } catch (error) {
    console.error('Error in getOrders controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST a new order
export const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    
    // We expect orderData to contain customer, items, total, paymentMethod, etc.
    const newOrder = await OrderModel.createOrder(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error in createOrder controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// DELETE an order by ID
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await OrderModel.deleteOrder(id);
    
    if (!success) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ success: true, message: `Order ${id} deleted successfully` });
  } catch (error) {
    console.error('Error in deleteOrder controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// PATCH update status of an order
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const updatedOrder = await OrderModel.updateOrderStatus(id, status);
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error in updateStatus controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
