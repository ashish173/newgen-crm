import { useState } from 'react';
import { Plus, MapPin, Camera, User, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_LEADS = [
  { id: 'LD-001', name: 'John Doe', project: 'Suburban House Reno', phone: '555-0101', status: 'new', reqs: 'Replace 5 windows, 2 doors', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=60' },
  { id: 'LD-002', name: 'Acme Corp', project: 'Office Building Entry', phone: '555-0102', status: 'qualified', reqs: 'Large revolving door, security glazing', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&auto=format&fit=crop&q=60' },
  { id: 'LD-003', name: 'Sarah Smith', project: 'Downtown Loft', phone: '555-0103', status: 'contacted', reqs: 'Soundproof windows', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop&q=60' }
];

const Leads = () => {
  const [leads, setLeads] = useState(MOCK_LEADS);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', project: '', phone: '', reqs: '' });

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead = {
      id: `LD-00${leads.length + 1}`,
      ...formData,
      status: 'new',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&auto=format&fit=crop&q=60' // Simulated attached image
    };
    setLeads([newLead, ...leads]);
    setShowForm(false);
    setFormData({ name: '', project: '', phone: '', reqs: '' });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'contacted': return 'bg-amber-100 text-amber-700';
      case 'qualified': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Leads</h2>
          <p className="text-gray-500 mt-1">Manage sales leads and requirements.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> New Lead
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Add New Lead</h3>
          <form onSubmit={handleAddLead} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
              <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
              <input type="text" required value={formData.project} onChange={e => setFormData({...formData, project: e.target.value})} className="w-full p-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="text" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Attach Image (Simulated Geo-tagged)</label>
              <div className="w-full p-2 border border-gray-200 border-dashed rounded-xl flex items-center justify-center text-gray-400 bg-gray-50">
                <Camera className="w-5 h-5 mr-2" /> Click to upload
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Requirements Gathering</label>
              <textarea rows={3} value={formData.reqs} onChange={e => setFormData({...formData, reqs: e.target.value})} className="w-full p-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5"></textarea>
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 mt-2">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">Cancel</button>
              <button type="submit" className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800">Save Lead</button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leads.map((lead, i) => (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} key={lead.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
            <div className="h-40 relative">
              <img src={lead.image} alt="Site" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-md bg-white/90 ${getStatusColor(lead.status).split(' ')[1]}`}>
                  {lead.status.toUpperCase()}
                </span>
              </div>
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Geo-tagged
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900">{lead.project}</h3>
                <span className="text-xs font-mono text-gray-400">{lead.id}</span>
              </div>

              <div className="space-y-2 mt-4">
                <div className="flex items-center text-sm text-gray-600 gap-2">
                  <User className="w-4 h-4 text-gray-400" /> {lead.name}
                </div>
                <div className="flex items-center text-sm text-gray-600 gap-2">
                  <Phone className="w-4 h-4 text-gray-400" /> {lead.phone}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-50">
                <p className="text-sm text-gray-600 line-clamp-2">
                  <span className="font-medium text-gray-900 block mb-1">Requirements:</span>
                  {lead.reqs}
                </p>
              </div>

              <div className="mt-5 flex gap-2">
                <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 rounded-xl text-sm font-medium transition-colors">
                  Qualify
                </button>
                <button className="flex-1 bg-black hover:bg-gray-800 text-white py-2 rounded-xl text-sm font-medium transition-colors">
                  Prepare Quote
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Leads;