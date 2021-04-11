import { useTasksState } from "../context/TasksContext.jsx";
import {
  createDate,
  getCurrentDayTimeStamp,
  WEEK_TIMESTAMP,
  getDateOfLastSevenDays,
} from "../utils/DateUtils.jsx";

const BarChartData = () => {
  const state = useTasksState();
  const barChartArray = getDateOfLastSevenDays().map((item) => {
    return { x: item, y: 0 };
  });

  if (state.cards) {
    state.cards.filter((item) => {
      const {
        completedAt: { year, month, date },
      } = item;
      const timeStampOfCompletedTask = createDate(year, month, date).format(
        "X"
      );
      if (
        timeStampOfCompletedTask &&
        getCurrentDayTimeStamp() - timeStampOfCompletedTask < WEEK_TIMESTAMP
      ) {
        if (getDateOfLastSevenDays().includes(timeStampOfCompletedTask)) {
          if (
            barChartArray.length > 0 &&
            barChartArray.find((item) => item.x == timeStampOfCompletedTask)
          ) {
            barChartArray.find((item) => item.x == timeStampOfCompletedTask)
              .y++;
            return;
          }
        }
      }
    });
  }
  console.log(barChartArray)
  return barChartArray;
};

export default BarChartData;
