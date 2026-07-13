

const isauthorizationUser = (req, res, next) => {

    const { role } = req.user;

    if (role === "admin") {
        return next();
    }

    return res.status(401).json({ message: "Unauthorized" });
}


module.exports = { isauthorizationUser }