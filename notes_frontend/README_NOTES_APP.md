# Notes Frontend (Nuxt 3)

A minimal, modern Notes app built with Nuxt 3.

Features:
- Light theme with primary #4F8EF7, secondary #2D3748, accent #F7B801
- Sidebar navigation, header with global search and user chip
- CRUD notes (localStorage by default)
- List view, detail view, edit view
- Search and filter across title/content/tags
- Ready to connect to a backend API

Quick start:
1) Install dependencies
   npm install
2) Run dev server
   npm run dev

Environment:
- NOTES_API_BASE: Set to switch from local storage to backend.
  The app exposes useApi() composable using public.runtimeConfig.apiBase.

Project structure highlights:
- app.vue: Global shell layout, header, sidebar, theme variables
- pages/
  - index.vue: Notes list with search/filter
  - notes/new.vue: Create note
  - notes/[id]/index.vue: Note detail
  - notes/[id]/edit.vue: Edit note
- composables/
  - useNotes.ts: Local storage-backed notes with a clear API (list/get/create/update/remove)
  - useNotesSearch.ts: Global search state
  - useApi.ts: Fetch wrapper for backend integration
  - useAuth.ts: Placeholder auth composable

To integrate with a backend:
- Configure NOTES_API_BASE in environment.
- Replace calls in useNotes.ts to use useApi().apiFetch() for list/get/create/update/remove.
- Keep function signatures the same for seamless component reuse.
