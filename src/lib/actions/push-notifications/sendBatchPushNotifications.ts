import { sendPushNotification } from ".";

interface NotificationProps {
  id: string;
  userId: string;
}

type Props = NotificationProps[];

export default async function sendBatchPushNotifications(
  createdNotifications: Props
) {
  const batchSize = 50;
  const notificationBatches: Props[] = [];

  for (let i = 0; i < createdNotifications.length; i += batchSize) {
    notificationBatches.push(createdNotifications.slice(i, i + batchSize));
  }

  const sendBatch = async (batch: Props) => {
    const promises = batch.map(async (notification: NotificationProps) => {
      try {
        await sendPushNotification({
          userId: notification.userId,
          notificationId: notification.id,
        });
      } catch (error) {
        console.error(
          `Error sending push notification for ${notification.id}:`,
          error
        );
      }
    });

    await Promise.all(promises);
  };

  await Promise.all(notificationBatches.map(sendBatch));
}
