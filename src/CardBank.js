import { connect } from "react-redux";
import { setVisibilityFilter } from "./actions";

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    }
  };
};

const CardBank = connect(mapStateToProps, mapDispatchToProps)(Link);

export default CardBank;
