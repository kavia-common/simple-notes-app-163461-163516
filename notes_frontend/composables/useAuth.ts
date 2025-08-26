type User = {
  id: string;
  email: string;
  name?: string;
};

// PUBLIC_INTERFACE
export function useAuth() {
  const user = useState<User | null>('auth_user', () => null);

  // PUBLIC_INTERFACE
  function signInAnonymously() {
    user.value = { id: 'guest', email: 'guest@example.com', name: 'Guest' };
  }

  // PUBLIC_INTERFACE
  function signOut() {
    user.value = null;
  }

  return { user, signInAnonymously, signOut };
}
