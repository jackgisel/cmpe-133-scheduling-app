import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { useSelector } from "react-redux";
import { Box } from "@material-ui/core";

import "./bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";

import CourseModal from "../components/CourseModal";

export default () => {
  let selectedSchedule = useSelector((state) => state.auth.user.schedule);
  let events = useSelector((state) => state.auth.user.events);
  const [showCourseModal, setShowCourseModal] = useState(false);

  console.log(events);

  return (
    <>
      <Box maxHeight={100}>
        <FullCalendar
          defaultView="timeGridWeek"
          allDaySlot={false}
          hiddenDays={[0, 6]}
          height={window.innerWidth * 0.4}
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
          events={events?.filter(
            (event) => event.schedule === selectedSchedule
          )}
          eventClick={(e) => {
            let section = events.filter(
              (event) => event.title === e.event.title
            )[0];
            if (!section.isManual) setShowCourseModal(section);
          }}
        />
      </Box>
      {showCourseModal && (
        <CourseModal
          isOpen={!!showCourseModal}
          setIsOpen={(val) => setShowCourseModal(val)}
          section={showCourseModal}
        />
      )}
    </>
  );
};
