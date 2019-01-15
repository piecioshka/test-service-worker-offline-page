const SERVICE_WORKER_URL = 'service-worker.js';

async function bootstrap() {
    await navigator.serviceWorker.register(SERVICE_WORKER_URL)
    console.log('Service Worker registered');
}

bootstrap().catch((err) => console.error(err));
