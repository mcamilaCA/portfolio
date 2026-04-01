"use client";

interface SocialsProps {
  instagram?: string;
  github?: string;
  linkedin?: string;
  substack?: string;
}

export default function Socials({
  instagram = "https://www.instagram.com/camis.locket",
  github = "https://github.com/mcamilaCA",
  linkedin = "https://www.linkedin.com/in/camicopoa/",
  substack = "https://camilaspov.substack.com/",
}: SocialsProps) {
  const iconStyle = {
    width: "40px",
    height: "40px",
    transition: "transform 0.3s",
    cursor: "pointer",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "2rem",
    marginTop: "3rem",
  };

  return (
    <div style={containerStyle}>
      {/* Instagram */}
      <a href={instagram} target="_blank" rel="noopener noreferrer">
        <img
          src="/assets/instagram-logo.png"
          alt="Instagram"
          style={iconStyle}
          onMouseEnter={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.transform = "scale(1.2)"
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.transform = "scale(1)"
          }}
        />
      </a>

      {/* GitHub */}
      <a href={github} target="_blank" rel="noopener noreferrer">
        <img
          src="/assets/github-logo.png"
          alt="GitHub"
          style={iconStyle}
          onMouseEnter={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.transform = "scale(1.2)"
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.transform = "scale(1)"
          }}
        />
      </a>

      {/* LinkedIn */}
      <a href={linkedin} target="_blank" rel="noopener noreferrer">
        <img
          src="/assets/linkedin-logo.png"
          alt="LinkedIn"
          style={iconStyle}
          onMouseEnter={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.transform = "scale(1.2)"
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.transform = "scale(1)"
          }}
        />
      </a>

      {/* Substack */}
      <a href={substack} target="_blank" rel="noopener noreferrer">
        <img
          src="/assets/substack-logo.png"
          alt="Substack"
          style={iconStyle}
          onMouseEnter={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.transform = "scale(1.2)"
          }}

          onMouseLeave={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.transform = "scale(1)"
          }}
        />
      </a>
    </div>
  );
}