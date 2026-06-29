import { useState } from 'react';
import { Settings, Factory, Truck, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_TASKS = [
  { id: 'PRD-01', project: 'Oceanside Villa Reno', items: '14 Windows, 3 Doors', stage: 'back-office', priority: 'high' },
  { id: 'PRD-02', project: 'Maple Street Residence', items: '8 Windows, 2 Doors', stage: 'factory', priority: 'medium' },
  { id: 'PRD-03', project: 'Downtown Commercial Hub', items: '120 Windows', stage: 'dispatch', priority: 'low' },
  { id: 'PRD-04', project: 'Sunset Highrise', items: '400 Windows', stage: 'back-office', priority: 'medium' },
];

const STAGES = [
  { id: 'back-office', title: 'Back Office Prep', icon: <Settings className="w-5 h-5 text-blue-500" />, color: 'bg-blue-50 border-blue-100' },
  { id: 'factory', title: 'Factory Production', icon: <Factory className="w-5 h-5 text-amber-500" />, color: 'bg-amber-50 border-amber-100' },
  { id: 'dispatch', title: 'Ready for Dispatch', icon: <Truck className="w-5 h-5 text-emerald-500" />, color: 'bg-emerald-50 border-emerald-100' }
];

const Production = () => {
  const [tasks, setTasks] = useState(MOCK_TASKS);

  const moveTask = (taskId: string, currentStage: string) => {
    const stageIndex = STAGES.findIndex(s => s.id === currentStage);
    if (stageIndex < STAGES.length - 1) {
      const nextStage = STAGES[stageIndex + 1].id;
      setTasks(tasks.map(t => t.id === taskId ? { ...t, stage: nextStage } : t));
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-rose-100 text-rose-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      case 'low': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Production Tracking</h2>
        <p className="text-gray-500 mt-1">Track manufacturing stages from back office to dispatch.</p>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 min-h-0">
        {STAGES.map((stage) => (
          <div key={stage.id} className={`rounded-3xl border flex flex-col h-full overflow-hidden ${stage.color}`}>
            <div className="p-4 border-b border-black/5 bg-white/50 backdrop-blur-sm flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-sm">{stage.icon}</div>
              <h3 className="font-bold text-gray-900">{stage.title}</h3>
              <span className="ml-auto bg-white/80 px-2.5 py-1 rounded-full text-xs font-bold text-gray-600 shadow-sm">
                {tasks.filter(t => t.stage === stage.id).length}
              </span>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {tasks.filter(t => t.stage === stage.id).map((task, j) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: j * 0.05 }}
                  key={task.id}
                  className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 group cursor-pointer hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono text-gray-400">{task.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{task.project}</h4>
                  <p className="text-xs text-gray-500 mb-4">{task.items}</p>

                  {stage.id !== 'dispatch' && (
                    <button
                      onClick={() => moveTask(task.id, stage.id)}
                      className="w-full flex items-center justify-center gap-1 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg text-xs font-medium transition-colors opacity-0 group-hover:opacity-100"
                    >
                      Move to next stage <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Production;