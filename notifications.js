// notifications.js

document.addEventListener("DOMContentLoaded", function() {
  if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        // Check if it's the first time or if 2 days have passed
        scheduleNotification();
      }
    });
  }
});

function scheduleNotification() {
  const lastNotificationTime = localStorage.getItem('lastNotificationTime');
  const currentTime = Date.now();
  const twoDaysInMilliseconds = 2 * 24 * 60 * 60 * 1000; // 2 days

  // If no notification has ever been sent, send one immediately
  if (!lastNotificationTime) {
    sendNotification('Event Reminder', 'The event is near, be prepared!');
    localStorage.setItem('lastNotificationTime', currentTime);
  } 
  // If 2 days have passed since the last notification, send one
  else if (currentTime - lastNotificationTime > twoDaysInMilliseconds) {
    sendNotification('Event Reminder', 'The event is near, be prepared!');
    localStorage.setItem('lastNotificationTime', currentTime);
  }
}

function sendNotification(title, body) {
  new Notification(title, {
    body: body,
    icon: 'icon.png' // Optional icon for the notification
  });
}
