import { useState } from "react";

interface Book {
  id: string;
  title: string;
}

export const BooksStore = () => {
  const [books, setBooks] = useState<Book[]>([
    { id: "1", title: "Книга-1" },
    { id: "2", title: "Книга-2" },
    { id: "3", title: "Книга-3" },
  ]);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setBooks(
      books.filter((b) =>
        b.title.toLocaleLowerCase().includes(search.toLocaleLowerCase().trim()),
      ),
    );
  };

  const handleAddBook = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBooks((p) => [...p, { id: crypto.randomUUID(), title: form.title }]);
    setForm({ title: "" });
  };

  const handleRemoveBook = (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div>
      <input type="search" value={search} onChange={handleSearch} />
      <ul>
        {books
          .filter((b) =>
            b.title
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase().trim()),
          )
          .map((b) => (
            <li key={b.id}>
              {b.title}
              <button onClick={() => handleRemoveBook(b.id)}>Удалить</button>
            </li>
          ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleAddBook}
          placeholder="Введите название книги"
        />
        <button>Добавить</button>
      </form>
    </div>
  );
};
