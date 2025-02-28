import React from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  const notificationStyles = {
    success: { backgroundColor: 'green', color: 'white' },
    error: { backgroundColor: 'red', color: 'white' },
  };

  return (
    <div style={{ ...notificationStyles[type], padding: '10px', borderRadius: '5px', marginBottom: '10px'} as React.CSSProperties}>
      {message}
    </div>
  );
};

export default Notification;
