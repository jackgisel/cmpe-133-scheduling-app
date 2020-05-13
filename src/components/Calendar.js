import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { useSelector } from "react-redux";
import "./bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";

import CourseModal from "../components/CourseModal";

export default () => {
  const { events } = useSelector((state) => state.auth.user);
  const [showCourseModal, setShowCourseModal] = useState(false);

  return (
    <div>
      <FullCalendar
        defaultView="timeGridWeek"
        allDaySlot={false}
        hiddenDays={[0, 6]}
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
        eventClick={(e) => {
          let section = events.filter(
            (event) => event.title === e.event.title
          )[0];
          if (!section.isManual) setShowCourseModal(section);
        }}
      />
      {showCourseModal && (
        <CourseModal
          isOpen={!!showCourseModal}
          setIsOpen={(val) => setShowCourseModal(val)}
          section={showCourseModal}
        />
      )}
    </div>
  );
};
