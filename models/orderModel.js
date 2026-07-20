import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  address: { type: String, required: true }
}, { _id: false });

const orderItemSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.Mixed, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String },
  quantity: { type: Number, required: true }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customer: { type: customerSchema, required: true },
  paymentMethod: { type: String, required: true },
  items: { type: [orderItemSchema], required: true },
  total: { type: Number, required: true },
  status: { type: String, default: 'Pending' }
}, { 
  timestamps: true 
});

// Configure JSON serialization to map _id to id virtual property for frontend compatibility
orderSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
  }
});

const Order = mongoose.model('Order', orderSchema);

// GET all orders
export const getAllOrders = async (sortBy, order) => {
  try {
    let query = Order.find({});
    if (sortBy === 'createdAt') {
      query = query.sort({ createdAt: order === 'desc' ? -1 : 1 });
    }
    return await query.exec();
  } catch (error) {
    console.error('Database query error in getAllOrders:', error);
    throw error;
  }
};

// CREATE a new order
export const createOrder = async (orderData) => {
  try {
    // Generate order ID following existing format (e.g. LUM-123456)
    const orderId = `LUM-${Math.floor(100000 + Math.random() * 900000)}`;
    
    const newOrder = new Order({
      ...orderData,
      orderId,
      status: orderData.status || 'Pending'
    });
    
    return await newOrder.save();
  } catch (error) {
    console.error('Database write error in createOrder:', error);
    throw error;
  }
};

// DELETE an order by ID
export const deleteOrder = async (id) => {
  try {
    // Gracefully handle query if ID is not a valid ObjectId (e.g., legacy string)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const result = await Order.deleteOne({ orderId: id });
      return result.deletedCount > 0;
    }
    const result = await Order.findByIdAndDelete(id);
    return result !== null;
  } catch (error) {
    console.error('Database delete error in deleteOrder:', error);
    throw error;
  }
};

// UPDATE order status by ID
export const updateOrderStatus = async (id, status) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return await Order.findOneAndUpdate(
        { orderId: id },
        { status },
        { new: true }
      );
    }
    return await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
  } catch (error) {
    console.error('Database update error in updateOrderStatus:', error);
    throw error;
  }
};

// UPDATE order by ID (generic update for items, customer info, etc.)
export const updateOrder = async (id, updateData) => {
  try {
    const options = { new: true };
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return await Order.findOneAndUpdate({ orderId: id }, updateData, options);
    }
    return await Order.findByIdAndUpdate(id, updateData, options);
  } catch (error) {
    console.error('Database update error in updateOrder:', error);
    throw error;
  }
};
