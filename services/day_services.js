const Day = require("../models/day_model");

async function addDay(req, res) {
  const { departmentId, yearId, dayName , sectionId} = req.body;
  try {
    const newDay = new Day({ departmentId, yearId, dayName ,sectionId });
    await newDay.save();
    res.status(201).json({ newDay });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllDays(req, res) {
  try {
    const days = await Day.find({}, "departmentId yearId dayName dayId");
    res.status(200).json({ days });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteDay(req, res) {
  const { dayId } = req.params;
  try {
    const result = await Day.deleteOne({ _id: dayId });
    if (result.deletedCount === 0) {
      throw new Error("Day not found");
    }
    res.status(200).json({ message: "Day deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateDay(req, res) {
  const { dayId } = req.params;
  const { newDepartmentId, newYearId, newDayName , newSectionId} = req.body;
  try {
    const result = await Day.findByIdAndUpdate(dayId, {
      departmentId: newDepartmentId,
      yearId: newYearId,
      dayName: newDayName,
      sectionId:newSectionId
    });
    if (result.nModified === 0) {
      throw new Error("Day not found or no changes were made");
    }
    res.status(200).json({ message: "Day updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function  getDayId(req, res) {
  const { dayName } = req.params;
  try {
    const result = await Day.find({ dayName: dayName }, "_id");
    if (!result[0]) {
      res.status(404).json({ message: "No day with that Name" });
    }
    res.status(200).json({result});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { addDay, getAllDays, deleteDay, updateDay, getDayId };
