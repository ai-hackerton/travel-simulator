'use client';
export default function AlertMessage({message}) {
  if (message == "") return;

  return (
    <div className="absolute top-[30%] left-1/2 transform -translate-x-1/2 z-50 bg-black/70 rounded-full px-[17px] text-white text-base font-normal leading-8">
      {message}
    </div>
  )
}