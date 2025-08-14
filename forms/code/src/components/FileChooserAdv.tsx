import React, { useState } from "react";

export const FileChooserAdv = () => {
  const [form, setForm] = useState({
    name: "",
    files: null,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(form);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm((prevForm) => ({ ...prevForm, [name]: files }));
    } else {
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    }
  };

  return (
    <form className="form" autoComplete="off" onSubmit={handleSubmit}>
      <label htmlFor="name">Ваше имя</label>
      <input
        id="name"
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
      />

      <input type="file" name="files" onChange={handleChange} />
      <button type="submit">ок</button>
    </form>
  );
};
