// diretório services contém arquivos que definem funções que fazem solicitações HTTP para a API.
//  Esses arquivos devem conter métodos para as operações CRUD (GET, POST, PUT e DELETE) e outras operações específicas da API.

const { instance } = require("./AuthService");

export async function listHouseRules() {
  try {
    const response = await instance.get("house_rules");
    console.log("chegou aqui:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// aqui vai as outras funções CRUD

listHouseRules();
