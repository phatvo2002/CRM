import React, { useEffect, useRef } from 'react';
import { Button, Grid, Grid2 } from '@mui/material';
import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { useGetNhiemVuByPhongBanIdQuery } from 'src/App/Api/NhiemVuApi';
import { Schedule } from '@mui/icons-material';

const TimeLine = () => {
  const { data: tasks } = useGetNhiemVuByPhongBanIdQuery();
  const calendarRef = useRef(null);

  const mapTasksToEvents = (tasks) => {
    return tasks.map((task) => {
      let bgColor = '#9e5fff';
      if (task.trangThaiThucHien.name === 'Hoàn thành') bgColor = '#28a745';
      if (task.trangThaiThucHien.name === 'Đang thực hiện') bgColor = '#ffc107';
      if (task.trangThaiThucHien.name === 'Chưa thực hiện ') bgColor = '#dc3545';

      return {
        id: task.id,
        calendarId: task.mucDoUuTienId || 'default',
        title: task.tieuDe,
        body: task.moTa,
        start: task.createAt,
        end: task.hanHoanThanh,
        category: 'time',
        isReadOnly: false,
        bgColor,
        raw: {
          nguoiThucHien: task.nguoiDung || 'Chưa xác định',
          trangThaiThucHien: task.trangThaiThucHien.name || 'Chưa bắt đầu',
        },
      };
    });
  };

  useEffect(() => {
    // Khởi tạo lịch
    const calendarInstance = new Calendar(calendarRef.current, {
      defaultView: 'month',
      useCreationPopup: true,
      useDetailPopup: true,
      useFormPopup: false,
      // template: {
      //   milestone: (model) => `<span class="milestone">${model.title}</span>`,
      //   task: (model) => `<span class="task">${model.title}</span>`,
      // },
      template: {
        time: (schedule) => `
          <div>
            <strong>${schedule.title} - ${schedule.raw?.nguoiThucHien?.hoVaDem || 'Chưa xác định'} ${schedule.raw?.nguoiThucHien?.ten || 'Chưa xác định'}</strong>

          </div>
        `,
        popupDetailBody: (schedule) => `
          <div>
            <p><strong>Nội dung : </strong>  ${schedule.body || ''}</p>
            <p><strong>Người thực hiện:</strong> ${schedule.raw?.nguoiThucHien?.hoVaDem || 'Chưa xác định'} ${schedule.raw?.nguoiThucHien?.ten || 'Chưa xác định'}</p>
            <div>
   <strong> Trạng thái:  </strong> 
  <span style="color: ${schedule.raw?.trangThaiThucHien === 'Chưa thực hiện '
            ? 'red'
            : schedule.raw?.trangThaiThucHien === 'Đang thực hiện'
              ? 'orange'
              : 'green'
          };">
    ${schedule.raw?.trangThaiThucHien === 'Chưa thực hiện '
            ? 'Chưa thực hiện'
            : schedule.raw?.trangThaiThucHien === 'Đang thực hiện'
              ? 'Đang thực hiện'
              : 'Hoàn thành'
          }
  </span>
</div>
          </div>
        `,
      },
    });
    if (tasks) {
      const events = mapTasksToEvents(tasks);
      calendarInstance.clear();
      calendarInstance.createEvents(events);
    }
    calendarInstance.on('beforeUpdateEvent', ({ event, changes }) => {
      console.log('Cập nhật sự kiện:', event, changes);
    });

    calendarInstance.on('beforeOpenPopup', (event) => {
      const { event: schedule } = event;
      if (schedule) {
        alert(`Trạng thái của task: ${schedule.raw?.status}`);
      }
    });

    return () => {
      calendarInstance.destroy();
    };
  }, [tasks]);

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <Button>Tháng</Button>
        <Button>Tuần</Button>
        <Button>Ngày</Button>
      </Grid2>
      <div ref={calendarRef} style={{ height: '800px', width: '100%' }}></div>
    </Grid2>
  );
};

export default TimeLine;
