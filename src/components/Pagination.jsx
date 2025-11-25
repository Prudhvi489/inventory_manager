export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const prev = () => onPageChange(Math.max(1, page - 1));
  const next = () => onPageChange(Math.min(totalPages, page + 1));

  const nums = [];
  for (let i = 1; i <= totalPages; i++) nums.push(i);

  return (
    <div style={wrap}>
      <button
        style={{ ...btn, ...(page === 1 ? disabledBtn : {}) }}
        onClick={prev}
        disabled={page === 1}
      >
        ⟨ Prev
      </button>

      {nums.map((n) => (
        <button
          key={n}
          onClick={() => onPageChange(n)}
          style={{
            ...btn,
            ...(n === page ? activeBtn : {}),
          }}
        >
          {n}
        </button>
      ))}

      <button
        style={{ ...btn, ...(page === totalPages ? disabledBtn : {}) }}
        onClick={next}
        disabled={page === totalPages}
      >
        Next ⟩
      </button>

      <span style={info}>
        Page {page} of {totalPages}
      </span>
    </div>
  );
}

/* 🎨 Styles */
const wrap = {
  display: "flex",
  gap: 8,
  alignItems: "center",
  justifyContent: "center",
  marginTop: 20,
  flexWrap: "wrap",
};

const btn = {
  border: "1px solid #e5e7eb",
  borderRadius: 20,
  padding: "6px 14px",
  fontSize: 14,
  cursor: "pointer",
  background: "white",
  color: "#111827",
  transition: "all 0.2s",
};

const activeBtn = {
  background: "#2563eb",
  color: "white",
  borderColor: "#2563eb",
  fontWeight: 600,
};

const disabledBtn = {
  opacity: 0.5,
  cursor: "not-allowed",
};

const info = {
  marginLeft: 12,
  fontSize: 13,
  color: "#6b7280",
};
