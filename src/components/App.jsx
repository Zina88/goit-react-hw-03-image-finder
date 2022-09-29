import React, { Component } from 'react';
import fetchGallery from '../services/api';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Button from './Button';
import css from './App.module.css';

export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    isLoading: false,
    error: false,
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      try {
        this.setState({ isLoading: true, page: 1, images: [] });
        const images = await fetchGallery(searchQuery, page);
        console.log(images);
        this.setState({ images, isLoading: false, page: 1 });
      } catch (error) {
        console.log(error);
      }
    }
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1 });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, isLoading, totalHits } = this.state;

    return (
      <div className={css.container}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {isLoading ? 'Loading...' : <ImageGallery images={images} />}
        {images.length !== totalHits && <Button onClick={this.onLoadMore} />}
      </div>
    );
  }
  //   const { images, error, status } = this.state;

  //   if (status === 'idle') {
  //     return (
  //       <div>
  //       <p>Введите ключевое слово! </p>
  //       <Searchbar />
  //     </div>
  //     )
  //   }

  //   if (status === 'pending') {
  //     return;
  //   }

  //   if (status === 'rejected') {
  //     return;
  //   }

  //   if (status === 'resolved') {
  //     return;
  //   }
  // }
}
