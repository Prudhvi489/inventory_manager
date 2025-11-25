import { useEffect, useState } from "react";

const required = (v) => (v === undefined || v === null || v === "" ? "Required" : null);
const requiredNumber = (v) =>
  v === "" || v === null || v === undefined ? "Required" : isNaN(Number(v)) ? "Must be a number" : null;

export default function ProductForm({ initial = {}, onCancel, onSubmit }) {
  const [values, setValues] = useState({
    id: initial.id,
    name: initial.name || "",
    price: initial.price ?? "",
    category: initial.category || "",
    stock: initial.stock ?? "",
    description: initial.description || "",
    isActive: initial.isActive ?? true,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues({
      id: initial.id,
      name: initial.name || "",
      price: initial.price ?? "",
      category: initial.category || "",
      stock: initial.stock ?? "",
      description: initial.description || "",
      isActive: initial.isActive ?? true,
    });
    setErrors({});
  }, [initial]);
  const validate = () => {
    const errorsObj = {};
    errorsObj.name = required(values.name);
    errorsObj.price = requiredNumber(values.price) || (Number(values.price) < 0 ? "Must be ≥ 0" : null);
    errorsObj.category = required(values.category);
    if (values.stock !== "" && isNaN(Number(values.stock))) errorsObj.stock = "Must be a number";
    console.log(errorsObj)
    setErrors(Object.fromEntries(Object.entries(errorsObj).filter(([, v]) => v)));
    return Object.values(errorsObj).every((v) => !v);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    const payload = {
      ...values,
      price: Number(values.price),
      stock: values.stock === "" ? 0 : Number(values.stock),
    };
    onSubmit(payload);
  };

  const set = (k, v) => setValues((s) => ({ ...s, [k]: v }));
  const inputStyle = {
    borderRadius: 8,
    border: "1px solid black",
    background: "white",
    padding: "6px 8px",
    width: "100%",
    boxSizing: "border-box",
    color: '#000000'
  };
  console.log(errors, "Errors data ")
  return (
    <div style={modalWrap}>
      <div style={modalCard}>
        <h3 style={{ marginTop: 0, color: '#000000' }}>{values.id ? "Edit Product" : "Add Product"}</h3>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
          <Field label="Name *" error={errors.name}>
            <input value={values.name} onChange={(e) => set("name", e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Price *" error={errors.price}>
            <input value={values.price} onChange={(e) => set("price", e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Category *" error={errors.category}>
            <input value={values.category} onChange={(e) => set("category", e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Stock" error={errors.stock}>
            <input value={values.stock} onChange={(e) => set("stock", e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Description">
            <textarea value={values.description} onChange={(e) => set("description", e.target.value)} style={inputStyle} />
          </Field>
          <label style={{ display: "flex", gap: 8, alignItems: "center", color: '#000000' }}>
            <input
              type="checkbox"
              checked={values.isActive}
              onChange={(e) => set("isActive", e.target.checked)}
            />
            Active
          </label>

          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 8 }}>
            <button type="button" onClick={onCancel} style={{ background: 'none', border: '1px solid #000000', color: '#000000' }}>Cancel</button>
            <button type="submit" style={{ backgroundColor: '#2563ebff' }}>{values.id ? "Save" : "Add"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 12, marginBottom: 4, color: '#000000' }}>{label}</label>
      {children}
      {error && <div style={{ color: "crimson", fontSize: 12 }}>{error}</div>}
    </div>
  );
}

const modalWrap = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.25)",
  display: "grid",
  placeItems: "center",
  zIndex: 20,
};
const modalCard = {
  width: 420,
  maxWidth: "95vw",
  background: "#fff",
  borderRadius: 10,
  padding: 16,
  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
};
