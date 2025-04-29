const Section = require("../models/section_model");

async function addSection(req, res) {
  const { departmentId, yearId, sectionName } = req.body;
  try {
    const newSection = new Section({ departmentId, yearId, sectionName });
    await newSection.save();
    res.status(201).json({ newSection });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteSection(req, res) {
  const { sectionId } = req.params;
  try {
    const result = await Lab.deleteOne({ _id: sectionId });
    if (result.deletedCount === 0) {
      throw new Error("Section not found");
    }
    res.status(200).json({ message: "Section deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getSectionByDeptIdAndYearId(req, res) {
  try {
    const { departmentId, yearId } = req.query;

    // Validate required parameters
    if (!departmentId || !yearId) {
      return res
        .status(400)
        .json({ message: "departmentId and yearId are required" });
    }

    const Sections = await Section.find(
      { departmentId, yearId },
      "departmentId yearId sectionName"
    );

    res.status(200).json({ Sections });
  } catch (error) {
    console.error("Error fetching sections:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateSection(req, res) {
  const { sectionId } = req.params;
  const { newDepartmentId, newSectionName } = req.body;
  try {
    const result = await Lab.findByIdAndUpdate(sectionId, {
      departmentId: newDepartmentId,
      sectionName: newSectionName,
    });
    if (result.nModified === 0) {
      throw new Error("Section not found or no changes were made");
    }
    res.status(200).json({ message: "Section updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  addSection,
  deleteSection,
  getSectionByDeptIdAndYearId,
  updateSection,
};
