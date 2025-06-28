export const BookView = ({ book, onBackClick }) => {
  return (
    <div>
      <h1>{book.title}</h1>
      <h2>Directed by: {book.author}</h2>
      <img src={book.image} alt={book.title} />
      <p>
        <strong>Description:</strong> {book.description}
      </p>
      <p>
        <strong>Genre:</strong> {book.genre}
      </p>
      <p>
        <strong>Year:</strong> {book.year}
      </p>
      <br />
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
