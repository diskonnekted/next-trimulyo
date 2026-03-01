# Dokumentasi API Komunitas Trimulyo

Dokumentasi ini menjelaskan endpoint API yang tersedia untuk mengakses data komunitas, berita, galeri, dan kegiatan di platform Komunitas Kalurahan Trimulyo.

## URL Dasar
Semua endpoint API diakses melalui URL dasar berikut (sesuaikan dengan domain Anda):
```
http://localhost:8000/api/v1
```

## Daftar Endpoint

### 1. Mendapatkan Daftar Komunitas
Endpoint ini digunakan untuk mengambil daftar seluruh komunitas beserta ringkasan jumlah kontennya.

**Request:**
- **Method:** `GET`
- **Endpoint:** `/communities`

**Parameter:**
Tidak ada parameter yang diperlukan.

**Contoh Response Sukses (200 OK):**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "name": "Komunitas Seni Trimulyo",
            "description": "Komunitas yang mewadahi para seniman...",
            "image": "https://images.unsplash.com/photo-...",
            "news_count": 5,
            "galleries_count": 12,
            "activities_count": 3
        },
        {
            "id": 2,
            "name": "Karang Taruna",
            "description": "Organisasi pemuda...",
            "image": "https://images.unsplash.com/photo-...",
            "news_count": 2,
            "galleries_count": 8,
            "activities_count": 1
        }
    ]
}
```

### 2. Mendapatkan Detail Komunitas
Endpoint ini digunakan untuk mengambil detail lengkap dari satu komunitas tertentu, termasuk berita terbaru, galeri foto, dan kegiatan terbaru.

**Request:**
- **Method:** `GET`
- **Endpoint:** `/communities/{id}`
- **Parameter URL:**
    - `id` (integer): ID unik dari komunitas yang ingin diambil datanya.

**Contoh Request:**
```
GET /communities/30
```

**Contoh Response Sukses (200 OK):**
```json
{
    "success": true,
    "data": {
        "id": 30,
        "name": "Komunitas Seni Trimulyo",
        "description": "Komunitas yang mewadahi para seniman...",
        "category": "Seni & Budaya",
        "contact": "081234567890",
        "image": "https://images.unsplash.com/photo-...",
        "created_at": "2026-02-15T10:00:00.000000Z",
        "updated_at": "2026-02-15T10:00:00.000000Z",
        "news": [
            {
                "id": 1,
                "community_id": 30,
                "title": "Pentas Seni Tahunan",
                "slug": "pentas-seni-tahunan",
                "excerpt": "Kegiatan pentas seni yang diadakan...",
                "content": "Isi berita lengkap...",
                "image": "path/to/image.jpg",
                "views": 150,
                "is_published": 1,
                "published_at": "2026-03-01 08:00:00",
                "created_at": "2026-03-01T08:00:00.000000Z",
                "updated_at": "2026-03-01T08:00:00.000000Z"
            }
            // ... maksimal 10 berita terbaru
        ],
        "galleries": [
            {
                "id": 1,
                "community_id": 30,
                "title": "Dokumentasi Latihan",
                "image": "path/to/gallery.jpg",
                "created_at": "2026-02-28T14:00:00.000000Z",
                "updated_at": "2026-02-28T14:00:00.000000Z"
            }
            // ... maksimal 20 foto terbaru
        ],
        "activities": [
            {
                "id": 1,
                "community_id": 30,
                "title": "Workshop Membatik",
                "description": "Pelatihan membatik untuk pemula...",
                "date": "2026-03-10 09:00:00",
                "location": "Balai Desa Trimulyo",
                "image": "path/to/activity.jpg",
                "created_at": "2026-02-25T10:00:00.000000Z",
                "updated_at": "2026-02-25T10:00:00.000000Z"
            }
            // ... maksimal 5 kegiatan terbaru
        ]
    }
}
```

**Contoh Response Error (404 Not Found):**
Jika ID komunitas tidak ditemukan:
```json
{
    "success": false,
    "message": "Community not found"
}
```

## Catatan Tambahan
- Format tanggal menggunakan standar ISO 8601 atau format timestamp database (YYYY-MM-DD HH:mm:ss).
- Semua response dikembalikan dalam format JSON.
- Pastikan untuk menangani error jika server tidak merespons atau terjadi kesalahan internal (500 Internal Server Error).
