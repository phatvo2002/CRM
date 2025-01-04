import { Grid, Grid2 } from "@mui/material";
import { useEffect, useRef } from "react";
import TextFieldRHF from "../../../../Components/ReactHookFormComp/TextFieldRHF/TextFieldRHF";
import RHFDrawer from "../../../../Components/ReactHookFormComp/RHFDrawer/RHFDrawer";
import { TYPE_MODAL } from "../../../../Until/constant";
import { validateString } from "../../../../Until/validateYup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useAddDonViTinhMutation } from "src/App/Api/DonViTinh";
// ------ Form Config ------ //
const modelObj = {
    name: "name",
    tiLeChuyenDoi: "tiLeChuyenDoi",
    moTa: "moTa",
  },
  labelObj = {
    name: "Tên đơn vị tính",
    tiLeChuyenDoi: "Tỉ lệ chuyển đổi",
    moTa: "Mô tả",
  },
  initialFormState = {
    [modelObj.name]: "",
    [modelObj.tiLeChuyenDoi]: 0,
    [modelObj.moTa]: "",
  },
  schema = yup.object().shape({
    [modelObj.name]: validateString(),
    [modelObj.tiLeChuyenDoi]: validateString(),
    [modelObj.moTa]: validateString(),
  });
// ------ End Of Form Config ------ //

const getHeader = (typeModal) => {
  const title = {
    [TYPE_MODAL.INSERT]: "Thêm mới đơn vị tính",
  };
  return title[typeModal] ?? "";
};

const ModalAddDonViTinh = (props) => {
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
    [addDonViTinh] = useAddDonViTinhMutation(),
    isLoading = false,
    header = getHeader(typeModal);

  const submitForm = (data) => {
      const tempData = {
        [modelObj.name]: data[modelObj.name],
        [modelObj.tiLeChuyenDoi]: data[modelObj.tiLeChuyenDoi],
        [modelObj.moTa]: data[modelObj.moTa],
      };
      typeModal === TYPE_MODAL.INSERT && callApiInsert(tempData);
    },
    callApiInsert = async (data) => {
      try {
        await addDonViTinh(data).unwrap();
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
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
            name={modelObj.name}
            label={labelObj.name}
            disabled={isLoading}
            required
          />
        </Grid2>
        <Grid2 size={12}>
          <TextFieldRHF
            name={modelObj.tiLeChuyenDoi}
            label={labelObj.tiLeChuyenDoi}
            disabled={isLoading}
            type="number"
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
      </Grid2>
    </RHFDrawer>
  );
};

export default ModalAddDonViTinh;
