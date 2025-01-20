import React, { useCallback, useState } from 'react';
import { Scheduler } from "@bitnoi.se/react-scheduler";
import '@bitnoi.se/react-scheduler/dist/style.css';
import dayjs from 'dayjs';
import { Box } from '@mui/material';

const TimeLine = () => {
    const [filterButtonState, setFilterButtonState] = useState(0);

    const [range, setRange] = useState({
        startDate: new Date(),
        endDate: new Date()
    });

    const mockedSchedulerData = [
        {
          id: "070ac5b5-8369-4cd2-8ba2-0a209130cc60",
          label: {
            icon: "https://picsum.photos/24",
            title: "Joe Doe",
            subtitle: "Frontend Developer"
          },
          data: [
            {
              id: "8b71a8a5-33dd-4fc8-9caa-b4a584ba3762",
              startDate: new Date("2023-04-13T15:31:24.272Z"),
              endDate: new Date("2023-04-28T10:28:22.649Z"),
              occupancy: 3600,
              title: "Project A",
              subtitle: "Subtitle A",
              description: "array indexing Salad West Account",
              bgColor: "rgb(254,165,177)"
            },
            {
              id: "22fbe237-6344-4c8e-affb-64a1750f33bd",
              startDate: new Date("2023-10-07T08:16:31.123Z"),
              endDate: new Date("2023-10-15T21:55:23.582Z"),
              occupancy: 2852,
              title: "Project B",
              subtitle: "Subtitle B",
              description: "Tuna Home pascal IP drive",
              bgColor: "rgb(254,165,177)"
            },
            {
              id: "3601c1cd-f4b5-46bc-8564-8c983919e3f5",
              startDate: new Date("2023-03-30T22:25:14.377Z"),
              endDate: new Date("2023-04-01T07:20:50.526Z"),
              occupancy: 1800,
              title: "Project C",
              subtitle: "Subtitle C",
              bgColor: "rgb(254,165,177)"
            },
            {
              id: "b088e4ac-9911-426f-aef3-843d75e714c2",
              startDate: new Date("2023-10-28T10:08:22.986Z"),
              endDate: new Date("2023-10-30T12:30:30.150Z"),
              occupancy: 11111,
              title: "Project D",
              subtitle: "Subtitle D",
              description: "Garden heavy an software Metal",
              bgColor: "rgb(254,165,177)"
            }
          ]
        }
      ];

    return (
        <Box sx={{ position: "relative", width: "150vh", height: "70vh" }}>
           <Scheduler
        data={mockedSchedulerData}
        isLoading={false}
        onRangeChange={(newRange) => console.log(newRange)}
        onTileClick={(clickedResource) => console.log(clickedResource)}
        onItemClick={(item) => console.log(item)}
        
        onFilterData={() => {
         
          setFilterButtonState(1);
        }}
        onClearFilterData={() => {
          setFilterButtonState(0)
        }}
        config={{
          zoom: 0,
          filterButtonState,
        }}
      />
        </Box>
    );
}

export default TimeLine;
