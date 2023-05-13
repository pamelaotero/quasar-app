// O arquivo index.js dentro do diretório api é responsável por exportar todos os serviços de API em um único
// objeto para que possam ser importados em outros locais do aplicativo.

// import { getHouseRules } from "../api/services/ApiServices";

// const api = {};

// api.getHouseRules = getHouseRules;

// export default api;

import { getHouseRules } from "./ApiService";

export const api = {
  getHouseRules,
};
