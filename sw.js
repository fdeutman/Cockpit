// Cockpit Service Worker — handles notifications when app is in background
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      // If app is already open in a tab/window, focus it
      for (const client of clientList) {
        if ("focus" in client) return client.focus();
      }
      // Otherwise open the app
      if (self.clients.openWindow) {
        return self.clients.openWindow("/cockpit/");
      }
    })
  );
});
