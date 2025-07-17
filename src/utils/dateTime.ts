/**
 * 日期時間格式化工具
 */

export type DateTimeInput = string | Date | number;

export interface FormatOptions {
  /** 輸出格式：'date' | 'time' | 'datetime' */
  format?: 'date' | 'time' | 'datetime';
  /** 日期分隔符，預設為 '/' */
  dateSeparator?: string;
  /** 時間分隔符，預設為 ':' */
  timeSeparator?: string;
  /** 是否顯示秒數，預設為 true */
  showSeconds?: boolean;
}

/**
 * 格式化日期時間
 * @param input - 輸入的日期時間（string, Date, timestamp）
 * @param options - 格式化選項
 * @returns 格式化後的字串
 */
export function formatDateTime(
  input: DateTimeInput,
  options: FormatOptions = {}
): string {
  const {
    format = 'datetime',
    dateSeparator = '/',
    timeSeparator = ':',
    showSeconds = true
  } = options;

  // 轉換輸入為 Date 物件
  let date: Date;

  if (input instanceof Date) {
    date = input;
  } else if (typeof input === 'number') {
    // 處理 timestamp（毫秒或秒）
    date = new Date(input < 10000000000 ? input * 1000 : input);
  } else if (typeof input === 'string') {
    date = new Date(input);
  } else {
    throw new Error('Invalid date input');
  }

  // 檢查日期是否有效
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  // 格式化日期部分 (YYYY/MM/DD)
  const formatDate = (): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${dateSeparator}${month}${dateSeparator}${day}`;
  };

  // 格式化時間部分 (HH:MM:SS 或 HH:MM)
  const formatTime = (): string => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return showSeconds
      ? `${hours}${timeSeparator}${minutes}${timeSeparator}${seconds}`
      : `${hours}${timeSeparator}${minutes}`;
  };

  // 根據格式選項返回結果
  switch (format) {
    case 'date':
      return formatDate();
    case 'time':
      return formatTime();
    case 'datetime':
    default:
      return `${formatDate()} ${formatTime()}`;
  }
}

// 便利函數
export const formatDate = (input: DateTimeInput, separator = '/') =>
  formatDateTime(input, { format: 'date', dateSeparator: separator });

export const formatTime = (input: DateTimeInput, showSeconds = true, separator = ':') =>
  formatDateTime(input, { format: 'time', showSeconds, timeSeparator: separator });

