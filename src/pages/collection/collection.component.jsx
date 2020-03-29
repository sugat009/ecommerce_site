import React from 'react';
import {connect} from "react-redux";

import {selectCollection} from "../../redux/shop/shop.selectors";
import CollectionItem from "../../components/collection-item/collection-item.components";

import {CollectionPageContainer, ItemContainer, TitleContainer} from "./collection.styles";

const CollectionPage = ({collection}) => {
    const {title, items} = collection;

    return (
        <CollectionPageContainer>
            <TitleContainer>{title}</TitleContainer>
            <ItemContainer>
                {
                    items.map(item => (
                        <CollectionItem
                            key={item.id}
                            item={item}
                        />
                    ))
                }
            </ItemContainer>
        </CollectionPageContainer>
    );
};

// selectCollection is a selector that takes in the collectionId(a string not a interger. for eg. hats)
// it returns a function which takes in the state as argument which is a.k.a. CURRYING in JS
// here ownProps is the props in the CollectionPage component
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);
