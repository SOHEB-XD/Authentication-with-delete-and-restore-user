const XUser = require("../models/xuser.model")
const XDeletedUser = require("../models/xDeletedUser.model")

const deleteUserPermanently = async () => {
    try {

        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        const deletedUsers = await XDeletedUser.find({ createdAt: { $lt: sevenDaysAgo } })

        if (!deletedUsers.length) {
            return;
        }

        for (const deletedUser of deletedUsers) {
            await Promise.all([
                XUser.deleteOne({ _id: deletedUser.user }),
                XDeletedUser.deleteOne({ _id: deletedUser._id })
            ]);
        }

    } catch (error) {
        console.log("Error in deleting user permanently:", error)
    }
}

module.exports = deleteUserPermanently