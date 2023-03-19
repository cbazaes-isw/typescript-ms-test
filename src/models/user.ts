import { Schema, model } from 'mongoose';
import * as bcrypt from 'bcrypt';

interface IUser {
    name: string,
    email: string,
    password: string,
    created: Date,
}

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        lowercase: true
    },
    created: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function (next) { // El segundo parámetro no puede ser una arrow function. De otra manera no funcionará this.password.
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const UserModel = model('User', UserSchema);

export { UserModel };