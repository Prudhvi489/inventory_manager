import React from 'react';
import '../styles/ProductGrid.css';

export default function ProductGrid({ items, onEdit, onDelete }) {
  return (
    <div className="product-grid">
      {items.map((p) => (
        <article key={p.id} className="product-card">
          <header className="card-header">
            <h3 className="product-title">{p.name}</h3>
            <span className="product-price">₹{p.price}</span>
          </header>

          <div className="product-meta">
            <span>{p.category}</span>
            <span>Stock: {p.stock}</span>
          </div>

          <p className="product-desc">
            {p.description || "No description available"}
          </p>

          <footer className="card-footer">
            <span className={`status-badge ${p.isActive ? 'active' : 'inactive'}`}>
              {p.isActive ? "Active" : "Inactive"}
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="edit-btn" onClick={() => onEdit(p)}>
                ✏️ Edit
              </button>
              {onDelete && <button
                className="edit-btn"
                onClick={() => onDelete(p.id)}
                style={{ background: '#fee2e2', color: '#b91c1c' }}
              >
                🗑️
              </button>}
            </div>
          </footer>
        </article>
      ))}
    </div>
  );
}
