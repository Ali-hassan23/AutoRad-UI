/* Service worker cleanup.
 * This app does not use a PWA, so this file exists only to stop 404 requests
 * from any old browser registrations and then unregister them.
 */

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    self.registration.unregister()
  );
});
