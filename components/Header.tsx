import React, { useState, useRef, useEffect } from 'react';
import { ViewMode, Notification } from '../types';
import { BarbellIcon, UserCogIcon, BellIcon, LogOutIcon } from './icons';
import NotificationCenter from './NotificationCenter';

interface HeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  notifications: Notification[];
  onDismissNotification: (id: number) => void;
  isAdmin: boolean;
  onLogin: (password: string) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  viewMode, setViewMode, notifications, onDismissNotification, isAdmin, onLogin, onLogout 
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const isViewer = viewMode === ViewMode.Viewer;

  // Use refs for the click counter to avoid re-renders and make it more reliable
  const logoClicksRef = useRef(0);
  const clickTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup timer on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
      }
    };
  }, []);
  
  const handleLogoClick = () => {
    // Clear any existing timer
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }
    
    logoClicksRef.current += 1;

    if (logoClicksRef.current >= 5) {
      const password = prompt('Enter admin password:');
      if (password !== null) { // Handle cancel button on prompt
        onLogin(password);
      }
      logoClicksRef.current = 0; // Reset after attempt
    } else {
      // Set a timer to reset the click count if another click doesn't happen soon
      clickTimerRef.current = window.setTimeout(() => {
        logoClicksRef.current = 0;
      }, 1500); // 1.5 second window between clicks
    }
  };

  return (
    <header className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div 
            className={`flex items-center ${!isAdmin ? 'cursor-pointer' : 'cursor-default'}`}
            onClick={!isAdmin ? handleLogoClick : undefined}
          >
            <BarbellIcon className="h-8 w-8 text-yellow-400" />
            <h1 className="ml-3 text-2xl font-bold text-white tracking-wider">
              British Powerlifting Records Hub
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {isAdmin && (
              <>
                <div className="relative" ref={notificationRef}>
                  <button
                    onClick={() => setShowNotifications(prev => !prev)}
                    className="relative p-2 rounded-full text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-500"
                    aria-label="View notifications"
                  >
                    <BellIcon className="h-6 w-6" />
                    {notifications.length > 0 && (
                      <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center ring-2 ring-gray-800">
                        {notifications.length}
                      </span>
                    )}
                  </button>
                  {showNotifications && (
                    <NotificationCenter 
                      notifications={notifications}
                      onDismiss={onDismissNotification}
                    />
                  )}
                </div>
                <button
                  onClick={() => setViewMode(isViewer ? ViewMode.Admin : ViewMode.Viewer)}
                  className="flex items-center px-4 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-500 transition-colors duration-200"
                >
                  <UserCogIcon className="h-5 w-5 mr-2" />
                  <span>{isViewer ? 'Admin Portal' : 'Public Viewer'}</span>
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center px-4 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 transition-colors duration-200"
                  aria-label="Logout"
                >
                  <LogOutIcon className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
