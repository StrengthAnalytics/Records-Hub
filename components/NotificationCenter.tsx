import React from 'react';
import { Notification } from '../types';
import { ExternalLinkIcon, CheckCircleIcon, SheetIcon } from './icons';

interface NotificationCenterProps {
  notifications: Notification[];
  onDismiss: (id: number) => void;
}

const SourceTypeIcon: React.FC<{type: Notification['sourceType']}> = ({ type }) => {
    if (type === 'Google Sheet') {
        return <SheetIcon className="h-4 w-4 mr-1 text-green-400" />;
    }
    // Default to PDF icon or a generic document icon if more types are added
    return <ExternalLinkIcon className="h-4 w-4 mr-1" />;
};


const NotificationCenter: React.FC<NotificationCenterProps> = ({ notifications, onDismiss }) => {
  return (
    <div className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
      <div className="p-3 border-b border-gray-700">
        <h3 className="font-semibold text-white">Notifications</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          <ul className="divide-y divide-gray-700">
            {notifications.map(notification => (
              <li key={notification.id} className="p-3 hover:bg-gray-700/50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-300">
                      <span className="font-bold text-yellow-400">{notification.region} ({notification.gender}'s)</span> records {notification.sourceType} was updated.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
                  </div>
                  <button 
                    onClick={() => onDismiss(notification.id)}
                    className="text-xs text-gray-400 hover:text-white ml-2 px-2 py-1 rounded hover:bg-gray-600"
                    title="Dismiss"
                  >
                    &times;
                  </button>
                </div>
                <a 
                  href={notification.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-2 text-sm text-blue-400 hover:text-blue-300"
                >
                  <SourceTypeIcon type={notification.sourceType} />
                  View {notification.sourceType}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center p-8">
            <CheckCircleIcon className="mx-auto h-12 w-12 text-green-500" />
            <h4 className="mt-2 font-medium text-gray-300">All caught up!</h4>
            <p className="mt-1 text-sm text-gray-500">No new notifications.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;