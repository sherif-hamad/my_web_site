import './SiteHeader.css';

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="site-brand" href="/">Sherif Hamad</a>
        <nav className="site-nav">
          <a href="/#home">Home</a>
          <a href="/#music">Music</a>
          <a href="/audio-tools/" className="active">Audio Tools</a>
        </nav>
      </div>
    </header>
  );
}
