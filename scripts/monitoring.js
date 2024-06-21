import mongoose from 'mongoose';
import axios from 'axios';
import { serviceModel } from '../src/models/service.model.js'; // Ajusta según la ubicación de tu modelo
import { connectDb } from '../src/database.js';


const monitorServices = async () => {
    try {
      await connectDb(); // Llama a la función de conexión a la base de datos
  
      const services = await serviceModel.find();
  
      for (const service of services) {
        const { ip } = service;
  
        try {
          // Realizar una solicitud a la IP para verificar si está activo
          const response = await axios.get(`http://${ip}`);
          const isActive = response.status === 200;
  
          // Actualizar statusService en la base de datos si ha cambiado
          if (service.statusService !== isActive) {
            service.statusService = isActive;
            await service.save();
            console.log(`Estado actualizado para servicio ${service.name}: ${isActive ? 'Activo' : 'Inactivo'}`);
          }
        } catch (error) {
          console.error(`Error al verificar estado para servicio ${service.name}: ${error.message}`);
          // Puedes manejar errores específicos aquí según sea necesario
        }
      }
  
      console.log('Servicios monitoreados y actualizados correctamente.');
    } catch (error) {
      console.error('Error al monitorear servicios:', error.message);
    } finally {
      mongoose.disconnect(); // Desconecta de la base de datos al finalizar el monitoreo
    }
  };
  
  // Llamar a la función de monitoreo cada cierto intervalo (por ejemplo, cada 5 minutos)
  setInterval(monitorServices, 5 * 60 * 1000); // 5 minutos en milisegundos
  
  // Iniciar monitoreo al ejecutar el script
  monitorServices();
