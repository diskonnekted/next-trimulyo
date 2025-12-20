import { format, parseISO, isValid, addDays, startOfDay, endOfDay } from "date-fns";
import { id } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";

// Constants
const TIMEZONE = "Asia/Jakarta";
const LOCALE = id;

/**
 * Indonesian month names
 */
export const INDONESIAN_MONTHS = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
];

/**
 * Indonesian day names
 */
export const INDONESIAN_DAYS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

/**
 * Indonesian day names (short format)
 */
export const INDONESIAN_DAYS_SHORT = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

/**
 * Convert date to Asia/Jakarta timezone
 * @param date - Date to convert
 * @returns Date in Asia/Jakarta timezone
 */
export function toIndonesianTime(date: Date | string): Date {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    return toZonedTime(dateObj, TIMEZONE);
}

/**
 * Format date with Indonesian locale
 * @param date - Date to format
 * @param formatStr - Format string (date-fns format)
 * @returns Formatted date string in Indonesian
 */
export function formatDateIndo(date: Date | string, formatStr = "dd MMMM yyyy"): string {
    try {
        const dateObj = typeof date === "string" ? parseISO(date) : date;
        const zonedDate = toZonedTime(dateObj, TIMEZONE);

        if (!isValid(zonedDate)) {
            return "Tanggal tidak valid";
        }

        return format(zonedDate, formatStr, { locale: LOCALE });
    } catch {
        // Error formatting date
        return "Format tanggal error";
    }
}

/**
 * Format date and time with Indonesian locale
 * @param date - Date to format
 * @returns Formatted date-time string in Indonesian
 */
export function formatDateTimeIndo(date: Date | string): string {
    return formatDateIndo(date, "dd MMMM yyyy HH:mm 'WIB'");
}

/**
 * Format time only with Indonesian locale
 * @param date - Date to format
 * @returns Formatted time string in Indonesian
 */
export function formatTimeIndo(date: Date | string): string {
    return formatDateIndo(date, "HH:mm");
}

/**
 * Format date in Indonesian format (without date-fns)
 * @param date - Date to format
 * @returns Indonesian formatted date string
 */
export function formatDateIndonesian(date: Date | string): string {
    try {
        const dateObj = typeof date === "string" ? new Date(date) : date;
        const zonedDate = toZonedTime(dateObj, TIMEZONE);

        if (!isValid(zonedDate)) {
            return "Tanggal tidak valid";
        }

        const day = zonedDate.getDate();
        const month = zonedDate.getMonth();
        const year = zonedDate.getFullYear();

        return `${day} ${INDONESIAN_MONTHS[month]} ${year}`;
    } catch {
        // Error formatting Indonesian date
        return "Format tanggal error";
    }
}

/**
 * Format date with day name in Indonesian
 * @param date - Date to format
 * @returns Formatted date string with day name
 */
export function formatDateWithDayIndo(date: Date | string): string {
    try {
        const dateObj = typeof date === "string" ? new Date(date) : date;
        const zonedDate = toZonedTime(dateObj, TIMEZONE);

        if (!isValid(zonedDate)) {
            return "Tanggal tidak valid";
        }

        const dayName = INDONESIAN_DAYS[zonedDate.getDay()];
        const day = zonedDate.getDate();
        const month = zonedDate.getMonth();
        const year = zonedDate.getFullYear();

        return `${dayName}, ${day} ${INDONESIAN_MONTHS[month]} ${year}`;
    } catch {
        // Error formatting date with day
        return "Format tanggal error";
    }
}

/**
 * Format relative time in Indonesian
 * @param date - Date to format
 * @returns Relative time string in Indonesian
 */
export function formatRelativeTimeIndo(date: Date | string): string {
    try {
        const dateObj = typeof date === "string" ? parseISO(date) : date;
        const zonedDate = toZonedTime(dateObj, TIMEZONE);
        const now = toZonedTime(new Date(), TIMEZONE);

        if (!isValid(zonedDate)) {
            return "Tanggal tidak valid";
        }

        const diffInMs = now.getTime() - zonedDate.getTime();
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInMinutes < 1) {
            return "Baru saja";
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes} menit yang lalu`;
        } else if (diffInHours < 24) {
            return `${diffInHours} jam yang lalu`;
        } else if (diffInDays === 1) {
            return "Kemarin";
        } else if (diffInDays < 7) {
            return `${diffInDays} hari yang lalu`;
        } else if (diffInDays < 30) {
            const weeks = Math.floor(diffInDays / 7);
            return `${weeks} minggu yang lalu`;
        } else if (diffInDays < 365) {
            const months = Math.floor(diffInDays / 30);
            return `${months} bulan yang lalu`;
        } else {
            const years = Math.floor(diffInDays / 365);
            return `${years} tahun yang lalu`;
        }
    } catch {
        // Error formatting relative time
        return "Format waktu error";
    }
}

/**
 * Format date range in Indonesian
 * @param startDate - Start date
 * @param endDate - End date
 * @returns Formatted date range string
 */
export function formatDateRangeIndo(startDate: Date | string, endDate: Date | string): string {
    try {
        const start = typeof startDate === "string" ? parseISO(startDate) : startDate;
        const end = typeof endDate === "string" ? parseISO(endDate) : endDate;

        const startZoned = toZonedTime(start, TIMEZONE);
        const endZoned = toZonedTime(end, TIMEZONE);

        if (!isValid(startZoned) || !isValid(endZoned)) {
            return "Tanggal tidak valid";
        }

        const startDay = startZoned.getDate();
        const startMonth = startZoned.getMonth();
        const startYear = startZoned.getFullYear();

        const endDay = endZoned.getDate();
        const endMonth = endZoned.getMonth();
        const endYear = endZoned.getFullYear();

        // Same year
        if (startYear === endYear) {
            // Same month
            if (startMonth === endMonth) {
                return `${startDay} - ${endDay} ${INDONESIAN_MONTHS[startMonth]} ${startYear}`;
            } else {
                return `${startDay} ${INDONESIAN_MONTHS[startMonth]} - ${endDay} ${INDONESIAN_MONTHS[endMonth]} ${startYear}`;
            }
        } else {
            return `${startDay} ${INDONESIAN_MONTHS[startMonth]} ${startYear} - ${endDay} ${INDONESIAN_MONTHS[endMonth]} ${endYear}`;
        }
    } catch {
        // Error formatting date range
        return "Format tanggal error";
    }
}

/**
 * Get Indonesian day name
 * @param date - Date to get day name for
 * @returns Indonesian day name
 */
export function getDayNameIndo(date: Date | string): string {
    try {
        const dateObj = typeof date === "string" ? new Date(date) : date;
        const zonedDate = toZonedTime(dateObj, TIMEZONE);

        if (!isValid(zonedDate)) {
            return "Hari tidak valid";
        }

        return INDONESIAN_DAYS[zonedDate.getDay()];
    } catch {
        // Error getting day name
        return "Error";
    }
}

/**
 * Get Indonesian month name
 * @param date - Date to get month name for
 * @returns Indonesian month name
 */
export function getMonthNameIndo(date: Date | string): string {
    try {
        const dateObj = typeof date === "string" ? new Date(date) : date;
        const zonedDate = toZonedTime(dateObj, TIMEZONE);

        if (!isValid(zonedDate)) {
            return "Bulan tidak valid";
        }

        return INDONESIAN_MONTHS[zonedDate.getMonth()];
    } catch {
        // Error getting month name
        return "Error";
    }
}

/**
 * Check if date is today (Indonesian timezone)
 * @param date - Date to check
 * @returns Boolean indicating if date is today
 */
export function isTodayIndo(date: Date | string): boolean {
    try {
        const dateObj = typeof date === "string" ? parseISO(date) : date;
        const zonedDate = toZonedTime(dateObj, TIMEZONE);
        const today = toZonedTime(new Date(), TIMEZONE);

        return (
            zonedDate.getDate() === today.getDate() &&
            zonedDate.getMonth() === today.getMonth() &&
            zonedDate.getFullYear() === today.getFullYear()
        );
    } catch {
        return false;
    }
}

/**
 * Check if date is yesterday (Indonesian timezone)
 * @param date - Date to check
 * @returns Boolean indicating if date is yesterday
 */
export function isYesterdayIndo(date: Date | string): boolean {
    try {
        const dateObj = typeof date === "string" ? parseISO(date) : date;
        const zonedDate = toZonedTime(dateObj, TIMEZONE);
        const yesterday = toZonedTime(addDays(new Date(), -1), TIMEZONE);

        return (
            zonedDate.getDate() === yesterday.getDate() &&
            zonedDate.getMonth() === yesterday.getMonth() &&
            zonedDate.getFullYear() === yesterday.getFullYear()
        );
    } catch {
        return false;
    }
}

/**
 * Get start of day in Indonesian timezone
 * @param date - Date to get start of day for
 * @returns Start of day in Indonesian timezone
 */
export function getStartOfDayIndo(date: Date | string): Date {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    const zonedDate = toZonedTime(dateObj, TIMEZONE);
    return startOfDay(zonedDate);
}

/**
 * Get end of day in Indonesian timezone
 * @param date - Date to get end of day for
 * @returns End of day in Indonesian timezone
 */
export function getEndOfDayIndo(date: Date | string): Date {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    const zonedDate = toZonedTime(dateObj, TIMEZONE);
    return endOfDay(zonedDate);
}

/**
 * Get current timestamp in Indonesian timezone
 * @returns Current date/time in Indonesian timezone
 */
export function getNowIndo(): Date {
    return toZonedTime(new Date(), TIMEZONE);
}

/**
 * Convert Indonesian date string to Date object
 * @param dateString - Indonesian date string (format: "dd MMMM yyyy")
 * @returns Date object or null if invalid
 */
export function parseIndonesianDate(dateString: string): Date | null {
    try {
        // Remove day name if present
        const cleanDateString = dateString.replace(/^[A-Za-z]+,?\s*/, "");

        // Parse using date-fns
        const parsedDate = parseISO(cleanDateString);

        if (isValid(parsedDate)) {
            return toZonedTime(parsedDate, TIMEZONE);
        }

        return null;
    } catch {
        // Error parsing Indonesian date
        return null;
    }
}

/**
 * Format Indonesian fiscal year
 * @param date - Date to format
 * @returns Fiscal year string (e.g., "2024/2025")
 */
export function formatFiscalYearIndo(date: Date | string): string {
    try {
        const dateObj = typeof date === "string" ? parseISO(date) : date;
        const zonedDate = toZonedTime(dateObj, TIMEZONE);

        if (!isValid(zonedDate)) {
            return "Tahun tidak valid";
        }

        const year = zonedDate.getFullYear();
        const month = zonedDate.getMonth();

        // Indonesian fiscal year typically starts January
        if (month >= 0) {
            // January or later
            return `${year}/${year + 1}`;
        } else {
            return `${year - 1}/${year}`;
        }
    } catch {
        // Error formatting fiscal year
        return "Format tahun error";
    }
}

/**
 * Format IoT timestamp in specific format: "11 Nov 2025, 17:15:06"
 * @param date - Date to format
 * @returns Formatted timestamp string for IoT devices
 */
export function formatIoTTimestamp(date: Date | string): string {
    try {
        const dateObj = typeof date === "string" ? parseISO(date) : date;
        const zonedDate = toZonedTime(dateObj, TIMEZONE);

        if (!isValid(zonedDate)) {
            return "Format timestamp error";
        }

        const day = zonedDate.getDate();
        const month = zonedDate.getMonth();
        const year = zonedDate.getFullYear();
        const hours = zonedDate.getHours().toString().padStart(2, "0");
        const minutes = zonedDate.getMinutes().toString().padStart(2, "0");
        const seconds = zonedDate.getSeconds().toString().padStart(2, "0");

        // Get abbreviated month names
        const abbreviatedMonths = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"];

        return `${day} ${abbreviatedMonths[month]} ${year}, ${hours}:${minutes}:${seconds}`;
    } catch {
        // Error formatting IoT timestamp
        return "Format timestamp error";
    }
}
