// Standardized API response format for Indonesian responses
export interface ApiResponse<T = unknown> {
    sukses: boolean;
    data?: T;
    pesan?: string;
    kesalahan?: {
        kode: string;
        pesan: string;
        detail?: Record<string, unknown>;
    };
    meta?: {
        total?: number;
        halaman?: number;
        perHalaman?: number;
        totalHalaman?: number;
    };
    timestamp: string;
}

// Success response helper
export function createSuccessResponse<T>(
    data: T,
    pesan: string = "Data berhasil dimuat",
    meta?: ApiResponse<T>["meta"]
): ApiResponse<T> {
    return {
        sukses: true,
        data,
        pesan,
        meta,
        timestamp: new Date().toISOString(),
    };
}

// Error response helper
export function createErrorResponse(kode: string, pesan: string, detail?: Record<string, unknown>): ApiResponse {
    return {
        sukses: false,
        kesalahan: {
            kode,
            pesan,
            detail,
        },
        timestamp: new Date().toISOString(),
    };
}

// Validation error response helper
export function createValidationErrorResponse(errors: Record<string, string>): ApiResponse {
    return {
        sukses: false,
        kesalahan: {
            kode: "VALIDATION_ERROR",
            pesan: "Validasi gagal",
            detail: errors,
        },
        timestamp: new Date().toISOString(),
    };
}

// Not found response helper
export function createNotFoundResponse(pesan: string = "Data tidak ditemukan"): ApiResponse {
    return {
        sukses: false,
        kesalahan: {
            kode: "NOT_FOUND",
            pesan,
        },
        timestamp: new Date().toISOString(),
    };
}

// Unauthorized response helper
export function createUnauthorizedResponse(pesan: string = "Anda tidak memiliki akses"): ApiResponse {
    return {
        sukses: false,
        kesalahan: {
            kode: "UNAUTHORIZED",
            pesan,
        },
        timestamp: new Date().toISOString(),
    };
}

// Server error response helper
export function createServerErrorResponse(pesan: string = "Terjadi kesalahan pada server"): ApiResponse {
    return {
        sukses: false,
        kesalahan: {
            kode: "INTERNAL_SERVER_ERROR",
            pesan,
        },
        timestamp: new Date().toISOString(),
    };
}

// Database error response helper
export function createDatabaseErrorResponse(pesan: string = "Terjadi kesalahan koneksi database"): ApiResponse {
    return {
        sukses: false,
        kesalahan: {
            kode: "DATABASE_ERROR",
            pesan,
        },
        timestamp: new Date().toISOString(),
    };
}

// External API error response helper
export function createExternalApiErrorResponse(
    pesan: string = "Terjadi kesalahan pada layanan eksternal"
): ApiResponse {
    return {
        sukses: false,
        kesalahan: {
            kode: "EXTERNAL_API_ERROR",
            pesan,
        },
        timestamp: new Date().toISOString(),
    };
}

// Rate limit response helper
export function createRateLimitResponse(
    pesan: string = "Terlalu banyak permintaan, silakan coba lagi nanti"
): ApiResponse {
    return {
        sukses: false,
        kesalahan: {
            kode: "RATE_LIMIT_EXCEEDED",
            pesan,
        },
        timestamp: new Date().toISOString(),
    };
}

// File upload error response helper
export function createFileUploadErrorResponse(pesan: string = "Gagal mengunggah file"): ApiResponse {
    return {
        sukses: false,
        kesalahan: {
            kode: "FILE_UPLOAD_ERROR",
            pesan,
        },
        timestamp: new Date().toISOString(),
    };
}

// Error codes enum for consistency
export enum ErrorCodes {
    VALIDATION_ERROR = "VALIDATION_ERROR",
    NOT_FOUND = "NOT_FOUND",
    UNAUTHORIZED = "UNAUTHORIZED",
    FORBIDDEN = "FORBIDDEN",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    DATABASE_ERROR = "DATABASE_ERROR",
    EXTERNAL_API_ERROR = "EXTERNAL_API_ERROR",
    RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
    FILE_UPLOAD_ERROR = "FILE_UPLOAD_ERROR",
    NETWORK_ERROR = "NETWORK_ERROR",
    TIMEOUT_ERROR = "TIMEOUT_ERROR",
    INVALID_REQUEST = "INVALID_REQUEST",
    TOKEN_EXPIRED = "TOKEN_EXPIRED",
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
    SESSION_EXPIRED = "SESSION_EXPIRED",
    MAINTENANCE_MODE = "MAINTENANCE_MODE",
}

// Indonesian error messages mapping
export const errorMessages = {
    [ErrorCodes.VALIDATION_ERROR]: "Validasi gagal",
    [ErrorCodes.NOT_FOUND]: "Data tidak ditemukan",
    [ErrorCodes.UNAUTHORIZED]: "Anda tidak memiliki akses",
    [ErrorCodes.FORBIDDEN]: "Akses ditolak",
    [ErrorCodes.INTERNAL_SERVER_ERROR]: "Terjadi kesalahan pada server",
    [ErrorCodes.DATABASE_ERROR]: "Terjadi kesalahan koneksi database",
    [ErrorCodes.EXTERNAL_API_ERROR]: "Terjadi kesalahan pada layanan eksternal",
    [ErrorCodes.RATE_LIMIT_EXCEEDED]: "Terlalu banyak permintaan, silakan coba lagi nanti",
    [ErrorCodes.FILE_UPLOAD_ERROR]: "Gagal mengunggah file",
    [ErrorCodes.NETWORK_ERROR]: "Terjadi kesalahan jaringan",
    [ErrorCodes.TIMEOUT_ERROR]: "Permintaan timeout",
    [ErrorCodes.INVALID_REQUEST]: "Permintaan tidak valid",
    [ErrorCodes.TOKEN_EXPIRED]: "Token telah kedaluwarsa",
    [ErrorCodes.INVALID_CREDENTIALS]: "Email atau kata sandi salah",
    [ErrorCodes.SESSION_EXPIRED]: "Sesi telah berakhir, silakan login kembali",
    [ErrorCodes.MAINTENANCE_MODE]: "Sistem sedang dalam maintenance",
};
