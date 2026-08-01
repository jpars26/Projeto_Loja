import noivas from "./noivas";
import ternos from "./ternos";
import festa from "./festa";

// Array plano de coleções (mesmo contrato do antigo data/collections.js),
// cada item com um campo `category`: "noivas" | "ternos" | "festa".
const catalog = [...noivas, ...ternos, ...festa];

export default catalog;
