import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import { useGetAllMenuQuery, useGetMenuRoleByIdQuery, useUpdateMenuRoleMutation } from "../../../../Api/MenuApi";

import { Box, Card, CardContent, Divider, FormControlLabel, Grid, Grid2, Switch, Typography } from '@mui/material';
import { toast } from 'react-toastify';
const ModalThemSua = (props) => {
  const {
    openModal,
    selectedRow,
    closeModal
  } = props;
  const [menu, setMenu] = useState([])
  const [menuRole, setMenuRole] = useState([])
  const [checkedMenuIds, setCheckedMenuIds] = useState([{
    menu: "",
    xem: true,
    them: true,
    sua: true,
    xoa: true
  }]);
  const { data: menuData } = useGetAllMenuQuery({ skip: !openModal });
  const { data: menuRoleData } = useGetMenuRoleByIdQuery(selectedRow[0]?.id, {
    skip: !openModal || !selectedRow[0],
  });
  const [updateGroupMenu] = useUpdateMenuRoleMutation()
  const handleCheckboxChange = (event, menuId) => {
    if (event.target.checked) {
      const selectedMenu = menu.find(item => item.id === menuId);
      if (selectedMenu) {
        setCheckedMenuIds(prev => [...prev, {
           menu: selectedMenu.id,
           xem: selectedMenu.xem,
           them: selectedMenu.them,
           sua: selectedMenu.sua,
           xoa: selectedMenu.xoa
        }]);
      }
    } else {
      setCheckedMenuIds(prev => prev.filter(item => item.menu !== menuId));
    }
  };
  const handelSubmit = async () => {
    const data = {
      oid: selectedRow[0]?.id,
      menu: checkedMenuIds
    }
    const res = await updateGroupMenu(data)
    if (res?.data.status == 200) {
      closeModal()
      toast.success("Phân quyền thành công!");
    }
    else {
       toast.error("Đã có lỗi xảy ra!");
    }
  }


  const handleSwitchChange = (menuId, key, value) => {
  setCheckedMenuIds(prev =>
    prev.map(item =>
      item.menu === menuId ? { ...item, [key]: value } : item
    )
  );
};

  useEffect(() => {
    if (menuData) {
      setMenu(menuData.length > 0 ? menuData : []);
    }
  }, [menuData]);

  useEffect(() => {
    if (menuRoleData) {
      if (menuRoleData.length > 0) {
        setMenuRole(menuRoleData);
        setCheckedMenuIds(menuRoleData.map(e => ({ menu: e.menuId, xem: e.xem, them: e.them, sua: e.sua, xoa: e.xoa })));
      } else {
        setMenuRole([]);
      }
    }
  }, [menuRoleData]);
  return (
    <React.Fragment>
      <Dialog
        open={openModal}
        keepMounted
        maxWidth={"400px"}
        //   onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Phân quyền menu</DialogTitle>
        <DialogContent>
          <Card variant="outlined" sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Phân quyền menu
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {menu.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 1.5,
                    p: 1,
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    backgroundColor: '#f9f9f9'
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkedMenuIds?.some(r => r.menu === item.id)}
                        onChange={(e) => handleCheckboxChange(e, item.id)}
                        name={`menu-${item.id}`}
                      />
                    }
                    label={
                      <Typography variant="subtitle1" sx={{ minWidth: 160 }}>
                        {item.name}
                      </Typography>
                    }
                  />

                  <Grid container spacing={2} sx={{ ml: 2 }}>
                    <Grid item>
                      <FormControlLabel
                        control={<Switch checked={checkedMenuIds.find(r => r?.menu == item?.id)?.xem}  onChange={(e) => handleSwitchChange(item.id, 'xem', e.target.checked)}/>}
                        label="Xem"
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        control={<Switch checked={checkedMenuIds.find(r => r?.menu == item?.id)?.them} onChange={(e) => handleSwitchChange(item.id, 'them', e.target.checked)}/>}
                        label="Thêm"
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        control={<Switch checked={checkedMenuIds.find(r => r?.menu == item?.id)?.sua}  onChange={(e) => handleSwitchChange(item.id, 'sua', e.target.checked)}/>}
                        label="Sửa"
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        control={<Switch checked={checkedMenuIds.find(r => r?.menu == item?.id)?.xoa} onChange={(e) => handleSwitchChange(item.id, 'xoa', e.target.checked)}/>}
                        label="Xóa"
                      />
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Đóng</Button>
          <Button onClick={handelSubmit}>Lưu</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default ModalThemSua