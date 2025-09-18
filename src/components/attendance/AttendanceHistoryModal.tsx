import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Card from '../ui/Card';
import { AttendanceRecord } from './types';
import { useAttendanceAPI } from './hooks/useAttendanceAPI';

interface AttendanceHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: AttendanceRecord | null;
  isEditMode?: boolean;
  onSave?: (updatedRecord: AttendanceRecord) => void;
}

const AttendanceHistoryModal: React.FC<AttendanceHistoryModalProps> = ({
  isOpen,
  onClose,
  record,
  isEditMode = false,
  onSave
}) => {
  const [editData, setEditData] = useState({
    checkIn: record?.checkIn || '',
    checkOut: record?.checkOut || '',
    status: record?.status || 'pending'
  });

  const [isEditing, setIsEditing] = useState(isEditMode);
  const [detailedRecord, setDetailedRecord] = useState<AttendanceRecord | null>(null);

  // Use the centralized API hook
  const { getAttendanceDetails, updateAttendance, loading, error } = useAttendanceAPI();

  // Fetch detailed attendance data when modal opens
  useEffect(() => {
    const fetchAttendanceDetailsData = async () => {
      if (!isOpen || !record?.id) return;
      
      const result = await getAttendanceDetails(record.id);
      
      if (result.success && result.data) {
        // Merge basic record data with detailed API response
        const detailedData: AttendanceRecord = {
          ...record,
          checkInTime: result.data.checkInTime,
          checkOutTime: result.data.checkOutTime,
          notes: result.data.notes,
          checkInLocation: result.data.checkInLocation,
          checkOutLocation: result.data.checkOutLocation,
          approvedAt: result.data.approvedAt,
          status: result.data.status,
          totalWorkingHours: result.data.totalWorkingHours,
          checkInImageUrl: result.data.checkInImageUrl,
          checkOutImageUrl: result.data.checkOutImageUrl,
          // Add formatted display fields
          checkIn: result.data.checkIn,
          checkOut: result.data.checkOut,
          workHours: result.data.workHours,
        };
        
        setDetailedRecord(detailedData);
      }
    };

    fetchAttendanceDetailsData();
  }, [isOpen, record?.id, getAttendanceDetails]);

  React.useEffect(() => {
    const currentRecord = detailedRecord || record;
    if (currentRecord) {
      setEditData({
        checkIn: currentRecord.checkIn,
        checkOut: currentRecord.checkOut,
        status: currentRecord.status
      });
    }
    setIsEditing(isEditMode);
  }, [detailedRecord, record, isEditMode]);

  if (!isOpen || !record) return null;

  // Use detailed record if available, fallback to basic record
  const displayRecord = detailedRecord || record;

  const handleSave = async () => {
    if (!record?.id) return;
    
    // Prepare update data
    const updateData = {
      status: editData.status as 'pending' | 'present' | 'absent',
      ...(editData.checkIn !== record.checkIn && {
        checkInTime: editData.checkIn
      }),
      ...(editData.checkOut !== record.checkOut && {
        checkOutTime: editData.checkOut
      })
    };

    const result = await updateAttendance(record.id, updateData);
    
    if (result.success && result.data) {
      // Update the detailed record with the response
      const updatedDetailedRecord: AttendanceRecord = {
        ...displayRecord,
        checkInTime: result.data.checkInTime,
        checkOutTime: result.data.checkOutTime,
        status: result.data.status,
        notes: result.data.notes,
        checkInLocation: result.data.checkInLocation,
        checkOutLocation: result.data.checkOutLocation,
        approvedAt: result.data.approvedAt,
        totalWorkingHours: result.data.totalWorkingHours,
        checkInImageUrl: result.data.checkInImageUrl,
        checkOutImageUrl: result.data.checkOutImageUrl,
        // Update display fields
        checkIn: result.data.checkIn,
        checkOut: result.data.checkOut,
        workHours: result.data.workHours,
      };
      
      setDetailedRecord(updatedDetailedRecord);
      
      // Call parent onSave callback if provided
      if (onSave) {
        onSave(updatedDetailedRecord);
      }
      
      setIsEditing(false);
    }
  };


  const handleCancel = () => {
    setEditData({
      checkIn: record.checkIn,
      checkOut: record.checkOut,
      status: record.status
    });
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[800px] max-h-[95vh] overflow-y-auto">
        <Card 
          title={`Attendance History (${displayRecord.checkInTime ? new Date(displayRecord.checkInTime).toLocaleDateString() : 'N/A'})`}
          className="relative w-full mx-auto"
        >
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-700 text-sm" style={{ fontFamily: 'Roboto' }}>
                {error}
              </p>
            </div>
          )}

          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="text-gray-500" style={{ fontFamily: 'Roboto' }}>
                Loading attendance details...
              </div>
            </div>
          )}

        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Roboto' }}>
                Task Title
              </label>
              <input
                type="text"
                value={displayRecord.taskTitle || 'Crop Health Inspection'}
                readOnly
                className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm ${
                  isEditing ? 'text-gray-600 bg-gray-100' : 'text-gray-600 bg-white'
                }`}
                style={{ fontFamily: 'Roboto' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Roboto' }}>
                Check-In Time
              </label>
              <input
                type="time"
                value={editData.checkIn}
                onChange={(e) => setEditData(prev => ({ ...prev, checkIn: e.target.value }))}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm ${
                  isEditing ? 'text-gray-900 bg-white' : 'text-gray-600 bg-white'
                }`}
                style={{ fontFamily: 'Roboto' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Roboto' }}>
                Working Hours
              </label>
              <input
                type="text"
                value={displayRecord.totalWorkingHours || displayRecord.workHours || '-'}
                readOnly
                className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm ${
                  isEditing ? 'text-gray-600 bg-gray-100' : 'text-gray-600 bg-white'
                }`}
                style={{ fontFamily: 'Roboto' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Roboto' }}>
                Check-In Location
              </label>
              <input
                type="text"
                value={displayRecord.checkInLocation || 'Location not available'}
                readOnly
                className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm ${
                  isEditing ? 'text-gray-600 bg-gray-100' : 'text-gray-600 bg-white'
                }`}
                style={{ fontFamily: 'Roboto' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Roboto' }}>
                Approved At
              </label>
              <input
                type="text"
                value={displayRecord.approvedAt ? new Date(displayRecord.approvedAt).toLocaleString() : 'Not approved yet'}
                readOnly
                className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm ${
                  isEditing ? 'text-gray-600 bg-gray-100' : 'text-gray-600 bg-white'
                }`}
                style={{ fontFamily: 'Roboto' }}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Roboto' }}>
                Task Description
              </label>
              <input
                type="text"
                value={displayRecord.taskDescription || 'Description of task Crop Health Inspection'}
                readOnly
                className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm ${
                  isEditing ? 'text-gray-600 bg-gray-100' : 'text-gray-600 bg-white'
                }`}
                style={{ fontFamily: 'Roboto' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Roboto' }}>
                Check-Out Time
              </label>
              <input
                type="time"
                value={editData.checkOut}
                onChange={(e) => setEditData(prev => ({ ...prev, checkOut: e.target.value }))}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm ${
                  isEditing ? 'text-gray-900 bg-white' : 'text-gray-600 bg-white'
                }`}
                style={{ fontFamily: 'Roboto' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Roboto' }}>
                Notes
              </label>
              <input
                type="text"
                value={displayRecord.notes || 'No notes available'}
                readOnly
                className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm ${
                  isEditing ? 'text-gray-600 bg-gray-100' : 'text-gray-600 bg-white'
                }`}
                style={{ fontFamily: 'Roboto' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Roboto' }}>
                Check-Out Location
              </label>
              <input
                type="text"
                value={displayRecord.checkOutLocation || 'Location not available'}
                readOnly
                className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm ${
                  isEditing ? 'text-gray-600 bg-gray-100' : 'text-gray-600 bg-white'
                }`}
                style={{ fontFamily: 'Roboto' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Roboto' }}>
                Status
              </label>
              <select
                value={editData.status}
                onChange={(e) => setEditData(prev => ({ ...prev, status: e.target.value as 'pending' | 'present' | 'absent' }))}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm ${
                  isEditing ? 'text-gray-900 bg-white' : 'text-gray-600 bg-white'
                }`}
                style={{ fontFamily: 'Roboto' }}
              >
                <option value="pending">Pending</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Image Placeholders */}
        <div className="flex gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto' }}>
              Check-In Image
            </label>
            <div className="w-32 h-32 border border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
              {displayRecord.checkInImageUrl ? (
                <img
                  src={displayRecord.checkInImageUrl}
                  alt="Check-In"
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                    if (nextElement) {
                      nextElement.style.display = 'block';
                    }
                  }}
                />
              ) : null}
              <span 
                className="text-gray-400 text-sm" 
                style={{ 
                  fontFamily: 'Roboto',
                  display: displayRecord.checkInImageUrl ? 'none' : 'block'
                }}
              >
                No Image
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto' }}>
              Check-Out Image
            </label>
            <div className="w-32 h-32 border border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
              {displayRecord.checkOutImageUrl ? (
                <img
                  src={displayRecord.checkOutImageUrl}
                  alt="Check-Out"
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                    if (nextElement) {
                      nextElement.style.display = 'block';
                    }
                  }}
                />
              ) : null}
              <span 
                className="text-gray-400 text-sm" 
                style={{ 
                  fontFamily: 'Roboto',
                  display: displayRecord.checkOutImageUrl ? 'none' : 'block'
                }}
              >
                No Image
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                disabled={loading}
                className={`px-4 py-2 border border-gray-300 rounded-lg text-gray-700 ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                }`}
                style={{ fontFamily: 'Roboto', fontSize: '14px' }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className={`px-4 py-2 bg-gray-500 text-white rounded-lg ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'
                }`}
                style={{ fontFamily: 'Roboto', fontSize: '14px' }}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              disabled={loading}
              className={`px-4 py-2 bg-gray-500 text-white rounded-lg ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'
              }`}
              style={{ fontFamily: 'Roboto', fontSize: '14px' }}
            >
              Edit
            </button>
          )}
        </div>
        </Card>
      </div>
    </div>
  );
};

export default AttendanceHistoryModal;
