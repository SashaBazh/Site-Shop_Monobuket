import { SxProps, Theme } from "@mui/material";

export const sectionContainer: SxProps<Theme> = {
  width: "100%",
  backgroundColor: "#E2DCD3",
};

export const contentContainer: SxProps<Theme> = {
  py: 4,
  px: 2,
  textAlign: "center",
  maxWidth: "1200px",
  margin: "0 auto",
};

export const titleStyle: SxProps<Theme> = {
  fontFamily: "Roboto, sans-serif",
  fontWeight: 300,
  fontSize: "3.5rem",
  color: "#000",
  mb: 4,
};

export const gridItemStyle = (index: number, visibleCards: number[]): SxProps<Theme> => ({
  opacity: visibleCards.includes(index) ? 1 : 0,
  transform: visibleCards.includes(index) ? "translateY(0)" : "translateY(20px)",
  transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
  transitionDelay: `${index * 0.1}s`,
  cursor: "pointer",
});
