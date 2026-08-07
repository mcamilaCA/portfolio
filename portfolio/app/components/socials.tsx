"use client";

interface SocialsProps {
  instagram?: string;
  github?: string;
  linkedin?: string;
  substack?: string;
}

export default function Socials({
  instagram = "https://www.instagram.com/mcamila.ca",
  github = "https://github.com/mcamilaCA",
  linkedin = "https://www.linkedin.com/in/camicopoa/",
  substack = "https://substack.com/@aladysmind",
}: SocialsProps) {
  const badgeStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    border: "1px solid var(--border)",
    background: "var(--ink-2)",
    transition: "transform 0.3s, border-color 0.3s",
  };

  const iconStyle: React.CSSProperties = {
    width: "18px",
    height: "18px",
    filter: "invert(1)",
    opacity: 0.85,
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1.25rem",
    marginTop: "3rem",
  };

  const links = [
    { href: instagram, src: "/assets/instagram-logo.png", label: "Instagram" },
    { href: github, src: "/assets/github-logo.png", label: "GitHub" },
    { href: linkedin, src: "/assets/linkedin-logo.png", label: "LinkedIn" },
    { href: substack, src: "/assets/substack-logo.png", label: "Substack" },
  ];

  return (
    <div style={containerStyle}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          style={badgeStyle}
          onMouseEnter={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.transform = "scale(1.12)";
            target.style.borderColor = "var(--gold)";
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.transform = "scale(1)";
            target.style.borderColor = "var(--border)";
          }}
        >
          <img src={link.src} alt={link.label} style={iconStyle} />
        </a>
      ))}
    </div>
  );
}
