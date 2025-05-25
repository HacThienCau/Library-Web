import { CalendarDays, MessageCircle, User } from "lucide-react";


export default function NewsCard({
  title,
  date,
  publisher,
  comments,
  image,
  description,
  sub,
}) {
  return (
    <div className="bg-white rounded shadow p-3">
      <img src={image} alt={title} className="rounded w-full h-60 object-cover" />
      <div className="flex items-center text-sm mt-2 gap-2 text-gray-600">
        <CalendarDays className="w-4 h-4" />
        {date}
        <MessageCircle className="w-4 h-4 ml-2" />
        {comments}
        <User className="w-4 h-4 ml-2" />
        {publisher}
      </div>
      <h3 className="font-bold text-base mt-2">{title}</h3>
      <hr className="border-red-600 w-16 mt-1 mb-2" />
      <p className="text-sm text-justify">
        <strong>{description}</strong>
        <br />
       { sub && <span className="text-gray-500">{sub}</span> }
      </p>
    </div>
  );
}
