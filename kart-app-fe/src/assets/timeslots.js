const generateTimeslots = () => {
  const timeslots = [];
  const startHour = 15;
  const endHour = 23;
  const interval = 15;

  for (let hour = startHour; hour <= endHour - 1; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const startTime = `${hour}:${minute < 10 ? "0" + minute : minute}`;
      const nextHour = minute + interval >= 60 ? hour + 1 : hour;
      const nextMinute = (minute + interval) % 60;

      const endTime = `${nextHour}:${
        nextMinute < 10 ? "0" + nextMinute : nextMinute
      }`;
      timeslots.push(`${startTime} - ${endTime}`);
    }
  }

  return timeslots;
};

export const timeslots = generateTimeslots();
