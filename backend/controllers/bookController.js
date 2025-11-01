import { sql } from "../config/db.js"



export const getBooks = async(req , res) =>{
    try {
        const books = await sql`SELECT * FROM books ORDER BY created_at ASC`;
        
        console.log("fetched books", books);
        res.status(200).json({ success:true , data:books});
    } catch (error) {
        console.log("Error in getBooks function", error);
        res.status(500).json({ success: false, message: "Internal Server Error" }); 
    }
}




export const createBook = async(req , res) =>{
    const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const newBook = await sql`
      INSERT INTO books (name,price,image)
      VALUES (${name},${price},${image})
      RETURNING *
    `;

    res.status(201).json({ success: true, data: newBook[0] });
  } catch (error) {
    console.log("Error in createBook function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}



export const getBook = async(req , res) =>{
    const { id } = req.params;

  try {
    const book = await sql`
     SELECT * FROM books WHERE id=${id}
    `;

    res.status(200).json({ success: true, data: book[0] });
  } catch (error) {
    console.log("Error in getProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }

}




export const updateBook = async(req , res) =>{
    const { id } = req.params;
  const { name, price, image } = req.body;

  try {
    const updateBook = await sql`
      UPDATE books
      SET name=${name}, price=${price}, image=${image}
      WHERE id=${id}
      RETURNING *
    `;

    if (updateBook.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({ success: true, data: updateBook[0] });
  } catch (error) {
    console.log("Error in updateBook function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}



export const deleteBook = async(req , res) =>{
    const { id } = req.params;

  try {
    const deletedBook = await sql`
      DELETE FROM books WHERE id=${id} RETURNING *
    `;

    if (deletedBook.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({ success: true, data: deletedBook[0] });
  } catch (error) {
    console.log("Error in deleteBook function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}