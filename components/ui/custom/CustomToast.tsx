"use client";

import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps, toast } from "sonner";

type CustomToastProps = ToasterProps;

const CustomToast = ({ ...props }: CustomToastProps) => {
    const { theme = "system" } = useTheme();

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            position="bottom-right"
            duration={30000} // 30 seconds as per requirements
            expand={false}
            richColors
            closeButton
            icons={{
                success: <CircleCheckIcon className="size-4" />,
                info: <InfoIcon className="size-4" />,
                warning: <TriangleAlertIcon className="size-4" />,
                error: <OctagonXIcon className="size-4" />,
                loading: <Loader2Icon className="size-4 animate-spin" />,
            }}
            toastOptions={{
                style: {
                    background: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    color: "hsl(var(--foreground))",
                    borderRadius: "var(--radius)",
                    padding: "12px 16px",
                    fontSize: "14px",
                    fontWeight: "400",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    maxWidth: "400px",
                    width: "100%",
                },
            }}
            style={
                {
                    "--normal-bg": "hsl(var(--background))",
                    "--normal-text": "hsl(var(--foreground))",
                    "--normal-border": "hsl(var(--border))",
                    "--border-radius": "var(--radius)",
                } as React.CSSProperties
            }
            {...props}
        />
    );
};

// Custom toast helpers with Indonesian messages
export const showToast = {
    success: (message: string, description?: string) => toast.success(message, { description }),
    error: (message: string, description?: string) => toast.error(message, { description }),
    info: (message: string, description?: string) => toast.info(message, { description }),
    warning: (message: string, description?: string) => toast.warning(message, { description }),
    loading: (message: string) => toast.loading(message),

    // Indonesian specific messages
    berhasil: (message: string, description?: string) => toast.success(message, { description }),
    kesalahan: (message: string, description?: string) => toast.error(message, { description }),
    informasi: (message: string, description?: string) => toast.info(message, { description }),
    peringatan: (message: string, description?: string) => toast.warning(message, { description }),
    memuat: (message: string) => toast.loading(message),

    // Common Indonesian messages
    dataTersimpan: () => toast.success("Data berhasil disimpan"),
    dataDihapus: () => toast.success("Data berhasil dihapus"),
    dataDiperbarui: () => toast.success("Data berhasil diperbarui"),
    terjadiKesalahan: () => toast.error("Terjadi kesalahan, silakan coba lagi"),
    formValidasi: () => toast.error("Mohon lengkapi form yang diperlukan"),
    memuatData: () => toast.loading("Memuat data..."),
    unggahBerhasil: () => toast.success("File berhasil diunggah"),
    unggahGagal: () => toast.error("File gagal diunggah"),
    koneksiTerputus: () => toast.error("Koneksi terputus, silakan periksa internet Anda"),
    izinDitolak: () => toast.error("Anda tidak memiliki izin untuk melakukan tindakan ini"),
};

export { CustomToast };
export default CustomToast;
