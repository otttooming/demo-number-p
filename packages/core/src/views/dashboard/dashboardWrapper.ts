import { connect } from "react-redux";
import { getPersons } from "./dashboardActions";
import DashboardView, { DispatchProps, StateProps } from "./DashboardView";
import { GlobalState } from "../../reducers";
import { getStatus } from "./dashboardSelectors";

const mapStateToProps = (state: GlobalState): StateProps => {
  return {
    status: getStatus(state),
  };
};

const mapDispatchToProps: DispatchProps = {
  getPersons,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardView);
