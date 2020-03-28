import React from 'react';
import {connect} from "react-redux";

import {selectCollection} from "../../redux/shop/shop.selectors";
import CollectionItem from "../../components/collection-item/collection-item.components";

import "./collection.styles.scss";

const CollectionPage = ({collection}) => {
    const {title, items} = collection;

    return (
        <div className="collection-page">
            <h2 className="title">{title}</h2>
            <div className="items">
                {
                    items.map(item => (
                        <CollectionItem
                            key={item.id}
                            item={item}
                        />
                    ))
                }
            </div>
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
