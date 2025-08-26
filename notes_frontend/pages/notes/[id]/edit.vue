<template>
  <div class="page">
    <section class="card" style="padding:16px;">
      <h2 style="margin:0 0 6px; color: var(--color-secondary);">Edit Note</h2>
      <p class="helper" style="margin:0 0 14px;">Update your note and save changes</p>

      <form @submit.prevent="onSubmit" style="display:grid; gap:12px;">
        <div>
          <label class="helper">Title</label>
          <input v-model="title" class="input" placeholder="Note title" />
        </div>
        <div>
          <label class="helper">Content</label>
          <textarea v-model="content" class="textarea" placeholder="Write something..."></textarea>
        </div>
        <div style="display:flex; justify-content:space-between; width:100%;">
          <div>
            <button type="button" class="btn btn-danger" @click="onDelete">Delete</button>
          </div>
          <div>
            <NuxtLink class="btn btn-ghost" :to="`/notes/${id}`">Cancel</NuxtLink>
            <button class="btn btn-primary" type="submit">Save</button>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Note } from '~/composables/useNotes';

definePageMeta({
  title: 'Edit Note'
});

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

const { get, update, remove } = useNotes();

const note = ref<Note | undefined>(undefined);
const title = ref('');
const content = ref('');

onMounted(() => {
  const n = get(id);
  if (!n) {
    router.replace('/');
    return;
  }
  note.value = n;
  title.value = n.title;
  content.value = n.content;
});

const onSubmit = () => {
  const updated = update({ id, title: title.value, content: content.value });
  if (updated) {
    router.push(`/notes/${id}`);
  }
};
const onDelete = () => {
  if (confirm('Delete this note? This action cannot be undone.')) {
    remove(id);
    router.push('/');
  }
};
</script>
