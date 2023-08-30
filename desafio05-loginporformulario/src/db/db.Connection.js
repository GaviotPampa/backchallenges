import { connect } from 'mongoose';

export const connectionString = "mongodb+srv://Gavi:zoela131@cluster0.9oharja.mongodb.net/ecommerce?retryWrites=true&w=majority";

try {
    await connect(connectionString/* MONGO_ATLAS_URL */);
    console.log('🪁Conectado a la base de datos de MongoDB!');
} catch (error) {
    console.log(error);
};