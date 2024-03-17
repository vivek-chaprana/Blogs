const publicKey = process.env.NEXT_PUBLIC_PUSH_NOTIFICATION_PUBLIC_KEY;

const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
};

async function saveSubscription(subscription) {
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscription)
    }
    const res = await fetch('/api/notifications/subscription', fetchOptions)
    return await res.json()
}

async function getNotificationDetails(notificationId) {
    const res = await fetch(`/api/notifications/${notificationId}`);
    return await res.json();
}

async function markNotificationAsSeen(notificationId) {
    const res = await fetch(`/api/notifications/${notificationId}/seen`);
    return await res.json();
}

self.addEventListener('activate', async () => {
    try {
        const subscription = await self.registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicKey)
        })
        await saveSubscription(subscription)
    } catch (err) {
        console.error(err)
    }
});

self.addEventListener('push', async (event) => {
    const notificaitonId = event.data.text();
    const notificationDetails = await getNotificationDetails(notificaitonId);
    self.registration.showNotification(notificationDetails.data.title || "New Notification", {
        body: notificationDetails.data.message,
        icon: notificationDetails.data.icon,
        image: notificationDetails.data.image,
        data: {
            id: notificationDetails.data.id,
            userId: notificationDetails.data.userId,
            url: notificationDetails.data.link,
        },
        badge: '/badge.png',
        actions: [
            {
                action: "open",
                title: "View",
            },
            {
                action: "seen",
                title: "Mark as seen",
            },
            {
                action: "close",
                title: "Close",
            }
        ]

    })
})

self.addEventListener('notificationclick', async (event) => {
    const notification = event.notification.data;
    const action = event.action;
    const url = process.env.NEXT_PUBLIC_WEBAPP_URL + notification.url;

    if (action === 'seen') {
        await markNotificationAsSeen(notification.id)
        event.notification.close()
    }

    else if (action === 'close') event.notification.close()

    else event.waitUntil(new Promise(async (resolve, reject) => {
        try {
            self.clients.matchAll().then((clientList) => {
                const client = clientList.find(function (client) {
                    return client.visibilityState === 'visible';
                });
                if (!client) {
                    self.clients.openWindow(url)
                    return resolve()
                }
                client.navigate(url).then(() => client.focus())
                resolve()
            })
        } catch (err) {
            console.error('Failed to open URL:', err);
            reject(err)
        }
    }))

})


/**
 * How it works ?
 * 
 * 1. Request permission in client side.
 * 
 * 2. After service worker is activated, subscribe to pushManager.
 *      2.1 Public key inside subscribe method for chrome. (Not required for firefox)
 * 
 * 3. Send subscription object to server & save it.
 * 
 * 4. Send push notification from server.
 *     4.1. Make an API call to the push service, using the subscription object.
 *     4.2  Pass private key inside the header.
 * 
 * 5. Once push manager authorize the push, it add the message to the queue & it gets delivered to the client.
 *     5.1 Service worker's push event listener gets triggered.
 */