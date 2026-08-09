type Props = {
  ornament?: boolean;
  width?: number | string;
  style?: React.CSSProperties;
};

export default function JournalDivider({ ornament = false, width = "100%", style }: Props) {
  return (
    <div style={{ position: "relative", width, height: 1, ...style }}>
      <div className="journal-rule" style={{ width: "100%", height: "100%" }} />
      {ornament && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            background: "var(--ink)",
            padding: "0 0.75rem",
            color: "var(--rose-lt)",
            fontSize: "0.7rem",
            lineHeight: 1,
          }}
        >
          ✦
        </span>
      )}
    </div>
  );
}
