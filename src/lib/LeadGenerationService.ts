import { supabase } from './supabaseClient';
import { Lead } from '../types/leads';

export class LeadGenerationService {
  async generateLeads(params: {
    industry: string;
    location: string;
    companySize: string;
    count: number;
  }): Promise<Lead[]> {
    try {
      // Call external API or service to generate leads
      const response = await fetch('/api/generate-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Failed to generate leads');
      }

      const leads: Lead[] = await response.json();

      // Store leads in Supabase
      const { error } = await supabase
        .from('leads')
        .insert(leads);

      if (error) throw error;

      return leads;
    } catch (error) {
      console.error('Error generating leads:', error);
      throw error;
    }
  }

  async getLeads(): Promise<Lead[]> {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Error fetching leads:', error);
      throw error;
    }
  }

  async updateLeadStatus(leadId: string, status: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status })
        .eq('id', leadId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating lead status:', error);
      throw error;
    }
  }
}