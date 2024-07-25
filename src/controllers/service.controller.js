import { response } from "../helpers/Response.js";
import {
  deleteImageCloudinary,
  uploadImageTocloudinary,
} from "../helpers/cloudinary.actions.js";
import { deleteImg } from "../helpers/deleteImg.js";
import { serviceModel } from "../models/service.model.js";
import { connectDb } from "../database.js";

const serviceCtrl = {};

serviceCtrl.list = async (req, res) => {
  try {
    const db = await connectDb()
    const [rows] = await db.query("SELECT * FROM services;")
    db.end()
    response(res, 200, true, rows, "list of services");
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};

serviceCtrl.listOne = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDb()
    const [row] = await db.query("SELECT * FROM services where id = ?;", id);
    if (row.length <= 0) {
      db.end()
      return response(res, 404, false, "", "record not found");
    }
    db.end()
    response(res, 200, true, row[0], "service found");
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};

serviceCtrl.add = async (req, res) => {
  try {
    const { name, ip, statusService } = req.body;

    const defaultImg = "https://res.cloudinary.com/dcnhhj8zq/image/upload/v1721855903/uaozz36habrrulaamvdx.jpg"
    const { secure_url, public_id } = await uploadImageTocloudinary(req.file);

    const db = await connectDb()
    const responseSql = await db.query("INSERT INTO services (name, ip, imgUrl, idImgUrl, status) VALUES (?, ?, ?, ?, 1);", [name, ip, secure_url ? secure_url : defaultImg, public_id, statusService]);
    db.end()

    response(res, 201, true, responseSql, "created service");
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};

serviceCtrl.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ip } = req.body
    const db = await connectDb()
    let nameImgUrl = ""
    let idImgUrl = ""


    const [row] = await db.query("SELECT * FROM services where id = ?;", id);
    nameImgUrl = row[0].imgUrl
    idImgUrl = row[0].idImgUrl
    if (row.length <= 0) {
      db.end()
      return response(res, 404, false, "", "record not found");
    }

 

    if (req.file) {
      if (row[0].idImgUrl) {
        await deleteImageCloudinary(row[0].idImgUrl);
      }
      const { secure_url, public_id } = await uploadImageTocloudinary(req.file);
      nameImgUrl = secure_url
      idImgUrl = public_id
    }

    // await service.updateOne(req.body);
    const responseSql = await db.query("UPDATE services SET name = ?, ip = ?, imgUrl = ?, idImgUrl =? WHERE id = ?", [name, ip, nameImgUrl, idImgUrl, id]);
    db.end()
    response(res, 200, true, "", "updated service");
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};

serviceCtrl.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDb()
    const [row] = await db.query("SELECT * FROM services where id = ?;", id);
    if (row.length <= 0) {
      db.end()
      return response(res, 404, false, "", "record not found");
    }
    
    const responseSql = await db.query("DELETE FROM services WHERE id = ?;", id);
    db.end()

    if (row[0].idImgUrl) {
      await deleteImageCloudinary(row[0].idImgUrl);
    }
    response(res, 200, true, "", "service removed");
  } catch (error) {
    console.log("error.message: ", error.message)
    response(res, 500, false, "", error.message);
  }
};

serviceCtrl.uploadFile = async(req, res) => {

}
export default serviceCtrl;
