<template>
  <div class="app-root">
    <header class="app-header">
      <div class="header-left">
        <div class="app-logo">📝</div>
        <h1 class="app-title">Simple Notes</h1>
      </div>
      <div class="header-right">
        <div class="search-container">
          <input
            v-model="query"
            @input="onSearchInput"
            class="search-input"
            type="text"
            placeholder="Search notes..."
            aria-label="Search notes"
          />
        </div>
        <div class="user-chip" title="Guest user">
          <span class="avatar">G</span>
          <span class="user-name">{{ username }}</span>
        </div>
      </div>
    </header>

    <div class="app-body">
      <aside class="sidebar">
        <nav class="nav">
          <NuxtLink to="/" class="nav-link" exact-active-class="active">
            <span>All Notes</span>
          </NuxtLink>
          <NuxtLink to="/notes/new" class="nav-link" exact-active-class="active">
            <span>New Note</span>
          </NuxtLink>
        </nav>
        <div class="sidebar-footer">
          <small>Light Theme</small>
        </div>
      </aside>

      <main class="content">
        <NuxtPage />
      </main>
    </div>
    <NuxtRouteAnnouncer />
  </div>
</template>

<script setup lang="ts">
// Global header search wires into a useNotesStore composable via an event bus.
// For simplicity, we use a global state composable.
const query = ref('');
const username = 'Guest';

const { setGlobalSearch } = useNotesSearch();
const onSearchInput = () => {
  setGlobalSearch(query.value);
};
</script>

<style>
:root {
  --color-primary: #4F8EF7;
  --color-secondary: #2D3748;
  --color-accent: #F7B801;
  --color-bg: #f7f9fc;
  --color-surface: #ffffff;
  --color-text: #1a202c;
  --color-muted: #6b7280;
  --radius: 12px;
  --shadow: 0 6px 20px rgba(0,0,0,0.06);
  --border: 1px solid rgba(0,0,0,0.06);
}

* { box-sizing: border-box; }
html, body, #__nuxt { height: 100%; }
body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-root { display: flex; flex-direction: column; height: 100vh; }

.app-header {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-surface);
  border-bottom: var(--border);
  padding: 0 16px;
}

.header-left { display: flex; align-items: center; gap: 10px; }
.app-logo { font-size: 20px; }
.app-title { font-size: 18px; margin: 0; color: var(--color-secondary); letter-spacing: 0.2px; }

.header-right { display: flex; align-items: center; gap: 12px; }

.search-container { position: relative; }
.search-input {
  height: 38px;
  width: 300px;
  max-width: 44vw;
  border-radius: 999px;
  border: var(--border);
  background: var(--color-bg);
  padding: 0 14px;
  outline: none;
  transition: box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}
.search-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(79,142,247,0.12);
  background: #fff;
}

.user-chip {
  display: flex; align-items: center; gap: 8px;
  background: var(--color-bg);
  border: var(--border);
  padding: 6px 10px;
  border-radius: 999px;
}
.avatar {
  width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center;
  border-radius: 50%; background: var(--color-primary); color: #fff; font-weight: 600; font-size: 12px;
}
.user-name { color: var(--color-secondary); font-size: 13px; }

.app-body { display: grid; grid-template-columns: 240px 1fr; height: calc(100vh - 64px); }

.sidebar {
  background: var(--color-surface);
  border-right: var(--border);
  padding: 16px;
  display: flex; flex-direction: column; justify-content: space-between;
}
.nav { display: flex; flex-direction: column; gap: 6px; }
.nav-link {
  padding: 10px 12px;
  color: var(--color-secondary);
  border-radius: 10px;
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease;
}
.nav-link:hover { background: rgba(79,142,247,0.08); color: var(--color-primary); }
.nav-link.active { background: rgba(79,142,247,0.12); color: var(--color-primary); font-weight: 600; }

.sidebar-footer { color: var(--color-muted); font-size: 12px; }

.content {
  padding: 18px;
  overflow: auto;
}
.card {
  background: var(--color-surface);
  border: var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  height: 38px; padding: 0 14px; border-radius: 10px; border: none; cursor: pointer; font-weight: 600;
}
.btn-primary { background: var(--color-primary); color: #fff; }
.btn-accent { background: var(--color-accent); color: #000; }
.btn-danger { background: #ef4444; color: #fff; }
.btn-ghost { background: transparent; color: var(--color-secondary); border: var(--border); }
.btn + .btn { margin-left: 8px; }
.input, .textarea {
  width: 100%; border: var(--border); border-radius: 10px; padding: 10px 12px; outline: none; background: #fff;
}
.input:focus, .textarea:focus { border-color: var(--color-primary); box-shadow: 0 0 0 4px rgba(79,142,247,0.12); }
.textarea { min-height: 160px; resize: vertical; }
.helper { color: var(--color-muted); font-size: 12px; }
.empty { color: var(--color-muted); text-align: center; padding: 40px 0; }
.list { display: grid; gap: 12px; }
.note-item { padding: 12px; border-radius: 12px; border: var(--border); background: #fff; display: grid; gap: 8px; transition: box-shadow 0.2s ease, transform 0.02s ease; }
.note-item:hover { box-shadow: var(--shadow); transform: translateY(-1px); }
.note-title { font-weight: 700; color: var(--color-secondary); }
.note-meta { display: flex; gap: 10px; color: var(--color-muted); font-size: 12px; }
.kbd { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono","Courier New", monospace; background: var(--color-bg); border: var(--border); border-bottom-width: 2px; padding: 2px 6px; border-radius: 6px; }
</style>
