import { SxProps, Theme } from "@mui/system";

export const footerContainer: SxProps<Theme> = {
  backgroundColor: "#000000",
  color: "#fff",
  padding: (theme) => theme.spacing(4, 2),
  display: "flex",
  flexDirection: "column",
  gap: (theme) => theme.spacing(4),
};

export const footerTop: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: (theme) => theme.spacing(4),
  flexWrap: "wrap",
  filter: "invert(1)",
};

export const logoStyle: SxProps<Theme> = {
  height: "40px",
  cursor: "pointer",
};

export const navLinkStyle: SxProps<Theme> = {
  display: "block",
  color: "#fff",
  textDecoration: "none",
  marginBottom: (theme) => theme.spacing(1),
  "&:hover": {
    color: "#ccc",
  },
};

export const socialIconsContainer: SxProps<Theme> = {
  display: "flex",
  gap: (theme) => theme.spacing(2),
};

export const socialIconStyle: SxProps<Theme> = {
  width: "24px",
  height: "24px",
  cursor: "pointer",
};

export const footerBottom: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  fontSize: "14px",
  color: "#ccc",
  filter: "invert(1)",
};
