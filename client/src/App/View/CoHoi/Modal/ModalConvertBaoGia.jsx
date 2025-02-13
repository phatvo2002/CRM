import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useConvertBaoGiaMutation } from "src/App/Api/BaoGiaApi";
import { useGetCoHoiListQuery } from "src/App/Api/CoHoiApi";
import { useGetAllTinhTrangBaoGiaQuery } from "src/App/Api/GetDataApi";
import { useGetAllHangHoaQuery } from "src/App/Api/HangHoa";
import {
  useAddHangHoaQuanTamMutation,
  useDeleteHangHoaQuanTamMutation,
  useGetHangHoaQuanTamByCoHoiIdQuery,
  useGetHangHoaQuanTamByKhachHangIdQuery,
  useUpdateHangHoaQuanTamMutation,
} from "src/App/Api/HangHoaQuanTam";
import { useGetKhachHangMucTieuByNguoiDungIdQuery } from "src/App/Api/KhachHangMucTieuApi";
import { validateDatePicker, validateString } from "src/App/Until/validateYup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
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
  const { data: rows, refetch } = useGetHangHoaQuanTamByCoHoiIdQuery(id);
  const [createData] = useAddHangHoaQuanTamMutation();
  const [updateData] = useUpdateHangHoaQuanTamMutation();
  const [deleteData] = useDeleteHangHoaQuanTamMutation();
  const { data: dataKhachhangMucTieu, isLoading: isGetKhachHangIsFeatching } =
    useGetKhachHangMucTieuByNguoiDungIdQuery(undefined, {
      skip: showModal == false,
    });
  const {
    data: dataTinhTrangBaoGia,
    isLoading: isGetTinhTrangBaoGiaIsFetching,
  } = useGetAllTinhTrangBaoGiaQuery({ skip: showModal == false });
  const { data: dataCoHoi, isLoading: isGetLienHeIsFetching } =
      useGetCoHoiListQuery({ skip: showModal == false }),
    [convertBaoGia] = useConvertBaoGiaMutation();
  const handleAddClick = () => {
    const newRow = {
      id: uuidv4(),
      maHangHoaId: "",
      khachHangTiemNangId: null,
      khachHangId: null,
      coHoiId: id,
      soLuong: 0,
      thueSuat: 0,
      tienThue: 0,
      donGia: 0,
      thanhTien: 0,
      tongTien: 0,
      isNew: true,
    };
    setHangHoa((prev) => [...prev, newRow]);
  };
   const handleSaveClick = async (id) => {
      const currentRow = hangHoa.find((row) => row.id === id);
      if (!currentRow) {
        toast.error("Không tìm thấy hàng hóa để lưu!");
        return;
      }
      let updatedRow;
      if (currentRow.isNew === true) {
        updatedRow = await createData(currentRow).unwrap();
        currentRow.isNew = false;
      } else {
        updatedRow = await updateData(currentRow).unwrap();
      }
      toast.success("Lưu dữ liệu thành công!");
    };
    const processRowUpdate = (newRow) => {
      const selectedItem = hangHoas?.find(
        (item) => item.id === newRow.maHangHoaId
      );
      const updatedThanhTien = selectedItem
        ? selectedItem.donGia * (newRow.soLuong || 0)
        : 0;
      // const updateTongTien = selectedItem ? updatedThanhTien : 0;
      const updateTienThue = selectedItem
        ? (selectedItem.donGia * newRow?.thueSuat * (newRow.soLuong || 0)) / 100
        : 0;
      const updateTongTien = selectedItem ? updatedThanhTien + updateTienThue : 0;
      const updatedRow = {
        ...newRow,
        tienThue: updateTienThue,
        thanhTien: updatedThanhTien,
        tongTien: updateTongTien,
        donGia: selectedItem.donGia,
      };
      setHangHoa((prev) =>
        prev.map((row) => (row.id === updatedRow.id ? updatedRow : row))
      );
      return updatedRow;
    };
      const handleDeleteClick = (id) => async () => {
        const rowToDelete = hangHoa.find((row) => row.id === id);
        if (rowToDelete?.isNew) {
          setHangHoa((prev) => prev.filter((row) => row.id !== id));
          toast.success("Đã xóa hàng hóa thành công!");
        } else {
          try {
            await deleteData(id).unwrap();
            setHangHoa((prev) => prev.filter((row) => row.id !== id));
            toast.success("Xóa hàng hóa thành công!");
          } catch (error) {
            toast.error("Đã có lỗi trong quá trình xóa!");
          }
        }
      };
      const totalAmount = hangHoa.reduce((sum, row) => sum + (row.tongTien || 0), 0);
  return <div>ModalConvertBaoGia</div>;
};
