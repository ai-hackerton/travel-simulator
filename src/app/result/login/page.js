import Image from "next/image";
import resultImage2 from "public/images/resultImage2.jpg";

import ResultLoginBox from "@/app/components/result/ResultLoginBox";

export default function Page() {
  return (
    <div className="h-screen ">
      <Image
        Images
        src={resultImage2}
        layout="fill"
        objectFit="cover"
        alt="배경화면"
      />
      <div className="absolute py-5 px-5 bg-black/40 backdrop-blur-[1px] inset-0  flex flex-col ">
        <ResultLoginBox />
      </div>
    </div>
  );
}
