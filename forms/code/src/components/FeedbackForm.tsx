import { useState } from "react";

export interface IForm {
  name: string;
  password: string;
  policy: boolean;
}

export const FeedbackForm = () => {
  const [form, setForm] = useState<IForm>({
    name: "",
    password: "",
    policy: true,
  });

  const { name, password, policy } = form;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form data:", form);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <form className="form" autoComplete="off" onSubmit={handleSubmit}>
      <label htmlFor="name">Ваше имя</label>
      <input
        id="name"
        name="name"
        type="text"
        value={name}
        onChange={handleChange}
      />

      <label htmlFor="password">Пароль</label>
      <input
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={handleChange}
      />
      <div className="form__agreement">
        <input
          id="policy"
          name="policy"
          type="checkbox"
          checked={policy}
          onChange={handleChange}
        />
        <label htmlFor="policy">Согласен на обработку данных</label>
      </div>
      <button type="submit">Отправить</button>
    </form>
  );
};
