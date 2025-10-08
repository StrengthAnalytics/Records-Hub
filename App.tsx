
import React, { useState } from 'react';
import { PowerliftingRecord, ViewMode, Notification } from './types';
import { MOCK_RECORDS, MOCK_NOTIFICATIONS, REGIONAL_SOURCE_URLS, REGIONAL_LANDING_PAGE_URLS } from './constants';
import Header from './components/Header';
import RecordViewer from './components/RecordViewer';
import AdminPortal from './components/AdminPortal';

// In a real application, this would be a secure authentication flow.
// For this prototype, we'll use a simple password check.
const ADMIN_PASSWORD = 'admin123';

function App() {
  const [records, setRecords] = useState<PowerliftingRecord[]>(MOCK_RECORDS);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Viewer);
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true');
  
  const [sourceUrls, setSourceUrls] = useState(REGIONAL_SOURCE_URLS);
  const [landingPageUrls, setLandingPageUrls] = useState(REGIONAL_LANDING_PAGE_URLS);

  const handleLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
      alert('Admin login successful!');
    } else {
      alert('Incorrect password.');
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    setViewMode(ViewMode.Viewer); // Force back to public view on logout
  };

  const addRecord = (newRecord: Omit<PowerliftingRecord, 'id'>) => {
    setRecords(prev => [...prev, { ...newRecord, id: Date.now() }]);
  };

  const updateRecord = (updatedRecord: PowerliftingRecord) => {
    setRecords(prev => prev.map(r => r.id === updatedRecord.id ? updatedRecord : r));
  };
  
  const deleteRecord = (id: number) => {
    setRecords(prev => prev.filter(r => r.id !== id));
  };

  const dismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
        notifications={notifications}
        onDismissNotification={dismissNotification}
        isAdmin={isAdmin}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      <main className="p-4 sm:p-6 lg:p-8">
        {viewMode === ViewMode.Viewer || !isAdmin ? (
          <RecordViewer records={records} />
        ) : (
          <AdminPortal 
            records={records} 
            onAddRecord={addRecord}
            onUpdateRecord={updateRecord}
            onDeleteRecord={deleteRecord}
            sourceUrls={sourceUrls}
            landingPageUrls={landingPageUrls}
            onSourceUrlsChange={setSourceUrls}
            onLandingPageUrlsChange={setLandingPageUrls}
          />
        )}
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Powerlifting Records Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
