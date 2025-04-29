const time = require("../models/time_model");
const Day = require("../models/day_model");

async function addTime(req, res) {
  const { departmentId, yearId, timeSlot, dayId, sectionId } = req.body;
  try {
    const newTime = new time({
      departmentId,
      yearId,
      timeSlot,
      dayId,
      sectionId,
    });
    await newTime.save();
    res.status(201).json({ newTime });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllTimes(req, res) {
  try {
    const times = await time.find({}, "departmentId yearId timeSlot dayId");
    res.status(200).json({ times });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteTime(req, res) {
  const { timeID } = req.params;
  try {
    const result = await time.findByIdAndDelete(timeID);
    if (result.deletedCount === 0) {
      throw new Error("time not found");
    }
    res.status(200).json({ message: "time deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function UpdateTime(req, res) {
  const { oldtimeID } = req.params;
  const { newDepartmentId, newYearId, newTimeSlot, newdayId, newSectionId } =
    req.body;
  try {
    const result = await time.findByIdAndUpdate(oldtimeID, {
      departmentId: newDepartmentId,
      yearId: newYearId,
      timeSlot: newTimeSlot, // Assuming newTimeSlot needs to be updated
      dayId: newdayId,
      sectionId: newSectionId,
    });
    if (!result) {
      throw new Error("Time not found");
    }
    res.status(200).json({ message: "Time updated successfully" });
  } catch (error) {
    let errorMessage = "Internal server error";
    if (error.kind === "ObjectId") {
      errorMessage = "Invalid time ID format";
    } else if (error.message.includes("not found")) {
      errorMessage = "Time not found";
    }
    res.status(500).json({ message: errorMessage });
  }
}

async function getTimeByYearIdAndTimeId(req, res) {
  const { yearId, dayId } = req.params;

  try {
    // Find timeslots using the obtained dayId and yearId in the Time model
    const times = await time.find({ yearId: yearId, dayId: dayId });

    if (times.length === 0) {
      return res
        .status(404)
        .json({ message: "No timeslots found for the given year and day" });
    }

    // Return the timeslots
    res.status(200).json(times);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getTimeByYearIdAndDayIdAndSectionID(req, res) {
  console.log("yesss");
  const { yearId, dayId ,sectionId} = req.params;

  try {
    const times = await time.find({ yearId: yearId, dayId: dayId ,sectionId : sectionId});

    if (times.length === 0) {
      return res
        .status(404)
        .json({ message: "No timeslots found for the given year and day, section" });
    }

    // Return the timeslots
    res.status(200).json(times);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  addTime,
  UpdateTime,
  deleteTime,
  getAllTimes,
  getTimeByYearIdAndTimeId,
  getTimeByYearIdAndDayIdAndSectionID
};
