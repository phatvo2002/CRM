import React, { useEffect, useState } from 'react'
import { useGetCoHoiListQuery, useUpdateGiaiDoanMutation } from 'src/App/Api/CoHoiApi'
import { useGetAllGiaiDoanBanHangQuery } from 'src/App/Api/GiaiDoanBanHangApi'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const TabBieuDoCoHoi = () => {
  const { data: dataGiaiDoan } = useGetAllGiaiDoanBanHangQuery()
  const { data: dataCoHoi } = useGetCoHoiListQuery()
  const [kanbanData, setKanbanData] = useState({});
  const [updateGiaiDoan] = useUpdateGiaiDoanMutation()
  useEffect(() => {
    if (dataCoHoi && dataGiaiDoan) {
      const formattedData = {};
      dataGiaiDoan.forEach(dataGiaiDoan => {
        formattedData[dataGiaiDoan.id] = { name: dataGiaiDoan.tenGiaiDoan, items: [] };
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
  
    console.log(movedItem);
    await updateGiaiDoan({ cohoiId: movedItem.id, giaiDoanId: movedItem.giaiDoanBanHang.id });
  };
  

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", gap: "16px" }}>
          {Object.entries(kanbanData).map(([stageId, stageData]) => (
            <Droppable droppableId={stageId} key={stageId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    background: "#f4f4f4",
                    padding: "10px",
                    width: "250px",
                    minHeight: "400px"
                  }}
                >
                  
                  <h3>{stageData.name}</h3>
                  {stageData.items.map((item, index) => (
                    <Draggable key={String(item.id)} draggableId={String(item.id)} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          padding: "10px",
                          margin: "5px 0",
                          background: "white",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                          borderRadius: "5px",
                          userSelect: "none",
                          ...provided.draggableProps.style, // 🔥 Merge style từ Draggable
                        }}
                      >
                        {item.tenCoHoi}
                      </div>
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

export default TabBieuDoCoHoi