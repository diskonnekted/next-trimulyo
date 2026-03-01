
export const DUMMY_TOTAL_PENDUDUK = 11629;

// Helper to calculate percentages
const calcPersen = (val: number, total: number) => ((val / total) * 100).toFixed(2);

export const DUMMY_PENDUDUK_DATA = {
    data: [
        {
            type: "statistik",
            id: "total",
            attributes: {
                nama: "TOTAL",
                jumlah: DUMMY_TOTAL_PENDUDUK,
                laki: 5800,
                perempuan: 5829,
                persen: "100",
            },
        },
        {
            type: "statistik",
            id: "kk",
            attributes: {
                nama: "KEPALA KELUARGA",
                jumlah: 3500, // Estimate
                laki: 3000,
                perempuan: 500,
                persen: calcPersen(3500, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "sementara",
            attributes: {
                nama: "PENDUDUK SEMENTARA",
                jumlah: 150,
                laki: 80,
                perempuan: 70,
                persen: calcPersen(150, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "mutasi",
            attributes: {
                nama: "MUTASI PENDUDUK",
                jumlah: 50,
                laki: 25,
                perempuan: 25,
                persen: calcPersen(50, DUMMY_TOTAL_PENDUDUK),
            },
        },
    ],
};

export const DUMMY_DISABILITAS_DATA = {
    data: [
        {
            type: "statistik",
            id: "1",
            attributes: {
                nama: "CACAT FISIK",
                jumlah: 50,
                laki: 30,
                perempuan: 20,
                persen: calcPersen(50, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "2",
            attributes: {
                nama: "CACAT NETRA/BUTA",
                jumlah: 20,
                laki: 10,
                perempuan: 10,
                persen: calcPersen(20, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "3",
            attributes: {
                nama: "CACAT RUNGU/WICARA",
                jumlah: 30,
                laki: 15,
                perempuan: 15,
                persen: calcPersen(30, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "4",
            attributes: {
                nama: "CACAT MENTAL/JIWA",
                jumlah: 40,
                laki: 20,
                perempuan: 20,
                persen: calcPersen(40, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "5",
            attributes: {
                nama: "TIDAK CACAT",
                jumlah: 11489,
                laki: 5725,
                perempuan: 5764,
                persen: calcPersen(11489, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "total",
            attributes: {
                nama: "TOTAL",
                jumlah: DUMMY_TOTAL_PENDUDUK,
                laki: 5800,
                perempuan: 5829,
                persen: "100",
            },
        },
    ],
};

export const DUMMY_ETNIS_DATA = {
    data: [
        {
            type: "statistik",
            id: "1",
            attributes: {
                nama: "JAWA",
                jumlah: 11000,
                laki: 5500,
                perempuan: 5500,
                persen: calcPersen(11000, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "2",
            attributes: {
                nama: "SUNDA",
                jumlah: 200,
                laki: 100,
                perempuan: 100,
                persen: calcPersen(200, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "3",
            attributes: {
                nama: "BATAK",
                jumlah: 100,
                laki: 50,
                perempuan: 50,
                persen: calcPersen(100, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "4",
            attributes: {
                nama: "LAINNYA",
                jumlah: 329,
                laki: 150,
                perempuan: 179,
                persen: calcPersen(329, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "total",
            attributes: {
                nama: "TOTAL",
                jumlah: DUMMY_TOTAL_PENDUDUK,
                laki: 5800,
                perempuan: 5829,
                persen: "100",
            },
        },
    ],
};
export const DUMMY_AGAMA_DATA = {
    data: [
        {
            type: "statistik",
            id: "1",
            attributes: {
                nama: "ISLAM",
                jumlah: 10500,
                laki: 5200,
                perempuan: 5300,
                persen: calcPersen(10500, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "2",
            attributes: {
                nama: "KRISTEN",
                jumlah: 600,
                laki: 300,
                perempuan: 300,
                persen: calcPersen(600, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "3",
            attributes: {
                nama: "KATHOLIK",
                jumlah: 400,
                laki: 200,
                perempuan: 200,
                persen: calcPersen(400, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "4",
            attributes: {
                nama: "HINDU",
                jumlah: 50,
                laki: 25,
                perempuan: 25,
                persen: calcPersen(50, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "5",
            attributes: {
                nama: "BUDHA",
                jumlah: 50,
                laki: 25,
                perempuan: 25,
                persen: calcPersen(50, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "total",
            attributes: {
                nama: "TOTAL",
                jumlah: DUMMY_TOTAL_PENDUDUK,
                laki: 5800,
                perempuan: 5829,
                persen: "100",
            },
        },
    ],
};

export const DUMMY_PEKERJAAN_DATA = {
    data: [
        {
            type: "statistik",
            id: "1",
            attributes: {
                nama: "PELAJAR/MAHASISWA",
                jumlah: 2500,
                laki: 1250,
                perempuan: 1250,
                persen: calcPersen(2500, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "2",
            attributes: {
                nama: "WIRASWASTA",
                jumlah: 2000,
                laki: 1200,
                perempuan: 800,
                persen: calcPersen(2000, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "3",
            attributes: {
                nama: "PETANI/PEKEBUN",
                jumlah: 1500,
                laki: 1000,
                perempuan: 500,
                persen: calcPersen(1500, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "4",
            attributes: {
                nama: "BURUH HARIAN LEPAS",
                jumlah: 1000,
                laki: 800,
                perempuan: 200,
                persen: calcPersen(1000, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "5",
            attributes: {
                nama: "KARYAWAN SWASTA",
                jumlah: 1000,
                laki: 600,
                perempuan: 400,
                persen: calcPersen(1000, DUMMY_TOTAL_PENDUDUK),
            },
        },
         {
            type: "statistik",
            id: "6",
            attributes: {
                nama: "IBU RUMAH TANGGA",
                jumlah: 1500,
                laki: 0,
                perempuan: 1500,
                persen: calcPersen(1500, DUMMY_TOTAL_PENDUDUK),
            },
        },
         {
            type: "statistik",
            id: "7",
            attributes: {
                nama: "BELUM/TIDAK BEKERJA",
                jumlah: 2129,
                laki: 950,
                perempuan: 1179,
                persen: calcPersen(2129, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "total",
            attributes: {
                nama: "TOTAL",
                jumlah: DUMMY_TOTAL_PENDUDUK,
                laki: 5800,
                perempuan: 5829,
                persen: "100",
            },
        },
    ],
};

export const DUMMY_PENDIDIKAN_DATA = {
    data: [
        {
            type: "statistik",
            id: "1",
            attributes: {
                nama: "TAMAT SD / SEDERAJAT",
                jumlah: 3000,
                laki: 1500,
                perempuan: 1500,
                persen: calcPersen(3000, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "2",
            attributes: {
                nama: "SLTP / SEDERAJAT",
                jumlah: 2500,
                laki: 1300,
                perempuan: 1200,
                persen: calcPersen(2500, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "3",
            attributes: {
                nama: "SLTA / SEDERAJAT",
                jumlah: 3500,
                laki: 1800,
                perempuan: 1700,
                persen: calcPersen(3500, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "4",
            attributes: {
                nama: "DIPLOMA IV / STRATA I",
                jumlah: 1000,
                laki: 500,
                perempuan: 500,
                persen: calcPersen(1000, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "5",
            attributes: {
                nama: "BELUM TAMAT SD / SEDERAJAT",
                jumlah: 1629,
                laki: 700,
                perempuan: 929,
                persen: calcPersen(1629, DUMMY_TOTAL_PENDUDUK),
            },
        },
         {
            type: "statistik",
            id: "total",
            attributes: {
                nama: "TOTAL",
                jumlah: DUMMY_TOTAL_PENDUDUK,
                laki: 5800,
                perempuan: 5829,
                persen: "100",
            },
        },
    ],
};

export const DUMMY_UMUR_DATA = {
    data: [
         {
            type: "statistik",
            id: "1",
            attributes: {
                nama: "0-5 TAHUN",
                jumlah: 800,
                laki: 400,
                perempuan: 400,
                persen: calcPersen(800, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "2",
            attributes: {
                nama: "6-12 TAHUN",
                jumlah: 1200,
                laki: 600,
                perempuan: 600,
                persen: calcPersen(1200, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "3",
            attributes: {
                nama: "13-17 TAHUN",
                jumlah: 1000,
                laki: 500,
                perempuan: 500,
                persen: calcPersen(1000, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "4",
            attributes: {
                nama: "18-60 TAHUN",
                jumlah: 7000,
                laki: 3500,
                perempuan: 3500,
                persen: calcPersen(7000, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "5",
            attributes: {
                nama: "> 60 TAHUN",
                jumlah: 1629,
                laki: 800,
                perempuan: 829,
                persen: calcPersen(1629, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "total",
            attributes: {
                nama: "TOTAL",
                jumlah: DUMMY_TOTAL_PENDUDUK,
                laki: 5800,
                perempuan: 5829,
                persen: "100",
            },
        },
    ]
};

export const DUMMY_BDT_DATA = {
    data: [
        {
            type: "statistik",
            id: "1",
            attributes: {
                nama: "DESIL 1",
                jumlah: 800,
                laki: 400,
                perempuan: 400,
                persen: calcPersen(800, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "2",
            attributes: {
                nama: "DESIL 2",
                jumlah: 1200,
                laki: 600,
                perempuan: 600,
                persen: calcPersen(1200, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "3",
            attributes: {
                nama: "DESIL 3",
                jumlah: 1500,
                laki: 750,
                perempuan: 750,
                persen: calcPersen(1500, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "4",
            attributes: {
                nama: "DESIL 4",
                jumlah: 1000,
                laki: 500,
                perempuan: 500,
                persen: calcPersen(1000, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "5",
            attributes: {
                nama: "NON BDT",
                jumlah: 7129,
                laki: 3550,
                perempuan: 3579,
                persen: calcPersen(7129, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "total",
            attributes: {
                nama: "TOTAL",
                jumlah: DUMMY_TOTAL_PENDUDUK,
                laki: 5800,
                perempuan: 5829,
                persen: "100",
            },
        },
    ],
};

export const DUMMY_PERKAWINAN_DATA = {
    data: [
        {
            type: "statistik",
            id: "1",
            attributes: {
                nama: "BELUM KAWIN",
                jumlah: 3000,
                laki: 1600,
                perempuan: 1400,
                persen: calcPersen(3000, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "2",
            attributes: {
                nama: "KAWIN",
                jumlah: 8000,
                laki: 4000,
                perempuan: 4000,
                persen: calcPersen(8000, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "3",
            attributes: {
                nama: "CERAI HIDUP",
                jumlah: 500,
                laki: 150,
                perempuan: 350,
                persen: calcPersen(500, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "4",
            attributes: {
                nama: "CERAI MATI",
                jumlah: 129,
                laki: 50,
                perempuan: 79,
                persen: calcPersen(129, DUMMY_TOTAL_PENDUDUK),
            },
        },
        {
            type: "statistik",
            id: "total",
            attributes: {
                nama: "TOTAL",
                jumlah: DUMMY_TOTAL_PENDUDUK,
                laki: 5800,
                perempuan: 5829,
                persen: "100",
            },
        },
    ],
};

export const DUMMY_KEWARGANEGARAAN_DATA = {
    data: [
        {
            type: "statistik",
            id: "1",
            attributes: {
                nama: "WNI",
                jumlah: 11629,
                laki: 5800,
                perempuan: 5829,
                persen: "100",
            },
        },
        {
            type: "statistik",
            id: "2",
            attributes: {
                nama: "WNA",
                jumlah: 0,
                laki: 0,
                perempuan: 0,
                persen: "0",
            },
        },
        {
            type: "statistik",
            id: "total",
            attributes: {
                nama: "TOTAL",
                jumlah: DUMMY_TOTAL_PENDUDUK,
                laki: 5800,
                perempuan: 5829,
                persen: "100",
            },
        },
    ],
};
