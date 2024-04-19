const time = require("../models/time_model");

async function addTime(req, res) {
  const { departmentId, yearId, timeSlot,dayId } = req.body;
  try {
    const newTime = new time({ departmentId, yearId, timeSlot , dayId});
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
  const { newDepartmentId, newYearId, newTimeSlot, newdayId } = req.body;
  try {
    const result = await time.findByIdAndUpdate(oldtimeID, {
      departmentId: newDepartmentId,
      yearId: newYearId,
      timeSlot: newTimeSlot, // Assuming newTimeSlot needs to be updated
      dayId : newdayId
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

async function getTimeByYearIdAndTimeId(req,res){
    const {yearId,dayId} = req.params;
    try{
        const result = await time.find({yearId:yearId,dayId:dayId});
        if(!result)
        res.status(404).json({message:"the given yearid has no timeslots"});
        else
        res.status(200).json(result);
    }
    catch (error) {
        let errorMessage = "Internal server error";
        res.status(500).json({ message: errorMessage });
      }
}

module.exports = { addTime, UpdateTime, deleteTime, getAllTimes,getTimeByYearIdAndTimeId };
