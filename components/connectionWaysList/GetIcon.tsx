import * as Muicon from "@material-ui/icons";

type GetIconModel = {
  variation: string
}

function GetIcon({ variation }: GetIconModel) {
  {/* @ts-ignore: Unreachable code error*/ }
  const IconName = Muicon[variation];
  return <IconName />;
};

export default GetIcon;