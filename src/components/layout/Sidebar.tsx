
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShieldCheck,
  History,
  FileText,
  Settings,
  Code,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  title: string;
  href: string;
  isActive: boolean;
  subItems?: { title: string; href: string }[];
}

const SidebarItem = ({ icon, title, href, isActive, subItems }: SidebarItemProps) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  
  const hasSubItems = subItems && subItems.length > 0;
  
  return (
    <div className="mb-1">
      <Link
        to={hasSubItems ? "#" : href}
        onClick={hasSubItems ? (e) => {
          e.preventDefault();
          setIsSubMenuOpen(!isSubMenuOpen);
        } : undefined}
        className={cn(
          "flex items-center py-2 px-4 rounded-lg group transition-all duration-200 ease-in-out",
          isActive && !hasSubItems 
            ? "bg-brand-50 text-brand-600 font-medium" 
            : "text-gray-700 hover:bg-gray-100"
        )}
      >
        <div className="mr-3 text-lg">
          {icon}
        </div>
        <span className="flex-1">{title}</span>
        {hasSubItems && (
          <div className="text-gray-400">
            {isSubMenuOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </div>
        )}
      </Link>
      
      {hasSubItems && isSubMenuOpen && (
        <div className="ml-12 mt-1 space-y-1">
          {subItems.map((subItem, index) => (
            <Link
              key={index}
              to={subItem.href}
              className={cn(
                "block py-2 px-3 rounded-md text-sm transition-colors",
                useLocation().pathname === subItem.href
                  ? "text-brand-600 bg-brand-50 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              {subItem.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const { user } = useAuth();
  
  const sidebarItems = [
    {
      icon: <LayoutDashboard size={20} />,
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <ShieldCheck size={20} />,
      title: "Content Review",
      href: "/content-review",
    },
    {
      icon: <History size={20} />,
      title: "Moderation History",
      href: "/moderation-history",
    },
    {
      icon: <FileText size={20} />,
      title: "Policy Management",
      href: "/policy-management",
    },
    {
      icon: <Code size={20} />,
      title: "API Setup",
      href: "/api-setup",
    },
    {
      icon: <Settings size={20} />,
      title: "Settings",
      href: "/settings",
      subItems: [
        { title: "Account", href: "/settings/account" },
        { title: "Notifications", href: "/settings/notifications" },
        { title: "Team", href: "/settings/team" },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 pt-16 transition-transform duration-300 ease-in-out transform",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="px-4 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center">
              <span className="text-brand-600 font-bold">
                {user?.name.charAt(0)}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-gray-500">
                {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="py-4 flex-1 overflow-y-auto">
          <nav className="px-2 space-y-1">
            {sidebarItems.map((item, index) => (
              <SidebarItem
                key={index}
                icon={item.icon}
                title={item.title}
                href={item.href}
                isActive={location.pathname === item.href}
                subItems={item.subItems}
              />
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <div className="bg-brand-50 rounded-lg p-3">
            <h4 className="text-sm font-medium text-brand-800 mb-1">Need help?</h4>
            <p className="text-xs text-gray-600 mb-2">
              Contact our support team for assistance with any issues.
            </p>
            <Link
              to="/support"
              className="text-xs text-brand-600 font-medium hover:text-brand-700 transition-colors"
            >
              Contact Support →
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
