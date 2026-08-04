import { render, screen, fireEvent } from "@testing-library/react";
import ProductFilterBar from "../components/ProductFilterBar";

const baseProps = {
  colorOptions: [],
  modelOptions: [],
  selectedColors: [],
  selectedModels: [],
  onToggleColor: () => {},
  onToggleModel: () => {},
  onClear: () => {},
};

describe("ProductFilterBar", () => {
  test("Mostra 'Filtro em breve' quando não há nenhuma opção", () => {
    render(<ProductFilterBar {...baseProps} />);
    expect(screen.getByText("Filtro em breve")).toBeInTheDocument();
  });

  test("Renderiza só o modelo quando não há opções de cor", () => {
    render(<ProductFilterBar {...baseProps} modelOptions={["sereia", "princesa"]} />);
    expect(screen.queryByText("Cor")).not.toBeInTheDocument();
    expect(screen.getByText("Sereia")).toBeInTheDocument();
    expect(screen.getByText("Princesa")).toBeInTheDocument();
  });

  test("Clicar num swatch de cor chama onToggleColor com a cor certa", () => {
    const onToggleColor = jest.fn();
    render(<ProductFilterBar {...baseProps} colorOptions={["verde"]} onToggleColor={onToggleColor} />);
    fireEvent.click(screen.getByLabelText("Filtrar por cor verde"));
    expect(onToggleColor).toHaveBeenCalledWith("verde");
  });

  test("Clicar num chip de modelo chama onToggleModel com o modelo certo", () => {
    const onToggleModel = jest.fn();
    render(<ProductFilterBar {...baseProps} modelOptions={["sereia"]} onToggleModel={onToggleModel} />);
    fireEvent.click(screen.getByText("Sereia"));
    expect(onToggleModel).toHaveBeenCalledWith("sereia");
  });

  test("Botão Limpar filtros só aparece com filtro ativo, e chama onClear", () => {
    const onClear = jest.fn();
    const { rerender } = render(
      <ProductFilterBar {...baseProps} colorOptions={["verde"]} onClear={onClear} />
    );
    expect(screen.queryByText("Limpar filtros")).not.toBeInTheDocument();

    rerender(
      <ProductFilterBar {...baseProps} colorOptions={["verde"]} selectedColors={["verde"]} onClear={onClear} />
    );
    fireEvent.click(screen.getByText("Limpar filtros"));
    expect(onClear).toHaveBeenCalled();
  });
});
