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

export async function updateHouseRules(id, updatedData) {
  try {
    const response = await instance.put(`house_rules/${id}`, {
      house_rules: updatedData,
    });
    console.log("chegou aqui:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

listHouseRules();
updateHouseRules();
