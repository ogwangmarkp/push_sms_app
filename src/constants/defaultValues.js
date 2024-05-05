export const UserRole = {
  Admin: 0,
  Editor: 1,
};

/*
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = 'menu-default';
export const defaultOrgLogo  = '/assets/logos/logo-sm.png'
export const defaultAvatar   = 'https://qbcore-files.s3.eu-west-3.amazonaws.com/user-profiles/default-placeholder.png1685534165514.default-placeholder.png'
export const defaultUserAvatar = "https://qbcore-files.s3.eu-west-3.amazonaws.com/user-profiles/Test_256_2/Head_Office_2/1690225099554.staff-avatar.jpeg1690225099555.staff-avatar.jpeg"
export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = 'en';
export const localeOptions = [
  { id: 'en', name: 'English - LTR', direction: 'ltr' },
  { id: 'es', name: 'Español', direction: 'ltr' },
  { id: 'enrtl', name: 'English - RTL', direction: 'rtl' },
];

export const adminRoot = '/app';
export const buyUrl = 'https://1.envato.market/k4z0';
export const searchPath = `${adminRoot}/#`;
export const servicePath = 'https://api.coloredstrategies.com';
export const dashboardPath = `${adminRoot}/dashboard`;
export const loginPath = `${adminRoot}/user/login`;
export const SESSION_IDEL_MINUTES = 20;

export const currentUser = {
  id: 1,
  title: 'Demo',
  img: '/assets/img/profiles/l-1.jpg',
  date: 'Last seen today 15:24',
  role: UserRole.Admin,
};

export const themeColorStorageKey = '__theme_selected_color';
export const isMultiColorActive = true;
export const defaultColor = 'light.bluenavy';
export const isDarkSwitchActive = true;
export const defaultDirection = 'ltr';
export const themeRadiusStorageKey = '__theme_radius';
export const isAuthGuardActive = true;
export const colors = [
  'bluenavy',
  'blueyale',
  'blueolympic',
  'greenmoss',
  'greenlime',
  'purplemonster',
  'orangecarrot',
  'redruby',
  'yellowgranola',
  'greysteel',
];
