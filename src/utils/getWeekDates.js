// 일주일 계산하기

export function getWeekDates(dateString) {
  const date = new Date(dateString);
  const day = date.getDay();

  const sunday = new Date(date);
  sunday.setDate(date.getDate() - day);

  const week = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    week.push(d.toISOString().slice(0, 10));
  }
  return week;
}
