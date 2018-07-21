import * as React from "react";
import { Dispatchable0, Dispatchable1 } from "redux-dispatchers";
import { RequestStatus, PageableRequest, Page } from "../../gateway/Api";
import { IPerson } from "./dashboardActions";

export interface StateProps {
  status: string | null;
  upload: any;
  uploadStatus: RequestStatus | undefined;
  persons: Page<IPerson>[] | null;
}

export interface DispatchProps {
  getPersons: Dispatchable1<PageableRequest>;
  uploadCsv: Dispatchable1<Blob>;
}

export type DashboardViewProps = StateProps & DispatchProps;

interface InternalState {}

class DashboardView extends React.Component<DashboardViewProps, InternalState> {
  constructor(props: DashboardViewProps) {
    super(props);
  }

  onFormSubmit(e: any) {
    e.preventDefault();
  }

  onChange = (e: any) => {
    this.props.uploadCsv(e.target.files[0]);
  };

  handleGetPersons = (e: any) => {
    const request: PageableRequest = {
      size: 30,
      number: 1,
      sort: null,
    };

    this.props.getPersons(request);
  };

  render() {
    const progress: number | null = this.props.uploadStatus
      ? this.props.uploadStatus.progress
      : null;

    return (
      <div>
        <div>Message: {this.props.status || "no message"}</div>
        <button onClick={this.handleGetPersons}>Click me</button>

        <form onSubmit={this.onFormSubmit}>
          <h1>File Upload: {progress}</h1>
          <input type="file" onChange={this.onChange} />
          <button type="submit">Upload</button>
        </form>
      </div>
    );
  }
}

export default DashboardView;
