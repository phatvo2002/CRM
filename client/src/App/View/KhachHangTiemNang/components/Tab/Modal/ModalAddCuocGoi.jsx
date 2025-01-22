import {  Grid2 } from "@mui/material";
import { useEffect, useRef } from "react";
import TextFieldRHF from "../../../../../Components/ReactHookFormComp/TextFieldRHF/TextFieldRHF";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import { TYPE_MODAL } from "src/App/Until/constant";
import DateTimePickerRHF from "src/App/Components/ReactHookFormComp/DateTimePickerRHF";
import { validateString } from "../../../../../Until/validateYup";
import * as yup from "yup";
import { SwitchRHF } from "src/App/Components/ReactHookFormComp";
import { useParams } from "react-router-dom";
import {toast} from 'react-toastify';
import { validateDatePicker } from "../../../../../Until/validateYup";
import AutocompleteRHF from "src/App/Components/ReactHookFormComp/AutocompleteRHF";
import { commonMapDataAutocomplete } from "src/App/Until/mapData.helper";
import { useGetAllKetQuaCuocGoiQuery, useGetAllLoaiCuocGoiQuery } from "src/App/Api/GetDataApi";
import { useAddCuocGoiMutation } from "src/App/Api/CuocGoiApi";
import moment from "moment";
// ------ Form Config ------ //
const modelObj = {
  tieuDe: "tieuDe",
  moTa: "moTa",
  ngayBatDau: "ngayBatDau",
  soPhutGoi :"soPhutGoi",
  soGiayGoi : "soGiayGoi",
  isHoanThanh : "isHoanThanh",
  loaiCuocGoiId : "loaiCuocGoiId",
  khachHangTiemNangId :"khachHangTiemNangId",
  ketQuaCuocGoiId :"ketQuaCuocGoiId"

},
  labelObj = {
    tieuDe: "Tiêu đề",
    moTa: "Mô tả ",
    ngayBatDau: "Ngày bắt đầu",
    soPhutGoi :  "Số phút gọi",
    soGiayGoi :"Số giây gọi",
    isHoanThanh : "Đã hoàn thành",
    loaiCuocGoiId :"Loại cuộc gọi",
    ketQuaCuocGoiId :"Kết quả cuộc gọi"
  },
  initialFormState = {
    [modelObj.tieuDe]: "",
    [modelObj.moTa]: "",
    [modelObj.ngayBatDau]: new Date(),
    [modelObj.soPhutGoi]: 0,
    [modelObj.soGiayGoi]: 0,
    [modelObj.isHoanThanh]:false,
    [modelObj.loaiCuocGoiId]: "", 
    [modelObj.ketQuaCuocGoiId]: "", 
    [modelObj.khachHangTiemNangId]: "", 
  },
  schema = yup.object().shape({
    [modelObj.tieuDe]: validateString(),
    [modelObj.moTa]: validateString(),
    [modelObj.soPhutGoi]: validateString(),
    [modelObj.soGiayGoi]: validateString(),
    [modelObj.ngayBatDau]: validateDatePicker(),
    [modelObj.ketQuaCuocGoiId]: validateString(),
    [modelObj.loaiCuocGoiId]: validateString(), 
  });
// ------ End Of Form Config ------ //

const getHeader = (typeModal) => {
  const title = {
    [TYPE_MODAL.INSERT]: "Thêm mới cuộc gọi",
  };
  return title[typeModal] ?? "";
};

const ModlaAddCuocGoi = (props) => {
  const { showModal, closeModal, typeModal, setTypeModal ,setLoading ,refetch} =
    props,
    _isMounted = useRef(false),
    modalRef = useRef(null),
    {id}= useParams(),
    isLoading = false,
    header = getHeader(typeModal);

    const {data : loaiCuocGoiData , isFetching :isGetCuocGoiFetching} = useGetAllLoaiCuocGoiQuery()
    const {data : KetQuaCuocGoiData , isFetching :isGetKetQuaCuocGoiFetching} = useGetAllKetQuaCuocGoiQuery()
    const [addCuocGoi] = useAddCuocGoiMutation()
  const submitForm = (data) => {
    const tempData = {
      [modelObj.tieuDe]: data[modelObj.tieuDe],
      [modelObj.moTa]: data[modelObj.moTa],
      [modelObj.soPhutGoi]: data[modelObj.soPhutGoi],
      [modelObj.soGiayGoi]: data[modelObj.soGiayGoi],
      [modelObj.ngayBatDau]: moment(data[modelObj.ngayBatDau]).format(),
      [modelObj.ketQuaCuocGoiId]: data[modelObj.ketQuaCuocGoiId],
      [modelObj.loaiCuocGoiId]: data[modelObj.loaiCuocGoiId],
      [modelObj.isHoanThanh] : data[modelObj.isHoanThanh],
      [modelObj.khachHangTiemNangId] : id
    };

    typeModal === TYPE_MODAL.INSERT && callApiInsert(tempData);
 
  },
    callApiInsert = async (data) => {
      try {
        console.log(data);
        await addCuocGoi(data).unwrap();
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
        closeModalWithOtherFunc() 
      } catch (error) {
        toast.error("Đã có lỗi khi xảy ra!", {
          position: "top-center",
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
          <TextFieldRHF
            name={modelObj.soPhutGoi}
            label={labelObj.soPhutGoi}
            disabled={isLoading}
            type="number"
            required
          />
        </Grid2>

        <Grid2 size={6}>
          <TextFieldRHF
            name={modelObj.soGiayGoi}
            label={labelObj.soGiayGoi}
            disabled={isLoading}
            type="number"
            required
          />
        </Grid2>
        <Grid2 size={12}>
          <DateTimePickerRHF
            name={modelObj.ngayBatDau}
            label={labelObj.ngayBatDau}
            disabled={isLoading}
            required
          />
        </Grid2>
        <Grid2 size={6}>
                <AutocompleteRHF
                  name={modelObj.loaiCuocGoiId}
                  label={labelObj.loaiCuocGoiId}
                  isGetOnlyId
                  disabled={isLoading}
                  data={commonMapDataAutocomplete(loaiCuocGoiData, "name")}
                  skeletonLoading={isGetCuocGoiFetching}
                />
              </Grid2>
              <Grid2 size={6}>
                <AutocompleteRHF
                  name={modelObj.ketQuaCuocGoiId}
                  label={labelObj.ketQuaCuocGoiId}
                  isGetOnlyId
                  disabled={isLoading}
                  data={commonMapDataAutocomplete(KetQuaCuocGoiData, "name")}
                  skeletonLoading={isGetKetQuaCuocGoiFetching}
                />
              </Grid2>
        <Grid2 size={12}>
        <label>{labelObj.isHoanThanh}</label>
          <SwitchRHF
            name={modelObj.isHoanThanh}
            label={labelObj.isHoanThanh}
            disabled={isLoading}
            required
          />
        </Grid2>
      </Grid2>
    </RHFDrawer>
  );
};

export default ModlaAddCuocGoi;
