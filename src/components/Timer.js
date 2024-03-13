// import useEffect from "react";

export default function Timer({ appTimer }) {
  const sec = appTimer % 60;
  const min = Math.floor(appTimer / 60);

  return (
    <div className="timer">
      {min}:{sec}
    </div>
  );
}
