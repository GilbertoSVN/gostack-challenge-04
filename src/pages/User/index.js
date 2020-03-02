import React, { Component } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Loading,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  /*
  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    route: PropTypes.shape().isRequired,
  };
 */

  // eslint-disable-next-line react/state-in-constructor
  state = {
    stars: [],
    login: '',
    loading: false,
    page: 1,
    keep: true,
    loadingMore: false,
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const { route } = this.props;
    const { user } = route.params;
    const { page } = this.state;

    navigation.setOptions({
      title: user.login,
    });

    this.setState({ login: user.login, loading: true });
    const response = await api.get(`/users/${user.login}/starred?page=${page}`);

    this.setState({ stars: response.data, loading: false });
  }

  loadMore = async () => {
    const { stars, page, login, keep, loadingMore } = this.state;

    if (keep && !loadingMore) {
      this.setState({ loadingMore: true });
      const response = await api.get(
        `/users/${login}/starred?page=${page + 1}`,
      );

      this.setState({
        stars: [...stars, ...response.data],
        loadingMore: false,
        page: page + 1,
        keep: !!response.data.length,
      });
    }
  };

  refreshList = async () => {
    const { login } = this.state;

    this.setState({ loadingMore: true });
    const response = await api.get(`/users/${login}/starred?page=${1}`);

    this.setState({
      stars: response.data,
      loadingMore: false,
      page: 1,
    });
  };

  renderFooter = () => {
    const { loading } = this.state;

    if (!loading) return null;

    return <ActivityIndicator size="small" color="#7159c1" />;
  };

  handleNavigate = item => {
    const { navigation } = this.props;
    const { name, html_url: uri } = item;

    navigation.navigate('Webview', { name, uri });
  };

  render() {
    const { stars, loading, loadingMore } = this.state;
    const { route } = this.props;
    const { user } = route.params;

    return loading ? (
      <Loading>
        <ActivityIndicator size="large" color="#7159c1" />
      </Loading>
    ) : (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          refreshControl={
            <RefreshControl
              onRefresh={this.refreshList}
              refreshing={loadingMore}
            />
          }
          onEndReachedThreshold={0.2}
          onEndReached={this.loadMore}
          ListFooterComponent={this.renderFooter}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.handleNavigate(item)}>
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            </TouchableOpacity>
          )}
        />
      </Container>
    );
  }
}
