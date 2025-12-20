/**
 * Indonesian Number and Currency Formatting Utilities
 * Supports Indonesian locale formatting conventions
 */

/**
 * Format number with Indonesian locale
 * @param number - Number to format
 * @param options - Intl.NumberFormat options
 * @returns Formatted number string
 */
export function formatNumberIndo(number: number, options: Intl.NumberFormatOptions = {}): string {
    try {
        // Default options for Indonesian formatting
        const defaultOptions: Intl.NumberFormatOptions = {
            style: "decimal",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
            useGrouping: true,
            ...options,
        };

        return new Intl.NumberFormat("id-ID", defaultOptions).format(number);
    } catch {
        // Error formatting number
        return number.toString();
    }
}

/**
 * Format currency in Indonesian Rupiah
 * @param amount - Amount to format
 * @param options - Intl.NumberFormat options
 * @returns Formatted currency string
 */
export function formatCurrencyIndo(amount: number, options: Intl.NumberFormatOptions = {}): string {
    try {
        // Default options for Indonesian Rupiah
        const defaultOptions: Intl.NumberFormatOptions = {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            useGrouping: true,
            currencyDisplay: "symbol",
            ...options,
        };

        return new Intl.NumberFormat("id-ID", defaultOptions).format(amount);
    } catch {
        // Error formatting currency
        return `Rp ${amount.toLocaleString("id-ID")}`;
    }
}

/**
 * Format currency with abbreviated suffix (K for thousand, M for million, etc.)
 * @param amount - Amount to format
 * @returns Formatted currency string with abbreviation
 */
export function formatCurrencyAbbreviatedIndo(amount: number): string {
    try {
        if (amount === 0) return "Rp 0";

        const absAmount = Math.abs(amount);
        const sign = amount < 0 ? "-" : "";

        if (absAmount >= 1000000000000) {
            // Triliun
            const formatted = (absAmount / 1000000000000).toFixed(1);
            return `${sign}Rp ${formatted.replace(/\.0$/, "")} T`;
        } else if (absAmount >= 1000000000) {
            // Miliar
            const formatted = (absAmount / 1000000000).toFixed(1);
            return `${sign}Rp ${formatted.replace(/\.0$/, "")} M`;
        } else if (absAmount >= 1000000) {
            // Juta
            const formatted = (absAmount / 1000000).toFixed(1);
            return `${sign}Rp ${formatted.replace(/\.0$/, "")} Jt`;
        } else if (absAmount >= 1000) {
            // Ribu
            const formatted = (absAmount / 1000).toFixed(1);
            return `${sign}Rp ${formatted.replace(/\.0$/, "")} Rb`;
        } else {
            return formatCurrencyIndo(amount);
        }
    } catch {
        return formatCurrencyIndo(amount);
    }
}

/**
 * Format percentage with Indonesian locale
 * @param value - Value to format (0-1 or 0-100)
 * @param options - Options for formatting
 * @returns Formatted percentage string
 */
export function formatPercentageIndo(value: number, options: { asDecimal?: boolean; decimals?: number } = {}): string {
    try {
        const { asDecimal = false, decimals = 1 } = options;

        // Convert to percentage if in decimal form
        const percentageValue = asDecimal ? value * 100 : value;

        const formattedNumber = formatNumberIndo(percentageValue, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        });

        return `${formattedNumber}%`;
    } catch {
        // Error formatting percentage
        return `${value}%`;
    }
}

/**
 * Format number with Indonesian words
 * @param number - Number to convert to words
 * @returns Number in Indonesian words
 */
export function numberToWordsIndo(number: number): string {
    try {
        if (number === 0) return "nol";
        if (number < 0) return `minus ${numberToWordsIndo(Math.abs(number))}`;

        const units = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
        const teens = [
            "sepuluh",
            "sebelas",
            "dua belas",
            "tiga belas",
            "empat belas",
            "lima belas",
            "enam belas",
            "tujuh belas",
            "delapan belas",
            "sembilan belas",
        ];
        const tens = [
            "",
            "sepuluh",
            "dua puluh",
            "tiga puluh",
            "empat puluh",
            "lima puluh",
            "enam puluh",
            "tujuh puluh",
            "delapan puluh",
            "sembilan puluh",
        ];
        const thousands = ["", "ribu", "juta", "miliar", "triliun"];

        let words = "";
        let thousandIndex = 0;

        while (number > 0) {
            const chunk = number % 1000;
            number = Math.floor(number / 1000);

            if (chunk > 0) {
                let chunkWords = "";

                // Hundreds
                if (chunk >= 100) {
                    const hundreds = Math.floor(chunk / 100);
                    if (hundreds === 1) {
                        chunkWords += "seratus ";
                    } else {
                        chunkWords += `${units[hundreds]} ratus `;
                    }
                }

                // Tens and ones
                const remainder = chunk % 100;
                if (remainder >= 20) {
                    const tensDigit = Math.floor(remainder / 10);
                    const onesDigit = remainder % 10;
                    chunkWords += tens[tensDigit];
                    if (onesDigit > 0) {
                        chunkWords += ` ${units[onesDigit]}`;
                    }
                    chunkWords += " ";
                } else if (remainder >= 10) {
                    chunkWords += `${teens[remainder - 10]} `;
                } else if (remainder > 0) {
                    chunkWords += `${units[remainder]} `;
                }

                // Special case for "seribu" (not "satu ribu")
                if (thousandIndex === 1 && chunk === 1) {
                    chunkWords = "seribu ";
                } else if (thousandIndex > 0) {
                    chunkWords += `${thousands[thousandIndex]} `;
                }

                words = `${chunkWords}${words}`;
            }

            thousandIndex++;
        }

        return words.trim();
    } catch {
        return number.toString();
    }
}

/**
 * Format currency in Indonesian words
 * @param amount - Amount to convert to words
 * @returns Currency amount in Indonesian words
 */
export function currencyToWordsIndo(amount: number): string {
    try {
        const wholePart = Math.floor(Math.abs(amount));
        const decimalPart = Math.round((Math.abs(amount) - wholePart) * 100);

        let words = "rupiah ";

        if (wholePart === 0) {
            words += "nol ";
        } else {
            words += `${numberToWordsIndo(wholePart)} `;
        }

        if (decimalPart > 0) {
            words += `${numberToWordsIndo(decimalPart)} sen`;
        } else {
            words += "rupiah";
        }

        if (amount < 0) {
            words = `minus ${words}`;
        }

        return words.charAt(0).toUpperCase() + words.slice(1);
    } catch {
        return formatCurrencyIndo(amount);
    }
}

/**
 * Parse Indonesian formatted number string
 * @param formattedNumber - Indonesian formatted number string
 * @returns Parsed number or null if invalid
 */
export function parseIndonesianNumber(formattedNumber: string): number | null {
    try {
        // Remove all non-digit characters except decimal point and minus sign
        const cleaned = formattedNumber.replace(/[^0-9,-]/g, "").replace(",", ".");

        const parsed = parseFloat(cleaned);

        if (isNaN(parsed)) {
            return null;
        }

        return parsed;
    } catch {
        return null;
    }
}

/**
 * Parse Indonesian formatted currency string
 * @param formattedCurrency - Indonesian formatted currency string
 * @returns Parsed number or null if invalid
 */
export function parseIndonesianCurrency(formattedCurrency: string): number | null {
    try {
        // Handle common variations of Rupiah format
        const cleaned = formattedCurrency
            .toLowerCase()
            .replace(/[rp\s]/g, "") // Remove "rp" and spaces
            .replace(/\./g, "") // Remove thousand separators
            .replace(",", "."); // Convert decimal separator

        const parsed = parseFloat(cleaned);

        if (isNaN(parsed)) {
            return null;
        }

        return parsed;
    } catch {
        return null;
    }
}

/**
 * Format file size in Indonesian
 * @param bytes - File size in bytes
 * @returns Formatted file size string
 */
export function formatFileSizeIndo(bytes: number): string {
    try {
        if (bytes === 0) return "0 B";

        const units = ["B", "KB", "MB", "GB", "TB"];
        const index = Math.floor(Math.log(bytes) / Math.log(1024));
        const size = bytes / Math.pow(1024, index);

        const formattedSize = formatNumberIndo(size, {
            minimumFractionDigits: index === 0 ? 0 : 1,
            maximumFractionDigits: index === 0 ? 0 : 1,
        });

        return `${formattedSize} ${units[index]}`;
    } catch {
        return `${bytes} B`;
    }
}

/**
 * Format telephone number in Indonesian format
 * @param phoneNumber - Phone number to format
 * @returns Formatted phone number
 */
export function formatPhoneNumberIndo(phoneNumber: string): string {
    try {
        // Remove all non-digit characters
        const cleaned = phoneNumber.replace(/\D/g, "");

        // Handle different number formats
        if (cleaned.startsWith("62")) {
            // International format (+62)
            if (cleaned.length >= 12) {
                return `+62 ${cleaned.slice(2, 5)}-${cleaned.slice(5, 8)}-${cleaned.slice(8)}`;
            }
            return `+62 ${cleaned.slice(2)}`;
        } else if (cleaned.startsWith("0")) {
            // Local format (0xxx)
            if (cleaned.length >= 10) {
                return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
            }
            return cleaned;
        } else {
            // Short format or special numbers
            return cleaned;
        }
    } catch {
        return phoneNumber;
    }
}

/**
 * Format NIK (Indonesian ID number)
 * @param nik - NIK to format
 * @returns Formatted NIK
 */
export function formatNIK(nik: string): string {
    try {
        const cleaned = nik.replace(/\D/g, "");

        if (cleaned.length !== 16) {
            return nik; // Return original if not 16 digits
        }

        // Format: XX.XX.XX.XXXX.XXXX.XXXX
        return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 4)}.${cleaned.slice(4, 6)}.${cleaned.slice(6, 10)}.${cleaned.slice(10, 14)}.${cleaned.slice(14)}`;
    } catch {
        return nik;
    }
}

/**
 * Validate Indonesian phone number
 * @param phoneNumber - Phone number to validate
 * @returns Boolean indicating if phone number is valid
 */
export function validateIndonesianPhoneNumber(phoneNumber: string): boolean {
    try {
        const cleaned = phoneNumber.replace(/\D/g, "");

        // Indonesian phone numbers are 9-13 digits (excluding country code)
        if (cleaned.startsWith("62")) {
            return cleaned.length >= 11 && cleaned.length <= 14;
        } else if (cleaned.startsWith("0")) {
            return cleaned.length >= 9 && cleaned.length <= 13;
        } else {
            return cleaned.length >= 9 && cleaned.length <= 12;
        }
    } catch {
        return false;
    }
}

/**
 * Validate Indonesian NIK
 * @param nik - NIK to validate
 * @returns Boolean indicating if NIK format is valid
 */
export function validateNIK(nik: string): boolean {
    try {
        const cleaned = nik.replace(/\D/g, "");

        // NIK should be exactly 16 digits
        if (cleaned.length !== 16) {
            return false;
        }

        // Basic validation - first 6 digits should be a valid date
        const dateStr = cleaned.slice(6, 12);
        const month = parseInt(dateStr.slice(2, 4));
        const day = parseInt(dateStr.slice(4, 6));

        if (month < 1 || month > 12) {
            return false;
        }

        if (day < 1 || day > 31) {
            return false;
        }

        return true;
    } catch {
        return false;
    }
}

/**
 * Convert Indonesian number format to standard format for calculations
 * @param indoNumber - Indonesian formatted number
 * @returns Standard number format
 */
export function indoToStandardNumber(indoNumber: string): number {
    const parsed = parseIndonesianNumber(indoNumber);
    return parsed ?? 0;
}

/**
 * Convert standard number to Indonesian format
 * @param standardNumber - Standard number
 * @param options - Formatting options
 * @returns Indonesian formatted number
 */
export function standardToIndoNumber(standardNumber: number, options?: Intl.NumberFormatOptions): string {
    return formatNumberIndo(standardNumber, options);
}
