import React, {Component} from "react";
import {Route} from "react-router-dom";
import {connect} from "react-redux";

import CollectionPage from "../collection/collection.component";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/firebase.utils";
import {updateCollections} from "../../redux/shop/shop.actions";

class ShopPage extends Component {
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');

        collectionRef.onSnapshot(async snapshot => {
            updateCollections(convertCollectionsSnapshotToMap(snapshot));
        });
    }

    render() {
        const {match} = this.props;

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
    }
}


const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
