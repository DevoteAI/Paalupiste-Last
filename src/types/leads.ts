export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  position: string;
  industry: string;
  location: string;
  phone?: string;
  linkedin_url?: string;
  status: 'new' | 'contacted' | 'qualified' | 'disqualified';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface LeadGenerationParams {
  industry: string;
  location: string;
  companySize: string;
  count: number;
}

export interface LeadStats {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  conversionRate: number;
}