import React from 'react';
import '../styles/ProductTable.css';

export default function ProductTable({ items, onEdit, onDelete }) {
  return (
    <div className="product-table-container">
      <table className="product-table">
        <thead>
          <tr>
            {/* <Th>ID</Th> */}
            <Th>Name</Th>
            <Th align="right">Price</Th>
            <Th>Category</Th>
            <Th align="right">Stock</Th>
            <Th>Active</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {items.map((p, i) => (
            <tr key={p.id} className={i % 2 ? "table-row-odd" : "table-row-even"}>
              {/* <Td>{p.id}</Td> */}
              <Td>{p.name}</Td>
              <Td align="right">₹{p.price}</Td>
              <Td>{p.category}</Td>
              <Td align="right">{p.stock}</Td>
              <Td>
                <span className={`status-badge ${p.isActive ? 'active' : 'inactive'}`}>
                  {p.isActive ? "Active" : "Inactive"}
                </span>
              </Td>
              <Td>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="edit-btn" onClick={() => onEdit(p)}>
                    ✏️ Edit
                  </button>
                  {onDelete && <button
                    className="edit-btn"
                    onClick={() => onDelete(p.id)}
                    style={{ background: '#fee2e2', color: '#b91c1c' }}
                  >
                    🗑️ Delete
                  </button>}
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Cells */
function Th({ children, align = "left" }) {
  return (
    <th style={{ textAlign: align }}>
      {children}
    </th>
  );
}
function Td({ children, align = "left" }) {
  return (
    <td style={{ textAlign: align }}>
      {children}
    </td>
  );
}
