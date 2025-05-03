import React, { useEffect, useState, useMemo } from "react";
import {
  useGetCoHoiListQuery,
  useUpdateGiaiDoanMutation,
} from "src/App/Api/CoHoiApi";
import { useGetAllGiaiDoanBanHangQuery } from "src/App/Api/GiaiDoanBanHangApi";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Box, Paper, Stack, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled components
const KanbanColumn = styled(Paper)(({ theme, headerColor }) => ({
  minWidth: "320px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "16px",
  boxShadow: theme.shadows[3],
  overflow: "hidden",
  "& .header": {
    backgroundColor: headerColor,
    color: "white",
    padding: theme.spacing(2),
    borderRadius: "16px 16px 0 0",
  },
}));

const KanbanCard = styled(Box)(({ theme, isDragging }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
  borderRadius: "12px",
  boxShadow: isDragging ? theme.shadows[6] : theme.shadows[2],
  border: `1px solid ${theme.palette.grey[200]}`,
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    boxShadow: theme.shadows[4],
    borderColor: theme.palette.primary.light,
  },
}));

export const TabBieuDoCoHoi = ({dataCoHoi ,refetch}) => {
  const { data: dataGiaiDoan } = useGetAllGiaiDoanBanHangQuery();
 // const { data: dataCoHoi, refetch } = useGetCoHoiListQuery();
  const [kanbanData, setKanbanData] = useState({});
  const [updateGiaiDoan] = useUpdateGiaiDoanMutation();

  // Memoized header colors
  const headerColors = useMemo(
    () => ["#1E88E5", "#43A047", "#FB8C00", "#8E24AA", "#D81B60"],
    []
  );

  // Format data for Kanban board
  useEffect(() => {
    if (!dataCoHoi || !dataGiaiDoan) return;

    const formattedData = {};
    dataGiaiDoan.forEach((stage) => {
      formattedData[stage.id] = {
        name: stage.tenGiaiDoan,
        stt: stage.stt,
        items: dataCoHoi.filter((item) => item.giaiDoanBanHang.id === stage.id),
      };
    });

    setKanbanData(formattedData);
  }, [dataGiaiDoan]);

  // Handle drag and drop
  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    const newData = { ...kanbanData };
    const sourceItems = [...newData[source.droppableId].items];
    const destItems = [...newData[destination.droppableId].items];
    const [movedItem] = sourceItems.splice(source.index, 1);

    const updatedItem = {
      ...movedItem,
      giaiDoanBanHang: { ...movedItem.giaiDoanBanHang, id: destination.droppableId },
    };
    
    destItems.splice(destination.index, 0, updatedItem);
    newData[source.droppableId].items = sourceItems;
    newData[destination.droppableId].items = destItems;

    setKanbanData(newData);

    try {
      await updateGiaiDoan({
        cohoiId: updatedItem.id,
        giaiDoanId: destination.droppableId,
      }).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to update giai doan:", error);
      // Revert state if update fails
      setKanbanData(kanbanData);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          overflowX: "auto",
          p: 2,
          bgcolor: "#f5f7fa",
          height: "100vh",
        }}
      >
        {Object.entries(kanbanData).map(([stageId, stageData], index) => (
          <Droppable droppableId={stageId} key={stageId}>
            {(provided) => (
              <KanbanColumn
                ref={provided.innerRef}
                {...provided.droppableProps}
                headerColor={headerColors[index % headerColors.length]}
              >
                <Box className="header">
                  <Typography variant="subtitle1" fontWeight={600}>
                    {stageData.name}
                  </Typography>
                  <Typography variant="caption">
                    {stageData.items.length} cơ hội
                  </Typography>
                </Box>
                
                <Box sx={{ p: 2, maxHeight: "calc(100vh - 120px)", overflowY: "auto" }}>
                  {stageData.items.map((item, index) => (
                    <Draggable
                      key={String(item.id)}
                      draggableId={String(item.id)}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <KanbanCard
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          isDragging={snapshot.isDragging}
                        >
                          <Stack spacing={1}>
                            <Typography variant="subtitle2" fontWeight="bold" color="primary.main">
                              {item.tenCoHoi}
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                              Công ty: <strong>{item.maKhachHang}</strong>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Giá trị:{" "}
                              <strong>
                                {Number(item.soTien).toLocaleString("vi-VN")} đ
                              </strong>
                            </Typography>
                          </Stack>
                        </KanbanCard>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              </KanbanColumn>
            )}
          </Droppable>
        ))}
      </Box>
    </DragDropContext>
  );
};
