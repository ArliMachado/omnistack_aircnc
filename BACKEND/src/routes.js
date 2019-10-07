const express = require("express");
const multer = require("multer");
const uploadConfig = require("./config/upload");

const SessionController = require("./controllers/SessionController");
const SpotController = require("./controllers/SpotController");
const DashboardController = require("./controllers/DashboardController");
const BookingController = require("./controllers/BookingController");

const ApprovalControler = require("./controllers/ApprovalController");
const RejectionControler = require("./controllers/RejectionController");

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post("/sessions", SessionController.store);

routes.get("/spots", SpotController.index);
routes.post("/spots", upload.single("thumbnail"), SpotController.store);
routes.post("/spots/:spot_id/bookings", BookingController.store);

routes.get("/dashboard", DashboardController.show);

routes.post("/bookings/:booking_id/approvals", ApprovalControler.store);
routes.post("/bookings/:booking_id/rejections", RejectionControler.store);

module.exports = routes;
