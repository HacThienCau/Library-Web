'use server'

import client from "@/lib/mongodb"
import { FAQDocument } from "@/types";
import { ObjectId } from "mongodb";

const db = client.db(process.env.MONGODB_DBNAME);

export async function fetchFAQS() {
    try {
        const collectionName = process.env.MONGODB_COLLECTIONNAME as string;
        const documentId = process.env.MONGODB_DOCUMENTID as string;
    
        const faqs = await db.collection<FAQDocument>(collectionName).findOne({
            _id: ObjectId.createFromHexString(documentId)
        });
    
        console.log('FAQS from MongoDb', faqs);
    
        if (!faqs) {
            throw new Error("Error fetching data from db!");
        }
    
        return faqs;

    } catch (error) {
        console.error(error);
        return null;
    }
   
}

// export async function fetchBooksAndCategories() {
//   try {
//     const books = await db.collection("book").aggregate([
//       {
//         $lookup: {
//           from: "category",
//           localField: "theLoai",
//           foreignField: "_id",
//           as: "theLoaiChiTiet",
//         },
//       },
//       {
//         $unwind: "$theLoaiChiTiet",
//       },
//       {
//         $project: {
//           tenSach: 1,
//           moTa: 1,
//           tenTacGia: 1,
//           hinhAnh: 1,
//           nam: 1,
//           trangThai: 1,
//           tenTheLoai: {
//             $concat: [
//               "$theLoaiChiTiet.tenTheLoaiCha",
//               " - ",
//               "$theLoaiChiTiet.tenTheLoaiCon",
//             ],
//           },
//         },
//       },
//     ]).toArray();

//     console.log("Books after aggregate:", books);

//     return { books };
//   } catch (error) {
//     console.error("Lỗi fetchBooksAndCategories", error);
//     return null;
//   }
// }
export async function fetchBooksAndCategories() {
  try {
    const [books, categories] = await Promise.all([
      db.collection("book").find({}).toArray(),
      db.collection("category").find({}).toArray(),
    ]);

    // Map: tenTheLoaiCon -> "Cha - Con"
    const categoryMap = new Map();
    for (const cat of categories) {
      const fullName = `${cat.tenTheLoaiCha} - ${cat.tenTheLoaiCon}`;
      categoryMap.set(cat.tenTheLoaiCon, fullName);
    }

    // Chỉ giữ các trường mong muốn và thêm tenTheLoai
    const booksWithGenres = books.map((book) => ({
        _id: book._id,
      tenSach: book.tenSach,
      moTa: book.moTa,
      tenTacGia: book.tenTacGia,
      hinhAnh: book.hinhAnh,
      nam: book.nam,
      trangThai: book.trangThai,
      tenTheLoai: categoryMap.get(book.theLoai) || book.theLoai,
    }));

    console.log("Books with joined category:", booksWithGenres);

    return { books: booksWithGenres };
  } catch (error) {
    console.error("Lỗi fetchBooksAndCategories", error);
    return null;
  }
}

export async function fetchBorrowCardsByUserId(userId: string) {
  try {
    const cards = await db.collection("borrowCard").find({ userId }).toArray();
    return cards;
  } catch (error) {
    console.error("Error fetching borrow cards:", error);
    return [];
  }
}