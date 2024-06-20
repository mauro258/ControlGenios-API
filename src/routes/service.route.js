import { Router } from "express";
import serviceCtrl from "../controllers/service.controller.js";
import { upload } from "../middleware/imgUpload.js";
const route = Router();

route.get("/", serviceCtrl.list);
route.post("/", upload.single("img"), serviceCtrl.add);
route.put("/:id", upload.single("img"), serviceCtrl.update);
route.delete("/:id", serviceCtrl.delete);



export default route;
