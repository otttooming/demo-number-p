import { connect } from "react-redux";
import { getPersons, uploadCsv } from "./dashboardActions";
import DashboardView, { DispatchProps, StateProps } from "./DashboardView";
import { GlobalState } from "../../reducers";
import { getStatus, getUpload } from "./dashboardSelectors";

const mapStateToProps = (state: GlobalState): StateProps => {
  return {
    status: getStatus(state),
    upload: getUpload(state),
  };
};

const mapDispatchToProps: DispatchProps = {
  getPersons,
  uploadCsv,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardView);
