import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Button, Grid2 } from '@mui/material';
import 'tui-calendar/dist/tui-calendar.css';

import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import Calendar from 'tui-calendar';
import { useGetNhiemVuByPhongBanIdQuery } from 'src/App/Api/NhiemVuApi';
const TimeLine = () => {
    const { data: tasks } = useGetNhiemVuByPhongBanIdQuery();
    // const tasks = [
    //     {
    //         id: "1",
    //         tieuDe: "Họp khách hàng",
    //         moTa: "Trao đổi về hợp đồng",
    //         isThongBao: true,
    //         createAt: Date.now(),
    //         hanHoanThanh: "2025-01-25T10:00:00",
    //         khachHangTiemNangId: "12345",
    //         mucDoUuTienId: "67890",
    //         trangThaiThucHienId: "111213",
    //         khachHangMucTieuId: "999999",
           
    //     },
    //     {
    //         id: "2",
    //         tieuDe: "Nộp báo cáo",
    //         moTa: "Hoàn thành báo cáo dự án",
    //         isThongBao: false,
    //         createAt: Date.now(),
    //         hanHoanThanh: "2025-01-28T14:00:00",
    //         khachHangTiemNangId: "23456",
    //         mucDoUuTienId: "78901",
    //         trangThaiThucHienId: "121314",
    //         khachHangMucTieuId: "888888",
    //     },
    // ];
    let calendarInstance;
    const calendarRef = useRef(null);
    const mapTasksToSchedules = (tasks) => {
        return tasks.map((task) => ({
            id: task?.id,
            calendarId: task?.mucDoUuTienId || "default",
            title: task?.tieuDe,
            body: task?.moTa,
            start: task?.createAt,
            end: task?.hanHoanThanh,
            category: "time",
            isReadOnly: false,
        }));
    };
    const updateTaskStatus = (schedules, id, statusId) => {
        return schedules.map((schedule) => {
          if (schedule.id === id) {
            let newStatus;
            switch (statusId) {
              case "111213":  
                newStatus = "Đang thực hiện";
                break;
              case "121314": 
                newStatus = "Hoàn thành";
                break;
              default:
                newStatus = "Chưa bắt đầu";
            }
            schedule.raw.status = newStatus;  
          }
          return schedule;
        });
      };
    useEffect(() => {
        // Khởi tạo lịch
        calendarInstance = new Calendar(calendarRef.current, {
          defaultView: "month",
          taskView: true,
          scheduleView: true,
          useCreationPopup: true,
          useDetailPopup: true,
          month: true,
          timezone: true,
          week: true,
          calendars: [
            {
              id: "default",
              name: "Công việc",
              bgColor: "#9e5fff",
              borderColor: "#9e5fff",
            },
          ],
        });
      
        if (calendarInstance) {
            calendarInstance.on("beforeUpdateSchedule", ({ schedule }) => {
                const updatedSchedules = updateTaskStatus(schedules, schedule.id, schedule.trangThaiThucHienId);
                calendarInstance.clear();
                calendarInstance.createSchedules(updatedSchedules);
              });

              calendarInstance.on("beforeOpenPopup", (event) => {
                const schedule = event.schedule;
                if (schedule) {
                  alert(`Trạng thái của task: ${schedule.raw.status}`);
                }
              });
        }
      
        const schedules = mapTasksToSchedules(tasks);
        calendarInstance.createSchedules(schedules);
      
        return () => {
          if (calendarInstance) {
            calendarInstance.destroy();
          }
        };
      }, [tasks]);
     
    const changeView = (view) => {
        calendarInstance.changeView(view);
    };
    const navigate = (direction) => {
        if (direction === "prev") {
            calendarInstance.prev();
        } else if (direction === "next") {
            calendarInstance.next();
        } else if (direction === "today") {
            calendarInstance.today();
        }
    };
    return (
        <Grid2 container spacing={2}>
        <Grid2 size={9}>
                <Button onClick={() => navigate("prev")}>Tháng trước</Button>
                <Button onClick={() => navigate("today")}>Hôm nay</Button>
                <Button onClick={() => navigate("next")}>Tháng tiếp theo</Button>
        </Grid2>
        <Grid2 size={3}>
                <Button onClick={() => changeView("day")}>Ngày</Button>
                <Button onClick={() => changeView("month")}>Tháng</Button>
                <Button onClick={() => changeView("week")}>Tuần</Button>
        </Grid2>
        <Box sx={{ position: "relative", width: "100%", height: "" }}>
            <div ref={calendarRef} />
        </Box>
        </Grid2>
    );
}

export default TimeLine;
