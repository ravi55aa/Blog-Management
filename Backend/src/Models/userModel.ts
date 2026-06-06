import mongoose, { Schema } from 'mongoose';
import { IUser } from '../Interface/ISchemas/IUserSchema';

const userSchema = new Schema<IUser>({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true, minLength: 6, maxLength: 21 },
    googleId: { type: String, trim: true },
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
