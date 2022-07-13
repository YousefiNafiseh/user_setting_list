import Typography from "@mui/material/Typography";
import { faLocale } from "../../locale/faLocale";
import { enLocale } from "../../locale/enLocale";
import { useRouter, NextRouter } from "next/router";

interface PageTitlePropsModel {
  pathName: string;
}

function PageTitle(props: PageTitlePropsModel) {
  const router: NextRouter = useRouter();
  const { locale } = router;
  const language = locale === "fa" ? faLocale : enLocale;
  const pageTitle = props.pathName === "/" ? language.home : language.userSetting;

  return (
    <Typography variant="h6" sx={{ color: "text.primary" }}>
      {pageTitle}
    </Typography>

  )
}

export default PageTitle;