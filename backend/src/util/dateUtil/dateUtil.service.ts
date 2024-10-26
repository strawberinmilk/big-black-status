import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Tokyo');

type DateUnit = 'year' | 'month' | 'day';
type TimeUnit = 'hour' | 'minute' | 'second';
type DateTimeUnit = DateUnit | TimeUnit;

export class DateUtilService {
  /**
   * 現在からn時間前を取得
   * @returns
   */
  getTimeBeforeNow(n: number, unit: DateTimeUnit): string {
    return dayjs.tz().subtract(n, unit).format();
  }

  /**
   * 現在からn時間後を取得
   * @returns
   */
  getTimeAfterNow(n: number, unit: DateTimeUnit): string {
    return dayjs.tz().add(n, unit).format();
  }
}
