import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

export default class Web extends Component {
  async componentDidMount() {
    const { navigation } = this.props;
    const { name } = this.props.route.params;

    navigation.setOptions({
      title: name,
    });
  }

  render() {
    const { uri } = this.props.route.params;

    return <WebView source={{ uri }} style={{ flex: 1 }} />;
  }
}
