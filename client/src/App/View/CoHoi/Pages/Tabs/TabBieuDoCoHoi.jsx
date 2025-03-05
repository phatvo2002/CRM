import React, { useEffect, useState } from "react";
import {
  useGetCoHoiListQuery,
  useUpdateGiaiDoanMutation,
} from "src/App/Api/CoHoiApi";
import { useGetAllGiaiDoanBanHangQuery } from "src/App/Api/GiaiDoanBanHangApi";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Box, Paper, Stack, Typography } from "@mui/material";
import Moment from "react-moment";
export const TabBieuDoCoHoi = () => {
  const { data: dataGiaiDoan } = useGetAllGiaiDoanBanHangQuery();
  const { data: dataCoHoi, refetch } = useGetCoHoiListQuery();
  const [kanbanData, setKanbanData] = useState({});
  const [updateGiaiDoan] = useUpdateGiaiDoanMutation();
  useEffect(() => {
    if (dataCoHoi && dataGiaiDoan) {
      const formattedData = {};
      dataGiaiDoan.forEach((dataGiaiDoan) => {
        formattedData[dataGiaiDoan.id] = {
          name: dataGiaiDoan.tenGiaiDoan,
          stt: dataGiaiDoan.stt,
          items: [],
        };
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
      giaiDoanBanHang: { ...sourceItems[source.index].giaiDoanBanHang },
    };

    movedItem.giaiDoanBanHang.id = destination.droppableId;

    sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, movedItem);

    newData[source.droppableId].items = sourceItems;
    newData[destination.droppableId].items = destItems;
    setKanbanData(newData);

    await updateGiaiDoan({
      cohoiId: movedItem.id,
      giaiDoanId: movedItem.giaiDoanBanHang.id,
    });
    refetch();
  };
  const headerColors = ["#1E88E5", "#43A047", "#FB8C00", "#8E24AA", "#D81B60"];

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Box
          sx={{
            display: "flex",
            gap: "24px",
            overflowX: "auto",
            padding: "16px",
            height: "100vh",
          }}
        >
          {Object.entries(kanbanData).map(([stageId, stageData], index) => (
            <Droppable droppableId={stageId} key={stageId}>
              {(provided) => (
                <Paper
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{
                    minWidth: "320px",
                    bgcolor: "background.paper",
                    borderRadius: "12px",
                    boxShadow: 3,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: headerColors[index % headerColors.length],
                      color: "white",
                      textAlign: "center",
                      py: 2,
                      borderRadius: "12px 12px 0 0",
                    }}
                  >
                    <Typography variant="subtitle1">
                      {stageData.name}
                    </Typography>
                  </Box>
                  <Box sx={{ padding: "16px" }}>
                    {stageData.items.map((item, index) => (
                      <Draggable
                        key={String(item.id)}
                        draggableId={String(item.id)}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              padding: "12px",
                              marginBottom: "12px",
                              bgcolor: "background.default",
                              borderRadius: "12px",
                              boxShadow: snapshot.isDragging ? 4 : 2,
                              transition: "box-shadow 0.2s ease-in-out",
                              border: 1,
                              borderColor: "primary.light",
                            }}
                          >
                            <Stack spacing={1}>
                              <Typography variant="subtitle2" fontWeight="bold">
                                {item.tenCoHoi}
                              </Typography>
                              <Typography
                                sx={{
                                  display: "flex",
                                  width: "100%",
                                }}
                                variant="caption"
                              >
                                <span>Công ty: </span>
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    marginLeft: "48px",
                                  }}
                                >
                                  {item.maKhachHang}
                                </span>
                              </Typography>
                              <Typography
                                sx={{
                                  display: "flex",
                                  width: "100%",
                                }}
                                variant="caption"
                              >
                                Giá trị:{" "}
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    marginLeft: "54px",
                                  }}
                                >
                                  {item.soTien.toLocaleString("vi-VN")} <span>&#x0111;</span>
                                </span>
                              </Typography>
                            </Stack>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                </Paper>
              )}
            </Droppable>
          ))}
        </Box>
      </DragDropContext>
    </>
  );
};
