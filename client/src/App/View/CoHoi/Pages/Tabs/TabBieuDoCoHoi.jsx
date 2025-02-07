import React, { useEffect, useState } from 'react'
import { useGetCoHoiListQuery, useUpdateGiaiDoanMutation } from 'src/App/Api/CoHoiApi'
import { useGetAllGiaiDoanBanHangQuery } from 'src/App/Api/GiaiDoanBanHangApi'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Box, Stack, Typography } from '@mui/material';
import Moment from 'react-moment';
export const TabBieuDoCoHoi = () => {
  const { data: dataGiaiDoan } = useGetAllGiaiDoanBanHangQuery()
  const { data: dataCoHoi , refetch } = useGetCoHoiListQuery()
  const [kanbanData, setKanbanData] = useState({});
  const [updateGiaiDoan] = useUpdateGiaiDoanMutation()
  useEffect(() => {
    if (dataCoHoi && dataGiaiDoan) {
      const formattedData = {};
      dataGiaiDoan.forEach(dataGiaiDoan => {
        formattedData[dataGiaiDoan.id] = { name: dataGiaiDoan.tenGiaiDoan, stt: dataGiaiDoan.stt, items: [] };
      });

      dataCoHoi.forEach((item) => {
        if (formattedData[item.giaiDoanBanHang.id]) {
          formattedData[item.giaiDoanBanHang.id].items.push(item);
        }
      });

      setKanbanData(formattedData);
    }
  }, [dataCoHoi, dataGiaiDoan]);


  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const newData = { ...kanbanData };
    const sourceItems = [...newData[source.droppableId].items];
    const destItems = [...newData[destination.droppableId].items];

    const movedItem = {
      ...sourceItems[source.index],
      giaiDoanBanHang: { ...sourceItems[source.index].giaiDoanBanHang }
    };


    movedItem.giaiDoanBanHang.id = destination.droppableId;


    sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, movedItem);

    newData[source.droppableId].items = sourceItems;
    newData[destination.droppableId].items = destItems;
    setKanbanData(newData);


    await updateGiaiDoan({ cohoiId: movedItem.id, giaiDoanId: movedItem.giaiDoanBanHang.id });
    refetch()
  };


  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", gap: "16px", overflow: "scroll" }}>
          {Object.entries(kanbanData).map(([stageId, stageData]) => (
            <Droppable droppableId={stageId} key={stageId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    background: "background.default ",
                    padding: "10px",
                    minWidth: "300px",
                    minHeight: "100vh",
                   
                  }}
                >
                  <div style={{ backgroundColor: "background.default", minHeight: "80px", lineHeight: "80px" , boxShadow:"rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset" }}>
                    <p style={{ textAlign: "center" }}>{stageData.stt}. {stageData.name}</p>
                  </div>
                  {stageData.items.map((item, index) => (
                    <Draggable key={String(item.id)} draggableId={String(item.id)} index={index}>
                      {(provided, snapshot) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            padding: "10px",
                            margin: "5px 0", 
                            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                            borderRadius: "5px",
                            userSelect: "none",
                            ...provided.draggableProps.style,
                          }}
                          sx={{ borderRadius: '16px', border: 1, borderColor: 'primary.main' , bgcolor: "background.default", }}
                        >
                          <Stack direction="row" spacing={2}>
                            <Typography variant={'caption'} component={"p"}>
                              <b>
                                {item.tenCoHoi}
                              </b>
                            </Typography>
                            <Typography variant={'caption'} component={"p"}>
                              <b>
                                {item.maKhachHang}
                              </b>
                            </Typography>
                          </Stack>
                          <div>
                          <Stack direction="row" spacing={2} paddingTop={2}>
                            <Typography variant={'caption'}>Ngày kỳ vọng kết thúc : <Moment format="DD/MM/YYYY ">{new Date(item.ngayKyVongKetThuc)}</Moment> </Typography> 
                          </Stack>
                          </div>
                          <div>
                          <Typography variant={'caption'}>Doanh số kỳ vọng : <b>{item.doanhSoKyVong.toLocaleString("vi-VN")} VND</b> </Typography> 
                          </div>
                          <Typography variant={'caption'}>Số tiền : <b>{item.soTien.toLocaleString("vi-VN")} VND</b> </Typography> 
                        </Box>
                      )}
                    </Draggable>

                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </>
  )
}
