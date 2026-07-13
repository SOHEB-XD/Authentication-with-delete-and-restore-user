const mongoose = require("mongoose")

const xDeletedUserSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "XUser"
        }
    },
    { timestamps: true }
)

const XDeletedUser = mongoose.model("XDeletedUser", xDeletedUserSchema)

module.exports = XDeletedUser
