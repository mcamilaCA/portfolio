import { toRoman } from "@/app/lib/readingTime";

type Props = {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
};

const ALL = "All";

export default function JournalFilters({ categories, active, onChange }: Props) {
  return (
    <nav
      aria-label="Filter journal entries by field"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "2rem",
        marginTop: "1.75rem",
      }}
    >
      <button
        type="button"
        className={`journal-filter${active === ALL ? " is-active" : ""}`}
        aria-pressed={active === ALL}
        onClick={() => onChange(ALL)}
      >
        {ALL}
      </button>
      {categories.map((category, i) => (
        <button
          key={category}
          type="button"
          className={`journal-filter${active === category ? " is-active" : ""}`}
          aria-pressed={active === category}
          onClick={() => onChange(category)}
        >
          <span className="journal-filter-roman">{toRoman(i + 1)}</span>
          {category}
        </button>
      ))}
    </nav>
  );
}
