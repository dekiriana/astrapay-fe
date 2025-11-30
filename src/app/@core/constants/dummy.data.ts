
import { CategoryOption, Note } from "../../@features/models/note.model";

const now = new Date().toISOString();

export const DUMMY_NOTES: Note[] = [
    {
        id: 1,
        title: "Struktur Project Angular",
        content: "Implementasi menggunakan Standalone Components, Signals, PrimeNG, dan Tailwind.",
        category: "work",
        createdAt: now,
        updatedAt: now
    },
    {
        id: 2,
        title: "Konfigurasi CORS Penting",
        content: "Pastikan backend mengizinkan domain Angular (CORS) untuk akses API.",
        category: "work",
        createdAt: now,
        updatedAt: now
    },
    {
        id: 3,
        title: "Rencana Liburan 2025",
        content: "Cari tiket murah + booking hotel untuk trip keluarga.",
        category: "personal",
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        updatedAt: new Date(Date.now() - 3600000).toISOString()
    },
    {
        id: 4,
        title: "Ide Aplikasi Catatan Pintar",
        content: "Notes app dengan AI summarization dan tagging otomatis.",
        category: "ideas",
        createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 3600000).toISOString()
    },
    {
        id: 5,
        title: "Belanja Bulanan",
        content: "Cek kebutuhan dapur dan barang habis pakai.",
        category: "personal",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
        id: 6,
        title: "Riset Teknologi Baru",
        content: "Coba NestJS + Genkit untuk integrasi AI di sisi backend.",
        category: "ideas",
        createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 86400000).toISOString()
    }
];

export let MOCK_LAST_ID = 6;

export function incrementMockId(): number {
    MOCK_LAST_ID += 1;
    return MOCK_LAST_ID;
}

export const RAW_CATEGORIES: CategoryOption[] = [
    { label: 'CATEGORY.GENERAL', value: 'general' },
    { label: 'CATEGORY.PERSONAL', value: 'personal' },
    { label: 'CATEGORY.WORK', value: 'work' },
    { label: 'CATEGORY.IDEAS', value: 'ideas' },
];