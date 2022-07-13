import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { faLocale } from "../locale/faLocale";
import { enLocale } from "../locale/enLocale";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRouter, NextRouter } from "next/router";
import GetIcon from "../connectionWaysList/GetIcon";

type optionType = {
  label: string;
  icon: string;
}

interface FormModel {
  type: optionType;
  link: string
}

type SocialItemType = {
  id: number;
  type: string;
  link: string;
}

type ListData = {
  id: number;
  type: string;
  link: string;
}

type AddSocialProps = {
  handleShowConnectionWays: (show: boolean) => void;
  handleReloadList: () => void;
  socialItem?: SocialItemType;
  items?: ListData[],
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddConnectionWays({
  handleShowConnectionWays,
  handleReloadList,
  socialItem,
  items = [{
    id: Math.random(),
    type: "Instagram",
    link: "http://yahoo.com",
  }],
}: AddSocialProps) {
  /* @ts-ignore: Unreachable code error*/
  let [connectionWaysType, setConnectionWaysType] = useState<optionType>(null);
  const router: NextRouter = useRouter();
  const { locale } = router;
  const language = locale === "fa" ? faLocale : enLocale;
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const optionData = [
    { label: "Twitter", icon: "Twitter" },
    { label: "Instagram", icon: "Instagram" },
    { label: "Facebook", icon: "Facebook" },
    { label: "Telegram", icon: "Telegram" },
    { label: "LinkedIn", icon: "LinkedIn" },
  ];

  React.useEffect(() => {
    if (socialItem) {
      reset({
        link: socialItem.link,
        type: {
          label: socialItem.type,
          icon: socialItem.type
        }
      });
      setConnectionWaysType({
        label: socialItem.type,
        icon: socialItem.type
      });
    }

  }, []);

  const { handleSubmit, control, formState, reset } = useForm<FormModel>(
    {
      mode: "onChange",
      reValidateMode: "onSubmit"
    }
  );

  const onSubmit: SubmitHandler<FormModel> = (data) => {
    const findDuplicate = items.find((x: ListData) => (x.link === data.link) && (x.type === data.type.label))
    if (!!findDuplicate) {
      if (socialItem) {
        const dataModel = {
          id: socialItem.id,
          params: {
            type: data.type.label,
            link: data.link
          }
        };
        fetch("/api/setting", {
          method: "PUT",
          body: JSON.stringify(dataModel),
          headers: {
            "Content-Type": "application/json"
          },
        })
          .then((response) => {
            handleShowConnectionWays(false);
            return response.json()
          })
      } else {
        const dataModel = {
          ...data,
          type: data.type.label
        };
        fetch("/api/setting", {
          method: "POST",
          body: JSON.stringify(dataModel),
          headers: {
            "Content-Type": "application/json"
          },
        })
          .then((response) => {
            handleShowConnectionWays(false);
            return response.json();
          });
      }

    } else {
      setOpenSnackbar(true);
      handleShowConnectionWays(false);
    }
    handleReloadList();
  };

  const handleChangeConnectionWaysType = (value: optionType) => {
    setConnectionWaysType(value);
  }

  const resetForm = () => {
    reset({ link: "", type: undefined });
    /* @ts-ignore: Unreachable code error*/
    setConnectionWaysType(null);
    handleShowConnectionWays(false);
  }

  const handleCancel = () => {
    resetForm();
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <>
      <Paper
        sx={{
          marginTop: "16px",
          borderRadius: "16px",
          backgroundColor: "action.disabled",
          boxShadow: "none",
          padding: "16px",
        }}
      >
        <Box sx={{ marginBottom: "16px" }}>
          <Typography
            variant="h6"
            sx={{
              margin: "0",
              fontFamily: "iranyekan, Helvetica, Arial, sans-serif",
              fontWeight: "500",
              fontSize: "0.75rem",
              lineHeight: "1.57",
            }} >
            {/* @ts-ignore: Unreachable code error*/}
            {` ${language[socialItem ? "editSocial" : "addConnectionWays"]} ${connectionWaysType?.label ? language[connectionWaysType?.label] : ""}`}
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4}>
              <Controller
                name="type"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Autocomplete
                    id="Social"
                    options={optionData}
                    autoHighlight
                    value={connectionWaysType}
                    getOptionLabel={(option) => {
                      /* @ts-ignore: Unreachable code error*/
                      return option?.label ? language[option.label] : ""
                    }}
                    renderOption={(props, option) => (
                      <Box component="li" sx={{ display: "flex", gap: "16px" }} {...props}>
                        <GetIcon variation={option.icon} />
                        {/* @ts-ignore: Unreachable code error*/}
                        {language[option.label]}
                      </Box>
                    )}
                    isOptionEqualToValue={(option, value) => option.label === value.label}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={language.type}
                        color="warning"
                        size="small"
                        inputProps={{
                          ...params.inputProps,
                        }}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    )}
                    onChange={
                      (e, data) => {
                        handleChangeConnectionWaysType(data || { label: "", icon: "" });
                        onChange(data);
                      }}
                  />
                )}
                rules={{ required: language.fieldRequired }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Controller
                name="link"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    id="link"
                    label={language.link}
                    error={!!error}
                    helperText={error ? error?.type === "required" ? language.fieldRequired : language.fillCorrectURL : null}
                    size="small"
                    color="warning"
                    sx={{ width: "100%", lineHeight: "1.4375em" }}
                    value={value}
                    onChange={onChange}
                  />
                )}
                rules={{
                  required: true,
                  pattern: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig
                }}
              />
            </Grid>
          </Grid>
        </form>
        <Box
          sx={{
            marginTop: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            padding: 0,
            gap: "8px",
          }}
        >
          <Button
            variant="outlined"
            color="warning"
            sx={{
              fontWeight: "500",
              fontSize: "0.696429rem",
              lineHeight: "1.75",
            }}
            size="small"
            onClick={handleCancel}
          >
            {language.cancel}
          </Button>
          <Button
            variant="contained"
            color="warning"
            disabled={!formState.isValid}
            onClick={handleSubmit(onSubmit)}
            sx={{
              fontWeight: "500",
              fontSize: "0.696429rem",
              lineHeight: "1.75",
            }}
            size="small"
          >
            {/* @ts-ignore: Unreachable code error*/}
            {` ${language[socialItem ? "editSocial" : "submitSocial"]} ${connectionWaysType?.label ? language[connectionWaysType?.label] : ""}`}
          </Button>
        </Box>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {language.duplicate}
          </Alert>
        </Snackbar>
      </Paper>
    </>
  )
}

export default AddConnectionWays;