import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface UserDoc extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    role?: "admin" | "user" | "guest";
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<UserDoc>(
    {
        username: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
            lowercase: true,
            trim: true,
        },
        password: { type: String, required: true, select: false },
        role: {
            type: String,
            required: true,
            enum: ["admin", "user", "guest"],
            default: "user",
        },
    },
    { timestamps: true }
);

const HASH_NORMAL = 14;
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, HASH_NORMAL);
});

export const User = mongoose.model<UserDoc>("User", userSchema);
