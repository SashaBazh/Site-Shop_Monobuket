import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    padding: "1.5rem",
    backgroundColor: "#ffffff",
    borderRadius: "0.5rem",
    border: "1px solid #ddd",
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#000000",
    marginBottom: "1.5rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "1rem",
    "@media (max-width: 1200px)": {
      display: "none",
    },
  },
  th: {
    backgroundColor: "#f5f5f5",
    padding: "0.75rem",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
    color: "#000000",
  },
  td: {
    padding: "0.75rem",
    borderBottom: "1px solid #ddd",
    color: "#000000",
  },
  select: {
    padding: "0.375rem 0.75rem",
    borderRadius: "0.375rem",
    border: "1px solid #ddd",
    backgroundColor: "#ffffff",
    fontSize: "1rem",
    color: "#000000",
    cursor: "pointer",
  },
  card: {
    display: "none",
    border: "1px solid #ddd",
    borderRadius: "0.5rem",
    padding: "1rem",
    marginBottom: "1rem",
    backgroundColor: "#f5f5f5",
    "@media (max-width: 1200px)": {
      display: "block",
    },
  },
  cardItem: {
    marginBottom: "0.75rem",
  },
  cardLabel: {
    fontWeight: "bold",
    color: "#000000",
  },
  cardValue: {
    color: "#000000",
  },
});

export default useStyles;
