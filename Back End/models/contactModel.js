import mongoose from "mongoose";

const contactShema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true  },
    phone: { type: String, required: true }
},{
    timestamps: true,
}
)

export default mongoose.model("Contact", contactShema);   