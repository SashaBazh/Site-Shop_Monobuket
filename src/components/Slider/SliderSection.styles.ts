import { styled } from "@mui/material/styles";
import { Box, IconButton } from "@mui/material";

export const SliderContainer = styled(Box)({
  position: "relative",
  overflow: "hidden",
  width: "100%",
  height: "75vh",
  top: 120,
  "@media (max-width: 900px)": {
    height: "60vh",
    top: 110,
  },
  "@media (max-width: 600px)": {
    height: "40vh",
  },
  
});

export const ArrowButton = styled(IconButton)({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 2,
  color: "#000",
  backgroundColor: "transparent",
  filter: "invert(1)",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
});

export const SlidesWrapper = styled(Box)({
  display: "flex",
  width: "100%",
  height: "100%",
  transition: "transform 0.5s ease-in-out",
});

export const Slide = styled(Box)({
  width: "100%",
  height: "100%",
  flexShrink: 0,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
});
