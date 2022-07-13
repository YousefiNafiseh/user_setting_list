import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import PageLanguage from "./component/PageLanguage";
import PageTitle from "./component/PageTitle";
import Changetheme from "./component/ChangeTheme";
import Breadcrumb from "./component/Breadcrumbs";

interface HeaderProps {
  handleChangeTheme: (mode: "dark" | "light") => void;
}

function Header(props: HeaderProps) {
  const router = useRouter();
  const routerPathName = router.pathname;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          height: "57px",
          flexDirection: "row-reverse"
        }}
      >

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <PageLanguage />
          <Changetheme handleChangeTheme={props.handleChangeTheme} />
        </Box>
        <PageTitle pathName={routerPathName} />
      </Box>
      <Box>
        <Breadcrumb pathName={routerPathName} />
      </Box>
    </>
  )
}

export default Header;