const allowButton = document.getElementById("allow")
const notificationButton = document.getElementById("notification")

navigator.serviceWorker.register("sw.js");

allowButton.addEventListener("click", () => {
    Notification.requestPermission().then((result) => {
        console.log(result)
    })
})

notificationButton.addEventListener("click", () => {
    new Notification("Hello Button!")
})