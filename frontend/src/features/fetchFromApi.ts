function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}
export const jwtToken = getCookie("userToken");

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
export const API_CALL_POST = async (
  API_ENDPOINT: string,
  API_METHOD: string = "POST",
  API_BODY: any
) => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: API_METHOD,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(API_BODY),
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

export const API_CALL_PUT = async (API_ENDPOINT: string, API_BODY: any) => {
  const PUT_CALL = await API_CALL_POST(API_ENDPOINT, "PUT", API_BODY);
  return PUT_CALL;
};
