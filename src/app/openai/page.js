import "./style.css";

export default function Page() {
  return (
    <div>
      <div>hihi~~~</div>

      <div className="btn">click here</div>
      <div>open ai key is: {process.env.openAiKey}</div>
    </div>
  );
}
