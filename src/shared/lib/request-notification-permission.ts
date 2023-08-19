export async function requestNotificationPermission() {
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
      return;
    }
    const permission = await Notification.requestPermission();
    if (permission === 'denied') {
      console.log('Notification denied');
    }
  }
}

