import axios from 'axios';

const API_KEY = '29195070-4290b3a14e9c6272ed637c4ff';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const fetchGallery = async (searchQuery, page) => {
  const response = await axios.get(
    `?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`,
  );
  return response.data.hits;
};

export default fetchGallery;
