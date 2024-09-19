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

export const USER_TYPE = {
  Khac: "8284bebe-1154-43c3-97d2-80e868636471",
  SV: "57ba4e7b-761e-48fd-a931-a703cf515661"
}

export const SURVEY_TYPE = {
  LHP: "05a9f5f9-df80-4090-8101-8b7d3075f3b0"
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

export const DLB_BUTTON = {
  moveLeft: (
    <img
      className="imgButtonTuyChinh"
      src="/assets/img/arrowicon/left.png"
      alt=""
    />
  ),
  moveAllLeft: (
    <img
      className="imgButtonTuyChinh"
      src="/assets/img/arrowicon/left-double.png"
      alt=""
    />
  ),
  moveRight: (
    <img
      className="imgButtonTuyChinh"
      src="/assets/img/arrowicon/right.png"
      alt=""
    />
  ),
  moveAllRight: (
    <img
      className="imgButtonTuyChinh"
      src="/assets/img/arrowicon/right-double.png"
      alt=""
    />
  ),
  moveDown: (
    <img
      className="imgButtonTuyChinh"
      src="/assets/img//arrowicon/up.png"
      alt=""
    />
  ),
  moveUp: (
    <img
      className="imgButtonTuyChinh"
      src="/assets/img/arrowicon/up-double.png"
      alt=""
    />
  ),
  moveTop: (
    <img
      className="imgButtonTuyChinh"
      src="/assets/img/arrowicon/down.png"
      alt=""
    />
  ),
  moveBottom: (
    <img
      className="imgButtonTuyChinh"
      src="/assets/img/arrowicon/down-double.png"
      alt=""
    />
  ),
};

export const TABLE_PROPS = {
  muiTopToolbarProps: {
    sx: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      ".MuiCollapse-root": {
        width: "100%",
      },
    },
  },

  muiTableContainerProps: { sx: { maxHeight: "75vh" } },
  muiBottomToolbarProps: {
    sx: {
      alignContent: "center",
      ".MuiTablePagination-displayedRows": {
        margin: 0,
      },
      ".MuiTablePagination-selectLabel": {
        margin: 0,
      },
    },
  },
  muiTableHeadCellProps: {
    sx: {
      borderTop: "1px solid rgba(224,224,224,1)",
      borderRight: "1px solid rgba(224,224,224,1)",
    },
  },
  muiTableBodyCellProps: {
    sx: {
      borderRight: "1px solid rgba(224,224,224,1)",
    },
  },
  muiSearchTextFieldProps: {
    placeholder: "Tìm tất cả",
    sx: { minWidth: "300px" },
    variant: "outlined",
    size: "small",
  },
};
