import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

class Schedule extends Component {

    render() {
        return ( <FullCalendar 
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
        )
    }
}

export default Schedule;