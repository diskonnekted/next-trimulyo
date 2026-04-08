/**
 * Fetch IDM data from Kemendesa API and save as static JSON
 * 
 * Usage:
 *   node scripts/export-idm-json.js
 */

const fs = require("fs");
const path = require("path");

const YEARS = [2024, 2023, 2022, 2021];
const DESA_ID = "3404132005";
const OUTPUT = path.join(__dirname, "..", "data", "idm-data.json");

async function fetchYear(year) {
    const url = `https://idm.kemendesa.go.id/open/api/desa/rumusan/${DESA_ID}/${year}`;
    const res = await fetch(url);
    if (!res.ok) {
        console.error(`HTTP ${res.status} for ${year}`);
        return null;
    }
    const json = await res.json();
    if (json.error) {
        console.error(`API error for ${year}: ${json.message}`);
        return null;
    }
    return { year, data: json.mapData };
}

async function main() {
    const results = await Promise.all(YEARS.map(fetchYear));
    const output = {};

    for (const r of results) {
        if (r) {
            output[r.year] = r.data;
            const s = r.data.SUMMARIES || {};
            console.log(`${r.year}: ${s.STATUS || "N/A"} (${s.SKOR_SAAT_INI || "N/A"})`);
        }
    }

    fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
    fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2));
    console.log(`\nSaved ${Object.keys(output).length} years to ${OUTPUT}`);
}

main().catch(console.error);
