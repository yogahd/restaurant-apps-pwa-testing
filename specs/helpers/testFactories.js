import LikeButtonPresenter from '../../src/scripts/utils/like-button-initiator';
import FavIdb from '../../src/scripts/data/database-idb';

const createLikeButtonPresenterWithResto = async (restaurant) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favIdb: FavIdb,
    data: {
      restaurant,
    },
  });
};

// eslint-disable-next-line import/prefer-default-export
export { createLikeButtonPresenterWithResto };
