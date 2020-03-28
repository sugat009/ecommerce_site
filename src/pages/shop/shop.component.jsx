import React from "react";
import {Route} from "react-router-dom";

import CollectionPage from "../collection/collection.component";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";

const ShopPage = ({match}) => {
    return (
        <div className="shop-page">
            {/* This concept is known as nested routing */}
            {/* here the match props is passed by the Route component along with history and some other thing*/}
            {/* but we only need match in this case */}
            {/* This is done to ensure that the component is reusable and also that ShopPage component*/}
            {/* does not need to know which route it lies in */}
            <Route
                exact
                path={`${match.path}`}
                component={CollectionsOverview}
            />
            {/* NOTE: collectionID is not integer but a string like hats, jackets, etc. */}
            <Route
                path={`${match.path}/:collectionId`}
                component={CollectionPage}
            />
        </div>
    );
};

export default ShopPage;
