import translations from "./translation.json";

// Type definitions for translations
type TranslationKey = string;
type TranslationParams = Record<string, string | number>;

/**
 * Server-side translation function (for SSR)
 * @param key - Translation key
 * @param params - Optional parameters
 * @param fallback - Optional fallback text
 * @returns Translated string
 */
export function getServerTranslation(key: TranslationKey, params?: TranslationParams, fallback?: string): string {
    const keys = key.split(".");
    let value: unknown = translations;

    for (const k of keys) {
        if (value && typeof value === "object" && k in (value as Record<string, unknown>)) {
            value = (value as Record<string, unknown>)[k];
        } else {
            return fallback ?? key;
        }
    }

    if (typeof value === "function") {
        return value(params);
    }

    if (typeof value === "string" && params) {
        return interpolateParams(value, params);
    }

    return typeof value === "string" ? value : (fallback ?? key);
}

/**
 * Interpolate parameters into a translation string
 * @param str - String with parameters in {{param}} format
 * @param params - Object with parameter values
 * @returns String with interpolated parameters
 */
function interpolateParams(str: string, params: TranslationParams): string {
    return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return params[key]?.toString() ?? match;
    });
}

/**
 * Type-safe translation keys
 */
export const translationKeys = {
    navigation: {
        beranda: "navigation.beranda",
        berita: "navigation.berita",
        profilDesa: "navigation.profilDesa",
        layanan: "navigation.layanan",
        cari: "navigation.cari",
        login: "navigation.login",
    },
    hero: {
        judul1: "hero.judul1",
        deskripsi1: "hero.deskripsi1",
        ctaLayananDigital: "hero.ctaLayananDigital",
    },
    forms: {
        namaLengkap: "forms.namaLengkap",
        email: "forms.email",
        submit: "forms.submit",
        cancel: "forms.cancel",
    },
    messages: {
        success: "messages.success",
        error: "messages.error",
        loading: "messages.loading",
        noData: "messages.noData",
    },
    errors: {
        validation: {
            required: "errors.validation.required",
            email: "errors.validation.email",
        },
    },
} as const;

/**
 * Default export for convenience
 */
export default getServerTranslation;
