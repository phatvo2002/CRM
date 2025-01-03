import { Grid, Grid2 } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { validateString } from "src/App/Until/validateYup";
import { TextFieldRHF } from "src/App/Components/ReactHookFormComp";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import { TYPE_MODAL } from "src/App/Until/constant";
import * as yup from "yup";
import { toast } from "react-toastify";
import { AutocompleteRHF } from "src/App/Components/ReactHookFormComp";
import { useGetAllDonViTinhQuery, useUpdateDonViTinhMutation } from "src/App/Api/DonViTinh";
import CustomImageUpload from "src/App/Components/CustomUploadImages/CusTomUploadImages";
import { commonMapDataAutocomplete } from "src/App/Until/mapData.helper";
import { useGetAllLoaiHangHoaQuery } from "src/App/Api/LoaiHangHoa";
import { useUpdateHangHoaMutation } from "src/App/Api/HangHoa";
// ------ Form Config ------ //
const modelObj = {
  MaHangHoa: "MaHangHoa",
  TenHangHoa: "TenHangHoa",
  MoTa: "MoTa",
  NguonGoc: "NguonGoc",
  DonGia: "DonGia",
  MaLoaiHangHoa: "MaLoaiHangHoa",
  MaDonViTinh: "MaDonViTinh",
  File: "File",
},
  labelObj = {
    MaHangHoa: "Mã hàng hóa",
    TenHangHoa: "Tên hàng hóa",
    MoTa: "Mô tả",
    NguonGoc: "Nguồn gốc",
    DonGia: "Đơn giá",
    MaLoaiHangHoa: "Loại hàng hóa",
    MaDonViTinh: "Đơn vị tính",
  },
  initialFormState = {
    [modelObj.MaLoaiHangHoa]: "",
    [modelObj.TenHangHoa]: "",
    [modelObj.MoTa]: "",
    [modelObj.NguonGoc]: "",
    [modelObj.DonGia]: 0,
    [modelObj.MaLoaiHangHoa]: 0,
    [modelObj.MaDonViTinh]: 0,
  },
  schema = yup.object().shape({
    [modelObj.MaHangHoa]: validateString(),
    [modelObj.TenHangHoa]: validateString(),
    [modelObj.MoTa]: validateString(),
    [modelObj.NguonGoc]: validateString(),
    [modelObj.DonGia]: validateString(),
    [modelObj.MaLoaiHangHoa]: validateString(),
    [modelObj.MaDonViTinh]: validateString(),
  });
// ------ End Of Form Config ------ //

const getHeader = (typeModal) => {
  const title = {
    [TYPE_MODAL.UPDATE]: "Chỉnh sửa hàng hóa",
  };
  return title[typeModal] ?? "";
};

const ModalUpdateHangHoa = (props) => {
  const url = process.env.REACT_APP_API_URL
  const [imageDataBasic, setImageDataBasic] = useState(null);
  const [base64String, setBase64String] = useState(null);

  const {
    showModal,
    closeModal,
    typeModal,
    selectedItem,
    setTypeModal,
    refetch,
  } = props,
    _isMounted = useRef(false),
    modalRef = useRef(null),
    {
      data: dataLoaiHanghoa,
      isFetching: { isGetLoaiHangHoa },
    } = useGetAllLoaiHangHoaQuery(),
    {
      data: dataDonViTinh,
      isFetching: { isGetDonViTinh },
    } = useGetAllDonViTinhQuery(),
    [updatehanghoa, { isLoading: isUpdatePhongBan }] =
      useUpdateHangHoaMutation(),
    isLoading = isUpdatePhongBan,
    header = getHeader(typeModal);
  const submitForm = (data) => {
    const tempData = {
      [modelObj.MaHangHoa]: data[modelObj.MaHangHoa],
      [modelObj.TenHangHoa]: data[modelObj.TenHangHoa],
      [modelObj.MoTa]: data[modelObj.MoTa],
      [modelObj.NguonGoc]: data[modelObj.NguonGoc],
      [modelObj.DonGia]: data[modelObj.DonGia],
      [modelObj.MaLoaiHangHoa]: data[modelObj.MaLoaiHangHoa],
      [modelObj.MaDonViTinh]: data[modelObj.MaDonViTinh],
      [modelObj.File]: imageDataBasic
    };

    typeModal === TYPE_MODAL.UPDATE && callApiUpdate(tempData);
  },
    callApiUpdate = async (paramData) => {
      try {
        await updatehanghoa(paramData).unwrap();
        toast.success("Chỉnh sửa thành công thành công");
        refetch();
        closeModalWithOtherFunc();
      } catch (error) {
        toast.error("Đã có lỗi xảy ra vui lòng liên hệ bộ phận");
      }
    },
    closeModalWithOtherFunc = () => {
      setTypeModal("");
      modalRef.current.reset(initialFormState);
      closeModal();
    },
    getInitialStateFromApiToUpdate = async (selectedItem) => {
      modalRef.current?.reset(
        {
          ...selectedItem,
          [modelObj.MaHangHoa]: selectedItem?.id,
          [modelObj.TenHangHoa]: selectedItem?.tenHangHoa,
          [modelObj.MoTa]: selectedItem?.moTa,
          [modelObj.NguonGoc]: selectedItem?.nguonGoc,
          [modelObj.DonGia]: selectedItem?.donGia,
          [modelObj.MaLoaiHangHoa]: selectedItem?.maLoaiHangHoa,
          [modelObj.MaDonViTinh]: selectedItem?.maDonViTinh,
        },
        { keepDirty: true }
      );
    };

  const handleImageConvert = (base64String) => {
    setBase64String(base64String);
    toast.success("Thêm ảnh thành công", {
      toastId: "alert-add-image",
    });
  }

  useEffect(() => {
    if (selectedItem[0] && typeModal === TYPE_MODAL.UPDATE) {
      getInitialStateFromApiToUpdate(selectedItem[0]);
    }
  }, [selectedItem[0], typeModal]);

  useEffect(() => {
    _isMounted.current = true;
    return () => {
      _isMounted.current = false;
    };
  }, []);

  return (
    <RHFDrawer
      handleClose={closeModalWithOtherFunc}
      submitForm={submitForm}
      isOpen={showModal}
      header={header}
      type={typeModal}
      fullScreen
      loading={isLoading}
      initialFormState={initialFormState}
      schema={schema}
      ref={modalRef}
    >
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <CustomImageUpload
            onImageConvert={handleImageConvert}
            setImageDataBasic={setImageDataBasic}
          />
          {base64String ? <div>
            <img
              src={base64String}
              alt="Converted"
              style={{ maxWidth: "100%", maxHeight: "300px" }}
            />
          </div> : selectedItem[0]?.duongDanHinhAnh && (
            <div style={{ textAlign: "left" }}>
              <img
                src={`${url}/File/image?path=${selectedItem[0]?.duongDanHinhAnh}`}
                alt="Converted"
                style={{ maxWidth: "100%", maxHeight: "300px" }}
              />
            </div>
          )}
        </Grid2>

        <Grid2 size={6}>
          <TextFieldRHF
            name={modelObj.MaHangHoa}
            label={labelObj.MaHangHoa}
            disabled={isLoading}
            required
          />
        </Grid2>
        <Grid2 size={6}>
          <TextFieldRHF
            name={modelObj.TenHangHoa}
            label={labelObj.TenHangHoa}
            disabled={isLoading}
            required
          />
        </Grid2>
        <Grid2 size={6}>
          <TextFieldRHF
            name={modelObj.MoTa}
            label={labelObj.MoTa}
            disabled={isLoading}
            required
          />
        </Grid2>
        <Grid2 size={6}>
          <TextFieldRHF
            name={modelObj.NguonGoc}
            label={labelObj.NguonGoc}
            disabled={isLoading}
            required
          />
        </Grid2>
        <Grid2 size={12}>
          <TextFieldRHF
            name={modelObj.DonGia}
            label={labelObj.DonGia}
            disabled={isLoading}
            required
          />
        </Grid2>
        <Grid2 size={6}>
          <AutocompleteRHF
            name={modelObj.MaLoaiHangHoa}
            label={labelObj.MaLoaiHangHoa}
            isGetOnlyId
            disabled={isLoading}
            data={commonMapDataAutocomplete(dataLoaiHanghoa, "name")}
            skeletonLoading={isGetLoaiHangHoa}
          />
        </Grid2>
        <Grid2 size={6}>
          <AutocompleteRHF
            name={modelObj.MaDonViTinh}
            label={labelObj.MaDonViTinh}
            isGetOnlyId
            disabled={isLoading}
            data={commonMapDataAutocomplete(dataDonViTinh, "name")}
            skeletonLoading={isGetDonViTinh}
          />
        </Grid2>
      </Grid2>
    </RHFDrawer>
  );
};

export default ModalUpdateHangHoa;
