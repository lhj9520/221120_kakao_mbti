const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

const characters = [
  {
    name: "스카피",
    content: "https://kakaofriendsmbti.netlify.app/images/ENTJ.png",
    mbti: "ENTJ",
  },
  {
    name: "어피치",
    content: "https://kakaofriendsmbti.netlify.app/images/ENTP.png",
    mbti: "ENTP",
  },
  {
    name: "콘",
    content: "https://kakaofriendsmbti.netlify.app/images/ENFJ.png",
    mbti: "ENFJ",
  },
  {
    name: "케로",
    content: "https://kakaofriendsmbti.netlify.app/images/ENFP.png",
    mbti: "ENFP",
  },
  {
    name: "빠냐",
    content: "https://kakaofriendsmbti.netlify.app/images/ESTJ.png",
    mbti: "ESTJ",
  },
  {
    name: "프로도",
    content: "https://kakaofriendsmbti.netlify.app/images/ESTP.png",
    mbti: "ESTP",
  },
  {
    name: "제이지",
    content: "https://kakaofriendsmbti.netlify.app/images/ESFJ.png",
    mbti: "ESFJ",
  },
  {
    name: "팬다주니어",
    content: "https://kakaofriendsmbti.netlify.app/images/ESFP.png",
    mbti: "ESFP",
  },
  {
    name: "콥",
    content: "https://kakaofriendsmbti.netlify.app/images/INTJ.png",
    mbti: "INTJ",
  },
  {
    name: "춘식이",
    content: "https://kakaofriendsmbti.netlify.app/images/INTP.png",
    mbti: "INTP",
  },
  {
    name: "네오",
    content: "https://kakaofriendsmbti.netlify.app/images/INFJ.png",
    mbti: "INFJ",
  },
  {
    name: "앙몬드",
    content: "https://kakaofriendsmbti.netlify.app/images/INFP.png",
    mbti: "INFP",
  },
  {
    name: "라이언",
    content: "https://kakaofriendsmbti.netlify.app/images/ISTJ.png",
    mbti: "ISTJ",
  },
  {
    name: "튜브",
    content: "https://kakaofriendsmbti.netlify.app/images/ISTP.png",
    mbti: "ISTP",
  },
  {
    name: "죠르디",
    content: "https://kakaofriendsmbti.netlify.app/images/ISFJ.png",
    mbti: "ISFJ",
  },
  {
    name: "무지",
    content: "https://kakaofriendsmbti.netlify.app/images/ISFP.png",
    mbti: "ISFP",
  },
];

app.use(cors());

app.get("/", (req, res) => {
  res.send("서버 요청");
});

app.get("/mbti", (req, res) => {
  //   console.log(req.query);

  let result = "";
  const mbti = req.query;

  for (let key in mbti) {
    const 객체 = mbti[key];

    const [leftk, rightk] = Object.keys(객체);
    const [leftv, rightv] = Object.values(객체);

    if (leftv >= rightv) {
      result += leftk;
    } else {
      result += rightk;
    }
  }

  const [result2] = characters.filter((item, index) => {
    return item.mbti === result;
  });

  res.send(result2);
});

app.listen(port, () => {
  console.log("서버가 실행되었습니다.");
});
