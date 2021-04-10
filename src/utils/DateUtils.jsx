import moment from 'moment';

export {getCurrentMonth, getCurrentDate}

const getCurrentMonth = () => {
    return moment().month();
}

const getCurrentDate = () => {
    return moment().date()
}