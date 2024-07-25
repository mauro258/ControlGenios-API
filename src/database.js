import mongoose from 'mongoose';
import mysql from 'mysql2/promise'
import { config } from './config.js'

export const connectDb = async () => {
    try {
        // await console.log('CONNECT TO DATABASE ', config.database)
        return await mysql.createConnection(config)  
    } catch (error) {
        await console.log('error connecting to database ${error.mesage}');
    }
}