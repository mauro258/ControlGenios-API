import { response } from "../helpers/Response.js";
import { deleteImg } from "../helpers/deleteImg.js";
import { serviceModel } from "../models/service.model.js";

const serviceCtrl = {};

serviceCtrl.list = async (req, res) => {
  try {
    const services = await serviceModel.find();
    response(res, 200, true, services, "list of services");
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};

serviceCtrl.add = async (req, res) => {
  try {
    const { name, ip,statusService } = req.body;
    
    const newService = new serviceModel({
      name,
      ip,
      statusService: statusService !== undefined ? statusService : true,
    });
    req.file && newService.setImg(req.file.filename);

    await serviceModel.create(newService);
    response(res, 201, true, newService, "created service");
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};

serviceCtrl.update = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await serviceModel.findById(id);
    if (!service) {
      return response(res, 404, false, "", "service not found");
    }

    if (req.file) {
      service.nameImage && deleteImg(service.nameImage);
      service.setImg(req.file.filename);
      
    }

    await service.updateOne(req.body);

    response(res, 200, true, service, "updated service");
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};

serviceCtrl.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await serviceModel.findById(id);
    if (!service) {
      return response(res, 404, false, "", "service not found");
    }
    service.nameImage && deleteImg(service.nameImage);

    await service.deleteOne();

    response(res, 200, true, "", "service removed");
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};
export default serviceCtrl;
