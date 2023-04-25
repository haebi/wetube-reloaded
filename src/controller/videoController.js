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

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);

  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  return res.render("watch", { pageTitle: `Watching`, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  return res.render("edit", { pageTitle: `Edit:, ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hash } = req.body;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  video.title = title;
  video.description = description;
  video.hashtags = hashtags
    .split(",")
    .map((word) => (word.srartsWith("#") ? word : `#${word}`));
  await video.save();
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
  try {
    await Video.create({
      title: title,
      description: description,
      hashtags: hashtags
        .split(",")
        .map((word) => (word.srartsWith("#") ? word : `#${word}`)),
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
