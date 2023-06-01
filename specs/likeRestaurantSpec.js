/* eslint-disable no-undef */
import FavIdb from '../src/scripts/data/database-idb';
import * as TestFactories from './helpers/testFactories';

const addLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

describe('Liking A Restaurant', () => {
  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the resto has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    expect(
      document.querySelector('[aria-label="Klik kalau suka"]'),
    ).toBeTruthy();
  });

  it('should not show the unlike button when the resto has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    expect(
      document.querySelector('[aria-label="Klik kalau gak jadi suka"]'),
    ).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const resto = await FavIdb.getFavorite(1);

    expect(resto).toEqual({ id: 1 });

    FavIdb.deleteFavorite(1);
  });

  it('should not add a resto again when its already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    await FavIdb.putFavorite({ id: 1 });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const allResto = await FavIdb.getAllFavorite();
    expect(allResto).toEqual([{ id: 1 }]);

    await FavIdb.deleteFavorite(1);
  });

  // menggunakan metode xit, bukan it
  it('should not add a resto when it has no id', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const allResto = await FavIdb.getAllFavorite();
    expect(allResto).toEqual([]);
  });
});
