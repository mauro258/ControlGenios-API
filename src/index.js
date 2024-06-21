import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDb } from "./database.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

//routes
import serviceRoutes from "./routes/service.route.js";

connectDb();




const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set("Port", 4000);
app.use("/public", express.static(__dirname + "/storage/imgs"));
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/service", serviceRoutes);

app.listen(app.get("Port"), () => {
  console.log("server listening on port", app.get("Port"));
});
