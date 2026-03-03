import { Bell, Search, Menu, Download, ArrowLeft } from "lucide-react";

interface TopbarProps {
  title: string;
  subtitle: string;
  onOpenSidebar: () => void;
}

export function Topbar({ title, subtitle, onOpenSidebar }: TopbarProps) {
  return (
    <header className="h-[88px] bg-white flex items-center justify-between px-4 md:px-8 border-b border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] z-10 sticky top-0">
      <button
        onClick={onOpenSidebar}
        className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 mr-2 md:mr-4"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className="flex-1">
        <h2 className="text-lg font-bold text-gray-900 leading-none">
          {title}
        </h2>
        <p className="text-sm text-[#889db1] font-medium mt-1">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <div className="relative hidden md:flex flex-shrink-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search
              className="h-[18px] w-[18px] text-gray-400"
              strokeWidth={2.5}
            />
          </div>
          <input
            type="text"
            className="block w-64 pl-9 pr-3 py-2 
             border border-[#CBE0F3] 
             rounded-md bg-[var(--bg-input)] 
             text-sm text-gray-900 
             placeholder-gray-500 
             focus:outline-none 
             outline-none
             focus:ring-1 focus:ring-[var(--bg-sidebar)] 
             font-medium"
            placeholder="Search staff, assets..."
          />
        </div>

        <button className="flex-shrink-0 relative w-9 h-9 rounded-md text-[#e07a3c] flex items-center justify-center border border-[#CBE0F3] bg-[var(--bg-input)] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e07a3c]">
          <Bell className="w-5 h-5 text-[#d8b73f] fill-current" />
          <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 border-2 border-[#fdf2e9] rounded-full"></span>
        </button>

        <button className="hidden md:flex items-center px-4 py-2 bg-[var(--bg-btn-primary)] text-white text-sm font-semibold rounded-md shadow-sm hover:brightness-90 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--bg-btn-primary)]">
          <Download className="w-[18px] h-[18px] mr-2" strokeWidth={2.5} />
          Download HTML
        </button>

        <button className="hidden md:flex items-center px-4 py-2 bg-[var(--bg-btn-secondary)] text-[var(--bg-sidebar)] border border-[#CBE0F3] text-sm font-semibold rounded-md hover:brightness-95 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--bg-btn-secondary)]">
          <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={2.5} />
          Back
        </button>
      </div>
    </header>
  );
}
