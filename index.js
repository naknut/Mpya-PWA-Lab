const allowButton = document.getElementById("allow")
const notificationButton = document.getElementById("notification")

navigator.serviceWorker.register("sw.js");

function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

allowButton.addEventListener("click", () => {
    Notification.requestPermission().then((result) => {
        if (result === 'granted') {
            subscribe()
        }
    })
})

notificationButton.addEventListener("click", () => {
    new Notification("Hello Button!")
})

function subscribe() {
    navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
        const options = {
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
                'BOyC7S-BPewjOSXu57CY0xgZg6AnD9h49kZQevbOyxp06mO2HcfEamu91ga50ztTX4scs9bTKprfzxA2UNQSONQ',
            ),
        }
        serviceWorkerRegistration.pushManager.subscribe(options).then(
            (pushSubscription) => {
                console.log(JSON.stringify(pushSubscription));
            },
            (error) => {
                console.error(error);
            },
        )
    })
}