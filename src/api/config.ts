export const BASE_URL = "https://api.monobuket-mk.by/api";
// export const BASE_URL = "http://localhost:8000/api";

export const getImageUrl = (imagePath?: string) =>
  imagePath ? `${BASE_URL}/data/image?image_path=${encodeURIComponent(imagePath)}` : `${BASE_URL}/data/image?image_path=%2Fassets%2Fimages%2Fdefault.jpg`;
