import Video from "../models/Video";

// export const home = (req, res) => {
//   Video.find({}, (error, videos) => { 
//     return res.render("home", { pageTitle: "Home", videos });
//   });
// };

// Mongoose 6.0 버전 이상에서는 Model.find() 함수가 더 이상 콜백 함수를 지원하지 않습니다. 대신에 Model.find()는 Promise를 반환하도록 변경되었습니다.
export const home = async (req, res) => {
    const videos = await Video.find({});
    return res.render("home", { pageTitle: "Home", videos });
};

export const watch = (req, res) => {
  const { id } = req.params;
  res.render("watch", { pageTitle: `Watching` });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  res.render("edit", { pageTitle: `Editing`  });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  video.title = title;
  console.log(req.body);
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = (req, res) => {
  const { title } = req.body;
  return res.redirect("/");
};
