import React from 'react';
import {connect} from "react-redux";

import {selectCollection} from "../../redux/shop/shop.selectors";

import "./collection.styles.scss";

const CollectionPage = ({collection}) => {
    console.log(collection);

    return (
        <div className="collection-page">
            <h2>CATEGORY PAGE</h2>
        </div>
    );
};

// selectCollection is a selector that takes in the collectionId(a string not a interger. for eg. hats)
// it returns a function which takes in the state as argument which is a.k.a. CURRYING in JS
// here ownProps is the props in the CollectionPage component
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);
