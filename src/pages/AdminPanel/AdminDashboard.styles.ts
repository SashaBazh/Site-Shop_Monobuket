import { CSSProperties } from 'react';

interface AdminDashboardStylesType {
  container: CSSProperties;
  header: CSSProperties;
  headerContent: CSSProperties;
  headerTitle: CSSProperties;
  userSection: CSSProperties;
  userInfo: CSSProperties;
  avatar: CSSProperties;
  avatarText: CSSProperties;
  mainContent: CSSProperties;
  sidebar: CSSProperties;
  sidebarNav: CSSProperties;
  sidebarSectionTitle: CSSProperties;
  tab: CSSProperties;
  activeTab: CSSProperties;
  tabIcon: CSSProperties;
  tabText: CSSProperties;
  contentArea: CSSProperties;
  contentContainer: CSSProperties;
}

export const AdminDashboardStyles: AdminDashboardStylesType = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f9fafb'
  },
  header: {
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    padding: '1rem 1.5rem'
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937'
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  userInfo: {
    fontSize: '0.875rem',
    color: '#4b5563'
  },
  avatar: {
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '9999px',
    backgroundColor: '#2563eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarText: {
    color: '#ffffff',
    fontWeight: 'bold'
  },
  mainContent: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden'
  },
  sidebar: {
    width: '16rem',
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
  },
  sidebarNav: {
    marginTop: '1.5rem'
  },
  sidebarSectionTitle: {
    padding: '0.5rem 1.5rem',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase'
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem 1.5rem',
    width: '100%',
    textAlign: 'left',
    color: '#4b5563',
    transition: 'background-color 0.2s, color 0.2s',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: 'inherit'
  },
  activeTab: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem 1.5rem',
    width: '100%',
    textAlign: 'left',
    color: '#2563eb',
    backgroundColor: '#eff6ff',
    borderLeft: '4px solid #2563eb',
    transition: 'background-color 0.2s, color 0.2s',
    borderTop: 'none',
    borderRight: 'none',
    borderBottom: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: 'inherit'
  },
  tabIcon: {
    marginRight: '0.75rem',
    width: '1.25rem',
    height: '1.25rem'
  },
  tabText: {
    color: 'inherit'
  },
  contentArea: {
    flex: 1,
    padding: '1.5rem',
    overflow: 'auto'
  },
  contentContainer: {
    // backgroundColor: '#ffffff',
    // borderRadius: '0.5rem',
    // padding: '1.5rem',
    // height: '100%',
    // width: '100%'
  }
};