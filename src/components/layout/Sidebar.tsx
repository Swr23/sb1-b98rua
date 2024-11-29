import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  BarChart3, 
  Award,
  Settings,
  ChevronRight,
  Anchor,
  FileText,
  ClipboardList,
  FileSpreadsheet,
  FileCheck,
  DollarSign,
  MessageSquare
} from 'lucide-react';
import PaymentModal from '../payments/PaymentModal';

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/', 
    icon: LayoutDashboard 
  },
  { 
    name: 'Calendar', 
    href: '/calendar', 
    icon: Calendar 
  },
  {
    name: 'Process Payment',
    icon: DollarSign,
    isPayment: true
  },
  { 
    name: 'CRM', 
    href: '/crm', 
    icon: Users 
  },
  {
    name: 'Messages',
    href: '/messages',
    icon: MessageSquare,
    badge: 3
  },
  {
    name: 'Forms',
    href: '/forms/consultation',
    icon: FileText,
    children: [
      { name: 'Consultation', href: '/forms/consultation', icon: ClipboardList },
      { name: 'Intake', href: '/forms/intake', icon: FileSpreadsheet },
      { name: 'Waivers', href: '/forms/waivers', icon: FileCheck },
    ],
  },
  { 
    name: 'Reports', 
    href: '/reports', 
    icon: BarChart3 
  },
  { 
    name: 'Loyalty', 
    href: '/loyalty', 
    icon: Award 
  },
  { 
    name: 'Settings', 
    href: '/settings', 
    icon: Settings 
  },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const toggleSection = (sectionName: string, href?: string) => {
    if (href) {
      navigate(href);
    }
    setExpandedSection(expandedSection === sectionName ? null : sectionName);
  };

  const isActiveRoute = (href?: string) => {
    if (!href) return false;
    return location.pathname === href;
  };

  const isActiveSectionRoute = (section: typeof navigation[0]) => {
    if ('children' in section) {
      return section.children?.some(child => location.pathname === child.href);
    }
    return location.pathname === section.href;
  };

  return (
    <>
      <motion.div 
        initial={false}
        animate={{ width: isExpanded ? '240px' : '72px' }}
        className="relative h-screen bg-gradient-to-b from-gray-900 to-gray-800 dark:from-dark-secondary dark:to-dark-primary shadow-lg transition-all duration-250 z-50"
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -right-3 top-6 bg-white dark:bg-dark-secondary rounded-full p-1 shadow-md hover:shadow-lg transition-shadow duration-250"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="h-4 w-4 text-gray-600 dark:text-dark-text" />
          </motion.div>
        </button>

        <div className="flex h-20 items-center justify-center px-4 border-b border-gray-700/50 dark:border-dark-border/50">
          {isExpanded ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-3"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-glow">
                <Anchor className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-bold text-white">Anchor</h1>
                <p className="text-xs text-gray-400">Booking Solutions</p>
              </div>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-glow">
              <Anchor className="h-6 w-6 text-white" />
            </div>
          )}
        </div>

        <nav className="mt-6 px-2 space-y-2">
          {navigation.map((item) => {
            const isActive = isActiveSectionRoute(item);
            const Icon = item.icon;

            if ('isPayment' in item) {
              return (
                <button
                  key={item.name}
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="w-full flex items-center rounded-xl px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-250 group"
                >
                  <Icon className="h-5 w-5 text-gray-400 group-hover:text-white" />
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="ml-3 text-sm font-medium"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </button>
              );
            }
            
            if ('children' in item) {
              return (
                <div key={item.name} className="space-y-1">
                  <button
                    onClick={() => toggleSection(item.name, item.href)}
                    className={`w-full flex items-center rounded-xl px-3 py-2 transition-all duration-250 group relative overflow-hidden ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-glow'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className={`h-5 w-5 flex-shrink-0 transition-all duration-250 ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    }`} />
                    
                    {isExpanded && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`ml-3 text-sm font-medium flex-1 text-left ${
                          isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                        }`}
                      >
                        {item.name}
                      </motion.span>
                    )}

                    {isExpanded && (
                      <ChevronRight
                        className={`h-4 w-4 transition-transform duration-200 ${
                          expandedSection === item.name ? 'rotate-90' : ''
                        }`}
                      />
                    )}
                  </button>

                  {isExpanded && expandedSection === item.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="ml-4 space-y-1"
                    >
                      {item.children?.map((child) => {
                        const isChildActive = isActiveRoute(child.href);
                        const ChildIcon = child.icon;

                        return (
                          <Link
                            key={child.name}
                            to={child.href}
                            className={`flex items-center rounded-xl px-3 py-2 transition-all duration-250 group ${
                              isChildActive
                                ? 'bg-blue-500/20 text-white'
                                : 'text-gray-400 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            <ChildIcon className="h-4 w-4" />
                            <span className="ml-3 text-sm">{child.name}</span>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center rounded-xl px-3 py-2 transition-all duration-250 group relative overflow-hidden ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-glow'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`h-5 w-5 flex-shrink-0 transition-all duration-250 ${
                  isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                }`} />
                
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex-1 flex items-center"
                  >
                    <span className={`ml-3 text-sm font-medium ${
                      isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                    }`}>
                      {item.name}
                    </span>
                    {'badge' in item && item.badge && (
                      <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </motion.div>
                )}

                {!isExpanded && 'badge' in item && item.badge && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {item.badge}
                  </span>
                )}

                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 -z-10"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-2">
          <div className={`rounded-xl p-3 transition-all duration-250 ${
            isExpanded ? 'mx-2 bg-white/5' : ''
          }`}>
            <div className="flex items-center justify-center">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-glow">
                <span className="text-xs font-medium text-white">AB</span>
              </div>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="ml-3"
                >
                  <p className="text-sm font-medium text-white">Admin User</p>
                  <p className="text-xs text-gray-400">admin@example.com</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />
    </>
  );
}