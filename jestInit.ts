expect.extend({
  toEqualYearMonthAndDate(date1, date2) {
    const pass =
      date1.getFullYear() == date2.getFullYear() &&
      date1.getMonth() == date2.getMonth() &&
      date1.getDate() == date2.getDate();
    if (pass) {
      return {
        message: () =>
          `expected ${date1} not to be have same year, month and date with ${date2}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${date1} to have same year, month and date with ${date2}`,
        pass: false,
      };
    }
  },
});
