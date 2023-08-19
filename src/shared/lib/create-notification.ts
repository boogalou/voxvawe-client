
export const createNotification = async (notificationOptions: NotificationOptions) => {

  const fn = () => {
    if (document.hidden && Notification.permission === "granted") {
      return new Notification("", notificationOptions);
    } else if (Notification.permission === "denied") {
      console.log("Уведомления запрещены");
    }
  };

  document.addEventListener('visibilitychange', fn);

}