const myURL = "https://invkom-backend.herokuapp.com";
export default async function useHandleConfirmation(item, token) {
  const { productCode } = item;
  try {
    const response = await fetch(`${myURL}/sellProduct`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        barCode: productCode,
      }),
    });
    const toJson = await response.json();

    console.log(toJson);
  } catch (error) {
    console.error(error);
  }
}
