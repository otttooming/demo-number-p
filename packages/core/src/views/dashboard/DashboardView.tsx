import * as React from "react";
import { Dispatchable0 } from "redux-dispatchers";

export interface StateProps {
  status: string | null;
}

export interface DispatchProps {
  getPersons: Dispatchable0;
}

export type DashboardViewProps = StateProps & DispatchProps;

interface InternalState {}

class DashboardView extends React.Component<DashboardViewProps, InternalState> {
  constructor(props: DashboardViewProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>Message: {this.props.status || "no message"}</div>
        <button onClick={this.props.getPersons}>Click me</button>
      </div>
    );
  }
}

export default DashboardView;
