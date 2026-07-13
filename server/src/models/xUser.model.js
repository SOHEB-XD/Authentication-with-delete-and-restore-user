const mongoose = require("mongoose");

const xUserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["user", "admin", "moderator"],
            default: "user"
        },

        isDeleted: {
            type: Boolean,
            default: false
        },
        deletedAt: {
            type: Date,
            default: null
        }
    },
    { timestamps: true }
)

const XUser = mongoose.model("XUser", xUserSchema);

module.exports = XUser;