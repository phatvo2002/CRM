import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddMailMutation, useGuiMailBaoGiaMutation } from "src/App/Api/MailServicesApi";
import { TextFieldRHF } from "src/App/Components/ReactHookFormComp";
import { validateEmail } from "src/App/Until/validateYup";
import TextAreaRHF from "src/App/Components/ReactHookFormComp/TextAreaRHF";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import { Grid2 } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as yup from "yup";
import { Dropzone, FileMosaic } from "@files-ui/react";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const modelObj = {
    ToMail: "ToMail",
    Subject: "Subject",
    Body: "Body",
    KhachHangTiemNangId: "KhachHangTiemNangId",
    KhachHangMucTieuId: "KhachHangMucTieuId",
    AttachtMent: "AttachtMent",
  },
  labelObj = {
    ToMail: "Đến mail",
    Subject: "Tiêu đề",
    Body: "Nội dung mail",
  },
  initialFormState = {
    [modelObj.ToMail]: "",
    [modelObj.Subject]: "",
    [modelObj.Body]: "",
    [modelObj.AttachtMent]: [],
    [modelObj.KhachHangMucTieuId]: null,
    [modelObj.KhachHangTiemNangId]: null,
  },
  schema = yup.object().shape({
    [modelObj.ToMail]: validateEmail(),
  });
export const ModalGuiMailBaoGia = ({ showModal, typeModal, closeModal ,baoGiaData }) => {
  const {id} = useParams()
  const [files, setFiles] = useState([]);
  const [guiMail] = useGuiMailBaoGiaMutation();
  const _isMounted = useRef(false);
  const modalRef = useRef(null);
  const submitForm = (data) => {
    const tempData = {
      ToMail: data[modelObj.ToMail],
      Subject: data[modelObj.Subject],
      Body: data[modelObj.Body],
      AttachtMent: files,
      KhachHangMucTieuId: null,
      KhachHangTiemNangId: null,
      BaoGiaId : id
    };
    callApiSentFile(tempData)
  };
  console.log(baoGiaData)
  const callApiSentFile = async (params) => {
    try {
      const response =  await guiMail(params);
      console.log(response)
      if(response?.data.status == 200)
      {
          toast.success(response?.data.message);
          closeModalWithOtherFunc();
      }
      else
      {
        toast.error(response?.data.message);
      }
    } catch (err) {
      toast.error(
        "Đã có lỗi xảy ra vui lòng liên hệ bộ phận quản trị hệ thống"
      );
    }
  };

  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
  };
  const removeFile = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const closeModalWithOtherFunc = () => {
    modalRef.current.reset(initialFormState);
    setFiles([])
    closeModal();
  };
  const getInitialStateFromApiToUpdate  = async (selectedItem) => {
    modalRef.current?.reset(
      {
        ...selectedItem,
        [modelObj.ToMail]: selectedItem?.khachHangMucTieu?.email,
      },
      { keepDirty: true }
    );
  };
  useEffect(() => {
      if (baoGiaData) {
        getInitialStateFromApiToUpdate(baoGiaData);
      }
    }, [baoGiaData]);



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
        header={"Gửi mail"}
        type={typeModal}
        loading={false}
        initialFormState={initialFormState}
        schema={schema}
        ref={modalRef}
      >
        <Grid2 container spacing={2} width={"500px"}>
          <Grid2 size={12}>
            <TextFieldRHF
              name={modelObj.ToMail}
              label={labelObj.ToMail}
              required
            />
          </Grid2>
          <Grid2 size={12}>
            <TextFieldRHF
              name={modelObj.Subject}
              label={labelObj.Subject}
              required
            />
          </Grid2>
          <Grid2 size={12}>
            <TextAreaRHF name={modelObj.Body} label={labelObj.Body} required />
          </Grid2>
          <Grid2 size={12}>
            <Dropzone
              onChange={updateFiles}
              label={"Upload file của bạn ..."}
              value={files}
            >
              {files.map((file) => (
                <FileMosaic
                  key={file.id}
                  {...file}
                  onDelete={removeFile}
                  info
                />
              ))}
            </Dropzone>
          </Grid2>
        </Grid2>
      </RHFDrawer>
    </>
  );
};
