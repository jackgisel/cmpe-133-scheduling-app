import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

class Schedule extends Component {
    handleLogout = () => {
        const { dispatch } = this.props;
        dispatch(logoutUser());
      };

    render() {
        return ( 
            <div>
                <FullCalendar
                        defaultView="dayGridMonth" 
                        plugins={[dayGridPlugin, interactionPlugin]}
                        editable={true}
                        eventDrop={this.handleEventDrop}
                        eventClick={this.handleEventClick}
                        events={[
                            { title: 'event 1', date: '2019-04-01' },
                            { title: 'event 2', date: '2019-04-02' }
                        ]}
                />
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
      isLoggingOut: state.auth.isLoggingOut,
      logoutError: state.auth.logoutError
    };
  }
export default connect(mapStateToProps)(Schedule);