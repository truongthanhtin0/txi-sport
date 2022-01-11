import moment from "moment";

export const dateTimeNow = () => {
  return moment(new Date()).format("DD/MM/YYYY HH:mm");
};
