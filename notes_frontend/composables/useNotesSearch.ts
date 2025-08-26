const GLOBAL_SEARCH_KEY = 'notes_global_search';

// PUBLIC_INTERFACE
export function useNotesSearch() {
  /** Global search query state. */
  const query = useState<string>(GLOBAL_SEARCH_KEY, () => '');

  // PUBLIC_INTERFACE
  function setGlobalSearch(q: string) {
    query.value = q ?? '';
  }

  return { query, setGlobalSearch };
}
