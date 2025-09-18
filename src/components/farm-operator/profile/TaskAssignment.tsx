import React from 'react';
import { CustomTable, CustomTableHeader, CustomTableRow, CustomFilter, CustomFilterSelect, CustomFilterActions } from '../../ui';

interface Task {
  id: number;
  title: string;
  location: string;
  assignedDate: string;
  dueDate: string;
  status: string;
  priority: string;
  description: string;
  notes: string;
}

interface TaskFilters {
  status: string;
}

interface TaskAssignmentProps {
  tasks: Task[];
  isPendingApproval: boolean;
  showTaskFilter: boolean;
  setShowTaskFilter: (show: boolean) => void;
  taskFilters: TaskFilters;
  appliedTaskFilters: TaskFilters;
  handleTaskFilterChange: (field: keyof TaskFilters, value: string) => void;
  resetTaskFilters: () => void;
  applyTaskFilters: () => void;
  openTaskModal: (task: Task) => void;
  loading:boolean;
  error:string | null;
}

const TaskAssignment: React.FC<TaskAssignmentProps> = ({
  tasks,
  isPendingApproval,
  showTaskFilter,
  setShowTaskFilter,
  taskFilters,
  appliedTaskFilters,
  handleTaskFilterChange,
  resetTaskFilters,
  applyTaskFilters,
  openTaskModal,
  loading,
  error

}) => {
  console.log(tasks);
  const filteredTasks = tasks.filter((task) => {
    if (appliedTaskFilters.status && task.status !== appliedTaskFilters.status) {
      return false;
    }
    return true;
  });
       
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Roboto' }}>
          Task Assignment History
        </h3>
        {!isPendingApproval && (
          <CustomFilter
            isOpen={showTaskFilter}
            onToggle={() => setShowTaskFilter(!showTaskFilter)}
            hasActiveFilters={Object.values(appliedTaskFilters).some(value => value !== '')}
            onClose={() => setShowTaskFilter(false)}
            height="h-[300px]"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <CustomFilterSelect
                value={taskFilters.status}
                onChange={(value) => handleTaskFilterChange('status', value)}
                options={[
                  { value: '', label: 'All' },
                  { value: 'Completed', label: 'Completed' },
                  { value: 'In Progress', label: 'In Progress' },
                  { value: 'Overdue', label: 'Overdue' }
                ]}
                placeholder="Select Status"
              />
            </div>

            <CustomFilterActions
              onReset={resetTaskFilters}
              onApply={applyTaskFilters}
              isApplyDisabled={false}
            />
          </CustomFilter>
        )}
      </div>

      {isPendingApproval ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-2">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p className="text-gray-600" style={{ fontFamily: 'Roboto' }}>
            Operator is not approved yet
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'Roboto' }}>
            Complete list of all tasks assigned to this Farm Operator
          </p>
         {/* {filteredTasks.length === 0 ? (
          <tr>
            <td colSpan={5} className="py-6 text-center text-gray-500">
              No tasks found
            </td>
          </tr>
        ) : (
         formattedTasks.length > 0 ? ( filteredTasks.map((task) => (
            <CustomTableRow key={task.id} className="border-b border-gray-100">
              ...
            </CustomTableRow>
          ))) : (
          <tr>
            <td colSpan={5} className="text-center py-6 text-gray-500">
              No tasks found
            </td>
          </tr>
        )}
        )} */}

          <CustomTable>
            <table className="w-full">
              <CustomTableHeader>
                  <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Roboto' }}>
                    Title
                  </th>
                  <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Roboto' }}>
                    Location
                  </th>
                  <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Roboto' }}>
                    Assigned Date
                  </th>
                  <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Roboto' }}>
                    Due Date
                  </th>
                  <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Roboto' }}>
                    Status
                  </th>
              </CustomTableHeader>
              <tbody>
                {tasks.map((task) => (
                  <CustomTableRow key={task.id} className="border-b border-gray-100">
                    <td
                      className="py-3 text-sm font-medium text-gray-600 cursor-pointer hover:underline"
                      style={{ fontFamily: 'Roboto' }}
                      onClick={() => openTaskModal(task)}
                    >
                      {task.title}
                    </td>
                    <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Roboto' }}>
                      {task.location}
                    </td>
                    <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Roboto' }}>
                      {task.assignedDate}
                    </td>
                    <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Roboto' }}>
                      {task.dueDate}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          task.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : task.status === 'In Progress'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                  </CustomTableRow>
                ))}
              </tbody>
            </table>
          </CustomTable>
        </>
      )}
    </div>
  );
};

export default TaskAssignment;
