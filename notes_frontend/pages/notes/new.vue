<template>
  <div class="page">
    <section class="card" style="padding:16px;">
      <h2 style="margin:0 0 6px; color: var(--color-secondary);">New Note</h2>
      <p class="helper" style="margin:0 0 14px;">Write your thoughts and save them</p>

      <form @submit.prevent="onSubmit" style="display:grid; gap:12px;">
        <div>
          <label class="helper">Title</label>
          <input v-model="title" class="input" placeholder="Note title" />
        </div>
        <div>
          <label class="helper">Content</label>
          <textarea v-model="content" class="textarea" placeholder="Write something..."></textarea>
        </div>
        <div style="display:flex; justify-content:flex-end;">
          <NuxtLink class="btn btn-ghost" to="/">Cancel</NuxtLink>
          <button class="btn btn-accent" type="submit">Create</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Create Note'
});
const title = ref('');
const content = ref('');

const { create } = useNotes();
const router = useRouter();

const onSubmit = () => {
  const note = create({ title: title.value, content: content.value });
  router.push(`/notes/${note.id}`);
};
</script>
