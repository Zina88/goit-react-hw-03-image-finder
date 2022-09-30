import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, toggleModal }) => (
  <ul className={css.gallery}>
    {images.map(({ id, tags, webformatURL, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        tags={tags}
        webformatURL={webformatURL}
        largeImageURL={largeImageURL}
        onClickItem={() => {
          toggleModal(largeImageURL);
        }}
      />
    ))}
  </ul>
);

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.array,
  toggleModal: PropTypes.func,
};
