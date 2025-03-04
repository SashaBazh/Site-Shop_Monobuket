import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#fff", // Белый фон
    color: "#000", // Черный текст
  },
  header: {
    backgroundColor: "#f5f5f5", // Светло-серый фон
    color: "#000", // Черный текст
    padding: "16px",
    display: "flex",
    justifyContent: "center",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Светлая тень
    borderBottom: "1px solid #ddd", // Серая обводка
  },
  headerContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: "1200px",
  },
  headerTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#000", // Черный текст
  },
  userSection: {
    display: "flex",
    alignItems: "center",
  },
  userInfo: {
    marginRight: "12px",
    fontSize: "14px",
    color: "#666", // Серый текст
  },
  avatar: {
    width: "40px",
    height: "40px",
    backgroundColor: "#ddd", // Светло-серый фон
    color: "#000", // Черный текст
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    fontWeight: "bold",
    fontSize: "16px",
    border: "1px solid #ccc", // Серая обводка
  },
  avatarText: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#000", // Черный текст
  },
  mainContent: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff", // Белый фон
    flexDirection: "row",
    "@media (max-width: 768px)": {
      flexDirection: "column",
    },
  },
  sidebar: {
    width: "260px",
    backgroundColor: "#f5f5f5", // Светло-серый фон
    padding: "16px",
    boxShadow: "4px 0px 8px rgba(0, 0, 0, 0.1)", // Светлая тень
    borderRight: "1px solid #ddd", // Серая обводка
    "@media (max-width: 768px)": {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      padding: "12px",
    },
  },
  sidebarNav: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    "@media (max-width: 768px)": {
      flexDirection: "row",
      width: "100%",
    },
  },
  sidebarSectionTitle: {
    fontWeight: "bold",
    marginBottom: "12px",
    fontSize: "14px",
    color: "#666", // Серый текст
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
  tab: {
    padding: "12px",
    backgroundColor: "#fff", // Белый фон
    borderRadius: "8px",
    border: "1px solid #ddd", // Серая обводка
    cursor: "pointer",
    textAlign: "left",
    fontSize: "14px",
    color: "#000", // Черный текст
    transition: "0.3s",
    "&:hover": {
      backgroundColor: "#f5f5f5", // Светло-серый фон при наведении
    },
    "@media (max-width: 768px)": {
      flex: 1,
      textAlign: "center",
    },
  },
  tabText: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#000", // Черный текст
  },
  activeTab: {
    backgroundColor: "#ddd", // Светло-серый фон для активной вкладки
    color: "#000", // Черный текст
    fontWeight: "bold",
  },
  contentArea: {
    flex: 1,
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    "@media (max-width: 768px)": {
      padding: "12px",
    },
  },
  contentContainer: {
    backgroundColor: "#fff", // Белый фон
    padding: "24px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "1500px",
    "@media (max-width: 768px)": {
      padding: "18px",
    },
    "@media (max-width: 480px)": {
      padding: "14px",
    },
  },
});

export default useStyles;