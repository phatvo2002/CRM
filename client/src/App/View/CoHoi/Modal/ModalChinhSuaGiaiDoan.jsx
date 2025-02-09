import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useUpdateGiaiDoanMutation } from "src/App/Api/CoHoiApi";
import { useGetAllGiaiDoanBanHangQuery } from "src/App/Api/GiaiDoanBanHangApi";
import { validateString } from "src/App/Until/validateYup";
import * as yup from "yup";
const modelObj = {
    id: "id",
    giaiDoanId: "giaiDoanId",
  },
  labelObj = {
    giaiDoanId: "Giai đoạn",
  },
  initialFormState = {
    [modelObj.giaiDoanId]: "",
  },
  schema = yup.object().shape({
    [modelObj.giaiDoanId]: validateString(),
  });
const ModalChinhSuaGiaiDoan = (prop) => {
  const { open, handleClose, selectedItem, refetch } = prop,
    _isMounted = useRef(false),
    modalRef = useRef(null);
  const { id } = useParams();
  const [updateGiaiDoan] = useUpdateGiaiDoanMutation();
  const { data: dataGiaiDoan , isFetching : giaiDoanIsFetching } = useGetAllGiaiDoanBanHangQuery();
  const submitForm = (data) => {
      const tempData = {
        [modelObj.id]: id,
        [modelObj.giaiDoanId]: data[modelObj.giaiDoanId],
      };

      callApiUpdate(tempData);
    },
    callApiUpdate = async (paramData) => {
      try {
        await updateGiaiDoan(paramData).unwrap();
        toast.success("Cập nhật giai đoạn thành công");
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
          // [modelObj.id]: selectedItem?.id,
          [modelObj.giaiDoanId]: selectedItem?.giaiDoanId,
        },
        { keepDirty: true }
      );
    };
  useEffect(() => {
    if (selectedItem[0]) {
      getInitialStateFromApiToUpdate(selectedItem[0]);
    }
  }, [selectedItem[0]]);

  useEffect(() => {
    _isMounted.current = true;
    return () => {
      _isMounted.current = false;
    };
  }, []);
  return (
    <>
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
          <Grid2 size={6}>
            <AutocompleteRHF
              name={modelObj.giaiDoanId}
              label={labelObj.giaiDoanId}
              isGetOnlyId
              disabled={isLoading}
              data={commonMapDataAutocomplete(dataGiaiDoan, "name")}
              skeletonLoading={giaiDoanIsFetching}
            />
          </Grid2>
        </Grid2>
      </RHFDrawer>
    </>
  );
};

export default ModalChinhSuaGiaiDoan;
