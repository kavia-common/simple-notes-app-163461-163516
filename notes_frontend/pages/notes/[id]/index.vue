<template>
  <div class="page">
    <section class="card" style="padding:16px;">
      <div style="display:flex; align-items:center; justify-content:space-between;">
        <div>
          <h2 style="margin:0; color: var(--color-secondary);">{{ note?.title }}</h2>
          <p class="helper" style="margin:6px 0 0;">Updated {{ timeAgo(note?.updatedAt) }}</p>
        </div>
        <div>
          <NuxtLink class="btn btn-primary" :to="`/notes/${id}/edit`">Edit</NuxtLink>
          <NuxtLink class="btn btn-ghost" to="/">Back</NuxtLink>
        </div>
      </div>
    </section>

    <section class="card" style="padding:16px; margin-top:14px;">
      <div v-if="note && note.content" style="white-space:pre-wrap; line-height:1.6;">
        {{ note.content }}
      </div>
      <div v-else class="empty">No content</div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Note } from '~/composables/useNotes';

definePageMeta({
  title: 'Note'
});

const route = useRoute();
const id = route.params.id as string;

const { get } = useNotes();

const note = ref<Note | undefined>(undefined);

onMounted(() => {
  note.value = get(id);
});

watch(() => route.params.id, (newId) => {
  note.value = get(newId as string);
});

function timeAgo(iso?: string) {
  if (!iso) return '';
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
