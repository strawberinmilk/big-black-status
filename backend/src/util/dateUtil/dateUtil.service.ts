import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Tokyo');

type DateUnit = 'year' | 'month' | 'day';
type TimeUnit = 'hour' | 'minute' | 'second';
type DateTimeUnit = DateUnit | TimeUnit;

export const TIMEFORMAT = {
  timestamp: 'YYYY-MM-DD HH:mm:ss',
  date: 'YYYY/MM/DD',
  timeDisplay: 'HH:mm',
};

export class DateUtilService {
  /**
   * 現在からn時間前を取得
   * @returns
   */
  getTimeBeforeNow(n: number, unit: DateTimeUnit): dayjs.Dayjs {
    return dayjs.tz().subtract(n, unit);
  }

  /**
   * 現在からn時間後を取得
   * @returns
   */
  getTimeAfterNow(n: number, unit: DateTimeUnit): dayjs.Dayjs {
    return dayjs.tz().add(n, unit);
  }

  /**
   * 現在日時のDayJsオブジェクトを取得
   * @returns DayJsオブジェクト
   */
  getNowDayJs(): dayjs.Dayjs {
    return dayjs.tz();
  }

  /**
   * DayJsオブジェクトをDateオブジェクトに変換
   * @param target DayJsオブジェクト
   * @returns Dateオブジェクト
   */
  getDate(target: dayjs.Dayjs): Date {
    return target.toDate();
  }

  /**
   * DayJsオブジェクトを取得
   * @param target 対象の文字列またはDateオブジェクト
   * @returns DayJsオブジェクト
   */
  getDayJs(target: Date | string): dayjs.Dayjs {
    return dayjs.tz(target);
  }
}
