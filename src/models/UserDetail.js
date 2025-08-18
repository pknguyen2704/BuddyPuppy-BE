import mongoose from "mongoose";

const userDetailSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    child_Fullname: { type: String, required: true },
    child_Gender: { type: String, enum: ["male", "female", "other"], required: true },
    child_dateOfBirth: { type: Date, required: true },
    child_school: { type: String, required: true },

    guardian_Fullname: { type: String, required: true },
    guardian_Gender: { type: String, enum: ["male", "female", "other"], required: true },
    guardian_dateOfBirth: { type: Date, required: true },
    guardian_relation: { type: String, required: true },
}, { timestamps: true });

const UserDetail = mongoose.model("UserDetail", userDetailSchema);
export default UserDetail;