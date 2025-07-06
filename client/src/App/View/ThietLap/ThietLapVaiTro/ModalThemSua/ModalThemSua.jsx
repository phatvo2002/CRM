import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import { useGetAllMenuParentQuery, useGetAllMenuQuery, useGetMenuAllRoleByIdQuery, useGetMenuRoleByIdQuery, useUpdateMenuRoleMutation } from "../../../../Api/MenuApi";

import { styled, alpha } from '@mui/material/styles';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { Box, Card, CardContent, Divider, FormControlLabel, Grid, Grid2, Switch, Typography } from '@mui/material';
import { toast } from 'react-toastify';




const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.content}`]: {
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));



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
    xem: false,
    them: false,
    sua: false,
    xoa: false
  }]);
  const { data: menuData } = useGetAllMenuParentQuery({ skip: !openModal });
  const { data: menuRoleData } = useGetMenuAllRoleByIdQuery(selectedRow[0]?.id, {
    skip: !openModal || !selectedRow[0],
  });
  const [updateGroupMenu] = useUpdateMenuRoleMutation()

  const handleCheckboxChange = (event, menuId, children = []) => {
    const isChecked = event.target.checked;

    setCheckedMenuIds(prev => {
      let updated = [...prev];
      if (isChecked) {
        if (!updated.some(item => item.menu === menuId)) {
          const selectedMenu = menu.find(item => item.id === menuId || item.menuChildrent?.some(c => c.id === menuId));
          if (selectedMenu) {
            updated.push({
              menu: menuId,
              xem: selectedMenu.xem,
              them: selectedMenu.them,
              sua: selectedMenu.sua,
              xoa: selectedMenu.xoa
            });
          }
        }
        children.forEach(child => {
          if (updated.some(item => item.menu === child.id)) {
            updated.push({
              menu: child.id,
              xem: child.xem,
              them: child.them,
              sua: child.sua,
              xoa: child.xoa
            });
          }
        });

      } else {
        updated = updated.filter(item => item.menu !== menuId);

        children.forEach(child => {
          updated = updated.filter(item => item.menu !== child.id);
        });
      }

      return updated;
    });
  };

  const handleSwitchChange = (menuId, key, value) => {
    setCheckedMenuIds(prev =>
      prev.map(item =>
        item.menu === menuId ? { ...item, [key]: value } : item
      )
    );
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




  useEffect(() => {
    if (menuData) {
      setMenu(menuData.length > 0 ? menuData : []);
    }
  }, [menuData]);
   console.log(checkedMenuIds)
   console.log(menuRoleData)
  useEffect(() => {
    if (Array.isArray(menuRoleData) && menuRoleData.length > 0) {
      setMenuRole(menuRoleData);
      setCheckedMenuIds(menuRoleData.map(e => ({
        menu: e.menuId,
        xem: e.xem,
        them: e.them,
        sua: e.sua,
        xoa: e.xoa
      })));
    } else {
      setMenuRole([]);
      setCheckedMenuIds([]);
    }
  }, [menuRoleData]);
  return (
    <React.Fragment>
      <Dialog
        open={openModal}

        maxWidth={"1200px"}
        //   onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Phân quyền menu</DialogTitle>
        <DialogContent>

          <Card variant="outlined" sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
            <SimpleTreeView sx={{ width: "100%" }}>
              {Array.isArray(menuData) && menuData.length > 0 && menuData.map((item, index) => (
                <TreeItem
                  key={item.id}
                  itemId={String(item.id)}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checkedMenuIds?.some(r => r.menu === item.id)}
                            onChange={(e) => handleCheckboxChange(e, item.id, item.menuChildrent || [])}
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
                            control={<Switch checked={checkedMenuIds.find(r => r?.menu == item?.id)?.xem} onChange={(e) => handleSwitchChange(item.id, 'xem', e.target.checked)} />}
                            label="Xem"
                          />
                        </Grid>
                        <Grid item>
                          <FormControlLabel
                            control={<Switch checked={checkedMenuIds.find(r => r?.menu == item?.id)?.them} onChange={(e) => handleSwitchChange(item.id, 'them', e.target.checked)} />}
                            label="Thêm"
                          />
                        </Grid>
                        <Grid item>
                          <FormControlLabel
                            control={<Switch checked={checkedMenuIds.find(r => r?.menu == item?.id)?.sua} onChange={(e) => handleSwitchChange(item.id, 'sua', e.target.checked)} />}
                            label="Sửa"
                          />
                        </Grid>
                        <Grid item>
                          <FormControlLabel
                            control={<Switch checked={checkedMenuIds.find(r => r?.menu == item?.id)?.xoa} onChange={(e) => handleSwitchChange(item.id, 'xoa', e.target.checked)} />}
                            label="Xóa"
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  }
                >
                  {Array.isArray(item.menuChildrent) && item.menuChildrent.length > 0 && item.menuChildrent?.map((child, childIndex) => (
                    <TreeItem
                      key={child.id}
                      itemId={String(child.id)}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checkedMenuIds?.some(r => r.menu === child.id)}
                                onChange={(e) => handleCheckboxChange(e, child.id)}
                                name={`menu-${child.id}`}
                              />
                            }
                            label={
                              <Typography variant="subtitle1" sx={{ minWidth: 160 }}>
                                {child.name}
                              </Typography>
                            }

                          />
                          <Grid container spacing={2} sx={{ ml: 2 }}>
                            <Grid item>
                              <FormControlLabel
                                control={<Switch checked={checkedMenuIds.find(r => r?.menu == child?.id)?.xem} onChange={(e) => handleSwitchChange(child.id, 'xem', e.target.checked)} />}
                                label="Xem"
                              />
                            </Grid>
                            <Grid item>
                              <FormControlLabel
                                control={<Switch checked={checkedMenuIds.find(r => r?.menu == child?.id)?.them} onChange={(e) => handleSwitchChange(child.id, 'them', e.target.checked)} />}
                                label="Thêm"
                              />
                            </Grid>
                            <Grid item>
                              <FormControlLabel
                                control={<Switch checked={checkedMenuIds.find(r => r?.menu == child?.id)?.sua} onChange={(e) => handleSwitchChange(child.id, 'sua', e.target.checked)} />}
                                label="Sửa"
                              />
                            </Grid>
                            <Grid item>
                              <FormControlLabel
                                control={<Switch checked={checkedMenuIds.find(r => r?.menu == child?.id)?.xoa} onChange={(e) => handleSwitchChange(child.id, 'xoa', e.target.checked)} />}
                                label="Xóa"
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      }
                    />
                  ))}
                </TreeItem>
              ))}
            </SimpleTreeView>
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