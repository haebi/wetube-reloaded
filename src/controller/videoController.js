import Video from "../models/Video";

// export const home = (req, res) => {
//   Video.find({}, (error, videos) => { 
//     return res.render("home", { pageTitle: "Home", videos });
//   });
// };

// Mongoose 6.0 버전 이상에서는 Model.find() 함수가 더 이상 콜백 함수를 지원하지 않습니다. 대신에 Model.find()는 Promise를 반환하도록 변경되었습니다.
// nico 강의 버전으로 다시 수정...
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

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  // const video = new Video({
  //   title: title,
  //   description: description,
  //   createdAt: Date.now(),
  //   hashtags: hashtags.split(",").map((word) => `#${word}`),
  //   meta: {
  //     views: 0,
  //     rating: 0,
  //   },
  // });

  // const dbVideo = video.save();
  // console.log(dbVideo);

  // save() 대신 create 를 사용하는 방법
  await Video.create({
    title: title,
    description: description,
    createdAt: Date.now(),
    hashtags: hashtags.split(",").map((word) => `#${word}`),
    meta: {
      views: 0,
      rating: 0,
    },
  });
  
  return res.redirect("/");
};
