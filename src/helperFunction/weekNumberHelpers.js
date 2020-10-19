const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

const days = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
]

export const iso8601WeekNumber = (dateTime) => {
    // source: https://www.w3resource.com/javascript-exercises/javascript-date-exercise-24.php
    const isoDate = new Date(dateTime.valueOf());
    const dayNumber = (dateTime.getDay() + 6) % 7;

    isoDate.setDate(isoDate.getDate() - dayNumber + 3);

    const firstThursday = isoDate.valueOf();

    isoDate.setMonth(0, 1);

    if (isoDate.getDay() !== 4) {
        isoDate.setMonth(0, 1 + ((4 - isoDate.getDay()) + 7) % 7);
    }

    return 1 + Math.ceil((firstThursday - isoDate) / 604800000);
}

export const weekNumberFormat = (viewWeekNumber) => {
    // reverse look up week range
    let weekStart = new Date(2020, 0, (1 + (Number(viewWeekNumber) - 1) * 7))
    weekStart.setDate(weekStart.getDate() + (1 - weekStart.getDay()))

    let weekEnd = new Date(2020, 0, (1 + (Number(viewWeekNumber) - 1) * 7))
    weekEnd.setDate(weekEnd.getDate() + (1 + weekEnd.getDay()))

    // create week day values
    const startDayName = days[weekStart.getDay()]
    const startDayNumber = weekStart.getDate()

    const endDayName = days[weekEnd.getDay()]
    const endDayNumber = weekEnd.getDate()

    // return week range in string format
    const weekStartFormatted = `${startDayName}. ${startDayNumber}`
    const weekEndFormatted = `${endDayName}. ${endDayNumber}`
    const weekRangeFormat = `${weekStartFormatted} - ${weekEndFormatted}`

    return weekRangeFormat
}

export const weekNumberMonth = (viewWeekNumber) => {
    // reverse look up week range
    let weekStart = new Date(2020, 0, (1 + (Number(viewWeekNumber) - 1) * 7))
    weekStart.setDate(weekStart.getDate() + (1 - weekStart.getDay()))

    const startMonthName = months[weekStart.getMonth()]
    const startMonthNameFormatted = `${startMonthName}`

    return startMonthNameFormatted
}