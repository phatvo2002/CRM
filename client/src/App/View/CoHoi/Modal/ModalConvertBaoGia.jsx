import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetAllHangHoaQuery } from "src/App/Api/HangHoa";
import {
  useAddHangHoaQuanTamMutation,
  useDeleteHangHoaQuanTamMutation,
  useGetHangHoaQuanTamByKhachHangIdQuery,
  useUpdateHangHoaQuanTamMutation,
} from "src/App/Api/HangHoaQuanTam";
import { validateDatePicker, validateString } from "src/App/Until/validateYup";
import * as yup from "yup";
const modelObj = {
    id: "id",
    tenBaoGia: "tenBaoGia",
    ngayBaoGia: "ngayBaoGia",
    ngayHetHan: "ngayHetHan",
    diaChi: "diaChi",
    maSoThue: "maSoThue",
    tongTien: "tongTien",
    maTinhTrangBaoGia: "maTinhTrangBaoGia",
    maCoHoi: "maCoHoi",
    maKhachHang: "maKhachHang",
    hangHoaQuanTams: "hangHoaQuanTams",
  },
  labelObj = {
    id: "Mã báo giá",
    tenBaoGia: "Tên báo giá",
    ngayBaoGia: "Số tiền",
    ngayHetHan: "Tỉ lệ thành công",
    maSoThue: "Mã số thuế",
    tongTien: "tongTien",
    maTinhTrangBaoGia: "maTinhTrangBaoGia",
    maCoHoi: "maCoHoi",
    maKhachHang: "maKhachHang",
    diaChi: "Địa chỉ",
    hangHoaQuanTam: "Hàng hóa quan tâm",
  },
  initialFormState = {
    [modelObj.id]: "",
    [modelObj.tenBaoGia]: "",
    [modelObj.ngayBaoGia]: new Date(),
    [modelObj.ngayHetHan]: new Date(),
    [modelObj.maSoThue]: "",
    [modelObj.tongTien]: 0,
    [modelObj.maTinhTrangBaoGia]: null,
    [modelObj.maCoHoi]: null,
    [modelObj.maKhachHang]: null,
    [modelObj.diaChi]: "",
    [modelObj.hangHoaQuanTams]: [],
  },
  schema = yup.object().shape({
    [modelObj.tenBaoGia]: validateString(),
    [modelObj.ngayBaoGia]: validateDatePicker(),
    [modelObj.ngayHetHan]: validateDatePicker(),
    [modelObj.maKhachHang]: validateString(),
    [modelObj.maCoHoi]: validateString(),
  });
export const ModalConvertBaoGia = ({
  coHoiData,
  showModal,
  closeModal,
  isLoading,
  typeModal,
}) => {
  const _isMounted = useRef(false),
    modalRef = useRef(null),
    { id } = useParams(),
    [hangHoa, setHangHoa] = useState([]);
  const { data: hangHoas } = useGetAllHangHoaQuery(undefined, {
    skip: showModal == false,
  });
  const { data: rows, refetch } = useGetHangHoaQuanTamByKhachHangIdQuery(id);
  const [createData] = useAddHangHoaQuanTamMutation();
  const [updateData] = useUpdateHangHoaQuanTamMutation();
  const [deleteData] = useDeleteHangHoaQuanTamMutation();
  return <div>ModalConvertBaoGia</div>;
};
