import React from 'react';
import { Phone } from 'lucide-react';
import { FarmerPrimaryDetails } from '../farmerprofile';
import { CustomSelect, SelectOption, CustomInput, Card, DisplayField, CustomLabel } from '../../ui';

interface PersonalInfoProps {
  farmerPrimary: FarmerPrimaryDetails | null;
  isEditMode: boolean;
  formData: any;
  setFormData: (data: any) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ farmerPrimary, isEditMode, formData, setFormData }) => {
  // Education options
  const educationOptions: SelectOption[] = [
    { value: "illiterate", label: "Illiterate" },
    { value: "primary", label: "Primary" },
    { value: "middle-school", label: "Middle School" },
    { value: "high-school", label: "High School" },
    { value: "12th-pass", label: "12th Pass" },
    { value: "graduate", label: "Graduate" },
    { value: "post-graduate", label: "Post Graduate" },
    { value: "other", label: "Other" }
  ];

  // Gender options
  const genderOptions: SelectOption[] = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" }
  ];
  
  return (
    <Card 
      title="Personal Information & KYC Documents" 
      icon={<Phone size={22} />}
      className='h-[580px]'
    >

      {/* Basic Details */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-700 mb-4">Basic Details</h4>
        <div className="space-y-4">
          {/* Name, DOB, Gender, Education in single row with consistent sizing */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-2">
            <div className="lg:col-span-4 min-w-0 space-y-2">
              <CustomLabel text="Full Name" required={true} />
              <div className="min-h-[68px]">
                {isEditMode ? (
                  <CustomInput
                    type="text"
                    value={formData.personal.name}
                    onChange={(value) => setFormData({ 
                      ...formData, 
                      personal: { ...formData.personal, name: value }
                    })}
                    placeholder="Enter full name"
                    required={true}
                  />
                ) : (
                  <DisplayField value={farmerPrimary?.personal.name || ''} />
                )}
              </div>
              <div className="h-4"></div>
            </div>
            <div className="lg:col-span-2 min-w-0 space-y-2">
              <CustomLabel text="Date of Birth" />
              <div className="min-h-[68px]">
                {isEditMode ? (
                  <CustomInput
                    type="date"
                    value={formData.personal.dateOfBirth}
                    onChange={(value) => setFormData({ 
                      ...formData, 
                      personal: { ...formData.personal, dateOfBirth: value }
                    })}
                    required={true}
                  />
                ) : (
                  <DisplayField value={farmerPrimary?.personal.dateOfBirth || ''} height="h-11" borderRadius="rounded-lg" />
                )}
              </div>
              <div className="h-4"></div>
            </div>
            <div className="lg:col-span-2 min-w-0 space-y-2">
              <CustomLabel text="Gender" />
              <div className="min-h-[68px]">
                {isEditMode ? (
                  <CustomSelect
                    value={formData.personal.gender}
                    onChange={(value) => setFormData({ 
                      ...formData, 
                      personal: { ...formData.personal, gender: value }
                    })}
                    options={genderOptions}
                    placeholder="Select Gender"
                    selectedOptionBgColor="bg-gray-50"
                    selectedOptionTextColor="text-black-700"
                  />
                ) : (
                  <DisplayField value={farmerPrimary?.personal.gender || ''} height="h-11" borderRadius="rounded-lg" />
                )}
              </div>
              <div className="h-4"></div>
            </div>
            <div className="lg:col-span-4 min-w-0 space-y-2">
              <CustomLabel text="Education" />
              <div className="min-h-[68px]">
                {isEditMode ? (
                  <CustomSelect
                    value={formData.personal.education}
                    onChange={(value) => setFormData({ 
                      ...formData, 
                      personal: { ...formData.personal, education: value }
                    })}
                    options={educationOptions}
                    placeholder="Select Education"
                    selectedOptionBgColor="bg-gray-50"
                    selectedOptionTextColor="text-black-700"
                  />
                ) : (
                  <DisplayField value={farmerPrimary?.personal.education || ''} height="h-11" borderRadius="rounded-lg" />
                )}
              </div>
              <div className="h-4"></div>
            </div>
          </div>

          {/* Mobile, Alternate Mobile, Email, Father's Name in single row with optimized sizing */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-2">
            <div className="lg:col-span-2 min-w-0 space-y-2">
              <CustomLabel text="Mobile Number" required={true} />
              <div className="min-h-[68px]">
                {isEditMode ? (
                  <CustomInput
                    type="tel"
                    value={formData.personal.phoneNumber}
                    onChange={(value) => setFormData({ 
                      ...formData, 
                      personal: { ...formData.personal, phoneNumber: value }
                    })}
                    placeholder="Enter mobile number"
                    required={true}
                  />
                ) : (
                  <DisplayField value={farmerPrimary?.personal.phoneNumber || ''} height="h-11" borderRadius="rounded-lg" />
                )}
              </div>
              <div className="h-4"></div>
            </div>
            <div className="lg:col-span-2 min-w-0 space-y-2">
              <CustomLabel text="Alternate Mobile Number" />
              <div className="min-h-[68px]">
                {isEditMode ? (
                  <CustomInput
                    type="tel"
                    value={formData.personal.alternateMobile}
                    onChange={(value) => setFormData({ 
                      ...formData, 
                      personal: { ...formData.personal, alternateMobile: value }
                    })}
                    placeholder="Enter alternate mobile"
                  />
                ) : (
                  <DisplayField value={farmerPrimary?.personal.alternateMobile || ''} height="h-11" borderRadius="rounded-lg" />
                )}
              </div>
              <div className="h-4"></div>
            </div>
            <div className="lg:col-span-4 min-w-0 space-y-2">
              <CustomLabel text="Email Address" />
              <div className="min-h-[68px]">
                {isEditMode ? (
                  <CustomInput
                    type="email"
                    value={formData.personal.email}
                    onChange={(value) => setFormData({ 
                      ...formData, 
                      personal: { ...formData.personal, email: value }
                    })}
                    placeholder="Enter email address"
                  />
                ) : (
                  <DisplayField value={farmerPrimary?.personal.email || ''} height="h-11" borderRadius="rounded-lg" />
                )}
              </div>
              <div className="h-4"></div>
            </div>
            <div className="lg:col-span-4 min-w-0 space-y-2">
              <CustomLabel text="Father's Name" />
              <div className="min-h-[68px]">
                {isEditMode ? (
                  <CustomInput
                    type="text"
                    value={formData.personal.fathersName}
                    onChange={(value) => setFormData({ 
                      ...formData, 
                      personal: { ...formData.personal, fathersName: value }
                    })}
                    placeholder="Enter father's name"
                  />
                ) : (
                  <DisplayField value={farmerPrimary?.personal.fathersName || ''} height="h-11" borderRadius="rounded-lg" />
                )}
              </div>
              <div className="h-4"></div>
            </div>
          </div>
        </div>
      </div>

      {/* KYC Documents */}
      <div>
        <h4 className="text-md font-medium text-gray-700 mb-4">KYC Documents</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="min-w-0 space-y-2">
            <CustomLabel text="Aadhar Card" />
            {isEditMode ? (
              <CustomInput
                type="text"
                value={formData.personal.kycDocument.aadhaarNumber}
                onChange={(value) => setFormData({ 
                  ...formData, 
                  personal: { 
                    ...formData.personal, 
                    kycDocument: { ...formData.personal.kycDocument, aadhaarNumber: value }
                  }
                })}
                placeholder="Enter Aadhar number"
              />
            ) : (
              <DisplayField value={farmerPrimary?.personal.kycDocument.aadhaarNumber || ''} />
            )}
            <div className="h-4"></div>
          </div>
          <div className="min-w-0 space-y-2">
            <CustomLabel text="Driving License" />
            {isEditMode ? (
              <CustomInput
                type="text"
                value={formData.personal.kycDocument.driverLicenseNumber}
                onChange={(value) => setFormData({ 
                  ...formData, 
                  personal: { 
                    ...formData.personal, 
                    kycDocument: { ...formData.personal.kycDocument, driverLicenseNumber: value }
                  }
                })}
                placeholder="Enter driving license"
              />
            ) : (
              <DisplayField value={farmerPrimary?.personal.kycDocument.driverLicenseNumber || ''} />
            )}
            <div className="h-4"></div>
          </div>
          <div className="min-w-0 space-y-2">
            <CustomLabel text="Voter ID" />
            {isEditMode ? (
              <CustomInput
                type="text"
                value={formData.personal.kycDocument.voterIdNumber}
                onChange={(value) => setFormData({ 
                  ...formData, 
                  personal: { 
                    ...formData.personal, 
                    kycDocument: { ...formData.personal.kycDocument, voterIdNumber: value }
                  }
                })}
                placeholder="Enter voter ID"
              />
            ) : (
              <DisplayField value={farmerPrimary?.personal.kycDocument.voterIdNumber || ''} />
            )}
            <div className="h-4"></div>
          </div>
          <div className="min-w-0 space-y-2">
            <CustomLabel text="Kisan Card" />
            {isEditMode ? (
              <CustomInput
                type="text"
                value={formData.personal.kycDocument.kisaanCardNumber}
                onChange={(value) => setFormData({ 
                  ...formData, 
                  personal: { 
                    ...formData.personal, 
                    kycDocument: { ...formData.personal.kycDocument, kisaanCardNumber: value }
                  }
                })}
                placeholder="Enter kisan card"
              />
            ) : (
              <DisplayField value={farmerPrimary?.personal.kycDocument.kisaanCardNumber || ''} />
            )}
            <div className="h-4"></div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PersonalInfo;
