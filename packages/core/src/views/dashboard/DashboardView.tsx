import * as React from "react";
import { Dispatchable0, Dispatchable1 } from "redux-dispatchers";
import { RequestStatus, PageableRequest, Page } from "../../gateway/Api";
import { IPerson } from "./dashboardActions";
import Card, { CardMeta, Color, CardTheme } from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Container, {
  ContainerVariant,
} from "../../components/Container/Container";
import Flex, { HorizontalAlignment } from "../../components/Grid/Flex/Flex";
import Box from "../../components/Grid/Box/Box";
import { IconType } from "../../components/Icon/Icon";
import Upload from "../../components/Upload/Upload";
import { Popover } from "../../components/Popover/Popover";
import Select, { SelectItemProps } from "../../components/Select/Select";

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
  selectedPerson: string | null;
  showAllPersons: boolean;
  csv: File | null;
}

class DashboardView extends React.Component<DashboardViewProps, InternalState> {
  constructor(props: DashboardViewProps) {
    super(props);

    this.state = {
      isUploadShowing: false,
      selectedPerson: null,
      showAllPersons: false,
      csv: null,
    };
  }

  handleCsvSubmit = (): void => {
    const { uploadCsv } = this.props;
    const { csv } = this.state;

    if (csv) {
      uploadCsv(csv);
    }
  };

  handleCsvDropAccepted = (acceptedFiles: File[]): void => {
    this.setState({
      csv: acceptedFiles[0],
    });
  };

  handleSelectChange = (selected: SelectItemProps) => {
    this.setState({
      selectedPerson: selected.value,
      showAllPersons: false,
    });
  };

  handleSelectInputChange = (inputValue: string) => {
    const request: PageableRequest = {
      size: 30,
      number: 1,
      sort: null,
      query: { name: inputValue },
    };

    this.props.getPersons(request);
  };

  handleGetAllPersons = async (page: number = 0) => {
    const request: PageableRequest = {
      size: 20,
      number: 0,
      sort: null,
    };

    await this.props.getPersons(request);

    this.setState({
      selectedPerson: null,
      showAllPersons: true,
    });
  };

  handleGetPersons = () => {
    const request: PageableRequest = {
      size: 20,
      number: 0,
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

    meta.push({
      label: "Team",
      content: person.team,
    });

    return meta;
  };

  createSelectItems = (): SelectItemProps[] => {
    const { persons } = this.props;

    if (!persons || !persons.content) {
      return [];
    }

    return persons.content.map(item => {
      return {
        label: item.name,
        value: item.name,
      };
    });
  };

  createPersonThemeColor = (color: string): Color => {
    switch (color) {
      case "BLUE":
        return Color.BLUE;
      case "WHITE":
        return Color.WHITE;
      case "GREEN":
        return Color.GREEN;
      case "YELLOW":
        return Color.YELLOW;
      default:
        return Color.WHITE;
    }
  };

  renderHeaderAction = () => {
    const { uploadCsv } = this.props;
    const { isUploadShowing } = this.state;
    const progress: number | null = this.props.uploadStatus
      ? this.props.uploadStatus.progress
      : null;

    if (isUploadShowing) {
      return (
        <Upload
          accept="text/csv,.csv"
          progress={progress}
          description={<span>Upload CSV</span>}
          onDropAccepted={(acceptedFiles: File[]) => {
            this.handleCsvDropAccepted(acceptedFiles);
          }}
          onDropRejected={(
            rejected: any,
            event: React.DragEvent<HTMLDivElement>
          ) => {
            alert(
              "selected files were rejected (probably too big or wrong type)"
            );
          }}
        />
      );
    }

    return (
      <div>
        <Select
          items={this.createSelectItems()}
          onChange={this.handleSelectChange}
          onInputChange={this.handleSelectInputChange}
        />
      </div>
    );
  };

  renderPersons = () => {
    const { persons } = this.props;

    if (!persons) {
      return null;
    }

    const selectedPerson: IPerson | undefined = persons.content.find(
      item => item.name === this.state.selectedPerson
    );

    if (!selectedPerson) {
      return null;
    }

    const { name, team } = selectedPerson;

    const theme: CardTheme = {
      color: this.createPersonThemeColor(team),
    };

    return (
      <Card
        title={name}
        theme={theme}
        meta={this.createPersonMeta(selectedPerson)}
      />
    );
  };

  render() {
    const { isUploadShowing } = this.state;
    return (
      <>
        <Container variant={ContainerVariant.HERO}>
          <Flex verticalCenter={true}>
            <Box width={2 / 12}>
              <Button
                icon={IconType.SEARCH}
                onClick={this.handleHeaderActionSwitch}
              >
                Switch
              </Button>
            </Box>
            <Box width={isUploadShowing ? 8 / 12 : 10 / 12}>
              {this.renderHeaderAction()}
            </Box>
            {isUploadShowing && (
              <Box width={2 / 12}>
                <Flex horizontalAlignment={HorizontalAlignment.RIGHT}>
                  {isUploadShowing && (
                    <Button id="uploadButton" onClick={this.handleCsvSubmit}>
                      Submit
                    </Button>
                  )}
                </Flex>
              </Box>
            )}
          </Flex>
        </Container>

        <Container>
          <Flex>
            <Box width={2 / 12}>
              <Button onClick={this.handleGetAllPersons}>Show all</Button>
            </Box>
            <Box width={10 / 12}>{this.renderPersons()}</Box>
          </Flex>
        </Container>
      </>
    );
  }
}

export default DashboardView;
