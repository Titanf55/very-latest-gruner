// Main component
export { default as AttendanceManagement } from './AttendanceManagement';

// Sub-components
export { default as AttendanceHeader } from './AttendanceHeader';
export { default as AttendanceFilters } from './AttendanceFilters';
export { default as AttendanceTable } from './AttendanceTable';
export { default as AttendanceSummary } from './AttendanceSummary';
export { default as AttendanceHistoryModal } from './AttendanceHistoryModal';

// Hooks
export { useAttendanceData } from './hooks/useAttendanceData';
export { useAttendanceAPI } from './hooks/useAttendanceAPI';

// Types
export type {
  AttendanceRecord,
  AttendanceSummary as AttendanceSummaryType,
  AttendanceFilters as AttendanceFiltersType
} from './types';
