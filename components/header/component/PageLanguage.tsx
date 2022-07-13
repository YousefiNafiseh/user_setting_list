import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { faLocale as language } from "../../locale/faLocale";
import { useRouter, NextRouter } from "next/router";

function PageLanguage() {
  const router: NextRouter = useRouter();
  const { locale, pathname, asPath, query } = router;

  const changeLanguage = (currentLanguage: string) => {
    router.push({ pathname, query }, asPath, { locale: currentLanguage });
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <Button
          variant="text"
          color="warning"
          sx={{
            color: locale === "en" ? "" : "rgb(121, 131, 142)"
          }}
          onClick={() => { changeLanguage("en") }}
        >
          English
        </Button>
        <Button
          variant="text"
          color="warning"
          sx={{
            color: locale === "fa" ? "" : "rgb(121, 131, 142)"
          }}
          onClick={() => { changeLanguage("fa") }}
        >
          {language.persian}
        </Button>
      </Box>
    </>
  )
}

export default PageLanguage;