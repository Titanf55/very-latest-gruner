import React from 'react';
import { Ban } from 'lucide-react';
import { CustomTable, CustomTableHeader, CustomTableRow, CustomStatus, CustomActionMenu } from '../../ui';

interface KisaniDidi {
  id: number;
  name: string;
  memberId: string;
  mobile: string;
  location: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Rejected' | 'Blocked';
  joinedDate: string;
  profileImage: string;
}

interface PendingApproval {
  id: number;
  name: string;
  memberId: string;
  mobile: string;
  location: string;
  status: 'Pending' | 'Rejected';
  appliedDate: string;
}

interface KisaniDidiTableProps {
  activeTab: string;
  filteredData: KisaniDidi[] | PendingApproval[];
  handleViewProfile: (operator: KisaniDidi) => void;
  handleViewPendingProfile: (approval: PendingApproval) => void;
  showActionMenu: number | null;
  setShowActionMenu: (value: number | null) => void; // Add this
  actionMenuRef: React.RefObject<HTMLDivElement>;
  toggleActionMenu: (operatorId: number, e: React.MouseEvent) => void;
  handleEdit: (operator: KisaniDidi) => void;
  handleDelete: (operatorId: number) => void;
  handleBlock: (operatorId: number) => void;
  handleApprove: (approval: PendingApproval) => void;
  handleReject: (approval: PendingApproval) => void;
}

const KisaniDidiTable: React.FC<KisaniDidiTableProps> = ({
  activeTab,
  filteredData,
  handleViewProfile,
  handleViewPendingProfile,
  setShowActionMenu,
  showActionMenu,
  actionMenuRef,
  toggleActionMenu,
  handleEdit,
  handleDelete,
  handleBlock,
  handleApprove,
  handleReject
}) => {
  return (
    <CustomTable>
      <table className="w-full">
        <CustomTableHeader>
            <th className="px-6 py-3 text-left" style={{ 
              fontFamily: 'Roboto', 
              fontSize: '13.56px', 
              fontWeight: 600,
              color: '#374151'
            }}>
              Name
            </th>
            <th className="px-6 py-3 text-left" style={{ 
              fontFamily: 'Roboto', 
              fontSize: '13.56px', 
              fontWeight: 600,
              color: '#374151'
            }}>
              Member ID
            </th>
            <th className="px-6 py-3 text-left" style={{ 
              fontFamily: 'Roboto', 
              fontSize: '13.56px', 
              fontWeight: 600,
              color: '#374151'
            }}>
              Mobile
            </th>
            <th className="px-6 py-3 text-left" style={{ 
              fontFamily: 'Roboto', 
              fontSize: '13.56px', 
              fontWeight: 600,
              color: '#374151'
            }}>
              Location
            </th>
            {activeTab === 'all' && (
              <th className="px-6 py-3 text-center" style={{ 
                fontFamily: 'Roboto', 
                fontSize: '13.56px', 
                fontWeight: 600,
                color: '#374151'
              }}>
                Status
              </th>
            )}
            {activeTab === 'pending' && (
              <th className="px-6 py-3 text-left" style={{ 
                fontFamily: 'Roboto', 
                fontSize: '13.56px', 
                fontWeight: 600,
                color: '#374151'
              }}>
                Applied Date
              </th>
            )}
            <th className="px-6 py-3 text-center w-32" style={{ 
              fontFamily: 'Roboto', 
              fontSize: '13.56px', 
              fontWeight: 600,
              color: '#374151'
            }}>
              Actions
            </th>
        </CustomTableHeader>
        <tbody className="bg-white divide-y divide-gray-200">
          {activeTab === 'all' ? (
            (filteredData as KisaniDidi[]).map((operator) => (
              <CustomTableRow key={operator.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleViewProfile(operator)}
                    className="text-sm font-semibold hover:text-blue-600 underline"
                    style={{ 
                      fontFamily: 'Roboto', 
                      fontSize: '13.02px', 
                      fontWeight: 600,
                      color: '#101828',
                      textDecoration: 'underline'
                    }}
                  >
                    {operator.name}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                  fontFamily: 'Roboto', 
                  fontSize: '13.02px', 
                  fontWeight: 400,
                  color: '#4A5565'
                }}>
                  {operator.memberId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                  fontFamily: 'Roboto', 
                  fontSize: '13.02px', 
                  fontWeight: 400,
                  color: '#4A5565'
                }}>
                  {operator.mobile}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                  fontFamily: 'Roboto', 
                  fontSize: '13.02px', 
                  fontWeight: 400,
                  color: '#4A5565'
                }}>
                  {operator.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <CustomStatus 
                    isActive={operator.status === 'Active'} 
                    className="w-16 justify-center"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center relative">
                  <div className="flex justify-center">
                    <button
                      onClick={(e) => toggleActionMenu(operator.id, e)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="More Actions"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>
                  <CustomActionMenu
                    isOpen={showActionMenu === operator.id}
                    menuRef={actionMenuRef}
                  >
                    <button
                      onClick={() => {
                        handleEdit(operator);
                        setShowActionMenu(null);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleBlock(operator.id);
                        setShowActionMenu(null);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Ban size={16} />
                      {operator.status === 'Blocked' ? 'Unblock' : 'Block'}
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(operator.id);
                        setShowActionMenu(null);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </CustomActionMenu>
                </td>
              </CustomTableRow>
            ))
          ) : (
            (filteredData as PendingApproval[]).map((approval) => (
              <CustomTableRow key={approval.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleViewPendingProfile(approval)}
                    className="text-sm font-semibold hover:text-blue-600 underline"
                    style={{ 
                      fontFamily: 'Roboto', 
                      fontSize: '13.02px', 
                      fontWeight: 600,
                      color: '#101828',
                      textDecoration: 'underline'
                    }}
                  >
                    {approval.name}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                  fontFamily: 'Roboto', 
                  fontSize: '13.02px', 
                  fontWeight: 400,
                  color: '#4A5565'
                }}>
                  {approval.memberId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                  fontFamily: 'Roboto', 
                  fontSize: '13.02px', 
                  fontWeight: 400,
                  color: '#4A5565'
                }}>
                  {approval.mobile}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                  fontFamily: 'Roboto', 
                  fontSize: '13.02px', 
                  fontWeight: 400,
                  color: '#4A5565'
                }}>
                  {approval.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ 
                  fontFamily: 'Roboto', 
                  fontSize: '13.02px', 
                  fontWeight: 400,
                  color: '#4A5565'
                }}>
                  {approval.appliedDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex justify-center items-center gap-2">
                    <button 
                      onClick={() => handleApprove(approval)}
                      className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleReject(approval)}
                      className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </CustomTableRow>
            ))
          )}
        </tbody>
      </table>
    </CustomTable>
  );
};

// Export the component
export default KisaniDidiTable;
