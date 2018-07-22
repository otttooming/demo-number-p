import * as React from "react";
import { Dispatchable0, Dispatchable1 } from "redux-dispatchers";
import { RequestStatus, PageableRequest, Page } from "../../gateway/Api";
import { IPerson } from "./dashboardActions";
import Card, { CardMeta, Color, CardTheme } from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Container, {
  ContainerVariant,
} from "../../components/Container/Container";
import Flex from "../../components/Grid/Flex/Flex";
import Box from "../../components/Grid/Box/Box";
import { IconType } from "../../components/Icon/Icon";

export interface StateProps {
  status: string | null;
  upload: any;
  uploadStatus: RequestStatus | undefined;
  persons: Page<IPerson> | null;
}

export interface DispatchProps {
  getPersons: Dispatchable1<PageableRequest>;
  uploadCsv: Dispatchable1<Blob>;
}

export type DashboardViewProps = StateProps & DispatchProps;

interface InternalState {
  isUploadShowing: boolean;
}

class DashboardView extends React.Component<DashboardViewProps, InternalState> {
  constructor(props: DashboardViewProps) {
    super(props);

    this.state = {
      isUploadShowing: false,
    };
  }

  onFormSubmit(e: any) {
    e.preventDefault();
  }

  onChange = (e: any) => {
    this.props.uploadCsv(e.target.files[0]);
  };

  handleGetPersons = () => {
    const request: PageableRequest = {
      size: 30,
      number: 1,
      sort: null,
    };

    this.props.getPersons(request);
  };

  handleHeaderActionSwitch = (): void => {
    this.setState(previousState => {
      return {
        isUploadShowing: !previousState.isUploadShowing,
      };
    });
  };

  createPersonMeta = (person: IPerson): CardMeta[] => {
    const meta: CardMeta[] = [];

    meta.push({
      label: "Age",
      content: String(person.age),
    });

    meta.push({
      label: "Address",
      content: person.address,
    });

    return meta;
  };

  createPersonThemeColor = (color: string): Color => {
    switch (color) {
      case "BLUE":
        return Color.BLUE;
      case "WHITE":
        return Color.BLUE;
      case "GREEN":
        return Color.GREEN;
      case "YELLOW":
        return Color.YELLOW;
      default:
        return Color.WHITE;
    }
  };

  renderHeaderAction = () => {
    const { isUploadShowing } = this.state;
    const progress: number | null = this.props.uploadStatus
      ? this.props.uploadStatus.progress
      : null;

    if (isUploadShowing) {
      return (
        <form onSubmit={this.onFormSubmit}>
          <h1>File Upload: {progress}</h1>
          <input type="file" onChange={this.onChange} />
          <button type="submit">Upload</button>
        </form>
      );
    }

    return (
      <div>
        <div>Message: {this.props.status || "no message"}</div>
        <Button onClick={this.handleGetPersons}>Click me</Button>
      </div>
    );
  };

  renderPersons = () => {
    const { persons } = this.props;

    if (!persons) {
      return null;
    }

    return persons.content.map((item, index) => {
      const { name, team } = item;

      const theme: CardTheme = {
        color: this.createPersonThemeColor(team),
      };

      return (
        <Card
          key={index}
          title={name}
          theme={theme}
          meta={this.createPersonMeta(item)}
        />
      );
    });
  };

  render() {
    return (
      <div>
        <Container variant={ContainerVariant.HERO}>
          <Flex>
            <Box width={2 / 12}>
              <Button
                icon={IconType.SEARCH}
                onClick={this.handleHeaderActionSwitch}
              >
                Switch
              </Button>
            </Box>
            <Box width={10 / 12}>{this.renderHeaderAction()}</Box>
          </Flex>
        </Container>

        <Container>{this.renderPersons()}</Container>
      </div>
    );
  }
}

export default DashboardView;
