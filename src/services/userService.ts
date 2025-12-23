import bcrypt from "bcrypt";
import { User, type UserDoc } from "../models/Users";

async function getUserById(userId: string): Promise<UserDoc> {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
}

async function updateUserProfile(
    userId: string,
    updates: { username?: string | undefined; email?: string }
): Promise<UserDoc> {
    if (updates.email) {
        const existing = await User.findOne({ email: updates.email });
        if (existing && existing._id.toString() !== userId) {
            throw new Error("Email in use? Was it you?");
        }
    }
    const user = await User.findByIdAndUpdate(userId, updates, {
        name: true,
        runValidators: true,
    });
    if (!user) throw new Error("Error updating profile");
    return user;
}

async function changeUserPassword(
    userId: string,
    { oldPassword, newPass }: { oldPassword: string; newPass: string }
): Promise<UserDoc> {
    const user = await User.findById(userId).select("+password");
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new Error("Current password incorrect");

    user.password = newPass;
    await user.save();
    return user;
}

async function deleteUserProfile(userId: string) {
    if (!userId) throw new Error("User not Found");

    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) throw new Error("Could not delete User");
    return deleted;
}

async function getAllUser(role: string) {}
export {
    getUserById,
    updateUserProfile,
    deleteUserProfile,
    changeUserPassword,
};
