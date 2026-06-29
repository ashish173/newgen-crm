import { useState } from 'react';
import { Calendar, Users, Upload, Clock, CheckCircle2, FileSpreadsheet } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_VISITS = [
  { id: 'SV-401', project: 'Oceanside Villa Reno', team: 'Alpha Survey', date: '2024-06-30', time: '09:00 AM', status: 'scheduled', surveyData: false },
  { id: 'SV-402', project: 'Downtown Commercial', team: 'Bravo Team', date: '2024-06-28', time: '11:00 AM', status: 'completed', surveyData: true },
  { id: 'SV-403', project: 'Maple Street Res', team: 'Unallocated', date: '2024-07-02', time: 'TBD', status: 'pending', surveyData: false },
];

const SiteVisits = () => {
  const [visits, setVisits] = useState(MOCK_VISITS);

  const handleUpload = (id: string) => {
    alert(`Simulating Excel upload for survey data for visit ${id}`);
    setVisits(visits.map(v => v.id === id ? { ...v, surveyData: true, status: 'completed' } : v));
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-emerald-100 text-emerald-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Site Visits & Surveys</h2>
          <p className="text-gray-500 mt-1">Plan visits, allocate teams, and manage survey data.</p>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm flex items-center gap-2">
          <Calendar className="w-4 h-4" /> Schedule Visit
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {visits.map((visit, i) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              key={visit.id}
              className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-gray-400">{visit.id}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(visit.status)}`}>
                    {visit.status.toUpperCase()}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900">{visit.project}</h3>

                <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-gray-400" /> {visit.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-gray-400" /> {visit.time}</span>
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-gray-400" /> {visit.team}</span>
                </div>
              </div>

              <div className="flex sm:flex-col gap-2 min-w-[140px]">
                {visit.surveyData ? (
                  <div className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 py-2 px-3 rounded-xl text-sm font-medium border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4" /> Survey Uploaded
                  </div>
                ) : (
                  <button
                    onClick={() => handleUpload(visit.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-3 rounded-xl text-sm font-medium transition-colors border border-gray-200"
                  >
                    <Upload className="w-4 h-4" /> Upload Survey
                  </button>
                )}
                {visit.status === 'pending' && (
                  <button className="flex-1 flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white py-2 px-3 rounded-xl text-sm font-medium transition-colors">
                    Allocate Team
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
              Survey Template
            </h3>
            <p className="text-sm text-gray-500 mb-4">Download the standard Excel template for site surveys to ensure consistent data collection.</p>
            <button className="w-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
              <FileSpreadsheet className="w-4 h-4" /> Download Template
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">Upcoming Deadlines</h3>
            <div className="space-y-3">
               <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Oceanside Villa (Survey)</span>
                  <span className="font-medium text-rose-600">Today</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Maple St (Allocation)</span>
                  <span className="font-medium text-amber-600">Tomorrow</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteVisits;