import React, { useState } from "react";
import CategoryManager from "./CategoryManager";
import ProductManager from "./ProductManager";
import OrderManager from "./OrderManager";
import useStyles from "./AdminDashboard.styles";

const AdminDashboard: React.FC = () => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState<"categories" | "products" | "orders">("categories");

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <div className={classes.headerContent}>
          <h1 className={classes.headerTitle}>Панель администратора</h1>
          <div className={classes.userSection}>
            <div className={classes.avatar}>
              <span className={classes.avatarText}>A</span>
            </div>
          </div>
        </div>
      </header>

      <div className={classes.mainContent}>
        <div className={classes.sidebar}>
          <nav className={classes.sidebarNav}>
            <div className={classes.sidebarSectionTitle}>Управление</div>
            <button
              onClick={() => setActiveTab("categories")}
              className={activeTab === "categories" ? `${classes.tab} ${classes.activeTab}` : classes.tab}
            >
              <span className={classes.tabText}>Категории</span>
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={activeTab === "products" ? `${classes.tab} ${classes.activeTab}` : classes.tab}
            >
              <span className={classes.tabText}>Товары</span>
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={activeTab === "orders" ? `${classes.tab} ${classes.activeTab}` : classes.tab}
            >
              <span className={classes.tabText}>Заказы</span>
            </button>
          </nav>
        </div>

        <div className={classes.contentArea}>
          <div className={classes.contentContainer}>
            {activeTab === "categories" && <CategoryManager />}
            {activeTab === "products" && <ProductManager />}
            {activeTab === "orders" && <OrderManager />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
