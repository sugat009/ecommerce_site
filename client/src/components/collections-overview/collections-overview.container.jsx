import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";
import {compose} from "redux";

import CollectionsOverview from './collections-overview.component';
import WithSpinner from "../with-spinner/with-spinner.component";
import {selectIsCollectionFetching} from "../../redux/shop/shop.selectors";


// In container pattern, we load the exact name that is expected by the component
// in this case isLoading
const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
});

// currying the functions together, Right To Left Evaluation
const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
