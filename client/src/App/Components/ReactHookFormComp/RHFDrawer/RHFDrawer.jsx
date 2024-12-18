import {
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  LinearProgress,
  Typography,
  useMediaQuery,
  Dialog
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { TYPE_MODAL } from "../../../Until/constant";
import CloseIcon from "@mui/icons-material/Close";
import { yupResolver } from "@hookform/resolvers/yup";
import { forwardRef, useImperativeHandle } from "react";

const getNameButtonSave = (submitName, type) => {
  switch (true) {
    case submitName:
      return submitName;
    case type === TYPE_MODAL.INSERT:
      return "THÊM MỚI";
    case type === TYPE_MODAL.UPDATE:
      return "CẬP NHẬT";
    default:
      return "LƯU";
  }
};

const styleLoading = {
  width: "100%",
};

const getWidth = (isDesktop, width) => {
  if (isDesktop) {
    return width || "100%";
  }
  return "100%";
};

const RHFDrawer = forwardRef((props, ref) => {
  const {
      handleClose: _handleClose,
      submitForm,
      isOpen,
      header,
      submitName,
      type,
      loading,
      disabledSaveButton,
      children,
      initialFormState,
      anchor = "center",
      schema,
      fullScreen,
      width,
      isActiveFileList,
      ...otherProps
    } = props,
    methods = useForm({
      resolver: schema ? yupResolver(schema) : null,
      defaultValues: initialFormState,
      mode: "all",
      shouldFocusError: true,
      shouldUseNativeValidation: false,
    }),
    {
      handleSubmit,
      reset,
      formState: { isDirty, isValid },
    } = methods,
    isDesktop = useMediaQuery((theme) => theme.breakpoints.up("xl")),
    drawerWidth = getWidth(isDesktop, width),
    handleClose = (e, reason) => {
      switch (true) {
        case reason === "backdropClick":
          return false;
        case reason === "escapeKeyDown":
          return false;
        case typeof _handleClose === "function": {
          reset(initialFormState);
          return _handleClose();
        }
        default:
          break;
      }
    };

  useImperativeHandle(ref, () => ({
    ...methods,
  }));

  return (
    <Dialog open={isOpen} onClose={handleClose} {...otherProps} fullScreen={fullScreen}>
      <Box
        sx={{
          width: drawerWidth,
          height: "60%",
        }}
      >
   
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.2rem 2rem",
            backgroundColor: "rgba(202,236,255, 0.15)",
            borderBottom: "1px solid #e6e6e6",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#2584ce",
              fontSize: "22px",
              fontWeight: "bold",
              // textTransform: "uppercase"
            }}
          >
            {header}
          </Typography>
          <IconButton
            sx={{
              backgroundColor: "rgba(211, 47, 47, 0.08)",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "rgba(211, 47, 47, 0.2)",
              },
              fontWeight: "bold",
            }}
            color="error"
            variant="outlined"
            onClick={handleClose}
            size="large"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        {/* Body */}
        <Box
          sx={{
            width: "100%",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FormProvider {...methods}>
            <form
              style={{ width: "100%" }}
              onSubmit={handleSubmit(submitForm)}
              noValidate
            >
              {children}
            </form>
          </FormProvider>
        </Box>
        {/* Action */}
        <Grid
          container
          sx={{
            paddingBottom: "1rem",
            paddingX: "2rem",
          }}
        >
          <Grid item xs={12} sx={{ textAlign: "right" }}>
            {type !== TYPE_MODAL.VIEW && (
              <Button
                // disabled={
                //  disabledSaveButton ||
                //   !!loading ||
                //   !isDirty ||
                //   (!isValid && isActiveFileList)
                // }
                variant="contained"
                onClick={handleSubmit(submitForm)}
                sx={{ fontSize: "14px", fontWeight: "bold" }}
              >
                {getNameButtonSave(submitName, type)}
              </Button>
            )}
          </Grid>
        </Grid>
        {loading && <LinearProgress sx={{ ...styleLoading, bottom: 0 }} />}
      </Box>
    </Dialog>
  );
});

export default RHFDrawer;
