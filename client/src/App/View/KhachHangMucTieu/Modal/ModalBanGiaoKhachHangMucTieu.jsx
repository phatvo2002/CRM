import { Grid2 } from "@mui/material";
import { useEffect, useRef } from "react";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import { TYPE_MODAL } from "src/App/Until/constant";
import { validateString } from "src/App/Until/validateYup";
import * as yup from "yup";
import { toast } from "react-toastify";
import AutocompleteRHF from "src/App/Components/ReactHookFormComp/AutocompleteRHF";
import { commonMapDataAutocomplete } from "src/App/Until/mapData.helper";
import { useGetUserByPhongBanIdQuery } from "src/App/Api/UserApi";
import { SwitchRHF } from "src/App/Components/ReactHookFormComp";
import { useBanGiaoKhachHangMucTieuMutation } from "src/App/Api/KhachHangMucTieuApi";
// ------ Form Config ------ //
const modelObj = {
    khachHangMucTieuId: "khachHangMucTieuId",
    nguoiDungId: "nguoiDungId",
    checkIsLichHen: "checkIsLichHen",
    checkIsCuocGoi: "checkIsCuocGoi",
    checkIsNhiemVu: "checkIsNhiemVu"
},
    labelObj = {
        nguoiDungId: "Danh sách nhân viên",
        checkIsLichHen: "Bàn giao lịch hẹn đang thực hiện",
        checkIsCuocGoi: "Bàn giao cuộc gọi đang thực hiện",
        checkIsNhiemVu: "Bàn giao nhiệm vụ đang thực hiện"
    },
    initialFormState = {
        [modelObj.khachHangMucTieuId]: "",
        [modelObj.nguoiDungId]: "",
        [modelObj.checkIsCuocGoi]: false,
        [modelObj.checkIsLichHen]: false,
        [modelObj.checkIsNhiemVu]: false,
    },
    schema = yup.object().shape({
        [modelObj.nguoiDungId]: validateString(),
    });
// ------ End Of Form Config ------ //



const ModalBanGiaoKhachHangMucTieu = (props) => {
    const {
        showModal,
        closeModal,
        setLoading,
        selectedItem,
        typeModal,
        refetch
    } = props,
        _isMounted = useRef(false),
        modalRef = useRef(null),
        [banGiaoKhachHang] =
        useBanGiaoKhachHangMucTieuMutation(),
        header = "Bàn giao khách hàng";
    const { data: userPhongBan, isLoading: isUserPhongBan } =
        useGetUserByPhongBanIdQuery();
    const isLoading = isUserPhongBan;
    const submitForm = (data) => {
        const tempData = {
            khachHangMucTieuId: selectedItem[0]?.id,
            nguoiDungId: data[modelObj.nguoiDungId],
            checkIsLichHen: data[modelObj.checkIsLichHen],
            checkIsCuocGoi: data[modelObj.checkIsCuocGoi],
            checkIsNhiemVu: data[modelObj.checkIsNhiemVu],
        };
        // console.log(tempData)
        callApiUpdate(tempData);
    },
        callApiUpdate = async (params) => {
            try {
                await banGiaoKhachHang(params)
                toast.success("Bàn giao khách hàng thành công");
                closeModalWithOtherFunc();
                refetch()
            } catch (error) {
                toast.error("Đã có lỗi xảy ra vui lòng liên hệ bộ phận quản trị hệ thống");
            } 
        },
        closeModalWithOtherFunc = () => {
            modalRef.current.reset(initialFormState);
            closeModal();
        },
        getInitialStateFromApiToUpdate = async (selectedItem) => {
            modalRef.current?.reset(
                {
                    ...selectedItem,
                    // id: selectedItem?.id,
                    [modelObj.nguoiDungId]: selectedItem?.nguoiDung?.id  ,
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
            <Grid2 container spacing={2} width={"500px"}>
                <p style={{ textAlign: "center" }}>Bàn giao khách hàng cho</p>
                <Grid2 size={12}>
                    <AutocompleteRHF
                        name={modelObj.nguoiDungId}
                        label={labelObj.nguoiDungId}
                        isGetOnlyId
                        disabled={isLoading}
                        data={commonMapDataAutocomplete(userPhongBan, "name")}
                        skeletonLoading={isUserPhongBan}
                    />
                </Grid2>
                <p style={{ textAlign: "center" }}>Bàn giao tất cả hoạt động</p>
                <Grid2 size={12}>
                    <label>{labelObj.checkIsCuocGoi}</label>
                    <SwitchRHF
                        name={modelObj.checkIsCuocGoi}
                        label={labelObj.checkIsCuocGoi}
                        disabled={isLoading}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <label>{labelObj.checkIsLichHen}</label>
                    <SwitchRHF
                        name={modelObj.checkIsLichHen}
                        label={labelObj.checkIsLichHen}
                        disabled={isLoading}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <label>{labelObj.checkIsNhiemVu}</label>
                    <SwitchRHF
                        name={modelObj.checkIsNhiemVu}
                        label={labelObj.checkIsNhiemVu}
                        disabled={isLoading}
                    />
                </Grid2>
            </Grid2>
        </RHFDrawer>
    );
};

export default ModalBanGiaoKhachHangMucTieu;
