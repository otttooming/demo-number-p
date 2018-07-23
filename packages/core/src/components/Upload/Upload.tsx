import * as React from "react";
import Dropzone, { DropzoneProps } from "react-dropzone";
import styled from "../../common/styled";
import Icon, { IconType } from "../Icon/Icon";
import { Progress } from "../Progress/Progress";

export interface UploadProps extends DropzoneProps {
  description: React.ReactChild;
  progress?: number | null;
}

const UploadWrapper = styled.div`
  position: relative;
  min-height: 120px;
  border: 1px dashed;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .upload__dropzone {
    min-height: 120px;
    width: 100%;
    height: 100%;
  }
`;

const UploadContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
`;

const Description = styled.div``;
const DescriptionIllustration = styled.div`
  margin-right: 32px;
`;

export default class Upload extends React.Component<UploadProps> {
  static defaultProps: Partial<UploadProps> = {
    accept: "",
    disablePreview: true,
    maxSize: 134217728,
    multiple: false,
  };

  constructor(props: UploadProps) {
    super(props);
  }

  renderIllustration = () => {
    const { progress } = this.props;

    return (
      <DescriptionIllustration>
        {!!progress ? (
          <Progress progress={progress} />
        ) : (
          <Icon icon={IconType.UPLOAD} />
        )}
      </DescriptionIllustration>
    );
  };

  render() {
    const {
      accept,
      disablePreview,
      maxSize,
      multiple,
      onDropAccepted,
      onDropRejected,
      description,
    } = this.props;

    const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
      id: "uploadField",
    };

    return (
      <UploadWrapper>
        <Dropzone
          accept={accept}
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
          disablePreview={disablePreview}
          maxSize={maxSize}
          multiple={multiple}
          className="upload__dropzone"
          activeClassName="upload__dropzone--active"
          inputProps={inputProps}
        >
          <UploadContent>
            {this.renderIllustration()}
            <Description>{description}</Description>
          </UploadContent>
        </Dropzone>
      </UploadWrapper>
    );
  }
}
