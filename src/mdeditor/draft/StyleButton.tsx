import React from 'react';

export class StyleButton extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.onToggle = this.onToggle.bind(this);
  }
  public render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
  private onToggle = (e: any) => {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  }
}