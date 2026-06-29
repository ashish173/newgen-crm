import { useState } from 'react';
import { Camera, MapPin, CheckCircle2, Clock, Users, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_INSTALLS = [
  { id: 'INST-001', project: 'Oceanside Villa Reno', team: 'Team Alpha', date: 'Today, 08:00 AM', status: 'in-progress', location: '123 Ocean Dr', image: null },
  { id: 'INST-002', project: 'Sunset Highrise', team: 'Team Delta', date: 'Tomorrow, 09:30 AM', status: 'scheduled', location: '45 Sunset Blvd', image: null },
  { id: 'INST-003', project: 'Maple Street Residence', team: 'Team Beta', date: 'Yesterday', status: 'completed', location: '789 Maple St', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&auto=format&fit=crop&q=60' }
];

const Installation = () => {
  const [installs, setInstalls] = useState(MOCK_INSTALLS);

  const handleCaptureProof = (id: string) => {
    alert(`Simulating capturing completion proof image for installation ${id}`);
    const simulatedImage = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=60';
    setInstalls(installs.map(i => i.id === id ? { ...i, status: 'completed', image: simulatedImage } : i));
  };

  const getStatusDisplay = (status: string) => {
    switch(status) {
      case 'in-progress': return { color: 'bg-blue-100 text-blue-700', icon: <Clock className="w-3 h-3" />, label: 'In Progress' };
      case 'scheduled': return { color: 'bg-amber-100 text-amber-700', icon: <Calendar className="w-3 h-3" />, label: 'Scheduled' };
      case 'completed': return { color: 'bg-emerald-100 text-emerald-700', icon: <CheckCircle2 className="w-3 h-3" />, label: 'Completed' };
      default: return { color: 'bg-gray-100 text-gray-700', icon: null, label: 'Unknown' };
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Installation</h2>
          <p className="text-gray-500 mt-1">Allocate work and capture completion proofs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {installs.map((install, i) => {
          const statusInfo = getStatusDisplay(install.status);

          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              key={install.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full"
            >
              {install.image ? (
                <div className="h-40 relative">
                  <img src={install.image} alt="Completion Proof" className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-md bg-white/90 ${statusInfo.color.split(' ')[1]}`}>
                      {statusInfo.icon} {statusInfo.label}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Geo-tagged Proof
                  </div>
                </div>
              ) : (
                <div className="h-40 bg-gray-50 border-b border-gray-100 flex items-center justify-center p-6 text-center relative">
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                      {statusInfo.icon} {statusInfo.label}
                    </span>
                  </div>
                  <div className="text-gray-400">
                    <Camera className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No completion proof uploaded yet</p>
                  </div>
                </div>
              )}

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900">{install.project}</h3>
                  <span className="text-xs font-mono text-gray-400">{install.id}</span>
                </div>

                <div className="space-y-2 mt-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600 gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" /> {install.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" /> {install.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 gap-2">
                    <Users className="w-4 h-4 text-gray-400" /> {install.team}
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-50">
                  {install.status !== 'completed' ? (
                     <button
                       onClick={() => handleCaptureProof(install.id)}
                       className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white py-2.5 rounded-xl text-sm font-medium transition-colors"
                     >
                       <Camera className="w-4 h-4" /> Capture Proof & Complete
                     </button>
                  ) : (
                     <button className="w-full flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 py-2.5 rounded-xl text-sm font-medium border border-emerald-100">
                       <CheckCircle2 className="w-4 h-4" /> Installation Verified
                     </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Installation;