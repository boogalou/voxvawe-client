import {differenceInCalendarDays, differenceInDays, format, isSameYear, parseISO} from 'date-fns';
import {ru} from 'date-fns/locale';

export function formatTimePassed(date: Date) {
  const fromDate = parseISO(new Date(date).toISOString())
  const nowDate = new Date();
  const diffInDays = differenceInDays(nowDate, fromDate);
  const diffInCalendarDays = differenceInCalendarDays(nowDate, fromDate);

  if (diffInCalendarDays === 0) {
    return format(fromDate, 'HH:mm');
  } else if (diffInDays < 7) {
    return format(fromDate, 'EEE.', {locale: ru});
  } else if (isSameYear(nowDate, fromDate)) {
    return format(fromDate, 'dd MMM', {locale: ru});
  } else {
    return format(fromDate, 'dd MMM yyyy', {locale: ru});
  }
}
