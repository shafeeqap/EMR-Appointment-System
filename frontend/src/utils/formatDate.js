export const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

export const formatDay = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    // month: "long",
    // day: "numeric",
    weekday: 'long', 
  });
