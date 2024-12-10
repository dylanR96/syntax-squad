export const formatDateTime = (orderDate: string): string => {
    const [date, time] = orderDate.split("T");
    const [hour, minute] = time.split(":");
    return `${date} ${hour}:${minute}`;
  };