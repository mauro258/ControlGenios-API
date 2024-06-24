import mongoose from "mongoose";
import axios from "axios";

import { serviceModel } from "../src/models/service.model.js";
import { connectDb } from "../src/database.js";

export const monitorServices = async () => {
  try {
    await connectDb();

    const services = await serviceModel.find();

    for (const service of services) {
      const { ip } = service;

      try {
        const response = await axios.get(`http://${ip}`);
        const isActive = response.status === 200;

        if (service.statusService !== isActive) {
          service.statusService = isActive;
          await service.save();
          console.log(
            `Status updated for service ${service.name}: ${
              isActive ? "Asset" : "Idle"
            }`
          );
        }
      } catch (error) {
        console.error(
          `Error checking status for service ${service.name}: ${error.message}`
        );
      }
    }

    console.log("Services monitored and updated correctly.");
  } catch (error) {
    console.error("Error when monitoring services:", error.message);
  } finally {
    mongoose.disconnect();
  }
};
