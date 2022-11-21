import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";

const question = [
  {
    text1: "당연하지! 어디서 할지 고민 중이야!",
    text2: "그냥 맛있는거 먹으러 갈까 생각 중이야!",
    re1: "E",
    re2: "I",
  },
  {
    text1: "영화 완전 재밌었어! 너도 한번 봐봐!",
    text2: "좀비가 너무 리얼했어. 실제 상황이면 난 바로 죽었을거야...",
    re1: "S",
    re2: "N",
  },
  {
    text1: "무슨 꽃 샀어? 향은 좋아?",
    text2: "왜 우울해? 무슨 일 있어?",
    re1: "T",
    re2: "F",
  },
  {
    text1: "지금 PPT 만드는 중이니까 아마 한 2시간 뒤면 끝날거 같아!",
    text2: "모르겠어. 근데 지금 PPT 만들고 있어!",
    re1: "J",
    re2: "P",
  },
  {
    text1: "그래! 역시 사람 많고 유명한 벚꽃 명소가 예쁘겠지 어디로 갈까?",
    text2: "그래! 사람 적은 볓꽃 명소 한번 찾아볼까?",
    re1: "E",
    re2: "I",
  },
  {
    text1: "지구는 멸망하지 않아!",
    text2: "일단 가장 좋아하는 음식부터 먹으러 갈거야!",
    re1: "S",
    re2: "N",
  },
  {
    text1: "드라이샴푸? 마른 머리에 비비면 되는건가? 완전 티 안나!",
    text2: "어제 무슨 일 있었어? 지금은 피곤한거 좀 괜찮아?",
    re1: "T",
    re2: "F",
  },
  {
    text1:
      "우선 2시에 도착하니까 버스 타고 숙소가서 체크인하고 늦은 점심 먹을까?",
    text2: "글쎄... 너는 가고 싶은데 없어? 난 현지 맛집이면 다 좋아!",
    re1: "J",
    re2: "P",
  },
  {
    text1: "아니! 나 지금 밖이야! 친구랑 있어. 무슨 일 있어?",
    text2: "응! 나 지금 넷플릭스 보고 있어! 무슨 일 있어?",
    re1: "E",
    re2: "I",
  },
  {
    text1: "이해는 안가는데 시험번위고 종요하다니까 그냥 외우려고!",
    text2: "이따가 선생님한테 가서 다시 물어보려고!",
    re1: "S",
    re2: "N",
  },
  {
    text1: "무슨 시험 봤어? 다음 시험은 언제야? 괜찮아?",
    text2: "다음에 꼭 붙을거야! 다음 시험을 기약하자! 너무 슬퍼하지마!",
    re1: "T",
    re2: "F",
  },
  {
    text1: "진짜로? 왜? 갑자기? 다른 사람들은 뭐래?",
    text2: "오! 갑자기 왜? 그럼 조는 어떻게 정한대?",
    re1: "J",
    re2: "P",
  },
];

function Main() {
  const navigation = useNavigate();

  const { setDispatchType } = React.useContext(StoreContext);

  React.useEffect(() => {
    setDispatchType({
      code: "tmpStorage",
    });
  }, []);

  return (
    <div className="app">
      <div className="content-box">
        <div className="img-box">
          <img
            src="https://kakaofriendsmbti.netlify.app/static/media/00.88f71908.png"
            alt="메인페이지이미지"
          />
        </div>
        <button
          className="button bntsize"
          onClick={() => {
            navigation("/on1", { replace: true });
          }}
        >
          시작하기
        </button>
        <p>MADE BY @geenee</p>
      </div>
    </div>
  );
}

const ProgressBar = (props) => {
  // 서브페이지는 총 12개
  const width = (480 / 12) * props.step;

  return (
    <div className="progress-bar">
      <div className="percent" style={{ width: width }}></div>
    </div>
  );
};

function Sub() {
  const { setDispatchType } = React.useContext(StoreContext);

  const { seq } = useParams();
  const imgseq = seq.length === 1 ? "0" + seq : seq;
  const srcurl = `https://kakaofriendsmbti.netlify.app/images/${imgseq}-01.png`;
  const seqn = parseInt(seq);

  const 데이터저장 = (props) => {
    const value = props === 1 ? question[seqn - 1].re1 : question[seqn - 1].re2;

    setDispatchType({
      code: "answer",
      params: { value: value, page: seqn },
    });
  };

  return (
    <div className="app">
      <div className="content-box">
        <ProgressBar step={seq} />
        <div className="img-box sub">
          <img src={srcurl} alt="서브페이지이미지" />
        </div>
        <button className="button bntsize" onClick={() => 데이터저장(1)}>
          {question[seqn - 1].text1}
        </button>
        <button className="button bntsize" onClick={() => 데이터저장(2)}>
          {question[seqn - 1].text2}
        </button>
      </div>
    </div>
  );
}

function Result() {
  const navigation = useNavigate();

  const { state } = useLocation();

  const { setDispatchType } = React.useContext(StoreContext);

  const [result, setResult] = React.useState(undefined);

  //결과 서버로 전송
  const MBTISend = async () => {
    await axios({
      url: "http://localhost:5000/mbti",
      method: "GET",
      responseType: "json",
      params: state,
    })
      .then((res) => {
        // console.log(res.data);
        setResult(res.data);
      })
      .catch((e) => {
        console.log("error!!", e);
      });
  };

  React.useEffect(() => {
    MBTISend();
  }, []);

  if (result === undefined) {
    return <div></div>;
  }

  return (
    <div className="app">
      <div className="content-box">
        <div className="img-box">
          <img src={result.content} alt="결과페이지이미지" />
        </div>
        <button
          className="button bntsize"
          onClick={() => {
            setDispatchType({
              code: "dataReset",
            });
            navigation("/on1", { replace: true });
          }}
        >
          다시하기
        </button>
      </div>
    </div>
  );
}

const StoreContext = React.createContext({});

function App() {
  const navigation = useNavigate();

  const [dispatch, setDispatchType] = React.useState({
    code: null,
    params: null,
  });

  const [mbti, setMbti] = React.useState([
    { E: 0, I: 0 },
    { N: 0, S: 0 },
    { T: 0, F: 0 },
    { J: 0, P: 0 },
  ]);

  React.useEffect(() => {
    switch (dispatch.code) {
      case "answer":
        // mbti 결과 저장
        const { value, page } = dispatch.params;

        const clonembti = [...mbti];

        const findIndex = clonembti.findIndex((item) => {
          return item[value] !== undefined;
        });

        clonembti[findIndex][value]++;
        // console.log(clonembti);
        setMbti(clonembti);

        //로컬 스토리지 저장
        localStorage.setItem("MBTI", JSON.stringify(clonembti));
        localStorage.setItem("PAGE", page);

        //페이지 이동
        if (page < 12) {
          navigation(`/on${page + 1}`, { replace: true });
        } else {
          navigation("/result", { replace: true, state: mbti });
        }

        break;
      case "dataReset":
        setMbti([
          { E: 0, I: 0 },
          { N: 0, S: 0 },
          { F: 0, T: 0 },
          { J: 0, P: 0 },
        ]);
        break;
      case "tmpStorage":
        const tmpMbti = localStorage.getItem("MBTI");
        const tmpPage = localStorage.getItem("PAGE");
        // console.log(tmpMbti, tmpPage);

        if (tmpPage === "12") {
          localStorage.removeItem("MBTI");
          localStorage.removeItem("PAGE");
          return;
        }

        if (tmpMbti && tmpPage) {
          const tmpMbtiarray = JSON.parse(tmpMbti);
          setMbti(tmpMbtiarray);
          const currentpage = Number(tmpPage);
          navigation(`/on${currentpage + 1}`, { replace: true });
        }
        break;
      default:
        break;
    }
  }, [dispatch]);

  return (
    <StoreContext.Provider value={{ setDispatchType }}>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/on:seq" element={<Sub />} />
        <Route exact path="/result" element={<Result />} />
      </Routes>
    </StoreContext.Provider>
  );
}

export default App;
