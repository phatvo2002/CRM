import { Box, Button, Grid2, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'
import AddIcon from "@mui/icons-material/Add";
import PropTypes from 'prop-types';
import TimeLine from './Components/TimeLine';
const index = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 size={10}>
          <h2>Quản lý nhiệm vụ </h2>
        </Grid2>
        <Grid2 size={2}>
          <Button
            variant="outlined"
            sx={{ marginLeft: 1 }}
            startIcon={<AddIcon />}
          // onClick={gotoLink}
          >
            Thêm mới
          </Button>
        </Grid2>
        <Grid2 size={12}>
          <Tabs
            orientation="horizontal"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab  label="Danh sách" {...a11yProps(0)} />
            <Tab  label="Timeline" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0}>
          
          </TabPanel>
          <TabPanel value={value} index={1}>
             <TimeLine/>
          </TabPanel>
        </Grid2>
      </Grid2>
    </>
  )
}

export default index