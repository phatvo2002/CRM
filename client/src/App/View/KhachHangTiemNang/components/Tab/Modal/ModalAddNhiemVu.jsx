import { Grid2 } from "@mui/material";
import { useEffect, useRef } from "react";
import TextFieldRHF from "../../../../../Components/ReactHookFormComp/TextFieldRHF/TextFieldRHF";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import { TYPE_MODAL } from "src/App/Until/constant";
import DateTimePickerRHF from "src/App/Components/ReactHookFormComp/DateTimePickerRHF";
import { validateString } from "../../../../../Until/validateYup";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { validateDatePicker } from "../../../../../Until/validateYup";
import AutocompleteRHF from "src/App/Components/ReactHookFormComp/AutocompleteRHF";
import { commonMapDataAutocomplete } from "src/App/Until/mapData.helper";
import {
  useGetAllMucDoUuTienQuery,
  useGetAllTrangThaiThucHienQuery,
} from "src/App/Api/GetDataApi";
import { useAddLichHenMutation } from "src/App/Api/LichhenApi";
import { useAddNhiemVuMutation } from "src/App/Api/NhiemVuApi";
// ------ Form Config ------ //
const modelObj = {
    tieuDe: "tieuDe",
    moTa: "moTa",
    hanHoanThanh: "hanHoanThanh",
    mucDoUuTienId: "mucDoUuTienId",
    trangThaiThucHienId: "trangThaiThucHienId",
    khachHangTiemNangId: "khachHangTiemNangId",
  },
  labelObj = {
    tieuDe: "Tiêu đề",
    moTa: "Mô tả ",
    hanHoanThanh: "Hạn hoàn thành",
    mucDoUuTienId: "Mức độ ưu tiên",
    trangThaiThucHienId: "Trạng thái thực hiện",
  },
  initialFormState = {
    [modelObj.tieuDe]: "",
    [modelObj.moTa]: "",
    [modelObj.hanHoanThanh]: "",
    [modelObj.mucDoUuTienId]: "",
    [modelObj.trangThaiThucHienId]: "",
    [modelObj.khachHangTiemNangId]: "",
  },
  schema = yup.object().shape({
    [modelObj.tieuDe]: validateString(),
    [modelObj.moTa]: validateString(),
    [modelObj.hanHoanThanh]: validateDatePicker(),
    [modelObj.mucDoUuTienId]: validateString(),
    [modelObj.trangThaiThucHienId]: validateString(),
  });
// ------ End Of Form Config ------ //

const getHeader = (typeModal) => {
  const title = {
    [TYPE_MODAL.INSERT]: "Thêm mới nhiệm vụ ",
  };
  return title[typeModal] ?? "";
};

const ModalAddNhiemVu = (props) => {
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
    { id } = useParams(),
    isLoading = false,
    header = getHeader(typeModal);

  const { data: trangThaiThucHienData, isFetching: isGetTrangThaiThucHienFetching } =
  useGetAllTrangThaiThucHienQuery();
  const { data: mucDoUuTienData, isFetching: isGetMucDoUuTienFetching } =
  useGetAllMucDoUuTienQuery();
  const [addNhiemVu] = useAddNhiemVuMutation();
  const submitForm = (data) => {
      const tempData = {
        [modelObj.tieuDe]: data[modelObj.tieuDe],
        [modelObj.moTa]: data[modelObj.moTa],
        [modelObj.hanHoanThanh]: data[modelObj.hanHoanThanh],
        [modelObj.mucDoUuTienId]: data[modelObj.mucDoUuTienId],
        [modelObj.trangThaiThucHienId]: data[modelObj.trangThaiThucHienId],
        [modelObj.khachHangTiemNangId]: id,
      };

      typeModal === TYPE_MODAL.INSERT && callApiInsert(tempData);
    },
    callApiInsert = async (data) => {
      try {
        await addNhiemVu(data).unwrap();
        toast.success("Thêm mới thành công!", {
          position: "top-right",
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
      } finally {
        setLoading(false);
      }
    },
    closeModalWithOtherFunc = () => {
      setTypeModal("");
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
      type={typeModal}
      loading={isLoading}
      initialFormState={initialFormState}
      schema={schema}
      ref={modalRef}
    >
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <TextFieldRHF
            name={modelObj.tieuDe}
            label={labelObj.tieuDe}
            disabled={isLoading}
            required
          />
        </Grid2>
        <Grid2 size={12}>
          <TextFieldRHF
            name={modelObj.moTa}
            label={labelObj.moTa}
            disabled={isLoading}
            required
          />
        </Grid2>
        <Grid2 size={6}>
          <DateTimePickerRHF
            name={modelObj.hanHoanThanh}
            label={labelObj.hanHoanThanh}
            disabled={isLoading}
            required
          />
        </Grid2> 
        <Grid2 size={12}>
          <AutocompleteRHF
            name={modelObj.mucDoUuTienId}
            label={labelObj.mucDoUuTienId}
            isGetOnlyId
            disabled={isLoading}
            data={commonMapDataAutocomplete(mucDoUuTienData, "name")}
            skeletonLoading={isGetMucDoUuTienFetching}
          />
        </Grid2>
         <Grid2 size={12}>
          <AutocompleteRHF
            name={modelObj.trangThaiThucHienId}
            label={labelObj.trangThaiThucHienId}
            isGetOnlyId
            disabled={isLoading}
            data={commonMapDataAutocomplete(trangThaiThucHienData, "name")}
            skeletonLoading={isGetTrangThaiThucHienFetching}
          />
        </Grid2>
      </Grid2>
    </RHFDrawer>
  );
};

export default ModalAddNhiemVu;
