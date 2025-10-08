
import React, { useState } from 'react';
import { PowerliftingRecord, Region } from '../types';
import RecordForm from './RecordForm';
import WatcherManager from './WatcherManager';
import { EditIcon, TrashIcon, PlusIcon, TrophyIcon, BinocularsIcon } from './icons';

type AdminTab = 'records' | 'watchers';
type UrlData = Record<Region, { Male: string; Female: string }>;

interface AdminPortalProps {
  records: PowerliftingRecord[];
  onAddRecord: (record: Omit<PowerliftingRecord, 'id'>) => void;
  onUpdateRecord: (record: PowerliftingRecord) => void;
  onDeleteRecord: (id: number) => void;
  sourceUrls: UrlData;
  landingPageUrls: UrlData;
  onSourceUrlsChange: (urls: UrlData) => void;
  onLandingPageUrlsChange: (urls: UrlData) => void;
}

const AdminPortal: React.FC<AdminPortalProps> = (props) => {
  const { 
    records, onAddRecord, onUpdateRecord, onDeleteRecord, 
    sourceUrls, landingPageUrls, onSourceUrlsChange, onLandingPageUrlsChange 
  } = props;
  
  const [editingRecord, setEditingRecord] = useState<PowerliftingRecord | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('records');

  const handleSave = (record: Omit<PowerliftingRecord, 'id'> | PowerliftingRecord) => {
    if ('id' in record) {
      onUpdateRecord(record);
    } else {
      onAddRecord(record);
    }
    setEditingRecord(null);
    setIsAdding(false);
  };
  
  const handleCancel = () => {
    setEditingRecord(null);
    setIsAdding(false);
  };

  const TabButton: React.FC<{tab: AdminTab, label: string, icon: React.ReactNode}> = ({ tab, label, icon }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
        activeTab === tab 
          ? 'bg-yellow-500 text-gray-900' 
          : 'text-gray-300 hover:bg-gray-700'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center bg-gray-800 p-1 rounded-lg space-x-2">
            <TabButton tab="records" label="Manage Records" icon={<TrophyIcon className="h-5 w-5 mr-2" />} />
            <TabButton tab="watchers" label="Watcher Configuration" icon={<BinocularsIcon className="h-5 w-5 mr-2" />} />
        </div>
        {activeTab === 'records' && (
            <button
                onClick={() => { setIsAdding(true); setEditingRecord(null); }}
                className="flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-green-500 transition-colors duration-200"
            >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add New Record
            </button>
        )}
      </div>

      {activeTab === 'records' && (
        <>
        {(isAdding && !editingRecord) && (
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl mb-6">
                <h3 className="text-xl font-semibold mb-4 text-white">New Record Entry</h3>
                <RecordForm onSubmit={handleSave} onCancel={handleCancel} />
            </div>
        )}

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">Lifter</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">Lift & Record</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">Details</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-yellow-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {records.map((record) => (
                <React.Fragment key={record.id}>
                  {editingRecord?.id === record.id ? (
                     <tr>
                        <td colSpan={4} className="p-0">
                            <div className="bg-gray-700 p-6">
                                <h3 className="text-xl font-semibold mb-4 text-white">Editing: {record.lifterName}</h3>
                                <RecordForm 
                                    initialData={record} 
                                    onSubmit={handleSave} 
                                    onCancel={handleCancel}
                                />
                            </div>
                        </td>
                     </tr>
                  ) : (
                    <tr className="hover:bg-gray-700/50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{record.lifterName}</div>
                        <div className="text-sm text-gray-400">{record.region}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{record.liftType}</div>
                        <div className="text-sm font-bold text-yellow-400">{record.weightKg} kg</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                         {`${record.gender.slice(0,1)} / ${record.ageCategory} / ${record.bodyweightCategory}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => {setEditingRecord(record); setIsAdding(false);}} className="text-blue-400 hover:text-blue-300 p-2">
                          <EditIcon className="h-5 w-5" />
                        </button>
                        <button onClick={() => onDeleteRecord(record.id)} className="text-red-500 hover:text-red-400 p-2 ml-2">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </>
      )}

      {activeTab === 'watchers' && (
        <WatcherManager
            sourceUrls={sourceUrls}
            landingPageUrls={landingPageUrls}
            onSourceUrlsChange={onSourceUrlsChange}
            onLandingPageUrlsChange={onLandingPageUrlsChange}
        />
      )}
    </div>
  );
};

export default AdminPortal;
