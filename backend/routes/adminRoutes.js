const express = require("express");
const router = express.Router();
const { authMiddleware, requireRole } = require("../middleware/authMiddleware");
const {
  getAllReports,
  updateReportStatus,
  deleteAnyReport,
  getAdminDashboardStats
} = require("../controllers/adminController");

router.get("/reports", authMiddleware, requireRole("admin"), getAllReports);

router.get(
  "/admin/dashboard-stats",
  authMiddleware,
  requireRole("admin"),
  getAdminDashboardStats
);

router.put(
  "/report/:id/status",
  authMiddleware,
  requireRole("admin"),
  updateReportStatus
);

router.delete(
  "/report/:id",
  authMiddleware,
  requireRole("admin"),
  deleteAnyReport
);

module.exports = router;
