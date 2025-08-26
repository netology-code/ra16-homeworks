import { useRef } from "react";

export const FileChooser = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(fileRef.current?.files);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="formFile">FileChooser</label>
      <input type="file" id="formFile" ref={fileRef} multiple />
      <button type="submit">Ok</button>
    </form>
  );
};
