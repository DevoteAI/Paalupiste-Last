import React from 'react';
import { Lead } from '../../types/leads';

interface LeadHistoryListProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
}

const LeadHistoryList: React.FC<LeadHistoryListProps> = ({ leads, onLeadClick }) => {
  return (
    <div className="space-y-4">
      {leads.map((lead) => (
        <div
          key={lead.id}
          className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onLeadClick(lead)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{lead.name}</h3>
              <p className="text-sm text-gray-500">{lead.company}</p>
            </div>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                lead.status === 'new'
                  ? 'bg-green-100 text-green-800'
                  : lead.status === 'contacted'
                  ? 'bg-blue-100 text-blue-800'
                  : lead.status === 'qualified'
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {lead.status}
            </span>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-600">
            <div>
              <span className="font-medium">Email:</span> {lead.email}
            </div>
            <div>
              <span className="font-medium">Position:</span> {lead.position}
            </div>
            <div>
              <span className="font-medium">Industry:</span> {lead.industry}
            </div>
            <div>
              <span className="font-medium">Location:</span> {lead.location}
            </div>
          </div>
          {lead.notes && (
            <div className="mt-2 text-sm text-gray-500">
              <span className="font-medium">Notes:</span> {lead.notes}
            </div>
          )}
          <div className="mt-2 text-xs text-gray-400">
            Generated on {new Date(lead.created_at).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeadHistoryList;