const COLOR_HEX = {
  branco: "#FFFFFF",
  "off-white": "#F4EFE6",
  marfim: "#F2EAD3",
  champanhe: "#E8D5A8",
  nude: "#D9B99B",
  dourado: "#D4AF37",
  prata: "#C0C0C0",
  preto: "#1A1A1A",
  vermelho: "#B3323C",
  rosa: "#E8A5B6",
  roxo: "#7A4B8A",
  azul: "#2F4C6E",
  verde: "#3B6B4F",
  esmeralda: "#2E8B57",
  amarelo: "#E8C547",
  laranja: "#D9822B",
};

const displayLabel = (slug) => slug.charAt(0).toUpperCase() + slug.slice(1);

const ProductFilterBar = ({
  colorOptions,
  modelOptions,
  selectedColors,
  selectedModels,
  onToggleColor,
  onToggleModel,
  onClear,
}) => {
  const hasAnyOption = colorOptions.length > 0 || modelOptions.length > 0;
  const hasActiveFilter = selectedColors.length > 0 || selectedModels.length > 0;

  if (!hasAnyOption) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-4 text-center font-label text-xs uppercase tracking-wide text-ink/50 sm:px-6">
        Filtro em breve
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-6 px-4 py-6 sm:px-6">
      {colorOptions.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-label text-xs uppercase tracking-wide text-ink/70">Cor</span>
          {colorOptions.map((color) => (
            <button
              key={color}
              type="button"
              aria-label={`Filtrar por cor ${color}`}
              aria-pressed={selectedColors.includes(color)}
              onClick={() => onToggleColor(color)}
              className={`h-7 w-7 rounded-full border-2 transition-colors ${
                selectedColors.includes(color) ? "border-accent" : "border-hairline"
              }`}
              style={{ backgroundColor: COLOR_HEX[color] ?? "#CCCCCC" }}
            />
          ))}
        </div>
      )}

      {modelOptions.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-label text-xs uppercase tracking-wide text-ink/70">Modelo</span>
          {modelOptions.map((model) => (
            <button
              key={model}
              type="button"
              aria-pressed={selectedModels.includes(model)}
              onClick={() => onToggleModel(model)}
              className={`border px-3 py-1 font-label text-xs uppercase tracking-wide transition-colors ${
                selectedModels.includes(model)
                  ? "border-accent text-accent"
                  : "border-hairline text-ink/70 hover:text-ink"
              }`}
            >
              {displayLabel(model)}
            </button>
          ))}
        </div>
      )}

      {hasActiveFilter && (
        <button
          type="button"
          onClick={onClear}
          className="font-label text-xs uppercase tracking-wide text-ink/50 underline hover:text-ink"
        >
          Limpar filtros
        </button>
      )}
    </div>
  );
};

export default ProductFilterBar;
