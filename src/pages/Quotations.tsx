import { useState } from 'react';
import { FileText, Download, Mail, CheckCircle2, Clock, XCircle, FileSpreadsheet } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_QUOTES = [
  { id: 'QT-2024-001', project: 'Oceanside Villa Reno', client: 'Sarah Jenkins', amount: '$14,500', status: 'approved', date: '2024-06-25' },
  { id: 'QT-2024-002', project: 'Downtown Commercial Hub', client: 'Apex Developments', amount: '$85,000', status: 'pending', date: '2024-06-28' },
  { id: 'QT-2024-003', project: 'Maple Street Residence', client: 'Tom Smith', amount: '$9,200', status: 'revision', date: '2024-06-27' },
  { id: 'QT-2024-004', project: 'Sunset Highrise', client: 'Skyline Build', amount: '$120,000', status: 'rejected', date: '2024-06-20' },
];

const Quotations = () => {
  const [quotes] = useState(MOCK_QUOTES);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved': return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700"><CheckCircle2 className="w-3 h-3" /> Approved</span>;
      case 'pending': return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700"><Clock className="w-3 h-3" /> Pending</span>;
      case 'revision': return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700"><FileText className="w-3 h-3" /> Revision Requested</span>;
      case 'rejected': return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-700"><XCircle className="w-3 h-3" /> Rejected</span>;
      default: return null;
    }
  };

  const handleExport = (id: string) => {
    alert(`Simulating Excel export for quotation ${id}`);
  };

  const handleEmail = (id: string) => {
    alert(`Simulating automated email sharing for quotation ${id}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Quotations</h2>
          <p className="text-gray-500 mt-1">Manage quotes, approvals, and share with clients.</p>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm flex items-center gap-2">
          <FileText className="w-4 h-4" /> Create Quote
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-6 p-5 border-b border-gray-50 bg-gray-50/50 text-sm font-medium text-gray-500">
          <div className="col-span-2">Quote Details</div>
          <div>Amount</div>
          <div>Date</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        <div className="divide-y divide-gray-50">
          {quotes.map((quote, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={quote.id}
              className="grid grid-cols-6 p-5 items-center hover:bg-gray-50/50 transition-colors"
            >
              <div className="col-span-2">
                <p className="font-semibold text-gray-900">{quote.project}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-mono text-gray-400">{quote.id}</span>
                  <span className="text-xs text-gray-500">• {quote.client}</span>
                </div>
              </div>
              <div className="font-medium text-gray-900">{quote.amount}</div>
              <div className="text-sm text-gray-500">{quote.date}</div>
              <div>{getStatusBadge(quote.status)}</div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleExport(quote.id)}
                  className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors tooltip"
                  title="Export to Excel"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleEmail(quote.id)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors tooltip"
                  title="Send via Email"
                >
                  <Mail className="w-4 h-4" />
                </button>
                <button
                  className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors tooltip"
                  title="Download PDF"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quotations;