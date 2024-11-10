// notifications.js

document.addEventListener("DOMContentLoaded", function() {
  if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        // Check if it’s the first time, or if 2 days have passed
        scheduleNotification(true); // `true` indicates initial load
      }
    });
  }
});

function scheduleNotification(isInitialLoad = false) {
  const lastNotificationTime = localStorage.getItem('lastNotificationTime');
  const currentTime = Date.now();
  const twoDaysInMilliseconds = 2 * 24 * 60 * 60 * 1000; // 2 days

  // Check if 2 days have passed or if this is the first notification
  if (isInitialLoad && !lastNotificationTime) {
    // First-time notification
    sendNotification('Event Reminder', 'The event is near, be prepared!');
    localStorage.setItem('lastNotificationTime', currentTime);
  } else if (!lastNotificationTime || currentTime - lastNotificationTime > twoDaysInMilliseconds) {
    // Scheduled notification (every 2 days)
    sendNotification('Event Reminder', 'The event is near, be prepared!');
    localStorage.setItem('lastNotificationTime', currentTime);
  }
}

function sendNotification(title, body) {
  new Notification(title, {
    body: body,
    icon: 'icon.png' // Optional icon
  });
}
