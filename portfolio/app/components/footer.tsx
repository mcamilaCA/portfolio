import Link from "next/link";

const NAVIGATE = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/pages/projects" },
  { label: "Research", href: "/pages/research" },
  { label: "Blog", href: "/pages/blog" },
  { label: "About", href: "/pages/about" },
  {label: "Collaborate", href: "/pages/contact"}
];

const CONNECT = [
  { label: "Contact", href: "/pages/contact", external: false },
  { label: "Instagram", href: "https://www.instagram.com/camis.locket/", external: true },
  { label: "GitHub", href: "https://github.com/mcamilaCA", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/camicopoa/", external: true },
  { label: "Substack", href: "https://camilaspov.substack.com/", external: true}
];


export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--ink)",
        color: "var(--gold-lt)",
        padding: "5rem 2rem 2rem",
      }}
    >
      {/* Top grid */}
      <div
        className="footer-top"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "4rem",
          paddingBottom: "3rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <img src="/assets/monogram-seal-64.png" alt="" aria-hidden style={{ width: 30, height: 30 }} />
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: "1.4rem",
                color: "var(--gold-lt)",
                letterSpacing: "0.05em",
              }}
            >
              Maria Camila Copo Amador
            </span>
          </div>
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 300,
              fontSize: "0.8rem",
              color: "var(--ash)",
              lineHeight: 1.7,
              marginTop: "0.5rem",
              maxWidth: 220,
            }}
          >
            Building at the intersection of curiosity, romanesque style &amp; functionality.
          </p>
          <img
            src="/assets/rose-line.svg"
            alt=""
            aria-hidden
            style={{ width: 30, marginTop: "1rem", opacity: 0.75 }}
          />
        </div>

        {/* Link columns */}
        <div
          className="footer-columns"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "2rem",
          }}
        >
          <FooterColumn title="Navigate" links={NAVIGATE} />
          <FooterColumn title="Connect" links={CONNECT} />
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          paddingTop: "1.8rem",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <p style={copyStyle}>© {year}  Maria Camila Copo Amador. All rights reserved.</p>
        <p style={copyStyle}> The worst enemy of creativity is self-doubt.     - Sylvia Plath</p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p
        style={{
          fontFamily: "'Lato', sans-serif",
          fontWeight: 400,
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--gold)",
          marginBottom: "1.1rem",
        }}
      >
        {title}
      </p>
      {links.map((link) =>
        link.external ? (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            {link.label}
          </a>
        ) : (
          <Link key={link.label} href={link.href} className="footer-link">
            {link.label}
          </Link>
        )
      )}
    </div>
  );
}

const copyStyle: React.CSSProperties = {
  fontFamily: "'Lato', sans-serif",
  fontWeight: 300,
  fontSize: "0.72rem",
  letterSpacing: "0.06em",
  color: "var(--ash)",
};