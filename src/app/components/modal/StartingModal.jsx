import Image from "next/image";

import styles from "./StartingModal.module.css";
import robotImage from "/public/images/robot-full.png";
import nextButton from "/public/images/nextButton.png";

export default function StartingModal({ content, onClick }) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-end items-center py-8 px-8">
      <div
        className="w-full bg-black bg-opacity-80 text-white mb-12 px-4 pt-8 pb-4 rounded-xl flex flex-col justify-center items-center gap-y-4"
        onClick={onClick}
      >
        {content}
        <div className={`w-full flex justify-end ${styles.nextButton}`}>
          <Image src={nextButton} width={15} height={15} alt="다음 버튼" />
        </div>
      </div>
      <Image src={robotImage} width={200} height={200} alt="AI 로봇" />
    </div>
  );
}
