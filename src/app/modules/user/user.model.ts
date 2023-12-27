import { Schema, model } from "mongoose";
import { TPasswordChangeHistory, TUser } from "./user.interface";
import bcrypt from "bcrypt"

const passChangedHistorySchema = new Schema<TPasswordChangeHistory>({
    oldPassword: { type: String, required: true },
    date: { type: Date, required: true }
},
    {
        _id: false
    }
)

const userSchema = new Schema<TUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    passwordChangedAt: { type: Date },
    passwordChangedHistory: { type: [passChangedHistorySchema] },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
},
    { timestamps: true }
)

userSchema.pre('save', async function (next) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
})

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    delete obj.passwordChangedHistory;
    delete obj.__v;
    return obj;
};

const UserModel = model<TUser>('User', userSchema)

export default UserModel