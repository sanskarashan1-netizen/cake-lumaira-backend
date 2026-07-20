import mongoose from 'mongoose';

const cakeSchema = new mongoose.Schema({
  cakeId: { type: Number },
  name: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, default: "Classic" },
  available: { type: Boolean, default: true }
}, {
  timestamps: true
});

cakeSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
  }
});

const Cake = mongoose.model('Cake', cakeSchema);

const defaultCakes = [
  { cakeId: 1, name: "Chocolate Truffle", price: "₹350", description: "Rich and dense chocolate cake with smooth truffle ganache.", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80", category: "Chocolate", available: true },
  { cakeId: 2, name: "Black Forest", price: "₹400", description: "Classic German chocolate sponge with fresh cherry filling.", image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&q=80", category: "Chocolate", available: true },
  { cakeId: 3, name: "Red Velvet", price: "₹550", description: "Luxurious red sponge with signature cream cheese frosting.", image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=600&q=80", category: "Red Velvet", available: true },
  { cakeId: 4, name: "Vanilla Delight", price: "₹350", description: "Light and fluffy vanilla sponge with delicate buttercream.", image: "https://images.unsplash.com/photo-1557308536-ee471ef2c390?w=600&q=80", category: "Classic", available: true },
  { cakeId: 5, name: "Butterscotch", price: "₹450", description: "Sweet caramel flavored cake with crunchy praline bits.", image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&q=80", category: "Caramel", available: true },
  { cakeId: 6, name: "Strawberry Bliss", price: "₹500", description: "Fresh strawberry cake layered with luscious fruit cream.", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80", category: "Fruit", available: false },
  { cakeId: 7, name: "Blueberry Cheesecake", price: "₹650", description: "Creamy baked cheesecake topped with blueberry compote.", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80", category: "Cheesecake", available: true },
  { cakeId: 8, name: "Fruit Fantasy", price: "₹600", description: "Mixed fresh fruits layered in vanilla sponge and fresh cream.", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80", category: "Fruit", available: true }
];

export const getAllCakes = async () => {
  try {
    // Purge any unwanted Tiered Wedding Cake items from DB
    await Cake.deleteMany({ name: "Tiered Wedding Cake" });

    const count = await Cake.countDocuments();
    if (count === 0) {
      console.log("Seeding default cake catalog into database...");
      await Cake.insertMany(defaultCakes);
    }
    return await Cake.find({}).sort({ createdAt: 1 }).exec();
  } catch (error) {
    console.error("Database query error in getAllCakes:", error);
    throw error;
  }
};

export const createCake = async (cakeData) => {
  try {
    const newCake = new Cake(cakeData);
    return await newCake.save();
  } catch (error) {
    console.error("Database write error in createCake:", error);
    throw error;
  }
};

export const updateCake = async (id, updateData) => {
  try {
    const filter = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { cakeId: Number(id) };
    return await Cake.findOneAndUpdate(filter, updateData, { new: true });
  } catch (error) {
    console.error("Database update error in updateCake:", error);
    throw error;
  }
};

export const deleteCake = async (id) => {
  try {
    const filter = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { cakeId: Number(id) };
    const result = await Cake.deleteOne(filter);
    return result.deletedCount > 0;
  } catch (error) {
    console.error("Database delete error in deleteCake:", error);
    throw error;
  }
};
