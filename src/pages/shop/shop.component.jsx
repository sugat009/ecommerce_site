import React, {Component} from "react";
import {Route} from "react-router-dom";
import {connect} from "react-redux";

import {fetchCollectionsStartAsync} from "../../redux/shop/shop.actions";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";

class ShopPage extends Component {
    componentDidMount() {
        // const {updateCollections} = this.props;

        // This is what is called the observables / observer pattern
        // the function inside onSnapshot() is called next()
        // On error is the part which is executed when error occurs(not implemented here)
        // For firebase there is no onFinish
        // Here, observable is the firebase database
        // the observer is our firebase API object
        // collectionRef.onSnapshot(async snapshot => {
        //     updateCollections(convertCollectionsSnapshotToMap(snapshot));
        //     // This setState call changes the state of this component which causes the
        //     // ReactDOM to re-render or recall the render method but this time the loading
        //     // is false so the components are displayed with data
        //     this.setState({
        //         loading: false
        //     });
        // });

        // This is what is known to the promise pattern where the data is request once only
        // when the component is mounted
        // collectionRef.get().then(snapshot => {
        //     updateCollections(convertCollectionsSnapshotToMap(snapshot));
        //     // This setState call changes the state of this component which causes the
        //     // ReactDOM to re-render or recall the render method but this time the loading
        //     // is false so the components are displayed with data
        //     this.setState({
        //         loading: false
        //     });
        // });

        // This is a native request to the API URL
        // fetch("https://firestore.googleapis.com/v1/projects/ecommerce-db-ad249/databases/(default)/documents/collections/")
        //     .then(response => response.json())
        //     .then(collections => console.log(collections));
        const {fetchCollectionsStartAsync} = this.props;
        fetchCollectionsStartAsync();
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
                {/* render prop is similar to that of component except that the props like match, history and route */}
                {/* need to be explicitly passed into the rendering component */}
                <Route
                    exact
                    path={`${match.path}`}
                    component={CollectionsOverviewContainer}
                />
                {/* NOTE: collectionID is not integer but a string like hats, jackets, etc. */}
                <Route
                    path={`${match.path}/:collectionId`}
                    component={CollectionPageContainer}
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(null, mapDispatchToProps)(ShopPage);
