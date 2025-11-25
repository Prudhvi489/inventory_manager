import { useEffect, useMemo, useState } from "react";
import productsSeed from "./data/products.json";
import SearchBar from "./components/SearchBar";
import ViewToggle from "./components/ViewToggle";
import ProductTable from "./components/ProductTable";
import ProductGrid from "./components/ProductGrid";
import ProductForm from "./components/ProductForm";
import Pagination from "./components/Pagination";
import "./App.css";

const PAGE_SIZE = 6;

export default function App() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("list");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);





  // add or update product (state in memory)
  const handleSubmit = (formData) => {
    if (formData.id) {
      // update
      setProducts((prev) =>
        prev.map((p) => (p.id === formData.id ? { ...p, ...formData } : p))
      );
    } else {
      // add
      const deletedIds = JSON.parse(localStorage.getItem("deleted_ids") || "[]");
      const maxActiveId = products.length ? Math.max(...products.map((p) => p.id ?? 0)) : 0;
      const maxDeletedId = deletedIds.length ? Math.max(...deletedIds) : 0;
      const nextId = Math.max(maxActiveId, maxDeletedId) + 1;

      setProducts((prev) => [
        {
          ...formData,
          id: nextId,
          createdAt: new Date().toISOString(),
          isActive: formData.isActive ?? true,
        },
        ...prev,
      ]);
    }
    setEditing(null);
    setPage(1);
  };
  // delete product
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));

      // track deleted IDs for persistence
      const deletedIds = JSON.parse(localStorage.getItem("deleted_ids") || "[]");
      if (!deletedIds.includes(id)) {
        deletedIds.push(id);
        localStorage.setItem("deleted_ids", JSON.stringify(deletedIds));
      }
    }
  };

  // load initial data: merge seed + local storage delta - deleted IDs
  useEffect(() => {
    const savedDelta = localStorage.getItem("user_products");
    const deletedIds = JSON.parse(localStorage.getItem("deleted_ids") || "[]");

    let merged = [...productsSeed];

    if (savedDelta) {
      const delta = JSON.parse(savedDelta);
      delta.forEach((userProd) => {
        const index = merged.findIndex((p) => p.id === userProd.id);
        if (index !== -1) {
          // Edit: overwrite existing
          merged[index] = userProd;
        } else {
          // Add: append new
          merged.push(userProd);
        }
      });
    }

    // Filter out deleted items
    merged = merged.filter(p => !deletedIds.includes(p.id));

    setProducts(merged);
  }, []);

  // save only delta (changes from seed) to localStorage
  useEffect(() => {
    if (products.length > 0) {
      const delta = products.filter((p) => {
        const seed = productsSeed.find((s) => s.id === p.id);
        // keep if no seed match (new) or if content differs (edit)
        return !seed || JSON.stringify(seed) !== JSON.stringify(p);
      });
      localStorage.setItem("user_products", JSON.stringify(delta));
    }
  }, [products]);

  // search (500ms debounce is inside <SearchBar/>)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => (p.name || "").toLowerCase().includes(q));
  }, [products, query]);

  // pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);
  return (
    <div className="app-container">
      <h1 className="page-title">Products</h1>

      <div className="controls-container">
        <SearchBar value={query} onChange={setQuery} delay={500} />
        <ViewToggle value={view} onChange={setView} />
        <button onClick={() => setEditing({})} className="add-btn">+ Add Product</button>
      </div>

      <div className="content-container">
        {view === "list" ? (
          <ProductTable items={pageItems} onEdit={(p) => setEditing(p)} /*onDelete={handleDelete}*/ />
        ) : (
          <ProductGrid items={pageItems} onEdit={(p) => setEditing(p)} /*onDelete={handleDelete}*/ />
        )}
      </div>

      <Pagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />

      {editing !== null && (
        <ProductForm
          initial={editing}
          onCancel={() => setEditing(null)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
