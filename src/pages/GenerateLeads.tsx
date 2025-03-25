import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const GenerateLeads: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Call your lead generation API or service here
      const response = await fetch('/api/generate-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Add any necessary parameters
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate leads');
      }

      const leads = await response.json();

      // Store leads in Supabase
      const { error } = await supabase
        .from('leads')
        .insert(leads);

      if (error) throw error;

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Generate Leads</h1>
      <button
        onClick={handleGenerate}
        disabled={loading}
        className={`px-4 py-2 rounded ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
      >
        {loading ? 'Generating...' : 'Generate Leads'}
      </button>
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
          Leads generated successfully!
        </div>
      )}
    </div>
  );
};

export default GenerateLeads;