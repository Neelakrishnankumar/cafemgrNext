import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'Salse_Analysis', title: 'Salse Analysis', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'Purchase_Analysis', title: 'Purchase Analysis', href: paths.dashboard.customers, icon: 'users' },
  { key: 'PDL', title: 'PDL', href: paths.dashboard.integrations, icon: 'plugs-connected' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
  // { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
