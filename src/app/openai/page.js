// 'use client';

import "./style.css";

//components
import FetchingAnswer from "../components/openai/FetchingAnswer";

export default function Page() {
  return (
    <div>
      <div>hihi~~~</div>

      <FetchingAnswer />
      {/* <div
        className="btn"
        onClick={() => {
          console.log("1234");
        }}
      >
        click here
      </div> */}
      <div>open ai key is: {process.env.NEXT_PUBLIC_OPENAI_API_KEY}</div>
    </div>
  );
}
