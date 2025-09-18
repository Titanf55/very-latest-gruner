// ============================================================================
// TASK TABLE COMPONENT
// ============================================================================

import React from 'react';
import { Edit, Eye } from 'lucide-react';
import { Task, DraftTask, AssignedTask } from '../types';
// import { getUserTypeDisplayName } from '../utils'; // Not used currently
import CustomTable from '../../ui/CustomTable';
import CustomTableHeader from '../../ui/CustomTableHeader';
import CustomTableRow from '../../ui/CustomTableRow';

interface TaskTableProps {
  activeTab: "draft" | "assigned";
  tasks: Task[];
  handleTaskClick: (task: Task) => void;
  handleEditTask: (task: DraftTask) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({
  activeTab,
  tasks,
  handleTaskClick,
  handleEditTask,
}) => {
  return (
    <CustomTable>
      <table className="w-full">
        <CustomTableHeader>
            {activeTab === "assigned" ? (
              <>
                <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700" style={{ width: "25%" }}>
                  Task Title
                </th>
                <th className="text-center py-4 pr-8 text-sm font-semibold text-gray-700" style={{ width: "20%" }}>
                  Assigned To
                </th>
                <th className="text-center py-4 pr-8 text-sm font-semibold text-gray-700" style={{ width: "15%" }}>
                  Assigned Date
                </th>
                <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700" style={{ width: "15%" }}>
                  Due Date
                </th>
                <th className="text-center py-4 pr-8 text-sm font-semibold text-gray-700" style={{ width: "10%" }}>
                  Status
                </th>
                <th className="text-center py-4 pr-8 text-sm font-semibold text-gray-700" style={{ width: "15%" }}>
                  Actions
                </th>
              </>
            ) : (
              <>
                <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700" style={{ width: "25%" }}>
                  Task Title
                </th>
                <th className="text-center py-4 pr-8 text-sm font-semibold text-gray-700" style={{ width: "20%" }}>
                  Assigned To
                </th>
                <th className="text-center py-4 pr-8 text-sm font-semibold text-gray-700" style={{ width: "15%" }}>
                  Created Date
                </th>
                <th className="text-center py-4 pr-8 text-sm font-semibold text-gray-700" style={{ width: "15%" }}>
                  Due Date
                </th>
                <th className="text-center py-4 pr-8 text-sm font-semibold text-gray-700" style={{ width: "10%" }}>
                  Status
                </th>
                <th className="text-center py-4 pr-8 text-sm font-semibold text-gray-700" style={{ width: "15%" }}>
                  Actions
                </th>
              </>
            )}
        </CustomTableHeader>
        <tbody className="bg-white">
          {tasks.map((task, index) => (
            <CustomTableRow key={task.id} isLast={index === tasks.length - 1} className="hover:bg-gray-50">
              {activeTab === "assigned" ? (
                <>
                  <td className="py-4 pr-8" style={{ width: "25%" }}>
                    <button
                      onClick={() => handleTaskClick(task)}
                      className="text-sm font-medium text-[#000000] hover:text-blue-800 underline"
                    >
                      {task.title}
                    </button>
                  </td>
                  <td className="py-4 pr-8 text-center" style={{ width: "20%" }}>
                    <div className="flex items-center justify-center">
                      <div className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md bg-gray-50">
                        <span className="text-xs font-medium text-gray-800" style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}>
                          {(task as DraftTask | AssignedTask).assignedToLabel || "Not assigned"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 pr-8 text-sm text-gray-600 text-center" style={{ width: "15%" }}>
                    {"assignedAt" in task ? new Date(task.assignedAt).toLocaleDateString() : "-"}
                  </td>
                  <td className="py-4 pr-8 text-sm text-gray-600" style={{ width: "15%" }}>
                    {"dueDate" in task && task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}
                  </td>
                  <td className="py-4 pr-8 text-center" style={{ width: "10%" }}>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        "taskStatus" in task && task.taskStatus === "completed" 
                          ? "bg-green-100 text-green-800" 
                          : "taskStatus" in task && task.taskStatus === "in-progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "taskStatus" in task && task.taskStatus === "overdue"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {"taskStatus" in task && task.taskStatus === "completed" 
                        ? "Completed" 
                        : "taskStatus" in task && task.taskStatus === "in-progress"
                        ? "In Progress"
                        : "taskStatus" in task && task.taskStatus === "overdue"
                        ? "Overdue"
                        : "Unknown"
                      }
                    </span>
                  </td>
                  <td className="py-4 pr-8 text-center relative" style={{ width: "15%" }}>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTaskClick(task);
                        }}
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTaskClick(task);
                        }}
                        title="Edit Task"
                      >
                        <Edit size={16} />
                      </button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-4 pr-8" style={{ width: "25%" }}>
                    <button
                      onClick={() => handleTaskClick(task)}
                      className="text-sm font-medium text-[#000000] hover:text-blue-800 underline"
                    >
                      {task.title}
                    </button>
                  </td>
                  <td className="py-4 pr-8 text-center" style={{ width: "20%" }}>
                    <div className="flex items-center justify-center">
                      <div className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md bg-gray-50">
                        <span className="text-xs font-medium text-gray-800" style={{ fontFamily: "Poppins", fontSize: "12px", fontWeight: 500 }}>
                          {(task as DraftTask | AssignedTask).assignedToLabel || "Not assigned"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 pr-8 text-sm text-gray-600 text-center" style={{ width: "15%" }}>
                    {"createdAt" in task ? new Date(task.createdAt).toLocaleDateString() : "-"}
                  </td>
                  <td className="py-4 pr-8 text-sm text-gray-600 text-center" style={{ width: "15%" }}>
                    {"dueDate" in task && task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}
                  </td>
                  <td className="py-4 pr-8 text-center" style={{ width: "10%" }}>
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                      Draft
                    </span>
                  </td>
                  <td className="py-4 pr-8 text-center relative" style={{ width: "15%" }}>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditTask(task as DraftTask);
                        }}
                        title="Edit Task"
                      >
                        <Edit size={16} />
                      </button>
                    </div>
                  </td>
                </>
              )}
            </CustomTableRow>
          ))}
        </tbody>
      </table>
      {tasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-sm text-gray-500">
            No {activeTab === "draft" ? "draft" : "assigned"} tasks found
          </p>
        </div>
      )}
    </CustomTable>
  );
};

export default TaskTable;
