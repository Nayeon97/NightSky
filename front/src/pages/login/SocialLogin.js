import images from "../../assets/images";
import { SocialBtn, Img } from "../../styles/LoginStyle";

const SocialLogin = () => {
  const googleUrl = process.env.REACT_APP_GOOGLE_URL;
  const kakaoUrl = process.env.REACT_APP_KAKAO_URL;
  const naverUrl = process.env.REACT_APP_NAVER_URL;

  const clickGoogle = () => {
    window.open(`${googleUrl}`, "_self");
  };
  const clickKakao = () => {
    window.open(`${kakaoUrl}`, "_self");
  };
  const clickNaver = () => {
    window.open(`${naverUrl}`, "_self");
  };

  return (
    <>
      <SocialBtn onClick={clickGoogle}>
        <Img src={images.Google} alt="google" />
      </SocialBtn>
      <SocialBtn onClick={clickKakao}>
        <Img src={images.Kakao} alt="kakao" />
      </SocialBtn>
      <SocialBtn onClick={clickNaver}>
        <Img src={images.Naver} alt="naver" />
      </SocialBtn>
    </>
  );
};

export default SocialLogin;
