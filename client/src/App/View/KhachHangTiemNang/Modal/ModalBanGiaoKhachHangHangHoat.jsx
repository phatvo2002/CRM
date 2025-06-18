import { Grid2 } from "@mui/material";
import { useEffect, useRef } from "react";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import { TYPE_MODAL } from "src/App/Until/constant";
import { validateString } from "src/App/Until/validateYup";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AutocompleteRHF from "src/App/Components/ReactHookFormComp/AutocompleteRHF";
import { commonMapDataAutocomplete } from "src/App/Until/mapData.helper";
import { useGetUserByPhongBanIdQuery } from "src/App/Api/UserApi";
import { useBangiaoHangLoatMutation, useBangiaoKhachHangTiemNangMutation } from "src/App/Api/KhachHangTiemNangApi";
// ------ Form Config ------ //
const modelObj = {
    userId: "userId",
  },
  labelObj = {
    userId: "Danh sách nhân viên",
  },
  initialFormState = {
    [modelObj.userId]: "",
  },
  schema = yup.object().shape({
    [modelObj.userId]: validateString(),
  });
// ------ End Of Form Config ------ //

const getHeader = (typeModal) => {
  const title = {
    [TYPE_MODAL.UPDATE]: "Bàn giao khách hàng",
  };
  return title[typeModal] ?? "";
};

const ModalBanGiaoKhachHangHangHoat = (props) => {
  const {
      showModal,
      closeModal,
      typeModal,
      setLoading,
      selectedItem,
      setTypeModal,
      refetch
    } = props,
    _isMounted = useRef(false),
    modalRef = useRef(null),
    { id } = useParams(),
    [banGiaoKhachHang] =
    useBangiaoHangLoatMutation();
  const { data: userPhongBan, isLoading: isUserPhongBan } =
    useGetUserByPhongBanIdQuery();
  const isLoading = isUserPhongBan;
  const submitForm = (data) => {
      const tempData = {
        id: selectedItem,
        userId: data[modelObj.userId],
      };

      callApiUpdate(tempData);
    },
    callApiUpdate = async (params) => {
      try {
        const response = await banGiaoKhachHang({data :selectedItem.map(id=>({id})), userId :params?.userId })

        if(response?.data?.status === 200)
        {
            toast.success("Bàn giao khách hàng thành công");
            closeModalWithOtherFunc();
            refetch()
        }else toast.warn("Đã có lỗi xảy ra")
      } catch (error) {
        toast.error("Đã có lỗi xảy ra vui lòng liên hệ bộ phận");
      } finally {
        setLoading(false);
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
          id: selectedItem?.id,
          [modelObj.userId]: selectedItem?.nguoiDungId,
        },
        { keepDirty: true }
      );
    };

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
      header={"Bàn giao khách hàng"}
      type={typeModal}
      loading={isLoading}
      initialFormState={initialFormState}
      schema={schema}
      ref={modalRef}
    >
      <Grid2 container spacing={2} width={"500px"}>
         <p style={{textAlign:"center"}}>Bàn giao khách hàng cho</p>
        <Grid2 size={12}>
          <AutocompleteRHF
            name={modelObj.userId}
            label={labelObj.userId}
            isGetOnlyId
            disabled={isLoading}
            data={commonMapDataAutocomplete(userPhongBan, "name")}
            skeletonLoading={isUserPhongBan}
          />
        </Grid2>
      </Grid2>
    </RHFDrawer>
  );
};

export default ModalBanGiaoKhachHangHangHoat;
