import { connect } from "react-redux";
import { getPersons, uploadCsv } from "./dashboardActions";
import DashboardView, { DispatchProps, StateProps } from "./DashboardView";
import { GlobalState } from "../../reducers";
import {
  getStatus,
  getUpload,
  getUploadStatus,
  selectPersons,
} from "./dashboardSelectors";

const mapStateToProps = (state: GlobalState): StateProps => {
  return {
    persons: selectPersons(state),
    status: getStatus(state),
    upload: getUpload(state),
    uploadStatus: getUploadStatus(state),
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
