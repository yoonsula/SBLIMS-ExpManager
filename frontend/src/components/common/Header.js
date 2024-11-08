import './Header.css';

function Header() {
    return (
        <header className="header">
            <a href="/">SBLIMS</a>
            <nav>
                <a href="/">Home</a>
                <a href="/login">login</a>
            </nav>
        </header>
    );
}

export default Header;