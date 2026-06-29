import { useState } from 'react';
import { DollarSign, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_PAYMENTS = [
  { id: 'PAY-1001', project: 'Oceanside Villa Reno', client: 'Sarah Jenkins', amount: '$14,500', collected: '$14,500', status: 'paid', dueDate: '2024-07-01' },
  { id: 'PAY-1002', project: 'Downtown Commercial Hub', client: 'Apex Developments', amount: '$85,000', collected: '$42,500', status: 'partial', dueDate: '2024-07-15' },
  { id: 'PAY-1003', project: 'Maple Street Residence', client: 'Tom Smith', amount: '$9,200', collected: '$0', status: 'pending', dueDate: '2024-07-10' },
  { id: 'PAY-1004', project: 'Sunset Highrise', client: 'Skyline Build', amount: '$120,000', collected: '$0', status: 'overdue', dueDate: '2024-06-15' },
];

const Payments = () => {
  const [payments] = useState(MOCK_PAYMENTS);

  const getStatusDisplay = (status: string) => {
    switch(status) {
      case 'paid': return { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: <CheckCircle2 className="w-4 h-4" />, label: 'Fully Paid' };
      case 'partial': return { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: <DollarSign className="w-4 h-4" />, label: 'Partially Paid' };
      case 'pending': return { color: 'bg-amber-100 text-amber-700 border-amber-200', icon: <Clock className="w-4 h-4" />, label: 'Pending' };
      case 'overdue': return { color: 'bg-rose-100 text-rose-700 border-rose-200', icon: <AlertCircle className="w-4 h-4" />, label: 'Overdue' };
      default: return { color: 'bg-gray-100 text-gray-700 border-gray-200', icon: null, label: 'Unknown' };
    }
  };

  const calculateProgress = (collected: string, amount: string) => {
    const coll = parseFloat(collected.replace(/[^0-9.-]+/g,""));
    const tot = parseFloat(amount.replace(/[^0-9.-]+/g,""));
    return (coll / tot) * 100;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Payments</h2>
          <p className="text-gray-500 mt-1">Track payment collection statuses.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {payments.map((payment, i) => {
          const statusInfo = getStatusDisplay(payment.status);
          const progress = calculateProgress(payment.collected, payment.amount);

          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={payment.id}
              className={`bg-white rounded-3xl border ${statusInfo.color.replace(/text-\w+-\d+/g, '').replace(/bg-\w+-\d+/g, '').trim()} shadow-sm overflow-hidden flex flex-col h-full`}
            >
              <div className={`p-4 border-b ${statusInfo.color.replace(/text-\w+-\d+/g, '').replace(/border-\w+-\d+/g, '').trim()} flex justify-between items-center`}>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${statusInfo.color.replace(/border-\w+-\d+/g, '').trim()}`}>
                  {statusInfo.icon} {statusInfo.label}
                </span>
                <span className="text-xs font-mono text-gray-500 bg-white/50 px-2 py-1 rounded-lg">{payment.id}</span>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-900 mb-1">{payment.project}</h3>
                <p className="text-sm text-gray-500 mb-6">{payment.client}</p>

                <div className="mt-auto space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Collected</p>
                      <p className="text-xl font-bold text-gray-900">{payment.collected}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Total</p>
                      <p className="text-sm font-medium text-gray-900">{payment.amount}</p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ease-out ${statusInfo.color.replace(/bg-\w+-\d+/g, 'bg-current').replace(/border-\w+-\d+/g, '').trim()}`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-right text-gray-500">Due: {payment.dueDate}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Payments;