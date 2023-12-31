import "./globals.css";
import Script from "next/script";
import localFont from "next/font/local";

// Local Font: PRETENDARD
export const Pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
});

export const metadata = {
  title: "가관",
  description: "GEN-AI & Tour API 해커톤: 가상 관광 시뮬레이션 서비스",
};

export default function RootLayout({ children }) {
  return (
    <html lang="kr">
      <head>
        {/* 네이버 지도 API */}
        <Script
          strategy="beforeInteractive"
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        />
        {/* 네이버 파노라마 뷰 서브모듈 API */}
        <Script
          type="text/javascript"
          strategy="beforeInteractive"
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=panorama`}
        ></Script>
      </head>
      <body className={Pretendard.className}>
        <div className="select-none">{children}</div>
      </body>
    </html>
  );
}
