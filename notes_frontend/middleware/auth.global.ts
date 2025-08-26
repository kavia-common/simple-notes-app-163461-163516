export default defineNuxtRouteMiddleware((_to, _from) => {
  /**
   * Future hook for protecting routes when real authentication is added.
   * Currently a no-op to avoid blocking navigation.
   * Example usage (to enable later):
   *   const { user } = useAuth();
   *   if (!user.value && to.path !== '/login') return navigateTo('/login');
   */
  return;
});
