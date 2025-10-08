
import React, { useState, useMemo } from 'react';
import { PowerliftingRecord } from '../types';
import { REGIONS, AGE_CATEGORIES, MALE_BW_CATEGORIES, FEMALE_BW_CATEGORIES, LIFT_TYPES, GENDERS } from '../constants';
import { SearchIcon, TrophyIcon } from './icons';

interface RecordViewerProps {
  records: PowerliftingRecord[];
}

const RecordViewer: React.FC<RecordViewerProps> = ({ records }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [bwCategoryFilter, setBwCategoryFilter] = useState('');
  const [liftFilter, setLiftFilter] = useState('');

  const filteredRecords = useMemo(() => {
    return records.filter(record => {
      return (
        record.lifterName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (regionFilter === '' || record.region === regionFilter) &&
        (ageFilter === '' || record.ageCategory === ageFilter) &&
        (genderFilter === '' || record.gender === genderFilter) &&
        (bwCategoryFilter === '' || record.bodyweightCategory === bwCategoryFilter) &&
        (liftFilter === '' || record.liftType === liftFilter)
      );
    });
  }, [records, searchTerm, regionFilter, ageFilter, genderFilter, bwCategoryFilter, liftFilter]);
  
  const bodyweightCategories = genderFilter === 'Male' ? MALE_BW_CATEGORIES : (genderFilter === 'Female' ? FEMALE_BW_CATEGORIES : []);

  const resetFilters = () => {
      setSearchTerm('');
      setRegionFilter('');
      setAgeFilter('');
      setGenderFilter('');
      setBwCategoryFilter('');
      setLiftFilter('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">Find Records</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Lifter Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 border-2 border-gray-600 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)} className="bg-gray-700 border-2 border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <option value="">All Regions</option>
            {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <select value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)} className="bg-gray-700 border-2 border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <option value="">All Age Categories</option>
            {AGE_CATEGORIES.map(ac => <option key={ac} value={ac}>{ac}</option>)}
          </select>
          <select value={genderFilter} onChange={(e) => {setGenderFilter(e.target.value); setBwCategoryFilter('');}} className="bg-gray-700 border-2 border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <option value="">All Genders</option>
            {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          <select value={bwCategoryFilter} onChange={(e) => setBwCategoryFilter(e.target.value)} disabled={!genderFilter} className="bg-gray-700 border-2 border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed">
            <option value="">All Bodyweight Categories</option>
            {bodyweightCategories.map(bwc => <option key={bwc} value={bwc}>{bwc}</option>)}
          </select>
          <select value={liftFilter} onChange={(e) => setLiftFilter(e.target.value)} className="bg-gray-700 border-2 border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <option value="">All Lifts</option>
            {LIFT_TYPES.map(lt => <option key={lt} value={lt}>{lt}</option>)}
          </select>
           <div className="lg:col-span-3 flex justify-end">
            <button onClick={resetFilters} className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 transition-colors duration-200">
                Reset Filters
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700/50">
            <tr>
              {['Lifter', 'Region', 'Age Cat.', 'BW Cat.', 'Lift', 'Record (kg)', 'Date Set', 'Competition'].map(header => (
                <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredRecords.length > 0 ? filteredRecords.map((record) => (
              <tr key={record.id} className="hover:bg-gray-700/50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{record.lifterName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{record.region}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{record.ageCategory}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{`${record.gender.slice(0,1)} ${record.bodyweightCategory}`}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{record.liftType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-yellow-400">{record.weightKg}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{record.dateSet}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{record.competition}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={8} className="text-center py-10 px-6">
                    <TrophyIcon className="mx-auto h-12 w-12 text-gray-500"/>
                    <h3 className="mt-2 text-sm font-medium text-gray-300">No records found</h3>
                    <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecordViewer;
