import mongoose from 'mongoose';

const heroSlideSchema = new mongoose.Schema({
  slideId: { type: Number, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  cta: { type: String, default: "Order Now" }
}, {
  timestamps: true
});

// Configure JSON transformation
heroSlideSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
  }
});

const HeroSlide = mongoose.model('HeroSlide', heroSlideSchema);

// Seed default slides if database collection is empty
const defaultSlides = [
  {
    slideId: 1,
    title: "Luxury Wedding Cake",
    subtitle: "Maison de Pâtisserie",
    description: "A multi-tiered masterpiece adorned with handcrafted white chocolate roses, delicate lace icing, and 24k gold leaf accents.",
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=1200&q=80",
    cta: "Order Bespoke"
  },
  {
    slideId: 2,
    title: "Chocolate Truffle Gateau",
    subtitle: "Signature Collection",
    description: "Decadent chocolate layers filled with smooth grand cru ganache, finished with a flawless mirror glaze.",
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=1200&q=80",
    cta: "Explore Flavours"
  },
  {
    slideId: 3,
    title: "Artisan Birthday Cake",
    subtitle: "Celebration Special",
    description: "Fluffy chiffon layers with fresh organic strawberries, Madagascan vanilla diplomat cream, and a whimsical watercolor frosting.",
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=1200&q=80",
    cta: "Order Now"
  },
  {
    slideId: 4,
    title: "Strawberry Fraisier",
    subtitle: "French Classic",
    description: "Traditional French biscuit layered with fresh strawberries, light mousseline cream, and an elegant hand-rolled marzipan topper.",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=1200&q=80",
    cta: "Order Fraisier"
  },
  {
    slideId: 5,
    title: "Parisian Macaron Tower",
    subtitle: "Delicate Pâtisserie",
    description: "A showstopping display of crisp French almond macarons layered with white chocolate raspberry ganache and fresh garden fruits.",
    image: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=1200&q=80",
    cta: "Discover More"
  },
  {
    slideId: 6,
    title: "Minimalist White Cake",
    subtitle: "Modern Luxury",
    description: "Sleek, textured white buttercream layers finished with single sculptural sugar-flower styling for the ultimate refined statement.",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=1200&q=80",
    cta: "Request Quote"
  }
];

export const getAllSlides = async () => {
  try {
    const count = await HeroSlide.countDocuments();
    if (count === 0) {
      console.log("Seeding default hero slides into database...");
      await HeroSlide.insertMany(defaultSlides);
    }
    return await HeroSlide.find({}).sort({ slideId: 1 }).exec();
  } catch (error) {
    console.error("Database query error in getAllSlides:", error);
    throw error;
  }
};

export const createSlide = async (slideData) => {
  try {
    const count = await HeroSlide.countDocuments();
    const newSlide = new HeroSlide({
      ...slideData,
      slideId: slideData.slideId || count + 1
    });
    return await newSlide.save();
  } catch (error) {
    console.error("Database write error in createSlide:", error);
    throw error;
  }
};

export const updateSlide = async (id, updateData) => {
  try {
    const filter = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { slideId: Number(id) };
    return await HeroSlide.findOneAndUpdate(filter, updateData, { new: true });
  } catch (error) {
    console.error("Database update error in updateSlide:", error);
    throw error;
  }
};

export const deleteSlide = async (id) => {
  try {
    const filter = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { slideId: Number(id) };
    const result = await HeroSlide.deleteOne(filter);
    return result.deletedCount > 0;
  } catch (error) {
    console.error("Database delete error in deleteSlide:", error);
    throw error;
  }
};
