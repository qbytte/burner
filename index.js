// Load service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then((res) => {
      console.log("Service worker registered", res);
    })
    .catch((err) => {
      console.error("Service worker not registered", err);
    });
} else {
  console.error("Service worker not supported");
}


