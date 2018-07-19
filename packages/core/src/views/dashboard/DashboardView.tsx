import * as React from "react";
import { Dispatchable0, Dispatchable1 } from "redux-dispatchers";

export interface StateProps {
  status: string | null;
  upload: any;
}

export interface DispatchProps {
  getPersons: Dispatchable0;
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

  render() {
    return (
      <div>
        <div>Message: {this.props.status || "no message"}</div>
        <button onClick={this.props.getPersons}>Click me</button>

        <form onSubmit={this.onFormSubmit}>
          <h1>File Upload</h1>
          <input type="file" onChange={this.onChange} />
          <button type="submit">Upload</button>
        </form>
      </div>
    );
  }
}

export default DashboardView;
