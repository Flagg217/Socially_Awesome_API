const dayjs = require("dayjs");

module.exports = (date) => {
    const formattedDate = dayjs(date).format("MMM DD, YYYY [at] hh:mm A");

    return formattedDate;
};