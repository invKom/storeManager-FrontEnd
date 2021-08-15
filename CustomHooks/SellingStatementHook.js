const myURL = "https://invkom-backend.herokuapp.com";

async function useSellingStatement(
  token,
  setSellingStatement,
) {
  setSellingStatement([]);
  try {
    const response = await fetch(`${myURL}/selling-statement`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const toJson = await response.json();

    setSellingStatement([...toJson.data]);
  } catch (error) {
    console.error(error);
  }
}

export default useSellingStatement;
