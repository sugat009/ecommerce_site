import React, {Component} from "react";
import {Route} from "react-router-dom";
import {connect} from "react-redux";

import CollectionPage from "../collection/collection.component";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/firebase.utils";
import {updateCollections} from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
    // This state is used for showing the spinner in the components that use data from the Backend
    state = {
        loading: true
    };

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');

        collectionRef.onSnapshot(async snapshot => {
            updateCollections(convertCollectionsSnapshotToMap(snapshot));
            // This setState call changes the state of this component which causes the
            // ReactDOM to re-render or recall the render method but this time the loading
            // is false so the components are displayed with data
            this.setState({
                loading: false
            });
        });
    }

    render() {
        const {match} = this.props;
        const {loading} = this.state;

        return (
            <div className="shop-page">
                {/* This concept is known as nested routing */}
                {/* here the match props is passed by the Route component along with history and some other thing*/}
                {/* but we only need match in this case */}
                {/* This is done to ensure that the component is reusable and also that ShopPage component*/}
                {/* does not need to know which route it lies in */}
                {/* render prop is similar to that of component except that the props like match, history and route */}
                {/* need to be explicitly passed into the rendering component */}
                <Route
                    exact
                    path={`${match.path}`}
                    render={(props) =>
                        <CollectionsOverviewWithSpinner isLoading={loading} {...props} />}
                />
                {/* NOTE: collectionID is not integer but a string like hats, jackets, etc. */}
                <Route
                    path={`${match.path}/:collectionId`}
                    render={(props) =>
                        <CollectionsPageWithSpinner isLoading={loading} {...props} />}
                />
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
