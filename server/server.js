const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
dotenv.config()
const connectDB = require("./src/config/connectDB");
const xUserRoutes = require("./src/routes/xUser.routes");
const deleteUserPermanently = require("./src/config/deleteUserPermanently");
const cron = require("node-cron")
const cookieParser = require("cookie-parser")

const app = express();
const Port = 3000;

connectDB()

cron.schedule("0 0 * * *", () => {
    console.log("Running deleteUserPermanently at midnight");
    deleteUserPermanently();
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
});

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser())
app.use("/api", xUserRoutes);

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);

});
