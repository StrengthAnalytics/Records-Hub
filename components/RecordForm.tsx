import React, { useState, useEffect } from 'react';
import { PowerliftingRecord, Region, AgeCategory, LiftType } from '../types';
import { REGIONS, AGE_CATEGORIES, LIFT_TYPES, MALE_BW_CATEGORIES, FEMALE_BW_CATEGORIES, GENDERS } from '../constants';

interface RecordFormProps {
  initialData?: PowerliftingRecord;
  onSubmit: (record: Omit<PowerliftingRecord, 'id'> | PowerliftingRecord) => void;
  onCancel: () => void;
}

const emptyRecord: Omit<PowerliftingRecord, 'id'> = {
  lifterName: '',
  region: Region.GreaterLondon,
  ageCategory: AgeCategory.Open,
  bodyweightCategory: '',
  gender: 'Male',
  liftType: LiftType.Squat,
  weightKg: 0,
  dateSet: new Date().toISOString().split('T')[0],
  competition: '',
};

const RecordForm: React.FC<RecordFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialData || emptyRecord);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };
    
    if (name === 'gender') {
        newFormData.bodyweightCategory = ''; // Reset bodyweight category when gender changes
    }
    
    setFormData(newFormData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.bodyweightCategory) {
        alert("Please select a bodyweight category.");
        return;
    }
    onSubmit(formData);
  };

  const bodyweightCategories = formData.gender === 'Male' ? MALE_BW_CATEGORIES : FEMALE_BW_CATEGORIES;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Lifter Name</label>
          <input type="text" name="lifterName" value={formData.lifterName} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Competition</label>
          <input type="text" name="competition" value={formData.competition} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500">
            {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Region</label>
          <select name="region" value={formData.region} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500">
            {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Age Category</label>
          <select name="ageCategory" value={formData.ageCategory} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500">
            {AGE_CATEGORIES.map(ac => <option key={ac} value={ac}>{ac}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Bodyweight Category</label>
          <select name="bodyweightCategory" value={formData.bodyweightCategory} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500">
            <option value="" disabled>Select a category</option>
            {bodyweightCategories.map(bwc => <option key={bwc} value={bwc}>{bwc}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Lift Type</label>
          <select name="liftType" value={formData.liftType} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500">
            {LIFT_TYPES.map(lt => <option key={lt} value={lt}>{lt}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Weight (kg)</label>
          <input type="number" step="0.5" name="weightKg" value={formData.weightKg} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Date Set</label>
          <input type="date" name="dateSet" value={formData.dateSet} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500" />
        </div>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-500">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-md hover:bg-yellow-400">Save Record</button>
      </div>
    </form>
  );
};

export default RecordForm;
