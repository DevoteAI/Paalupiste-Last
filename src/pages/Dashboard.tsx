import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    qualifiedLeads: 0,
    conversionRate: 0,
  });

  useEffect(() => {
    checkAuth();
    fetchStats();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/login');
    }
  };

  const fetchStats = async () => {
    try {
      const { data: leads, error: leadsError } = await supabase
        .from('leads')
        .select('status');

      if (leadsError) throw leadsError;

      const totalLeads = leads?.length || 0;
      const newLeads = leads?.filter(lead => lead.status === 'new').length || 0;
      const qualifiedLeads = leads?.filter(lead => lead.status === 'qualified').length || 0;
      const conversionRate = totalLeads > 0 ? (qualifiedLeads / totalLeads) * 100 : 0;

      setStats({
        totalLeads,
        newLeads,
        qualifiedLeads,
        conversionRate,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500">Total Leads</h2>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {stats.totalLeads}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500">New Leads</h2>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {stats.newLeads}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500">Qualified Leads</h2>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {stats.qualifiedLeads}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500">Conversion Rate</h2>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {stats.conversionRate.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;