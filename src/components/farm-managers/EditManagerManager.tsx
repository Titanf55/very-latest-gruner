import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

const EditFarmManager = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    education: '',
    experience: '',
    address: '',
    village: '',
    mandal: '',
    district: '',
    state: '',
    pinCode: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    panNumber: '',
    aadharNumber: ''
  });

  // Mock data for editing - in real app, fetch from API
  useEffect(() => {
    const mockData = {
      name: 'Ravi Kumar',
      mobile: '+91 9876543220',
      email: 'ravi.kumar@gmail.com',
      dateOfBirth: '1985-06-15',
      gender: 'Male',
      education: '12th Pass',
      experience: '5',
      address: 'House No 123, Main Street',
      village: 'Rampur',
      mandal: 'Secunderabad',
      district: 'Hyderabad',
      state: 'Telangana',
      pinCode: '500001',
      bankName: 'State Bank of India',
      accountNumber: '1234567890',
      ifscCode: 'SBIN0000123',
      panNumber: 'ABCDE1234F',
      aadharNumber: '****-****-0012'
    };
    setFormData(mockData);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating Farm Manager:', formData);
    navigate('/farm-Managers');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="space-y-6" style={{ fontFamily: 'Roboto' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/farm-Managers')}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg border border-gray-300"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Roboto' }}>Edit Farm Manager</h1>
            <p className="text-gray-600" style={{ fontFamily: 'Roboto' }}>Update Farm Manager information</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4" style={{ fontFamily: 'Roboto' }}>Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto' }}>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                style={{ fontFamily: 'Roboto', fontSize: '13.02px' }}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto' }}>Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                style={{ fontFamily: 'Roboto', fontSize: '13.02px' }}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto' }}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                style={{ fontFamily: 'Roboto', fontSize: '13.02px' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto' }}>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                style={{ fontFamily: 'Roboto', fontSize: '13.02px' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto' }}>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                style={{ fontFamily: 'Roboto', fontSize: '13.02px' }}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto' }}>Education</label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                style={{ fontFamily: 'Roboto', fontSize: '13.02px' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto' }}>Experience (years)</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                style={{ fontFamily: 'Roboto', fontSize: '13.02px' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto' }}>Aadhar Number</label>
              <input
                type="text"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                style={{ fontFamily: 'Roboto', fontSize: '13.02px' }}
              />
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4" style={{ fontFamily: 'Roboto' }}>Address Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto' }}>Complete Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                style={{ fontFamily: 'Roboto', fontSize: '13.02px' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto' }}>Village</label>
              <input
                type="text"
                name="village"
                value={formData.village}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                style={{ fontFamily: 'Roboto', fontSize: '13.02px' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto' }}>Mandal</label>
              <input
                type="text"
                name="mandal"
                value={formData.mandal}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                style={{ fontFamily: 'Roboto', fontSize: '13.02px' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto' }}>District</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                style={{ fontFamily: 'Roboto', fontSize: '13.02px' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto' }}>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                style={{ fontFamily: 'Roboto', fontSize: '13.02px' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto' }}>PIN Code</label>
              <input
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                style={{ fontFamily: 'Roboto', fontSize: '13.02px' }}
              />
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4" style={{ fontFamily: 'Roboto' }}>Bank & Document Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto' }}>Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                style={{ fontFamily: 'Roboto', fontSize: '13.02px' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto' }}>Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                style={{ fontFamily: 'Roboto', fontSize: '13.02px' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto' }}>IFSC Code</label>
              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                style={{ fontFamily: 'Roboto', fontSize: '13.02px' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto' }}>PAN Number</label>
              <input
                type="text"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                style={{ fontFamily: 'Roboto', fontSize: '13.02px' }}
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/farm-Managers')}
            className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            style={{ fontFamily: 'Roboto', fontSize: '13.02px' }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            style={{ fontFamily: 'Roboto', fontSize: '13.02px', fontWeight: 600 }}
          >
            <Save size={18} />
            Update Farm Manager
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFarmManager;