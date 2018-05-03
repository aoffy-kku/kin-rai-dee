import React from 'react';

export default class FileBase64 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    // get the files
    const files = e.target.files;

    // Process each file
    const allFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Make new FileReader
      const reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        const fileInfo = {
          name: file.name,
          type: file.type,
          size: `${Math.round(file.size / 1000)} kB`,
          base64: reader.result,
          file,
        };

        // Push it to the state
        allFiles.push(fileInfo);

        // If all files have been proceed
        if (allFiles.length == files.length) {
          // Apply Callback function
          if (this.props.multiple) this.props.onDone(allFiles);
          else this.props.onDone(allFiles[0]);
        }
      };// reader.onload
    } // for
  }

  render() {
    return (
      <input
        type="file"
        accept="image/*"
        onChange={e => this.handleChange(e)}
        multiple={this.props.multiple}
      />
    );
  }
}

FileBase64.defaultProps = {
  multiple: false,
};
