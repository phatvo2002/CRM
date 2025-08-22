import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
export const iconList = [
  "FaUserAlt",
  "FaLayerGroup",
  "FaIndent",
  "FaDatabase",
  "FaHammer",
  "FaUsers",
  "FaClipboardList",
  "FaRegEdit",
  "FaListAlt",
  "FaUserLock",
  "FaListOl",
  "FaHospital",
  "FaSearch",
].map((item) => ({
  label: item,
  value: item,
}));

export const LOAI_HOI_DONG_ID_DEFAULT = {
  SoTuyen: "00000000-0000-0000-0000-000000000001",
  XetDuyet: "00000000-0000-0000-0000-000000000002",
  GiuaKy: "00000000-0000-0000-0000-000000000003",
  NghiemThu: "00000000-0000-0000-0000-000000000004",
};

export const ACTION = {
  Xem : "xem",
  Them :"them",
  Sua : "sua",
  Xoa : "xoa"
}



export const TYPE_MODAL = {
  INSERT: "INSERT",
  UPDATE: "UPDATE",
  VIEW: "VIEW",
};

export const shouldDirtyAndValidate = {
  shouldDirty: true,
  shouldValidate: true,
};

export const iConUser = <AccountCircleIcon/>
export const iconPass = <LockIcon/>

