export const BookCard = ({ book, onBookClick }) => {
  return (
    <div onClick={() => onBookClick(book)}>
      <div>{book.title}</div>
    </div>
  );
};
