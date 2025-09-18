import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

const AddFarmer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    mobileNumber: '',
    emailAddress: '',
    dateOfBirth: '',
    gender: '',
    fatherName: '',
    education: '',

    // KYC Documents
    aadharCard: '',

    // Address Information
    completeAddress: '',
    village: '',
    mandal: '',
    district: '',
    state: '',
    pinCode: '',

    // Farm Information
    landOwnership: '',
    totalLand: '',
    irrigatedLand: '',
    cropTypes: '',
    
    // Livestock Details
    livestockCount: '',
    cattle: '',
    poultry: '',
    smallAnimals: '',
    
    // Family Details
    totalAdults: '',
    totalChildren: '',
    workingMembers: '',

    // Farm Machinery
    tractor: '',
    harvester: '',
    truck: '',
    plough: '',
    sprayer: '',

    // Bank Details
    bankName: '',
    accountNumber: '',
    ifscCode: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new farmer object with the form data, matching the JSON structure
    const newFarmer = {
      id: Math.floor(Math.random() * 1000) + 100,
      name: formData.fullName,
      memberId: `MEM-F-2024-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      status: 'Active',
      registeredDate: new Date().toISOString().split('T')[0],
      kycStatus: 'Pending',
      state: formData.state,
      district: formData.district,
      mandal: formData.mandal,
      landSize: formData.totalLand ? `${formData.totalLand} acres` : '',
      profileImage: "https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=150",
      
      basicDetails: {
        fullName: formData.fullName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        mobileNumber: formData.mobileNumber,
        emailAddress: formData.emailAddress,
        fatherName: formData.fatherName,
        education: formData.education
      },
      kycDocuments: {
        aadharCard: formData.aadharCard
      },
      addressInfo: {
        completeAddress: formData.completeAddress,
        village: formData.village,
        mandal: formData.mandal,
        district: formData.district,
        state: formData.state,
        pinCode: formData.pinCode
      },
      landDetails: [
        {
          landName: "Main Farm Land",
          landDetails: formData.landOwnership,
          ownLand: formData.landOwnership === 'Owned' ? `${formData.totalLand} Acres` : '',
          leasedLand: formData.landOwnership === 'Leased' ? `${formData.totalLand} Acres` : '',
        }
      ],
      cropDetails: {
        landName: "Main Farm Land",
        landArea: formData.totalLand ? `${formData.totalLand} acres` : '',
        cropSown: formData.cropTypes,
      },
      livestockDetails: {
        totalLivestock: formData.livestockCount,
        cattle: formData.cattle,
        poultry: formData.poultry,
        smallAnimals: formData.smallAnimals,
        detailedBreakdown: [
          { category: "Cattle", items: [{ name: "Cows", count: formData.cattle || 0 }] },
          { category: "Poultry", items: [{ name: "Chickens", count: formData.poultry || 0 }] },
          { category: "Small Animals", items: [{ name: "Goats", count: formData.smallAnimals || 0 }] }
        ]
      },
      quickStats: {
        totalLand: formData.totalLand ? `${formData.totalLand} acres` : '',
        familyMembers: parseInt(formData.totalAdults || 0) + parseInt(formData.totalChildren || 0),
        livestock: formData.livestockCount,
      },
      familyDetails: {
        totalAdults: formData.totalAdults,
        totalChildren: formData.totalChildren,
        workingMembers: formData.workingMembers
      },
      farmMachineryDetails: {
        tractor: formData.tractor,
        harvester: formData.harvester,
        truck: formData.truck,
        plough: formData.plough,
        sprayer: formData.sprayer
      },
      bankDetails: {
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        ifscCode: formData.ifscCode
      }
    };

    console.log('Adding new farmer:', newFarmer);
    
    // In a real app, you would send this to an API
    // api.post('/farmers', newFarmer).then(() => navigate('/farmers'));
    
    navigate('/farmers');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="space-y-6 p-6 md:p-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/farmers')}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg border border-gray-300"
          >
            <X size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Farmer</h1>
            <p className="text-gray-600">Add a new farmer to the system with complete details</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Father's Name</label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Card</label>
                <input
                  type="text"
                  name="aadharCard"
                  value={formData.aadharCard}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <hr className="border-t border-gray-200" />

          {/* Address Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Complete Address</label>
                <textarea
                  name="completeAddress"
                  value={formData.completeAddress}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Village</label>
                <input
                  type="text"
                  name="village"
                  value={formData.village}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mandal</label>
                <input
                  type="text"
                  name="mandal"
                  value={formData.mandal}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code</label>
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <hr className="border-t border-gray-200" />

          {/* Farm Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Farm & Livestock Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Land Ownership</label>
                <select
                  name="landOwnership"
                  value={formData.landOwnership}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Ownership</option>
                  <option value="Owned">Owned</option>
                  <option value="Leased">Leased</option>
                  <option value="Shared">Shared</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Land (acres)</label>
                <input
                  type="number"
                  name="totalLand"
                  value={formData.totalLand}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Irrigated Land (acres)</label>
                <input
                  type="number"
                  name="irrigatedLand"
                  value={formData.irrigatedLand}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Crop Types</label>
                <input
                  type="text"
                  name="cropTypes"
                  value={formData.cropTypes}
                  onChange={handleChange}
                  placeholder="Rice, Wheat, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Livestock Count</label>
                <input
                  type="number"
                  name="livestockCount"
                  value={formData.livestockCount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cattle Count</label>
                <input
                  type="number"
                  name="cattle"
                  value={formData.cattle}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Poultry Count</label>
                <input
                  type="number"
                  name="poultry"
                  value={formData.poultry}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Small Animals Count</label>
                <input
                  type="number"
                  name="smallAnimals"
                  value={formData.smallAnimals}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          
          <hr className="border-t border-gray-200" />

          {/* Family & Machinery Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Family & Machinery Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Adults</label>
                <input
                  type="number"
                  name="totalAdults"
                  value={formData.totalAdults}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Children</label>
                <input
                  type="number"
                  name="totalChildren"
                  value={formData.totalChildren}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Working Members</label>
                <input
                  type="number"
                  name="workingMembers"
                  value={formData.workingMembers}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Farm Machinery (Enter count for each)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Tractor</span>
                    <input type="number" name="tractor" value={formData.tractor} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Harvester</span>
                    <input type="number" name="harvester" value={formData.harvester} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Truck</span>
                    <input type="number" name="truck" value={formData.truck} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Plough</span>
                    <input type="number" name="plough" value={formData.plough} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Sprayer</span>
                    <input type="number" name="sprayer" value={formData.sprayer} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-t border-gray-200" />

          {/* Bank Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Bank Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
                <input
                  type="text"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate('/farmers')}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Farmer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFarmer;