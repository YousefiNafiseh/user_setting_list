import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

type Data = {
  message: string;
  setting: {
      id: number;
      type: string;
      link: string;
    }[],
}

type ParameterModel = {
  req: NextApiRequest;
  res: NextApiResponse<Data>;
  data: Data;
  filePath: string;
}

type GetParameterModel = {
  res: NextApiResponse<Data>;
  data: Data;
}


function handleGet({res,data}:GetParameterModel){
  res.status(200).json({
    message: "success",
    setting: [...data.setting],
  })
}

function handlePut({req,res,data,filePath}:ParameterModel){
  const id = req.body.id;
    const params = req.body.params;
    const currentUserSetting = data.setting.find(x => x.id.toString() === id.toString());
    Object.assign(currentUserSetting, params);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(200).json({
      message: "success",
      setting: [...data.setting],
    })
}

function handlePost({req,res,data,filePath}: ParameterModel){
  const type = req.body.type;
  const link = req.body.link;
  const newSetting = {
    id: Math.random(),
    type,
    link,
  };

  data.setting.push(newSetting);
  fs.writeFileSync(filePath, JSON.stringify(data));
  res.status(200).json({
    message: "success",
    setting: [newSetting],
  })
}

function handleDelete({req,res,data,filePath}: ParameterModel){
  const id = req.body.id;

  data.setting = data.setting.filter(x => x.id.toString() !== id.toString());
  fs.writeFileSync(filePath, JSON.stringify(data));
  res.status(200).json({
    message: "success",
    setting: [...data.setting],
  })
}



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const filePath = path.join(process.cwd(), "data", "setting.json");
  const fileData = fs.readFileSync(filePath, "utf8");
  const data: Data = JSON.parse(fileData);

  if (req.method === "POST") {
    handlePost({req,res,data,filePath});
    // const type = req.body.type;
    // const link = req.body.link;
    // const newSetting = {
    //   id: Math.random(),
    //   type,
    //   link,
    // };

    // data.setting.push(newSetting);
    // fs.writeFileSync(filePath, JSON.stringify(data));
    // res.status(200).json({
    //   message: "success",
    //   setting: [newSetting],
    // })
  } else if (req.method === "PUT") {
    handlePut({req,res,data,filePath});
    // const id = req.body.id;
    // const params = req.body.params;
    // const currentUserSetting = data.setting.find(x => x.id.toString() === id.toString());
    // Object.assign(currentUserSetting, params);
    // fs.writeFileSync(filePath, JSON.stringify(data));
    // res.status(200).json({
    //   message: "success",
    //   setting: [...data.setting],
    // })

  } else if (req.method === "DELETE") {
    handleDelete({req,res,data,filePath});
    // const id = req.body.id;

    // data.setting = data.setting.filter(x => x.id.toString() !== id.toString());
    // fs.writeFileSync(filePath, JSON.stringify(data));
    // res.status(200).json({
    //   message: "success",
    //   setting: [...data.setting],
    // })

  }
  else if (req.method === "GET") {
    handleGet({res,data})
    // res.status(200).json({
    //   message: "success",
    //   setting: [...data.setting],
    // })
  }

}
