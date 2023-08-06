// 'YYYY-MM-DD'
export const formatDateForApi = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Додаємо 1 до місяця, бо він нумерується з 0
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const addDaysToCurrentDate = (days) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + days);
  return currentDate.toISOString().substring(0, 10);
};

const prettyFormatDate = (inputDate) => {
  const [year, month, day] = inputDate.split('-');
  return `${day}.${month}.${year}`;
};
export const formatTripPeriod = (startDate, endDate) => {
  return `${prettyFormatDate(startDate)} - ${prettyFormatDate(endDate)}`
}

export const formatNameDayOfWeek = (dateString) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [year, month, day] = dateString.split('-').map(Number);
  const dateObject = new Date(year, month - 1, day);
  const dayOfWeek = dateObject.getDay();
  return daysOfWeek[dayOfWeek];
}

export const formatDateForInput = (value) => {
  const date = new Date(value)
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}
