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

  async fetchImages(searchQuery, page) {
    try {
      await fetchGallery(searchQuery, page).then(data => {
        this.setState(prevState => {
          return {
            prevState,
            isLoading: false,
            images: [...prevState.images, ...data.hits],
            searchQuery: searchQuery,
            totalHits: data.totalHits,
          };
        });
      });
    } catch (error) {
      this.setState({ error: true, isLoading: false });
      console.log(error);
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
    console.log(totalHits);

    return (
      <div className={css.container}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {isLoading ? 'Loading...' : <ImageGallery images={images} />}
        {images.length !== 0 && <Button onClick={this.onLoadMore} />}
      </div>
    );
  }
}
