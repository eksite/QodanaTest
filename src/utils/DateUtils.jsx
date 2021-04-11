import moment from "moment";

export {
  getCurrentMonth,
  getCurrentDate,
  WEEK_TIMESTAMP,
  getCurrentDayTimeStamp,
  getCurrentYear,
  createDate,
  getDateOfLastSevenDays,
};

const WEEK_TIMESTAMP = 604800;

const getCurrentMonth = () => {
  return moment().month();
};

const getCurrentDate = () => {
  return moment().date();
};

const getCurrentDayTimeStamp = () => {
  return moment().format("X");
};

const createDate = (year, month, date) => {
  return moment({ y: year, M: month, d: date });
};

const getCurrentYear = () => {
  return moment().year();
};

const getDateOfLastSevenDays = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    days.push(
      moment({
        y: getCurrentYear(),
        M: getCurrentMonth(),
        d: getCurrentDate() - i,
      }).format("X")
    );
  }
  return days;
};
