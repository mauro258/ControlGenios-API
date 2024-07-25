import mongoose from "mongoose";
import axios from "axios";

import { serviceModel } from "../src/models/service.model.js";
import { connectDb } from "../src/database.js";

export const monitorServices = async () => {
  try {
    const db = await connectDb()
    const [services] = await db.query("SELECT * FROM services;")
    db.end()

    services.map(async (item) =>{
      try {
        const response = await axios.get(`http://${item.ip}`);
        const isActive = response.status === 200;
        if (item.status !== isActive) {
          const db = await connectDb()
          await db.query("UPDATE services SET status = ? where id = ?;", [isActive ? 1 : 0, item.id])

          console.log(
            `Status updated for service ${item.name}: ${
              isActive ? "Asset" : "Idle"
            }`
          );
        }
        db.end()
      } catch (error) {
        console.error(
          `Error checking status for service ${item.name}: ${error.message}`
        );
      }
    });
    console.log("Services monitored and updated correctly.");
  } catch (error) {
    console.error("Error when monitoring services:", error.message);
  } finally {
    console.error("closing bd connection");
  }
};
