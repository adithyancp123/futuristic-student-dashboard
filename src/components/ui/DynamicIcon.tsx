import {
  BookOpen,
  Code,
  Brain,
  Database,
  Shield,
  Award,
  Flame,
  Clock,
  CheckCircle,
  Circle,
  Terminal,
  Settings,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  User,
  Plus,
  Search,
  Bell,
  Calendar,
  LucideIcon
} from 'lucide-react';

const iconRegistry: Record<string, LucideIcon> = {
  BookOpen,
  Code,
  Brain,
  Database,
  Shield,
  Award,
  Flame,
  Clock,
  CheckCircle,
  Circle,
  Terminal,
  Settings,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  User,
  Plus,
  Search,
  Bell,
  Calendar,
};

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function DynamicIcon({ name, className, size = 20 }: DynamicIconProps) {
  const IconComponent = iconRegistry[name] || HelpCircleFallback;
  return <IconComponent className={className} size={size} aria-hidden="true" />;
}

// Fallback component if the icon is not in the registry
function HelpCircleFallback({ className, size }: { className?: string; size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}
