import { RiRobot3Line } from 'react-icons/ri';
import ReactMarkdown from 'react-markdown';


export default function BotMessage({ role, content }) {
    return (
        <div className='flex w-full my-2'>
            <div className='flex justify-center p-1 w-8 h-8 border bg-slate-800 rounded-full mr-2'>
                <RiRobot3Line size={18}/>
            </div>

            <div className="prose max-w-[400px]">
                <div>{role}</div>
                 {/* <p className="whitespace-pre-line">{content}</p> */}
                  <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        </div>
    );
}