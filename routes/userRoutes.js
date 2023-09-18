const express = require("express");
const userController = require("../controller/userController");
const userRouter = express.Router();

userRouter.post("/add_user", userController.addUser);
userRouter.post("/login_user", userController.loginUser);
userRouter.get("/cron",userController.sendMailToAllUser);
userRouter.post("/import_csv_file",userController.importCsvFile);

module.exports = userRouter;