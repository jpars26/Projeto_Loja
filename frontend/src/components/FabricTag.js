// Elemento de assinatura do redesign: uma "etiqueta de tecido" — borda fina,
// tipografia utilitária (Space Grotesk) em uppercase com letter-spacing.
// Usado em badges de categoria, revelação de nome/preço no hover do card de
// produto, e nos filtros de categoria.
const TINT_CLASSES = {
  noivas: "border-noivas text-noivas",
  ternos: "border-ternos text-ternos",
  festa: "border-festa text-festa",
};

const FabricTag = ({ children, tint, as: Component = "span", className = "" }) => {
  const tintClass = tint ? TINT_CLASSES[tint] : "border-hairline text-ink";

  return (
    <Component
      className={`inline-flex items-center gap-1 border bg-surface px-2 py-1 font-label text-xs uppercase tracking-wide ${tintClass} ${className}`}
    >
      {children}
    </Component>
  );
};

export default FabricTag;
