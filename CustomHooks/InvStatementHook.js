const myURL = "https://invkom-backend.herokuapp.com";

async function useInvStatement(token, setInvStatement) {
  setInvStatement([]);
  try {
    const response = await fetch(`${myURL}/inventory-statement`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const toJson = await response.json();

    setInvStatement([...toJson.data]);
  } catch (error) {
    console.error(error);
  }
}

export default useInvStatement;
