import * as React from "react";
import Downshift, {
  GetItemPropsOptions,
  ControllerStateAndHelpers,
  DownshiftState,
  StateChangeOptions,
} from "downshift";
import styled, { css } from "../../common/styled";
import { Popover } from "../Popover/Popover";
import SelectInput from "./SelectInput";
import SelectListItem from "./SelectListItem";

export interface SelectGroupProps {
  label: string;
}

export interface SelectMetaProps {
  label: string;
}

export interface SelectSearchProps {
  label: string;
}

export interface SelectItemProps {
  label: string;
  value: any;
  searchTerms?: SelectSearchProps[];
  group?: SelectGroupProps;
  meta?: SelectMetaProps[];
}
export interface Props {
  items: SelectItemProps[];
  resultLimit?: number;
  onChange?: (value: SelectItemProps | undefined) => void;
  onInputChange?: (inputValue: string) => void;
}

export interface State {
  selected: SelectItemProps | undefined;
}

export type SelectProps = Props;

export interface SelectGroupedNodes {
  [key: string]: React.ReactNode[];
}

export enum SELECT_GROUP {
  NOT_GROUPED = "NOT_GROUPED",
}

export default class SelectBase extends React.Component<SelectProps, State> {
  private resultLimit: number | undefined;
  state: State = { selected: undefined };

  constructor(props: SelectProps) {
    super(props);

    this.resultLimit = props.resultLimit;
  }

  render() {
    const { items } = this.props;
    const label =
      this.state.selected && this.state.selected.label
        ? this.state.selected.label
        : undefined;

    return (
      <Downshift
        onInputValueChange={this.handleDownshiftInputValueChange}
        onChange={this.handleDownshiftChange}
        itemToString={item => (!!item ? item.label : "")}
        stateReducer={this.stateReducer}
      >
        {options => {
          const {
            getInputProps,
            getItemProps,
            getLabelProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem,
            setState,
            clearSelection,
          } = options;

          return (
            <div>
              <Popover
                isOpen={isOpen}
                popoverChildren={() =>
                  this.renderPopoverChildren(options, items)
                }
              >
                {({ ref }) => (
                  <SelectInput>
                    <input
                      ref={ref}
                      {...getInputProps()}
                      onFocus={this.handleFocus(setState)}
                      placeholder="Search for people"
                    />
                  </SelectInput>
                )}
              </Popover>
            </div>
          );
        }}
      </Downshift>
    );
  }

  renderPopoverChildren(
    options: ControllerStateAndHelpers<any>,
    items: SelectItemProps[]
  ): React.ReactNode {
    const {
      getInputProps,
      getItemProps,
      getLabelProps,
      isOpen,
      inputValue,
      highlightedIndex,
      selectedItem,
    } = options;

    const ob: SelectGroupedNodes = {};

    const reduc: SelectGroupedNodes = items
      .filter(this.getFilteredResults(inputValue))
      .filter(
        (item, index) => (this.resultLimit ? index < this.resultLimit : true)
      )
      .reduce((acc, cur, index) => {
        const item: JSX.Element = this.renderSelectItem(options, cur, index);

        const newAcc = { ...acc };

        if (!cur.group && !newAcc[SELECT_GROUP.NOT_GROUPED]) {
          newAcc[SELECT_GROUP.NOT_GROUPED] = [item];

          return newAcc;
        }

        if (!cur.group) {
          newAcc[SELECT_GROUP.NOT_GROUPED] = [
            ...acc[SELECT_GROUP.NOT_GROUPED],
            item,
          ];

          return newAcc;
        }

        if (!acc[cur.group.label]) {
          newAcc[cur.group.label] = [item];

          return newAcc;
        }

        newAcc[cur.group.label] = [...acc[cur.group.label], item];

        return newAcc;
      }, ob);

    const groupedItems = Object.entries(reduc).map((arr, index) => {
      return <ul key={index}>{arr[1]}</ul>;
    });

    const empty: boolean = !groupedItems.length;

    return (
      <div
        style={
          empty
            ? {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }
            : undefined
        }
      >
        {empty ? "Nothing found" : groupedItems}
      </div>
    );
  }

  renderSelectItem(
    options: ControllerStateAndHelpers<any>,
    selectItem: SelectItemProps,
    index: number
  ): JSX.Element {
    const {
      getInputProps,
      getItemProps,
      getLabelProps,
      isOpen,
      inputValue,
      highlightedIndex,
      selectedItem,
    } = options;

    return (
      <SelectListItem
        {...getItemProps({
          key: index,
          index,
          item: selectItem,
          style: {
            backgroundColor: highlightedIndex === index ? "lightgray" : "white",
            fontWeight: selectedItem === selectItem ? "bold" : "normal",
          },
        })}
      >
        {this.renderDropdownItem(selectItem)}
      </SelectListItem>
    );
  }

  renderDropdownItem = (item: SelectItemProps) => {
    if (!item) {
      return null;
    }

    if (!item.meta) {
      return item.label;
    }

    return (
      <div>
        {item.label}
        <ul>{item.meta.map(({ label }) => label)}</ul>
      </div>
    );
  };

  stateReducer(state: DownshiftState<any>, changes: StateChangeOptions<any>) {
    switch (changes.type) {
      case Downshift.stateChangeTypes.blurInput:
        return {
          ...changes,
          isOpen: false,
        };
      default:
        return changes;
    }
  }

  handleDownshiftChange = (selected: SelectItemProps | undefined) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(!selected ? undefined : selected);
    }

    this.setState({ selected });
  };

  handleDownshiftInputValueChange = (inputValue: string) => {
    const { onInputChange } = this.props;

    if (onInputChange) {
      onInputChange(inputValue);
    }
  };

  handleFocus = (
    setState: (
      stateToSet: Partial<StateChangeOptions<any>>,
      cb?: () => void
    ) => void,
    clearSelection?: () => void
  ) => () => {
    if (clearSelection) {
      clearSelection();
    }

    setState({ isOpen: true });
  };

  getFilteredResults = (inputValue: string | null) => (
    item: SelectItemProps
  ): boolean => {
    const { searchTerms, label } = item;

    if (!inputValue || !searchTerms) {
      return true;
    }

    const searchTermLabels: string[] = searchTerms.map(term => term.label);

    searchTermLabels.push(label);

    return !!searchTermLabels.join(" ").match(new RegExp(inputValue, "gi"));
  };
}
