export async function loadDataFromEndpoint(endPoint, setState) {
  try {
    // Query the API Gateway
    const base_url = import.meta.env.VITE_BASE_URL;
    const response = await fetch(`${base_url}/Production/${endPoint}`);

    // Assign response data to the state variable
    let data = await response.json();
    setState(data);
  } catch (error) {
    console.error();
  }
}
