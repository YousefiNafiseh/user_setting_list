import * as React from "react";
import Box from "@mui/material/Box";

import ConnectionWaysItem, { ConnectionWaysItemType } from "./ConnectionWaysItem";

type AddConnectionWaysProps = {
  items: ConnectionWaysItemType[];
  handleShowConnectionWays: (show: boolean) => void;
  handleReloadList: () => void;
}

function ConnectionWaysList({ items, handleReloadList, handleShowConnectionWays }: AddConnectionWaysProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {
        items?.map((item: ConnectionWaysItemType) => {
          return <ConnectionWaysItem
            item={item}
            key={item.id}
            handleReloadList={handleReloadList}
          />
        })
      }
    </Box>
  );
}

export default ConnectionWaysList;
