const Booking = require("../models/booking_model");
const Department = require("../models/department_model");
const Year = require("../models/years_model");
const Day = require("../models/day_model");
const Lab = require("../models/labs_model");
const ClassName = require("../models/classes_model");
const { User, Role } = require("../models/user_model"); 
const Time = require("../models/time_model");

async function addBooking(req, res) {
  const { userId, departmentId, yearId, dayId, labId, classId, timeId, date } =
    req.body;
  try {
    let newBookingData;

    // Check if labId or classId is provided in the request body
    if (labId) {
      newBookingData = {
        userId,
        departmentId,
        yearId,
        dayId,
        labId,
        timeId,
        date,
      };
    } else if (classId) {
      newBookingData = {
        userId,
        departmentId,
        yearId,
        dayId,
        classId,
        timeId,
        date,
      };
    } else {
      // If neither labId nor classId is provided, return an error
      return res
        .status(400)
        .json({ message: "Please provide either labId or classId" });
    }

    const newBooking = new Booking(newBookingData);
    await newBooking.save();
    res.status(201).json({ newBooking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllBookings(req, res) {
  try {
    const userId = req.query.userId;
    const date = req.query.date;
    const bookings = await Booking.find(
      { userId , date:date},
      "userId departmentId yearId dayId labId classId time date"
    );

    // Extracting unique values for departmentId, yearId, dayId, labId, and classId from bookings
    const departmentIds = [
      ...new Set(bookings.map((booking) => booking.departmentId)),
    ];
    const userIds = [...new Set(bookings.map((booking) => booking.userId))];
    const yearIds = [...new Set(bookings.map((booking) => booking.yearId))];
    const dayIds = [...new Set(bookings.map((booking) => booking.dayId))];
    const labIds = [...new Set(bookings.map((booking) => booking.labId))];
    const classIds = [...new Set(bookings.map((booking) => booking.classId))];
    const timeIds = [...new Set(bookings.map((booking) => booking.time))]; // Added

    // Fetching names for each unique ID

    const userNames = await Promise.all(
      userIds.map(async (id) => {
        const user = await User.findById(id);
        return { id, name: user ? user.username : "Unknown" };
      })
    );


    const departmentNames = await Promise.all(
      departmentIds.map(async (id) => {
        const department = await Department.findById(id);
        return { id, name: department ? department.departmentName : "Unknown" };
      })
    );

    const yearNames = await Promise.all(
      yearIds.map(async (id) => {
        const year = await Year.findById(id);
        return { id, name: year ? year.yearName : "Unknown" };
      })
    );

    const dayNames = await Promise.all(
      dayIds.map(async (id) => {
        const day = await Day.findById(id);
        return { id, name: day ? day.name : "Unknown" };
      })
    );

    const labNames = await Promise.all(
      labIds.map(async (id) => {
        const lab = await Lab.findById(id);
        return { id, name: lab ? lab.labName : "Unknown" };
      })
    );

    const classNames = await Promise.all(
      classIds.map(async (id) => {
        const className = await ClassName.findById(id);
        return { id, name: className ? className.classNumber : "Unknown" };
      })
    );

    // Fetching time slot for each unique timeId
    const timeSlots = await Promise.all(
      timeIds.map(async (id) => {
        const timeSlot = await Time.findById(id);
        return { id, slot: timeSlot ? timeSlot.timeSlot : "Unknown" };
      })
    );

    // Map the names back to the bookings
    const bookingsWithNames = bookings.map((booking) => ({
      ...booking._doc,
      departmentName: departmentNames.find(
        (department) => department.id === booking.departmentId
      )?.name,
      yearName: yearNames.find((year) => year.id === booking.yearId)?.name,
      dayName: dayNames.find((day) => day.id === booking.dayId)?.name,
      labName: labNames.find((lab) => lab.id === booking.labId)?.name,
      className: classNames.find(
        (className) => className.id === booking.classId
      )?.name,
      userName: userNames.find(
        (user) => user.id === booking.userId
      )?.name,
      timeSlot: timeSlots.find(
        (timeSlot) => timeSlot.id === booking.time
      )?.slot, // Added
    }));

    res.status(200).json({ bookings: bookingsWithNames });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

async function getPastBookings(req, res) {
  try {
    const userId = req.query.userId;
    const bookings = await Booking.find(
      { userId},
      "userId departmentId yearId dayId labId classId time date"
    );

    // Extracting unique values for departmentId, yearId, dayId, labId, and classId from bookings
    const departmentIds = [
      ...new Set(bookings.map((booking) => booking.departmentId)),
    ];
    const userIds = [...new Set(bookings.map((booking) => booking.userId))];
    const yearIds = [...new Set(bookings.map((booking) => booking.yearId))];
    const dayIds = [...new Set(bookings.map((booking) => booking.dayId))];
    const labIds = [...new Set(bookings.map((booking) => booking.labId))];
    const classIds = [...new Set(bookings.map((booking) => booking.classId))];
    const timeIds = [...new Set(bookings.map((booking) => booking.time))]; // Added

    // Fetching names for each unique ID

    const userNames = await Promise.all(
      userIds.map(async (id) => {
        const user = await User.findById(id);
        return { id, name: user ? user.username : "Unknown" };
      })
    );


    const departmentNames = await Promise.all(
      departmentIds.map(async (id) => {
        const department = await Department.findById(id);
        return { id, name: department ? department.departmentName : "Unknown" };
      })
    );

    const yearNames = await Promise.all(
      yearIds.map(async (id) => {
        const year = await Year.findById(id);
        return { id, name: year ? year.yearName : "Unknown" };
      })
    );

    const dayNames = await Promise.all(
      dayIds.map(async (id) => {
        const day = await Day.findById(id);
        return { id, name: day ? day.name : "Unknown" };
      })
    );

    const labNames = await Promise.all(
      labIds.map(async (id) => {
        const lab = await Lab.findById(id);
        return { id, name: lab ? lab.labName : "Unknown" };
      })
    );

    const classNames = await Promise.all(
      classIds.map(async (id) => {
        const className = await ClassName.findById(id);
        return { id, name: className ? className.classNumber : "Unknown" };
      })
    );

    // Fetching time slot for each unique timeId
    const timeSlots = await Promise.all(
      timeIds.map(async (id) => {
        const timeSlot = await Time.findById(id);
        return { id, slot: timeSlot ? timeSlot.timeSlot : "Unknown" };
      })
    );

    // Map the names back to the bookings
    const bookingsWithNames = bookings.map((booking) => ({
      ...booking._doc,
      departmentName: departmentNames.find(
        (department) => department.id === booking.departmentId
      )?.name,
      yearName: yearNames.find((year) => year.id === booking.yearId)?.name,
      dayName: dayNames.find((day) => day.id === booking.dayId)?.name,
      labName: labNames.find((lab) => lab.id === booking.labId)?.name,
      className: classNames.find(
        (className) => className.id === booking.classId
      )?.name,
      userName: userNames.find(
        (user) => user.id === booking.userId
      )?.name,
      timeSlot: timeSlots.find(
        (timeSlot) => timeSlot.id === booking.time
      )?.slot, // Added
    }));

    res.status(200).json({ bookings: bookingsWithNames });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

async function deleteBooking(req, res) {
  const { bookingId } = req.params;
  try {
    const result = await Booking.deleteOne({ _id: bookingId });
    if (result.deletedCount === 0) {
      throw new Error("Booking not found");
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateBooking(req, res) {
  const { bookingId } = req.params;
  const {
    newUserId,
    newDeptId,
    newYearId,
    newDayId,
    newLabId,
    newClassId,
    newTime,
    newDate,
  } = req.body;
  try {
    const result = await Booking.updateOne(
      { _id: bookingId },
      {
        userId: newUserId,
        deptId: newDeptId,
        yearId: newYearId,
        dayId: newDayId,
        labId: newLabId,
        classId: newClassId,
        time: newTime,
        date: newDate,
      }
    );
    if (result.nModified === 0) {
      throw new Error("Booking not found or no changes were made");
    }
    res.status(200).json({ message: "Booking updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { addBooking, getAllBookings, deleteBooking, updateBooking ,getPastBookings};
