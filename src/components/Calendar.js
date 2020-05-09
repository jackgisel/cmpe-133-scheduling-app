import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from "@fullcalendar/bootstrap";

import { useSelector } from "react-redux";

import "./bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";

export default (props) => {
  const { events } = useSelector((state) => state.auth.user);

  useEffect(() => console.log(events), [events]);

  return (
    <FullCalendar
      defaultView="timeGridWeek"
      allDaySlot={false}
      plugins={[
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin,
        bootstrapPlugin,
      ]}
      themeSystem="bootstrap"
      minTime={"06:00:00"}
      header={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
      }}
      events={events}
    />
  );
};
