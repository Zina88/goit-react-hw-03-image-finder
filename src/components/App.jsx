import React, { Component } from 'react';
import fetchGallery from '../services/api';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import { Report } from 'notiflix/build/notiflix-report-aio';
import css from './App.module.css';

export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    isLoading: false,
    error: false,
    showModal: false,
    bigImage: '',
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    try {
      if (prevState.searchQuery !== searchQuery) {
        this.setState({ isLoading: true, page: 1, images: [] });

        this.fetchImages(searchQuery, page);
      }

      if (prevState.page !== page && page !== 1) {
        this.fetchImages(searchQuery, page);
      }
    } catch (error) {
      this.setState({ error: true, isLoading: false });
      console.log(error);
    }
  }

  fetchImages(searchQuery, page) {
    fetchGallery(searchQuery, page).then(data => {
      this.setState(prevState => {
        return {
          prevState,
          isLoading: false,
          images: [...prevState.images, ...data.hits],
          searchQuery: searchQuery,
          totalHits: data.totalHits,
        };
      });

      if (data.totalHits === 0) {
        return Report.warning('Not found!', 'Sorry, Nothing found', 'Close');
      }
    });
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1 });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      bigImage: largeImageURL,
    }));
  };

  render() {
    const { images, isLoading, totalHits, showModal, bigImage } = this.state;
    const isImage = Boolean(totalHits);

    return (
      <div className={css.container}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {isLoading && <Loader />}
        {showModal && <Modal image={bigImage} onClickModal={this.toggleModal} />}

        {isImage && <ImageGallery images={images} toggleModal={this.toggleModal} />}

        {totalHits >= 12 * this.state.page && <Button onClick={this.onLoadMore} />}
      </div>
    );
  }
}
