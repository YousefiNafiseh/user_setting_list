import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Collapse from "@mui/material/Collapse";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter, NextRouter } from "next/router";
import { faLocale } from "../locale/faLocale";
import { enLocale } from "../locale/enLocale";
import AddConnectionWays from "../content/AddConnectionWays";
import GetIcon from "./GetIcon";

export type ConnectionWaysItemType = {
  id: number;
  type: string;
  link: string;
}

type ConnectionWaysItemProps = {
  item: ConnectionWaysItemType;
  handleReloadList: () => void;
}

function ConnectionWaysItem({
  item,
  handleReloadList,
}: ConnectionWaysItemProps) {
  const router: NextRouter = useRouter();
  const { locale } = router;
  const language = locale === "fa" ? faLocale : enLocale;
  const [showEditConnectionWays, setShowEditConnectionWays] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleShowConnectionWays = (value: boolean) => {
    setShowEditConnectionWays(value);
  }

  const handleOpenModal = () => {
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  const handleDelete = () => {
    fetch("/api/setting", {
      method: "DELETE",
      body: JSON.stringify({ id: item.id }),
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((response) => {
        handleCloseModal();
        handleReloadList();
        handleShowConnectionWays(false);
        return response.json();
      })
  }

  return (
    <Paper
      sx={{
        borderRadius: "16px",
        backgroundColor: "action.selected",
        boxShadow: "none",
        padding: "16px",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={9} sm={9}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <GetIcon variation={item?.type} />
              {/* @ts-ignore: Unreachable code error*/}
              <Typography variant="body1">{language[item.type]}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Typography variant="caption">{language.link + " : "}</Typography>
              <Link href={item.link} >
                <a style={{ color: "rgb(255, 168, 46)" }}>
                  {item.link}
                </a>
              </Link>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3} sm={3}>
          <Button
            variant="text"
            color="warning"
            startIcon={<GetIcon variation="Edit" />}
            size="small"
            onClick={()=>handleShowConnectionWays(true)}
            disabled={showEditConnectionWays}
          >
            {language.edit}
          </Button>
          <Button
            variant="text"
            color="error"
            startIcon={<GetIcon variation="Delete" />}
            size="small"
            onClick={handleOpenModal}
          >
            {language.delete}
          </Button>
        </Grid>
      </Grid>
      <Collapse in={showEditConnectionWays}>
        <AddConnectionWays
          handleShowConnectionWays={handleShowConnectionWays}
          socialItem={item}
          handleReloadList={handleReloadList}
        />
      </Collapse>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {language.areYouSure}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "20px",
              justifyContent: "end",
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
              onClick={handleCloseModal}
            >
              {language.cancel}
            </Button>
            <Button
              variant="contained"
              color="warning"
              size="small"
              onClick={handleDelete}
            >
              {language.delete}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Paper>
  );
}

export default ConnectionWaysItem;
