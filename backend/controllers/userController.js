const Report = require("../models/Report");

exports.getUserProfile = (req, res) => {
  res.json({
    message: `Welcome ${req.user.username}, you are authenticated as a user.`,
    user: {
      id: req.user.id,
      username: req.user.username,
      role: req.user.role,
      state: req.user.state,
      area: req.user.area,
    },
  });
};

exports.createReport = async (req, res) => {
  try {
    const { title, description, category } = req.body;

   const filename = req.file?.filename || "";
   const imageUrl = filename
     ? `${req.protocol}://${req.get("host")}/uploads/${filename}`.replace(
         /\\/g,
         "/"
       )
     : "";

    const report = new Report({
      title,
      description,
      category, 
      imageUrl,
      user: req.user.id,
      state: req.user.state,
      area: req.user.area,
    });

    await report.save();
    res.status(201).json({ message: "Report submitted", report });
  } catch (err) {
    console.error("Error in createReport:", err);
    res
      .status(500)
      .json({ message: "Error creating report", error: err.message });
  }
};

exports.getMyReports = async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json({ reports });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching reports", error: err.message });
  }
};

exports.updateReport = async (req, res) => {
  try {
    const { title, description } = req.body;

    const updatedReport = await Report.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, description },
      { new: true }
    );

    if (!updatedReport) {
      return res
        .status(404)
        .json({ message: "Report not found or unauthorized" });
    }

    res.json({ message: "Report updated", report: updatedReport });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating report", error: err.message });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const deletedReport = await Report.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deletedReport) {
      return res
        .status(404)
        .json({ message: "Report not found or unauthorized" });
    }

    res.json({ message: "Report deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting report", error: err.message });
  }
};
