import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
// import { farmerService, FetchFarmersParams } from '../../services/farmerManagement';
// import { locationService, Location } from '../../services/locationService';
import { farmerServiceMock as farmerService } from '../../services/farmers_management/farmermanagementsimulation'; // Updated import
import { locationServiceMock as locationService} from '../../services/location/locationservicesimulation'; // Updated import
import { Location } from '../../services/location/locationService'
import { FetchFarmersParams } from '../../services/farmers_management/farmerManagement';
import SearchBar from './management/SearchBar';
import FarmerTable from './management/FarmerTable';
import { CustomPagination, CustomConfirmationDialog, CustomFilter, CustomFilterSelect, CustomFilterRange, CustomFilterActions } from '../ui';

// Define the Farmer type based on API structure
interface Farmer {
  id: string;
  name: string;
  phoneNumber: string;
  memberId: string;
  isActive: boolean;
  createdAt: string;
  totalLands: number;
  totalLandAreaAcres: number;
}

const FarmerManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [filters, setFilters] = useState({
    status: '',
    stateId: '',
    districtId: '',
    mandalId: '',
    landSizeFrom: '',
    landSizeTo: ''
  });
  const [appliedFilters, setAppliedFilters] = useState({
    status: '',
    stateId: '',
    districtId: '',
    mandalId: '',
    landSizeFrom: '',
    landSizeTo: ''
  });
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const actionMenuRef = useRef(null);
  const [farmersList, setFarmersList] = useState<Farmer[]>([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalPagesState, setTotalPagesState] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedAction, setSelectedAction] = useState<{ action: 'delete' | 'block' | 'unblock'; farmer: Farmer } | null>(null);
  const [states, setStates] = useState<Location[]>([]);
  const [districts, setDistricts] = useState<Location[]>([]);
  const [mandals, setMandals] = useState<Location[]>([]);

  // TODO: Replace with actual tokens from auth context or localStorage
  const bearerToken = 'bearer-token';
  const basicToken = 'basic-token';

  const fetchFarmersData = async () => {
    const params: FetchFarmersParams = {
      search: searchTerm || undefined,
      isActive: appliedFilters.status === 'Active' ? true : appliedFilters.status === 'Inactive' ? false : undefined,
      stateId: appliedFilters.stateId || undefined,
      districtId: appliedFilters.districtId || undefined,
      mandalId: appliedFilters.mandalId || undefined,
      totalLandMin: parseFloat(appliedFilters.landSizeFrom) || undefined,
      totalLandMax: parseFloat(appliedFilters.landSizeTo) || undefined,
      page: currentPage,
      limit: itemsPerPage,
      newestFirst: true,
    };

    const response = await farmerService.fetchFarmers(params, bearerToken);
    if (response.success && response.data) {
      setFarmersList(response.data.farmers);
      setTotalEntries(response.data.count);
      setTotalPagesState(response.data.totalPages);
    } else {
      console.error(response.message);
      // Optionally show error message to user
    }
  };

  useEffect(() => {
    fetchFarmersData();
  }, [searchTerm, currentPage, appliedFilters]);

  useEffect(() => {
    const fetchStates = async () => {
      const response = await locationService.fetchLocations('state', undefined, undefined, 1, 100, 'en', basicToken);
      console.log(response);
      if (response.success && response.data ) {
        setStates(response.data.locations);
      } else {
        console.error(response.message);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    if (filters.stateId) {
      const fetchDistricts = async () => {
        const response = await locationService.fetchStateDistricts(filters.stateId, undefined, 1, 100, 'en', basicToken);
        console.log(response);
        if (response.success && response.data) {
          setDistricts(response.data.locations);
        } else {
          console.error(response.message);
        }
      };
      fetchDistricts();
    } else {
      setDistricts([]);
    }
    // Reset dependent filters (as per original code)
    setFilters(prev => ({ ...prev, districtId: '', mandalId: '' }));
  }, [filters.stateId]);

  useEffect(() => {
    if (filters.districtId) {
      const fetchMandals = async () => {
        const response = await locationService.fetchDistrictCities(filters.districtId, 1, 100, 'en', basicToken);
        if (response.success && response.data) {
          setMandals(response.data.locations);
        } else {
          console.error(response.message);
        }
      };
      fetchMandals();
    } else {
      setMandals([]);
    }
    // Reset dependent filters (as per original code)
    setFilters(prev => ({ ...prev, mandalId: '' }));
  }, [filters.districtId]);

  const handleViewProfile = (farmer: Farmer) => {
    navigate(`/farmers/${farmer.id}`);
  };

  const handleEditFarmer = (farmer: Farmer) => {
    navigate(`/farmers/${farmer.id}`);
  };

  const handleAddFarmer = () => {
    navigate('/farmers/add');
  };

  const handleExportCSV = () => {
    const headers = ['Name', 'Mobile', 'Member ID', 'Status', 'Registered Date', 'Total Land Size'];
    const csvData = [
      headers,
      ...farmersList.map((farmer: Farmer) => [
        farmer.name,
        farmer.phoneNumber,
        farmer.memberId,
        farmer.isActive ? 'Active' : 'Inactive',
        farmer.createdAt,
        farmer.totalLandAreaAcres
      ])
    ];

    const csvContent = csvData.map(row => row.map(field => `"${field}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'farmers_data.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev, [filterType]: value };
      if (filterType === 'stateId') {
        newFilters.districtId = '';
        newFilters.mandalId = '';
        newFilters.landSizeFrom = '';
        newFilters.landSizeTo = '';
      } else if (filterType === 'districtId') {
        newFilters.mandalId = '';
        newFilters.landSizeFrom = '';
        newFilters.landSizeTo = '';
      }
      return newFilters;
    });
  };

  const handleResetFilters = () => {
    setFilters({
      status: '',
      stateId: '',
      districtId: '',
      mandalId: '',
      landSizeFrom: '',
      landSizeTo: ''
    });
    setAppliedFilters({
      status: '',
      stateId: '',
      districtId: '',
      mandalId: '',
      landSizeFrom: '',
      landSizeTo: ''
    });
    setCurrentPage(1);
    setShowFilterMenu(false);
  };

  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
    setShowFilterMenu(false);
    setCurrentPage(1);
  };

  const handleActionConfirm = async () => {
    if (selectedAction) {
      let success = false;
      if (selectedAction.action === 'delete') {
        const res = await farmerService.deleteFarmer(selectedAction.farmer.id, bearerToken);
        success = res.success;
      } else if (selectedAction.action === 'block') {
        const res = await farmerService.toggleFarmerStatus(selectedAction.farmer.id, bearerToken);
        success = res.success;
      } else if (selectedAction.action === 'unblock') {
        const res = await farmerService.toggleFarmerStatus(selectedAction.farmer.id, bearerToken);
        success = res.success;
      }
      if (success) {
        fetchFarmersData();
      } else {
        // Handle error
        console.error('Action failed');
      }
      setShowConfirmation(false);
      setSelectedAction(null);
    }
  };

  const handleActionCancel = () => {
    setShowConfirmation(false);
    setSelectedAction(null);
  };

  const toggleActionMenu = (farmerId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (showActionMenu === farmerId) {
      setShowActionMenu(null);
    } else {
      setShowActionMenu(farmerId);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isActionButton = (event.target as HTMLElement).closest('button[title="More Actions"]');
      if (actionMenuRef.current && !(actionMenuRef.current as any).contains(event.target) && !isActionButton) {
        setShowActionMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const isApplyDisabled = !Object.values(filters).some(value => value !== '');

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + farmersList.length - 1, totalEntries);

  return (
    <div className="space-y-8 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Farmer Management</h1>
          <p className="text-gray-600 mt-1">
            Manage farmers, status, and details
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddFarmer}
            className="bg-[#000000] text-white px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Add New Farmer
          </button>
        </div>
      </div>

      <div className="">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="flex items-center justify-end mt-4 gap-3">
          <button
            onClick={handleExportCSV}
            className="bg-white border font-bold border-black text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
          >
            <img src="/export.svg" alt="export" />
            Export CSV
          </button>
          <CustomFilter
            isOpen={showFilterMenu}
            onToggle={() => setShowFilterMenu(!showFilterMenu)}
            hasActiveFilters={Object.values(appliedFilters).some(value => value !== '')}
            onClose={() => setShowFilterMenu(false)}
          >
            <CustomFilterSelect
              value={filters.status}
              onChange={(value) => handleFilterChange('status', value)}
              options={[
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' }
              ]}
              placeholder="Status"
            />
            
            <CustomFilterSelect
              value={filters.stateId}
              onChange={(value) => handleFilterChange('stateId', value)}
              options={states.map(state => ({ value: state.id, label: state.name }))}
              placeholder="States"
            />
            
            <CustomFilterSelect
              value={filters.districtId}
              onChange={(value) => handleFilterChange('districtId', value)}
              options={districts.map(district => ({ value: district.id, label: district.name }))}
              placeholder="Districts"
              disabled={!filters.stateId}
            />
            
            <CustomFilterSelect
              value={filters.mandalId}
              onChange={(value) => handleFilterChange('mandalId', value)}
              options={mandals.map(mandal => ({ value: mandal.id, label: mandal.name }))}
              placeholder="Mandals"
              disabled={!filters.districtId}
            />
            
            <CustomFilterRange
              fromValue={filters.landSizeFrom}
              toValue={filters.landSizeTo}
              onFromChange={(value) => handleFilterChange('landSizeFrom', value)}
              onToChange={(value) => handleFilterChange('landSizeTo', value)}
              label="Total land size"
              disabled={!filters.stateId}
            />
            
            <CustomFilterActions
              onReset={handleResetFilters}
              onApply={handleApplyFilters}
              isApplyDisabled={isApplyDisabled}
            />
          </CustomFilter>
        </div>
      </div>

      <FarmerTable
        farmersList={farmersList}
        handleViewProfile={handleViewProfile}
        handleEditFarmer={handleEditFarmer}
        showActionMenu={showActionMenu}
        actionMenuRef={actionMenuRef}
        toggleActionMenu={toggleActionMenu}
        setSelectedAction={setSelectedAction}
        setShowConfirmation={setShowConfirmation}
        setShowActionMenu={setShowActionMenu}
      />

      {totalEntries > 0 && (
        <CustomPagination
          currentPage={currentPage}
          totalPagesState={totalPagesState}
          setCurrentPage={setCurrentPage}
          startIndex={startIndex}
          endIndex={endIndex}
          totalEntries={totalEntries}
        />
      )}

      <CustomConfirmationDialog
        isOpen={showConfirmation}
        title={selectedAction ? 
          (selectedAction.action === 'delete' ? 'Delete User' : 
           (selectedAction.farmer.isActive ? 'Block User' : 'Unblock User')) : 
          ''
        }
        message={selectedAction ? 
          (selectedAction.action === 'delete' ? 'Are you sure you want to delete this User?' : 
           (selectedAction.farmer.isActive ? 
            'Are you sure you want to block this User? They will not be able to access the system.' : 
            'Are you sure you want to unblock this User? They will be able to access the system again.')) : 
          ''
        }
        onConfirm={handleActionConfirm}
        onCancel={handleActionCancel}
      />

      {showFilterMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowFilterMenu(false)}
        />
      )}
    </div>
  );
};

export default FarmerManagement;



