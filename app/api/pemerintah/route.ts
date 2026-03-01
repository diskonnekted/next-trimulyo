import { NextResponse } from "next/server";

// Define the structure for government officials
interface GovernmentOfficial {
    id: string;
    nama: string;
    jabatan: string;
    jenis_kelamin: string;
    pendidikan: string;
    usia: number | string;
    foto: string | null;
    status: string;
}

// Mock data for Aparatur Kalurahan Trimulyo
const APARATUR_DATA: GovernmentOfficial[] = [
    {
        id: "1",
        nama: "CHOLIK HARMOKO",
        jabatan: "Lurah",
        jenis_kelamin: "LAKI-LAKI",
        pendidikan: "D-IV/S-1/Sederajat (Teknik Pertanian)",
        usia: 44,
        foto: null,
        status: "Aktif"
    },
    {
        id: "2",
        nama: "R. DARMAWAN BUDISANTOSA",
        jabatan: "Jagabaya",
        jenis_kelamin: "LAKI-LAKI",
        pendidikan: "D-IV/S-1/Sederajat (Akuntansi)",
        usia: 59,
        foto: null,
        status: "Aktif"
    },
    {
        id: "3",
        nama: "RAHAYU LESTARI",
        jabatan: "Carik",
        jenis_kelamin: "PEREMPUAN",
        pendidikan: "D-III/Sederajat (Sekretari)",
        usia: 46,
        foto: null,
        status: "Aktif"
    },
    {
        id: "4",
        nama: "TRI ANDAYANI",
        jabatan: "Kaur Tata Laksana",
        jenis_kelamin: "PEREMPUAN",
        pendidikan: "D-IV/S-1/Sederajat (Psikologi)",
        usia: 47,
        foto: null,
        status: "Aktif"
    },
    {
        id: "5",
        nama: "LILIK HADI PRANOWO",
        jabatan: "Kaur Danarta",
        jenis_kelamin: "LAKI-LAKI",
        pendidikan: "D-IV/S-1/Sederajat (Akuntansi)",
        usia: 49,
        foto: null,
        status: "Aktif"
    },
    {
        id: "6",
        nama: "AHMAD SAFRUDIN",
        jabatan: "Kaur Pangripta",
        jenis_kelamin: "LAKI-LAKI",
        pendidikan: "SLTA/Sederajat (IPS)",
        usia: 42,
        foto: null,
        status: "Aktif"
    },
    {
        id: "7",
        nama: "HENI SETIYANI",
        jabatan: "Ulu-ulu",
        jenis_kelamin: "PEREMPUAN",
        pendidikan: "D-III/Sederajat (Managemen Kehutanan)",
        usia: 48,
        foto: null,
        status: "Aktif"
    },
    {
        id: "8",
        nama: "SUMANTORO",
        jabatan: "Dukuh Kadisobo I",
        jenis_kelamin: "LAKI-LAKI",
        pendidikan: "SLTA/Sederajat (Mesin Produksi)",
        usia: 55,
        foto: null,
        status: "Aktif"
    },
    {
        id: "9",
        nama: "DITYA KURNIA SYAHBANI",
        jabatan: "Staff Pamong Kalurahan",
        jenis_kelamin: "LAKI-LAKI",
        pendidikan: "D-IV/S-1/Sederajat (Sastra Indonesia)",
        usia: 31,
        foto: null,
        status: "Aktif"
    },
    {
        id: "10",
        nama: "ARIF BAGUS SAPUTRO",
        jabatan: "Kamituwa",
        jenis_kelamin: "LAKI-LAKI",
        pendidikan: "D-IV/S-1/Sederajat (Pendidikan Teknik Otomotif)",
        usia: 30,
        foto: null,
        status: "Aktif"
    },
    {
        id: "11",
        nama: "ANNISA RAHMAYANI",
        jabatan: "Staff Pamong Kalurahan",
        jenis_kelamin: "PEREMPUAN",
        pendidikan: "D-IV/S-1/Sederajat (Pendidikan Geografi)",
        usia: 32,
        foto: null,
        status: "Aktif"
    },
    {
        id: "12",
        nama: "NGADIYONO",
        jabatan: "Staff Pamong Kalurahan",
        jenis_kelamin: "LAKI-LAKI",
        pendidikan: "SLTP/Sederajat",
        usia: 52,
        foto: null,
        status: "Aktif"
    },
    {
        id: "13",
        nama: "AGUS SUDIRMAN",
        jabatan: "Staff Pamong Kalurahan",
        jenis_kelamin: "LAKI-LAKI",
        pendidikan: "SLTA/Sederajat (Pembangunan)",
        usia: 44,
        foto: null,
        status: "Aktif"
    },
    {
        id: "14",
        nama: "SRI PERTAMA KURNIAWANINGSIH",
        jabatan: "Staff Pamong Kalurahan",
        jenis_kelamin: "PEREMPUAN",
        pendidikan: "SLTA/Sederajat (IPA)",
        usia: 50,
        foto: null,
        status: "Aktif"
    },
    {
        id: "15",
        nama: "MAWARDI",
        jabatan: "Dukuh Kadisobo II",
        jenis_kelamin: "LAKI-LAKI",
        pendidikan: "SLTA/Sederajat (IPS)",
        usia: 62,
        foto: null,
        status: "Aktif"
    },
    {
        id: "16",
        nama: "ANDAYANI LESTARI",
        jabatan: "Dukuh Klegen Polowidi",
        jenis_kelamin: "PEREMPUAN",
        pendidikan: "SLTA/Sederajat (IPA)",
        usia: 39,
        foto: null,
        status: "Aktif"
    },
    {
        id: "17",
        nama: "BOIMAN",
        jabatan: "Dukuh Pendeman",
        jenis_kelamin: "LAKI-LAKI",
        pendidikan: "SLTA/Sederajat (IPS)",
        usia: 54,
        foto: null,
        status: "Aktif"
    },
    {
        id: "18",
        nama: "MUHAMMAD NASRUN",
        jabatan: "Dukuh Balong Mantaran",
        jenis_kelamin: "LAKI-LAKI",
        pendidikan: "SLTA/Sederajat (Mesin)",
        usia: 55,
        foto: null,
        status: "Aktif"
    },
    {
        id: "19",
        nama: "MULYANA JATI",
        jabatan: "Dukuh Jogokerten",
        jenis_kelamin: "LAKI-LAKI",
        pendidikan: "SLTA/Sederajat (Mesin Produksi)",
        usia: 45,
        foto: null,
        status: "Aktif"
    },
    {
        id: "20",
        nama: "ARFAN HARNANTO",
        jabatan: "Dukuh Blunyah",
        jenis_kelamin: "LAKI-LAKI",
        pendidikan: "SLTA/Sederajat (IPS)",
        usia: 45,
        foto: null,
        status: "Aktif"
    },
    {
        id: "21",
        nama: "FATONAH",
        jabatan: "Dukuh Pambregan",
        jenis_kelamin: "PEREMPUAN",
        pendidikan: "SLTA/Sederajat (TK)",
        usia: 57,
        foto: null,
        status: "Aktif"
    },
    {
        id: "22",
        nama: "AGUS SUJENDRO",
        jabatan: "Dukuh Klelen Tegalsari",
        jenis_kelamin: "LAKI-LAKI",
        pendidikan: "SLTA/Sederajat (Teknik Mesin dan Konstruksi Pesawat Terbang)",
        usia: 52,
        foto: null,
        status: "Aktif"
    },
    {
        id: "23",
        nama: "INDAH PRIYANI",
        jabatan: "Dukuh Kalirase",
        jenis_kelamin: "PEREMPUAN",
        pendidikan: "D-IV/S-1/Sederajat (Ekonomi Manajemen)",
        usia: 49,
        foto: null,
        status: "Aktif"
    },
    {
        id: "24",
        nama: "ADHI PRAMONO",
        jabatan: "Dukuh Kepitu",
        jenis_kelamin: "LAKI-LAKI",
        pendidikan: "SLTA/Sederajat (IPA)",
        usia: 31,
        foto: null,
        status: "Aktif"
    },
    {
        id: "25",
        nama: "ERNA NUROHMI",
        jabatan: "Dukuh Karang Kepanjen",
        jenis_kelamin: "PEREMPUAN",
        pendidikan: "SLTA/Sederajat (IPS)",
        usia: 40,
        foto: null,
        status: "Aktif"
    },
    {
        id: "26",
        nama: "DIDIT NOOR CAHYANTO",
        jabatan: "Dukuh Sidomulyo",
        jenis_kelamin: "LAKI-LAKI",
        pendidikan: "SLTA/Sederajat",
        usia: 42,
        foto: null,
        status: "Aktif"
    }
];

export async function GET() {
    // Return mock data directly
    return NextResponse.json({
        success: true,
        data: APARATUR_DATA
    });
}
