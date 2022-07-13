import { useState, useEffect } from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import { faLocale } from "../locale/faLocale";
import { enLocale } from "../locale/enLocale";
import { useRouter, NextRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";
import AddConnectionWays from "./AddConnectionWays";
import styles from "./Content.module.css";
import ConnectionWaysList from "../connectionWaysList/ConnectionWaysList";

interface FormModel {
  type: string;
  link: string;
}

type ListData = {
  id: number;
  type: string;
  link: string;
}

function Content() {
  let [showAddConnectionWays, setShowAddConnectionWays] = useState<boolean>(false);
  let [list, setList] = useState<ListData[]>([]);
  let [reloadList, setReloadList] = useState<Boolean>(false);
  const router: NextRouter = useRouter();
  const { locale } = router;
  const language = locale === "fa" ? faLocale : enLocale;

  useEffect(() => {
    async function getData() {
      const response = await fetch('http://localhost:3000/api/setting');
      const data = await response.json();
      setList(data.setting)
    }
    getData();
  }, [reloadList])

  const handleShowConnectionWays = (value: boolean) => {
    setShowAddConnectionWays(value);
  }

  const handleReloadList = () => {
    setReloadList(!reloadList);
  }

  return (
    <Paper
      sx={{
        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        boxShadow:
          "rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px",
        marginTop: "48px",
        padding: "24px",
        borderRadius: "16px",
      }}
    >
      <Typography variant="body1" sx={{ fontSize: "0.642857rem", color: 'rgb(121, 131, 142)' }}>
        {language.connectionWays}
      </Typography>
      <Button
        className={styles.addIcon}
        variant="outlined"
        onClick={()=>handleShowConnectionWays(true)}
        disabled={showAddConnectionWays}
        startIcon={<AddIcon style={{ marginRight: 'none', marginLeft: 'none' }} />} >
        {language.addConnectionWays}
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Collapse in={showAddConnectionWays}>
          <AddConnectionWays
            handleShowConnectionWays={handleShowConnectionWays}
            handleReloadList={handleReloadList}
            items={list}
          />
        </Collapse>
        <ConnectionWaysList
          handleShowConnectionWays={handleShowConnectionWays}
          handleReloadList={handleReloadList}
          items={list}
        />
      </Box>
    </Paper>
  )
}

export default Content;