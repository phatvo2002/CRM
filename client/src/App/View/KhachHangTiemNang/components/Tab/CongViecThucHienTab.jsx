import { Button, Grid2 } from '@mui/material'
import React, { useState } from 'react'
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import TodayIcon from '@mui/icons-material/Today';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import ModlaAddCuocGoi from './Modal/ModalAddCuocGoi';
import { TYPE_MODAL } from 'src/App/Until/constant';
import TabPanel from "@mui/lab/TabPanel";
const CongViecThucHienTab = () => {
   const [value, setValue] = useState("1"),
         [modalAddCuocGoi ,setModalAddCuocGoi] = useState(false),
         [modalUpdateCuocGoi ,setModalUpdateCuocGoi] = useState(false),
         [typeModal, setTypeModal] = useState(""),
         [isLoading, setIsLoading] = useState(false),
         [selectedRowCuocGoi, setSelectedRowCuocGoi] = useState([]);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handelModalAddCuocGoi  = ()=>
    {
      setModalAddCuocGoi(true)
      setTypeModal(TYPE_MODAL.INSERT)
    }
    const onCloseModalAddCuocGoi= () => {
      setTypeModal("");
      setModalAddCuocGoi(false);
    };
    const onOpenModalUpdateCuocGoi = () => {
      setModalUpdateCuocGoi(true)
      setTypeModal(TYPE_MODAL.UPDATE)
    }
    
    const onCloseModalUpdateCuocGoi = ()=>{
      setModalUpdateCuocGoi(false)
      setTypeModal("");
    }
    const handleRowCuocGoiSelectionChange = (selectedRows) => {
      setSelectedRowCuocGoi(selectedRows)
    };
  return (
    <>
     <Grid2 container spacing={2}>
         <Grid2 size={12}>
         <Button
              variant="outlined"
              color="success"
             startIcon={<PermPhoneMsgIcon/>}
             onClick={handelModalAddCuocGoi}
            >
              Thêm Cuộc gọi
            </Button>
            <Button
              variant="outlined"
              color="error"
              sx={{ marginLeft: 1 }}
              startIcon={<PermContactCalendarIcon/>}
            >
              Thêm nhiệm vụ
            </Button>
            <Button
              variant="outlined"
              sx={{ marginLeft: 1 }}
              startIcon={<TodayIcon/>}
            >
              Thêm lịch hẹn
            </Button>
         </Grid2>
         <Grid2 size={12}>
         <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" , fontFamily:"inherit"}}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab"
                >
                  <Tab label="Cuộc gọi" value="1" />
                  <Tab label="Nhiệm vụ" value="2" />
                  <Tab label="Lịch hẹn" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">Cuộc gọi</TabPanel>
              <TabPanel value="2"></TabPanel>
              <TabPanel value="3"></TabPanel>
            </TabContext>
          </Box>
         </Grid2>
         {/* Modal Add cuoc goi */}
         <ModlaAddCuocGoi
            showModal={modalAddCuocGoi}
            closeModal={onCloseModalAddCuocGoi}   
            typeModal={typeModal}
            setTypeModal={setTypeModal}
            setLoading={setIsLoading}
         />
     </Grid2>
    </>
  )
}

export default CongViecThucHienTab