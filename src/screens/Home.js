import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from '../components/Page';
import Calendar from '../components/Calendar';

class Home extends Component {
  render() {
    return (
      <Page>
        <Calendar />
      </Page>
    );
  }
}
function mapStateToProps(state) {
  return {};
}
export default connect(mapStateToProps)(Home);
