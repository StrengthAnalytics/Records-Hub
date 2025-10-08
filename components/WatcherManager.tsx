
import React, { useState } from 'react';
import { Region } from '../types';
import { REGIONS } from '../constants';

type UrlData = Record<Region, { Male: string; Female: string }>;

interface WatcherManagerProps {
  sourceUrls: UrlData;
  landingPageUrls: UrlData;
  onSourceUrlsChange: (urls: UrlData) => void;
  onLandingPageUrlsChange: (urls: UrlData) => void;
}

const WatcherManager: React.FC<WatcherManagerProps> = ({ 
    sourceUrls, landingPageUrls, onSourceUrlsChange, onLandingPageUrlsChange 
}) => {
  const [currentSourceUrls, setCurrentSourceUrls] = useState(sourceUrls);
  const [currentLandingPageUrls, setCurrentLandingPageUrls] = useState(landingPageUrls);

  const handleSourceChange = (region: Region, gender: 'Male' | 'Female', value: string) => {
    setCurrentSourceUrls(prev => ({
      ...prev,
      [region]: { ...prev[region], [gender]: value }
    }));
  };

  const handleLandingPageChange = (region: Region, gender: 'Male' | 'Female', value: string) => {
    setCurrentLandingPageUrls(prev => ({
      ...prev,
      [region]: { ...prev[region], [gender]: value }
    }));
  };
  
  const handleSaveChanges = () => {
    onSourceUrlsChange(currentSourceUrls);
    onLandingPageUrlsChange(currentLandingPageUrls);
    // In a real app, you might show a success toast here
    alert('Changes saved!');
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-yellow-400">Watcher Configuration</h2>
        <p className="text-gray-400 mt-1">
          Configure the source URLs for the record watcher service. Use 'Direct URL' for stable links (like Google Sheets) or 'Landing Page' to monitor a page for new file links.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">Region</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">Men's Records Source</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">Women's Records Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {REGIONS.map((region) => (
              <tr key={region}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{region}</td>
                <td className="px-6 py-4 space-y-2">
                  <UrlInput 
                    label="Direct File URL"
                    value={currentSourceUrls[region].Male}
                    onChange={(e) => handleSourceChange(region, 'Male', e.target.value)}
                    placeholder="https://.../records.pdf"
                  />
                  <UrlInput 
                    label="Landing Page URL"
                    value={currentLandingPageUrls[region].Male}
                    onChange={(e) => handleLandingPageChange(region, 'Male', e.target.value)}
                    placeholder="https://.../records-page/"
                  />
                </td>
                <td className="px-6 py-4 space-y-2">
                   <UrlInput 
                    label="Direct File URL"
                    value={currentSourceUrls[region].Female}
                    onChange={(e) => handleSourceChange(region, 'Female', e.target.value)}
                    placeholder="https://.../records.pdf"
                  />
                  <UrlInput 
                    label="Landing Page URL"
                    value={currentLandingPageUrls[region].Female}
                    onChange={(e) => handleLandingPageChange(region, 'Female', e.target.value)}
                    placeholder="https://.../records-page/"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-6 bg-gray-800 border-t border-gray-700 flex justify-end">
        <button
          onClick={handleSaveChanges}
          className="px-6 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-500 transition-colors duration-200"
        >
          Save All Changes
        </button>
      </div>
    </div>
  );
};

const UrlInput: React.FC<{label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string }> = 
({ label, value, onChange, placeholder }) => (
    <div>
        <label className="block text-xs font-medium text-gray-400 mb-1">{label}</label>
        <input 
            type="url"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-gray-700 border-2 border-gray-600 rounded-md py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        />
    </div>
);


export default WatcherManager;
