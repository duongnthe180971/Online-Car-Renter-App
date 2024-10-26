import { formatDate } from 'date-fns';
export const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
export function formatDate_vn(date) {
    return formatDate(date, "dd/MM/yyyy");
}
export const formatDate_String = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB'); // Format as 'DD/MM/YYYY'
  };
export function getNumOfDay(startDate, endDate) {
    const timeDis = endDate - startDate;
    const numOfDay = Math.round(timeDis / (1000 * 3600 * 24));
    return numOfDay;
}
