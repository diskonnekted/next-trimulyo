import type { ImageProps } from "next/image";
import Image from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";

interface ImageFallbackProps extends Omit<ImageProps, "src"> {
    src?: string | null;
    _fallbackSrc?: string;
    iconSize?: number;
}

export default function ImageFallback({
    src,
    _fallbackSrc,
    iconSize = 48,
    alt = "",
    className = "",
    ...props
}: ImageFallbackProps) {
    // Validate and normalize the source URL
    const normalizeSrc = (url: string | null | undefined) => {
        if (!url || typeof url !== "string") return null;
        // If it's a relative path, return null to show fallback
        if (url.startsWith("/") && !url.startsWith("//")) return null;
        // If it doesn't start with http, return null
        if (!url.startsWith("http://") && !url.startsWith("https://")) return null;
        return url;
    };

    const [imgSrc, setImgSrc] = useState(normalizeSrc(src));
    const [hasError, setHasError] = useState(!normalizeSrc(src));

    const handleError = () => {
        if (!hasError) {
            setHasError(true);
            setImgSrc(null);
        }
    };

    // If no image or error occurred, show fallback
    if (hasError || !imgSrc) {
        return (
            <div
                className={`flex items-center justify-center bg-[#1f2b44] text-green-100 ${className}`}
                style={props.style}
            >
                <ImageOff size={iconSize} />
            </div>
        );
    }

    return <Image src={imgSrc} alt={alt} className={className} onError={handleError} {...props} />;
}
