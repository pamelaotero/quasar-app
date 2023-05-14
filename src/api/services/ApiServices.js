const { instance } = require("./AuthService");

export async function listHouseRules() {
  try {
    const response = await instance.get("house_rules");
    console.log("chegou aqui get list all:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function filterRuleById(id) {
  try {
    const response = await instance.get(`house_rules/${id}`);
    console.log("filtro aqui:", response.data);
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
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createHouseRules(houseRuleData) {
  try {
    const response = await instance.post("house_rules", houseRuleData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteHouseRules(id) {
  try {
    const response = await instance.delete(`house_rules/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

listHouseRules();
filterRuleById();
updateHouseRules();
deleteHouseRules();
createHouseRules();
