<template>
  <div class="page">
    <section class="card" style="padding:16px;">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
        <div>
          <h2 style="margin:0; font-size:18px; color: var(--color-secondary);">All Notes</h2>
          <p class="helper" style="margin:6px 0 0;">Browse, search, and manage your notes</p>
        </div>
        <div>
          <NuxtLink to="/notes/new" class="btn btn-accent">+ New Note</NuxtLink>
        </div>
      </div>
    </section>

    <section class="card" style="margin-top:14px; padding:16px;">
      <div class="list" v-if="filtered.length">
        <article v-for="n in filtered" :key="n.id" class="note-item">
          <div style="display:flex; align-items:center; justify-content:space-between; gap:10px;">
            <div>
              <div class="note-title">{{ n.title }}</div>
              <div class="note-meta">
                <span>Updated {{ timeAgo(n.updatedAt) }}</span>
                <span>•</span>
                <span>{{ (n.content || '').slice(0, 80) }}{{ (n.content || '').length > 80 ? '…' : '' }}</span>
              </div>
            </div>
            <div>
              <NuxtLink class="btn btn-ghost" :to="`/notes/${n.id}`">Open</NuxtLink>
              <NuxtLink class="btn btn-primary" :to="`/notes/${n.id}/edit`">Edit</NuxtLink>
              <button class="btn btn-danger" @click="onDelete(n.id)">Delete</button>
            </div>
          </div>
        </article>
      </div>
      <div v-else class="empty">
        No notes match your search. Try creating a new note.
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Note } from '~/composables/useNotes';

definePageMeta({
  title: 'All Notes'
});

const { list, remove } = useNotes();
const { query } = useNotesSearch();

const notes = ref<Note[]>([]);
const filtered = computed(() => {
  const q = (query.value || '').toLowerCase().trim();
  if (!q) return notes.value;
  return notes.value.filter(n =>
    (n.title || '').toLowerCase().includes(q) ||
    (n.content || '').toLowerCase().includes(q) ||
    (n.tags || []).some(t => (t || '').toLowerCase().includes(q))
  );
});

onMounted(() => {
  notes.value = list();
});

watch(query, () => {
  // no-op, computed will re-evaluate
});

const onDelete = (id: string) => {
  if (confirm('Delete this note? This action cannot be undone.')) {
    remove(id);
    notes.value = list();
  }
};

function timeAgo(iso: string) {
  const d = new Date(iso).getTime();
  const diff = Date.now() - d;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
</script>
