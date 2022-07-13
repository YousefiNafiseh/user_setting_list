import Button from "@mui/material/Button";
import { faLocale } from "../locale/faLocale";
import { enLocale } from "../locale/enLocale";
import { useRouter, NextRouter } from "next/router";

function ConnectionWaysList() {
  const router: NextRouter = useRouter();
  const { locale } = router;
  const language = locale === "fa" ? faLocale : enLocale;

  const handleEdit = () => {

    fetch("/api/setting", {
      method: "PUT",
      body: JSON.stringify({ id: 0.5371810862808657, params: { type: "linkedin", link: 'http://yahoo.com' } }),
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((response) => response.json())
  }

  const handleDelete = () => {
    fetch("/api/setting", {
      method: "DELETE",
      body: JSON.stringify({ id: 0.23377169380910212 }),
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((response) => response.json())
  }

  return (
    <>
      <Button onClick={handleEdit}>{language.edit}</Button>
      <Button onClick={handleDelete}>{language.delete}</Button>
    </>
  )
}

export default ConnectionWaysList;