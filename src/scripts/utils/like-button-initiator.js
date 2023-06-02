import FavIdb from '../data/database-idb';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, data }) {
    this._likeButtonContainer = likeButtonContainer;
    this._favIdb = FavIdb;
    this._data = data;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._data;
    console.log(this._data);

    if (await this._isDataExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isDataExist(id) {
    const resto = await this._favIdb.getFavorite(id);
    return !!resto;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = `
        <button aria-label="Klik kalau suka" id="likeButton" class="like">
            <i class="fa fa-star-o" aria-hidden="true"></i>
        </button>`;

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favIdb.putFavorite(this._data);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = `
        <button aria-label="Klik kalau gak jadi suka" id="likedButton" class="like">
            <i class="fa fa-star" aria-hidden="true"></i>
        </button>`;

    const likeButton = document.querySelector('#likedButton');
    likeButton.addEventListener('click', async () => {
      await this._favIdb.deleteFavorite(this._data.id);
      this._renderButton();
    });
  },
};

export default LikeButtonInitiator;
