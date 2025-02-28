import React, { useState } from 'react';
import CategoryManager from './CategoryManager';
import ProductManager from './ProductManager';
import OrderManager from './OrderManager';
import { AdminDashboardStyles } from './AdminDashboard.styles';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'categories' | 'products' | 'orders'>('categories');

  return (
    <div style={AdminDashboardStyles.container}>
      {/* Header */}
      <header style={AdminDashboardStyles.header}>
        <div style={AdminDashboardStyles.headerContent}>
          <h1 style={AdminDashboardStyles.headerTitle}>Панель администратора</h1>
          <div style={AdminDashboardStyles.userSection}>
            <span style={AdminDashboardStyles.userInfo}>Администратор</span>
            <div style={AdminDashboardStyles.avatar}>
              <span style={AdminDashboardStyles.avatarText}>A</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div style={AdminDashboardStyles.mainContent}>
        {/* Sidebar */}
        <div style={AdminDashboardStyles.sidebar}>
          <nav style={AdminDashboardStyles.sidebarNav}>
            <div style={AdminDashboardStyles.sidebarSectionTitle}>
              Управление
            </div>
            <button 
              onClick={() => setActiveTab('categories')} 
              style={activeTab === 'categories' ? AdminDashboardStyles.activeTab : AdminDashboardStyles.tab}
            >
              <svg style={AdminDashboardStyles.tabIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span style={AdminDashboardStyles.tabText}>Категории</span>
            </button>
            <button 
              onClick={() => setActiveTab('products')} 
              style={activeTab === 'products' ? AdminDashboardStyles.activeTab : AdminDashboardStyles.tab}
            >
              <svg style={AdminDashboardStyles.tabIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span style={AdminDashboardStyles.tabText}>Товары</span>
            </button>
            <button 
              onClick={() => setActiveTab('orders')} 
              style={activeTab === 'orders' ? AdminDashboardStyles.activeTab : AdminDashboardStyles.tab}
            >
              <svg style={AdminDashboardStyles.tabIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M5 6h14m-7 12v2m-4-2v2m8-2v2" />
              </svg>
              <span style={AdminDashboardStyles.tabText}>Заказы</span>
            </button>
          </nav>
        </div>

        {/* Tab content */}
        <div style={AdminDashboardStyles.contentArea}>
          <div style={AdminDashboardStyles.contentContainer}>
            {activeTab === 'categories' && <CategoryManager />}
            {activeTab === 'products' && <ProductManager />}
            {activeTab === 'orders' && <OrderManager />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
