import { useState } from "react";
import { BookCard } from "../book-card/book-card";
import { BookView } from "../book-view/book-view";

const MainView = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "The Matrix",
      image: "https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg",
      author: "Lana Wachowski, Lilly Wachowski",
      description:
        "A hacker discovers a shocking truth about his reality and his role in the war against its controllers.",
      genre: "Sci-Fi",
      year: 1999,
    },
    {
      id: 2,
      title: "Pulp Fiction",
      image: "https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg",
      author: "Quentin Tarantino",
      description:
        "A darkly comedic crime anthology told through interwoven stories of violence, redemption, and chance.",
      genre: "Crime / Drama",
      year: 1994,
    },
    {
      id: 3,
      title: "Fight Club",
      image:
        "https://i.pinimg.com/736x/28/9b/68/289b68f86fe0d0695e2fc3b22e988f70.jpg",
      author: "David Fincher",
      description:
        "An insomniac office worker and a soap maker form an underground fight club with unexpected consequences.",
      genre: "Drama / Psychological Thriller",
      year: 1999,
    },
    {
      id: 4,
      title: "Back to the Future Part III",
      image:
        "https://upload.wikimedia.org/wikipedia/en/4/4e/Back_to_the_Future_Part_III.jpg",
      author: "Robert Zemeckis",
      description:
        "Marty travels to the Old West to save Doc Brown, facing outlaws and time-travel challenges.",
      genre: "Adventure / Sci-Fi / Western",
      year: 1990,
    },
    {
      id: 5,
      title: "The Sandlot",
      image: "https://m.media-amazon.com/images/I/91W2JLVNlsL.jpg",
      author: "David Mickey Evans",
      description:
        "A boy and his new friends bond over baseball and backyard adventures in the summer of '62.",
      genre: "Family / Sports / Comedy",
      year: 1993,
    },
  ]);

  const [selectedBook, setSelectedBook] = useState(null);

  if (selectedBook) {
    return (
      <BookView book={selectedBook} onBackClick={() => setSelectedBook(null)} />
    );
  }

  return (
    <div>
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onBookClick={(newSelectedBook) => setSelectedBook(newSelectedBook)}
        />
      ))}
    </div>
  );
};

export default MainView;
