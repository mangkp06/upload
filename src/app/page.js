import FileUpload from "./components/FileUpload";

export default function Home() {
  return (
    <div>
     <header className="header">
        <div className="header-content">
          <h1 className="title">File Upload</h1>
          <img className="logo" src="/tally-logo.png" alt="Tally Logo" />
        </div>
      </header>
      <div className="content">
        <FileUpload />
      </div>
    </div>
  );
}
