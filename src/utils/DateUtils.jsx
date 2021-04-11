import moment from 'moment';

export {getCurrentMonth, getCurrentDate, WEEK_TIMESTAMP, getCurrentDayTimeStamp}

const WEEK_TIMESTAMP = 604800;

const getCurrentMonth = () => {
    return moment().month();
}

const getCurrentDate = () => {
    return moment().date()
}

const getCurrentDayTimeStamp = () => {
    return moment().format("X");
}

