/* eslint-disable no-undef */
import FavIdb from '../src/scripts/data/database-idb';
import * as TestFactories from './helpers/testFactories';

const addLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

describe('Unliking Resto', () => {
  beforeEach(async () => {
    addLikeButtonContainer();
    await FavIdb.putFavorite({ id: 1 });
  });

  afterEach(async () => {
    await FavIdb.deleteFavorite(1);
  });

  it('should display unlike widget when the resto has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    expect(
      document.querySelector('[aria-label="Klik kalau gak jadi suka"]'),
    ).toBeFalsy();
  });

  it('should not display unlike widget when the resto has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    expect(
      document.querySelector('[aria-label="Klik kalau suka"]'),
    ).toBeTruthy();
  });

  it('should be able to remove liked restaurant from the list', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    document.querySelector('[aria-label="Klik kalau gak jadi suka"]').dispatchEvent(new Event('click'));

    const allResto = await FavIdb.getAllFavorite();
    expect(allResto).toEqual([]);
  });
});
