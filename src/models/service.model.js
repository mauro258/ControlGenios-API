import mongoose from "mongoose";

const { Schema, model } = mongoose;

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The name field is required"],
    },
    ip: {
      type: String,
      required: [true, "The ip field is required"],
    },

    imgUrl: { type: String, default: null },
    nameImage: String,
  },
  {
    timestamps: true,
  }
);

serviceSchema.methods.setImg = function setImg(filename) {
  const url = "http://localhost:4000/public/";
  this.imgUrl = url + filename;
  this.nameImage = filename;
};

export const serviceModel = model("service", serviceSchema);
