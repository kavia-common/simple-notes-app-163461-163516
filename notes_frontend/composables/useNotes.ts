/**
 * Lightweight UUID v4 generator for client-side usage without external deps.
 * Uses crypto.getRandomValues when available, falls back to Math.random.
 */
function uuidv4(): string {
  const cryptoObj = (globalThis as any).crypto;
  if (cryptoObj && typeof cryptoObj.getRandomValues === 'function') {
    const bytes = new Uint8Array(16);
    cryptoObj.getRandomValues(bytes);
    // Per RFC 4122 section 4.4
    bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
    bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10
    const hex = [...bytes].map(b => b.toString(16).padStart(2, '0')).join('');
    return `${hex.substring(0,8)}-${hex.substring(8,12)}-${hex.substring(12,16)}-${hex.substring(16,20)}-${hex.substring(20)}`;
  }
  // Fallback (lower quality)
  const s: string[] = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i++) s[i] = hexDigits.substr(Math.floor(Math.random() * 16), 1);
  s[14] = '4';
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  // @ts-ignore
  s[19] = hexDigits.substr((parseInt(s[19]!, 16) & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = '-';
  return s.join('');
}

export type Note = {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  createdAt: string; // ISO
  updatedAt: string; // ISO
};

type CreateNoteInput = {
  title: string;
  content: string;
  tags?: string[];
};

type UpdateNoteInput = Partial<CreateNoteInput> & { id: string };

const STORAGE_KEY = 'notes.v1';

// PUBLIC_INTERFACE
export function useNotes() {
  /**
   * This composable manages notes. It persists locally via localStorage for demo
   * and exposes placeholders to swap with a backend API using runtimeConfig.apiBase.
   */
  const notes = useState<Note[]>('notes', () => []);
  const loaded = useState<boolean>('notes_loaded', () => false);

  const load = () => {
    if (loaded.value) return;
    if (process.client) {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as Note[];
          notes.value = parsed;
        } catch {
          // ignore parse error
        }
      }
      loaded.value = true;
    }
  };

  const persist = () => {
    if (process.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes.value));
    }
  };

  // PUBLIC_INTERFACE
  function list(): Note[] {
    load();
    // Sort newest updated first
    return [...notes.value].sort((a, b) => (b.updatedAt > a.updatedAt ? 1 : -1));
  }

  // PUBLIC_INTERFACE
  function get(id: string): Note | undefined {
    load();
    return notes.value.find(n => n.id === id);
  }

  // PUBLIC_INTERFACE
  function create(input: CreateNoteInput): Note {
    load();
    const now = new Date().toISOString();
    const note: Note = {
      id: uuidv4(),
      title: input.title?.trim() || 'Untitled',
      content: input.content || '',
      tags: input.tags || [],
      createdAt: now,
      updatedAt: now,
    };
    notes.value.push(note);
    persist();
    return note;
  }

  // PUBLIC_INTERFACE
  function update(input: UpdateNoteInput): Note | undefined {
    load();
    const idx = notes.value.findIndex(n => n.id === input.id);
    if (idx === -1) return;
    const existing = notes.value[idx];
    const next: Note = {
      ...existing,
      title: input.title !== undefined ? (input.title.trim() || 'Untitled') : existing.title,
      content: input.content ?? existing.content,
      tags: input.tags ?? existing.tags,
      updatedAt: new Date().toISOString(),
    };
    notes.value.splice(idx, 1, next);
    persist();
    return next;
  }

  // PUBLIC_INTERFACE
  function remove(id: string): boolean {
    load();
    const before = notes.value.length;
    notes.value = notes.value.filter(n => n.id !== id);
    persist();
    return notes.value.length < before;
  }

  return { list, get, create, update, remove };
}
