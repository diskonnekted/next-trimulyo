"use client";

import { useEffect, useState } from "react";

interface ProtectedContactProps {
    value: string;
    type: "email" | "phone";
    className?: string;
}

export function ProtectedContact({ value, type, className = "" }: ProtectedContactProps) {
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        // Reveal after component mounts (bots typically don't execute JS)
        const timer = setTimeout(() => setRevealed(true), 100);
        return () => clearTimeout(timer);
    }, []);

    if (!revealed) {
        return <span className={className}>●●●●●●●</span>;
    }

    // Reverse the string and use CSS to display it correctly
    const reversed = value.split("").reverse().join("");

    return (
        <span
            className={className}
            style={{ unicodeBidi: "bidi-override", direction: "rtl" }}
            data-contact={type}
            aria-label={type === "email" ? "Email address" : "Phone number"}
        >
            {reversed}
        </span>
    );
}
