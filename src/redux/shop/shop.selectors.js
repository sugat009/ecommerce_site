import {createSelector} from "reselect";

const COLLECTION_ID_MAP = {
    hats: 1,
    sneakers: 2,
    jackets: 3,
    women: 4,
    men: 5
};

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

// createSelector takes in the state and returns a function which basically returns collection in this case
export const selectCollection = collectionUrlParam => createSelector(
    [selectCollections],
    collections => collections.find(collection =>
        collection.id === COLLECTION_ID_MAP[collectionUrlParam]
    )
);
