import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { faLocale } from "../../locale/faLocale";
import { enLocale } from "../../locale/enLocale";
import { useRouter, NextRouter } from "next/router";

interface BreadcrumbProps {
  pathName: string;
}

function Breadcrumb(props: BreadcrumbProps) {
  const router: NextRouter = useRouter();
  const pageTitle = props.pathName === "/" ? true : false;
  const { locale } = router;
  const language = locale === "fa" ? faLocale : enLocale;

  return (
    <Breadcrumbs
      maxItems={2}
      aria-label="breadcrumb"
      color="#79838e"
    >
      <Link underline="hover" href={`/${locale}`} color="inherit">
        {language.home}
      </Link>

      {!pageTitle &&
        <Link underline="hover" href="/setting" color="inherit">
          {language.userSetting}
        </Link>
      }

    </Breadcrumbs>
  )
}
export default Breadcrumb;