"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import robotImage from "/public/images/robot-full.png";
import nextButton from "/public/images/nextButton.png";

import styles from "./ResultLoginBox.module.css";

import { userExists, getUserRecord } from "@/api/firebase";
import useSimulationHistory from "../../store/simulationHistory";
import useTravelSettingsStore from "../../store/travelSettings";

import AlertMessage from "../common/AlertMessage";

export default function ResultLoginBox() {
  const [name, setName] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const router = useRouter();


  const { setTravelSettings } = useTravelSettingsStore();
  const { setSimulationHistory } = useSimulationHistory();

  const onSubmit = async () => {
    if (name) {
      const res = await userExists(name);
      if (res === true) {
        const record = await getUserRecord(name);

        if (record) {
          setTravelSettings(record.travelSettings);
          setSimulationHistory(record.simulationHistory);
          setAlertMessage("");
          router.push('/result')

        } else {
          setAlertMessage("저장된 여행 일정이 없습니다");
          setTimeout(() => {
            setAlertMessage("");
          }, 2000);
        }
      } else {
        setAlertMessage("저장된 이름이 없습니다");
        setTimeout(() => {
          setAlertMessage("");
        }, 2000);
      }
    }
  };


  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-end items-center py-8 px-8">
      <AlertMessage message={alertMessage} />
      <div
        className="w-full bg-black bg-opacity-80 text-white mb-12 px-4 pt-8 pb-4 rounded-xl flex flex-col justify-center items-center gap-y-4"
        onClick={() => onSubmit()}
      >
        <div className="flex flex-col items-center gap-y-4">
          <p className="font-medium text-white text-lg">
            계획 세울 때 입력한 이름을 알려주세요!
          </p>
          <div className="w-full max-w-fit bg-white px-4 py-2 rounded-xl text-black">
            <input
              className="w-full bg-white"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className={`w-full flex justify-end  ${styles.nextButton}`}>
          <Image src={nextButton} width={15} height={15} alt="다음 버튼" />
        </div>
      </div>
      <Image src={robotImage} width={200} height={200} alt="AI 로봇" />
    </div>
  );
}
