import mongoose from "mongoose";
import ip from "ip";
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
      validate: {
        validator: function (v) {
          const cleanedIp = v.trim();
          return ip.isV4Format(cleanedIp) || ip.isV6Format(cleanedIp);
        },
        message: (props) => `${props.value.trim()} is not a valid IP address!`,
      },
    },

    imgUrl: { type: String, default: null },
    nameImage: String,
    statusService: {
      type: Boolean,
      required: [true, "The statusService field is required"],
      default: true, 
    },
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
