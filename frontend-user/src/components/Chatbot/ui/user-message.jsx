import { FaUser } from "react-icons/fa6";

export default function UserMessage({ role, content }) {
  return (
    <div className="flex flex-col gap-0.5 w-full my-2">
      {/* <div className="flex items-center justify-end">
        <div className="flex justify-center items-center p-1 w-8 h-8 bg-white border-1 border-[#062D76] rounded-full mr-2">
          <FaUser size={18} color="#062D76"/>   
        </div>
         <div className="text-[#052259] flex">{role}</div>
      </div> */}

      <div className="prose self-end w-fit mx-4 gap-2.5 p-2.5 text-sm leading-8 rounded-xl text-white bg-[#2E327D] border-[1px_solid_#052259]">
        <p>{content}</p>
      </div>
    </div>
  );
}
