// Import MongoDB client
const { MongoClient } = require('mongodb');

// Connection URI (replace with your MongoDB connection string if using Atlas)
const uri = 'mongodb://localhost:27017';

// Database and collection names
const dbName = 'plp_bookstore';
const collectionName = 'books';

// Kenya-based book data
const books = [
  {
    title: "Facing Mount Kenya",
    author: "Jomo Kenyatta",
    genre: "History",
    published_year: 1938,
    price: 1500,
    in_stock: true,
    pages: 350,
    publisher: "East African Educational Publishers"
  },
  {
    title: "Petals of Blood",
    author: "Ngũgĩ wa Thiong'o",
    genre: "Fiction",
    published_year: 1977,
    price: 1200,
    in_stock: true,
    pages: 400,
    publisher: "Heinemann Kenya"
  },
  {
    title: "A Grain of Wheat",
    author: "Ngũgĩ wa Thiong'o",
    genre: "Historical Fiction",
    published_year: 1967,
    price: 1100,
    in_stock: true,
    pages: 250,
    publisher: "East African Publishing House"
  },
  {
    title: "The River Between",
    author: "Ngũgĩ wa Thiong'o",
    genre: "Fiction",
    published_year: 1965,
    price: 1000,
    in_stock: false,
    pages: 200,
    publisher: "East African Publishing House"
  },
  {
    title: "Unbowed",
    author: "Wangari Maathai",
    genre: "Autobiography",
    published_year: 2006,
    price: 1800,
    in_stock: true,
    pages: 400,
    publisher: "Knopf Publishing"
  },
  {
    title: "Born a Crime",
    author: "Trevor Noah",
    genre: "Biography",
    published_year: 2016,
    price: 1700,
    in_stock: true,
    pages: 304,
    publisher: "Spiegel & Grau"
  },
  {
    title: "The Elephant Dance",
    author: "Henry Ole Kulet",
    genre: "Fiction",
    published_year: 2016,
    price: 1300,
    in_stock: true,
    pages: 320,
    publisher: "Longhorn Publishers"
  },
  {
    title: "My Life in Crime",
    author: "John Kiriamiti",
    genre: "Crime Fiction",
    published_year: 1984,
    price: 900,
    in_stock: false,
    pages: 250,
    publisher: "East African Educational Publishers"
  },
  {
    title: "The Black Hermit",
    author: "Ngũgĩ wa Thiong'o",
    genre: "Drama",
    published_year: 1968,
    price: 950,
    in_stock: true,
    pages: 180,
    publisher: "Heinemann Kenya"
  },
  {
    title: "The Green Hills of Africa",
    author: "Ernest Hemingway",
    genre: "Travel",
    published_year: 1935,
    price: 1400,
    in_stock: true,
    pages: 300,
    publisher: "Scribner"
  }
];

// Function to insert books into MongoDB
async function insertBooks() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB server');

    // Get database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Check if collection already has documents
    const count = await collection.countDocuments();
    if (count > 0) {
      console.log(`Collection already contains ${count} documents. Dropping collection...`);
      await collection.drop();
      console.log('Collection dropped successfully');
    }

    // Insert the books
    const result = await collection.insertMany(books);
    console.log(`${result.insertedCount} books were successfully inserted into the database`);

    // Display the inserted books
    console.log('\nInserted books:');
    const insertedBooks = await collection.find({}).toArray();
    insertedBooks.forEach((book, index) => {
      console.log(`${index + 1}. "${book.title}" by ${book.author} (${book.published_year})`);
    });

  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}

// Run the function
insertBooks().catch(console.error);
