import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    slug: {
      type: String,
      lowercase: true,
    },

    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 2000,
    },

    quantity: {
      type: Number,
      required: true,
    },

    sold: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      required: true,
      trim: true,
      max: 2000000,
      min: 0.5,
    },

    priceAfterDiscount: {
      type: Number,
    },

    imageCover: {
      type: String,
      required: true,
    },

    images: [String],

    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brands",
      required: true,
    },

    ratingsAverage: {
      type: Number,
      min: [1],
      max: [5],
    },

    packageSize: {
      type: [String],
      required: true,
      enum: [25, 50, 100],
    },
  },
  { timestamps: true }
);

const setImageUrl = (doc) => {
  if (doc.imageCover) {
    const imageUrl = `${process.env.BASE_URL}/product/${doc.imageCover}`;
    doc.imageCover = imageUrl;
  }

  if (doc.images) {
    const imagesList = [];
    doc.images.forEach((elm) => {
      const imageUrl = `${process.env.BASE_URL}/product/${elm}`;
      imagesList.push(imageUrl);
    });

    doc.images = imagesList;
  }
};

productSchema.post("init", (doc) => {
  setImageUrl(doc);
});
productSchema.post("save", (doc) => {
  setImageUrl(doc);
});

const Product = mongoose.model("Product", productSchema);

export default Product;
