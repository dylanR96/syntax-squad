export const jwtToken = sessionStorage.getItem("userToken");

export const API_CALL_GET = async (API_ENDPOINT: string) => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
