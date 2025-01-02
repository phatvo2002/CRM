import { Grid, Grid2 } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { AutocompleteRHF, TextFieldRHF } from "src/App/Components/ReactHookFormComp";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import { TYPE_MODAL } from "src/App/Until/constant";
import { validateString } from "src/App/Until/validateYup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useAddMenuMutation } from "src/App/Api/MenuApi";
import {
  useAddLoaiHangHoaMutation,
  useGetAllLoaiHangHoaQuery,
} from "src/App/Api/LoaiHangHoa";
import CustomImageUpload from "src/App/Components/CustomUploadImages/CusTomUploadImages";
import { commonMapDataAutocomplete } from "src/App/Until/mapData.helper";
import { useGetAllDonViTinhQuery } from "src/App/Api/DonViTinh";
import { useAddHangHoaMutation } from "src/App/Api/HangHoa";
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
    [TYPE_MODAL.INSERT]: "Thêm mới hàng hóa",
  };
  return title[typeModal] ?? "";
};

const ModalAddhangHoa = (props) => {
  const {
      showModal,
      closeModal,
      typeModal,
      setTypeModal,
      setLoading,
      refetch,
    } = props,
    _isMounted = useRef(false),
    modalRef = useRef(null),
    [addHangHoa] = useAddHangHoaMutation(),
    {
      data: dataLoaiHanghoa,
      isFetching: { isGetLoaiHangHoa },
    } = useGetAllLoaiHangHoaQuery(),
    {
      data: dataDonViTinh,
      isFetching: { isGetDonViTinh },
    } = useGetAllDonViTinhQuery(),
    isLoading = false,
    header = getHeader(typeModal);

  const [base64String, setBase64String] = useState("");
  const [imageDataBasic, setImageDataBasic] = useState("");
  const submitForm = (data) => {
      const tempData = {
        [modelObj.MaHangHoa]: data[modelObj.MaHangHoa],
        [modelObj.TenHangHoa]: data[modelObj.TenHangHoa],
        [modelObj.MoTa]: data[modelObj.MoTa],
        [modelObj.NguonGoc]: data[modelObj.NguonGoc],
        [modelObj.DonGia] :data[modelObj.DonGia],
        [modelObj.MaLoaiHangHoa] : data [modelObj.MaLoaiHangHoa],
        [modelObj.MaDonViTinh] :data[modelObj.MaDonViTinh],
        [modelObj.File] : imageDataBasic
      };
      typeModal === TYPE_MODAL.INSERT && callApiInsert(tempData);
    },
    callApiInsert = async (data) => {
     
      try {
        await addHangHoa(data).unwrap();
        toast.success("Thêm mới thành công!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
       
        refetch();
        closeModalWithOtherFunc();
      } catch (error) {
        toast.error("Đã có lỗi khi xảy ra!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };
  const handleImageConvert = (base64String) => {
      setBase64String(base64String);
      toast.success("Thêm ảnh thành công", {
        toastId: "alert-add-image",
      });
    },
    closeModalWithOtherFunc = () => {
      setTypeModal("");
      setBase64String("");
      setImageDataBasic("");
      modalRef.current.reset(initialFormState);
      closeModal();
    };
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
      fullScreen
      type={typeModal}
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
        {base64String && (
          <div style={{ textAlign: "left" }}>
            <img
              src={base64String}
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

export default ModalAddhangHoa;
