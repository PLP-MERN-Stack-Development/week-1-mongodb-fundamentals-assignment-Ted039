//  Use the bookstore database
// use plp_bookstore;

// Find all books in a specific genre (e.g., Fiction)
db.books.find({ genre: "Fiction" });

//  Find books published after a certain year (e.g., 1950)
db.books.find({ published_year: { $gt: 1950 } });

//  Find books by a specific author (e.g., Ngũgĩ wa Thiong’o)
db.books.find({ author: "Ngũgĩ wa Thiong’o" });

//  Update the price of a specific book (e.g., "Petals of Blood")
db.books.updateOne({ title: "Petals of Blood" }, { $set: { price: 1250 } });

//  Delete a book by its title (e.g., "The River Between")
db.books.deleteOne({ title: "The River Between" });

//  Find books that are both in stock and published after 2010
db.books.find({
  $and: [
    { in_stock: true },
    { published_year: { $gt: 2010 } }
  ]
});


//  Use projection to return only title, author, and price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

//  Sort books by price (ascending & descending)
db.books.find().sort({ price: 1 });  // Ascending  
db.books.find().sort({ price: -1 }); // Descending  

//  Implement pagination (5 books per page)
db.books.find().skip(5).limit(5);

//  Calculate the average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

//  Find the author with the most books
db.books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
]);

//  Group books by publication decade and count them
db.books.aggregate([
  { $project: { decade: { $floor: { $divide: ["$published_year", 10] } } } },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
]);

//  Create an index on the title field for faster searches
db.books.createIndex({ title: 1 });

//  Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 });

//  Use explain() to analyze query performance
db.books.find({ title: "Petals of Blood" }).explain("executionStats");
