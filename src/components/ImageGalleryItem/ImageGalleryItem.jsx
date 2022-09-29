import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ id, webformatURL, tags }) => {
  return (
    <li key={id} className={css.galleryItem}>
      <img alt={tags} src={webformatURL} />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
