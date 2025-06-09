import { FaRobot } from "react-icons/fa6";
import ReactMarkdown from "react-markdown";

export default function BotMessage({ role, content, loading }) {
  return (
    <div className="flex flex-col gap-0.5 w-full my-2">
      <div className="flex items-center justify-start">
        <div className="flex justify-center items-center p-1 w-8 h-8 bg-white border-1 border-[#062D76] rounded-full mr-2">
          <FaRobot size={18} color="#062D76" />
        </div>
        <div className="text-[#052259]">{role}</div>
      </div>

      <div className={`w-fit ml-8 text-[#052259] bg-white gap-2.5 p-2.5 mx-4 text-sm ${loading ? "leading-none" : "leading-8"} rounded-xl border border-[1px_solid_#B2BED5]`}>
        {/* <p className="whitespace-pre-line">{content}</p> */}
        {loading ? (
          typeof content === "string" ? (
            <div className="animate-pulse">...</div>
          ) : (
            content
          )
        ) : (
          <ReactMarkdown>{content}</ReactMarkdown>
        )}
      </div>
    </div>
  );
}
