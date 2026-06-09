import React, { useState } from 'react';
import { 
  LayoutGrid, 
  Bot, 
  Workflow, 
  ShieldCheck, 
  Plug2, 
  Database, 
  Plus,
  BookTemplate,
  Library,
  Activity,
  Settings
} from 'lucide-react';

function App() {
  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-800 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-xl">L</span>
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">Lyzr Studio</span>
        </div>
        
        <div className="flex-1 py-6 overflow-y-auto">
          <nav className="px-4 space-y-1">
            <NavItem icon={<LayoutGrid size={18} />} label="Dashboard" active />
            <NavItem icon={<Plus size={18} />} label="Build" />
            <NavItem icon={<Bot size={18} />} label="Agents" />
            <NavItem icon={<Workflow size={18} />} label="Orchestrate" />
            
            <div className="pt-6 pb-2">
              <span className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Enterprise</span>
            </div>
            <NavItem icon={<ShieldCheck size={18} />} label="Governance" />
            <NavItem icon={<Plug2 size={18} />} label="Connect" />
            <NavItem icon={<Database size={18} />} label="Knowledge Base" />
          </nav>
        </div>
        
        <div className="p-4 border-t border-slate-200">
          <NavItem icon={<Settings size={18} />} label="Settings" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10">
          <h1 className="text-xl font-semibold text-slate-800">Workspace Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold border border-purple-200">
              A
            </div>
          </div>
        </header>

        {/* Dashboard Area */}
        <main className="flex-1 overflow-y-auto p-8">
          
          {/* System Snapshot */}
          <div className="mb-8">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">System Snapshot</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="Agents Built" value="2" trend="+1 this week" />
              <StatCard title="Knowledge Bases" value="0" trend="Awaiting setup" />
              <StatCard title="Active Tools" value="2" trend="BingSearch, Scraper" />
            </div>
          </div>

          {/* Quick Start */}
          <div className="mb-10">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Quick Start</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ActionCard 
                title="Build Agent" 
                description="Create a new agent from scratch with custom tools, persona, and memory."
                icon={<Plus size={24} className="text-purple-600" />}
              />
              <ActionCard 
                title="Use Blueprints" 
                description="Start with pre-configured templates for common enterprise workflows."
                icon={<BookTemplate size={24} className="text-blue-600" />}
              />
              <ActionCard 
                title="Pre-built Agents" 
                description="Deploy ready-to-use agents instantly from the community hub."
                icon={<Library size={24} className="text-emerald-600" />}
              />
            </div>
          </div>

          {/* Monitoring / Active Agents */}
          <div>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Live Agent Mesh</h2>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase tracking-wider">
                    <th className="p-4 font-semibold">Agent Name</th>
                    <th className="p-4 font-semibold">Role</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold">Last Execution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-800 flex items-center space-x-3">
                      <Bot size={18} className="text-purple-600" />
                      <span>Global Intelligence Scout</span>
                    </td>
                    <td className="p-4 text-sm text-slate-600">Lead Discovery Pipeline</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                        Running
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-500">Just now</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-800 flex items-center space-x-3">
                      <Activity size={18} className="text-blue-600" />
                      <span>Defense Intelligence Analyst</span>
                    </td>
                    <td className="p-4 text-sm text-slate-600">Data Profiling & Classification</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                        Running
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-500">2 mins ago</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <a href="#" className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-purple-50 text-purple-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
      {icon}
      <span>{label}</span>
    </a>
  );
}

function StatCard({ title, value, trend }: { title: string, value: string, trend: string }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-sm font-medium text-slate-500 mb-2">{title}</h3>
      <div className="text-3xl font-bold text-slate-800 mb-2">{value}</div>
      <div className="text-xs font-medium text-slate-400">{trend}</div>
    </div>
  );
}

function ActionCard({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group">
      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-purple-50 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}

export default App;
