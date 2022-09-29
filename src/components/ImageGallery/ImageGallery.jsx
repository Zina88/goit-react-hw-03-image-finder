import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images }) => (
  <ul className={css.gallery}>
    {images.map(({ id, tags, webformatURL }) => (
      <ImageGalleryItem key={id} tags={tags} webformatURL={webformatURL} />
    ))}
  </ul>
);

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.array,
};
