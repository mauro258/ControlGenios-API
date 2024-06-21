import mongoose from 'mongoose';


const uri = 'mongodb://127.0.0.1:27017/dbControlGenios';

export const connectDb = async () => {try {const db=await mongoose.connect(uri);console.log('connected database',db.connection.name);} catch(error) {console.log('error connecting to database ${error.mesage}');}};