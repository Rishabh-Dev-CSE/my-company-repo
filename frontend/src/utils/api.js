export async function apiGet(url) {
  const token = localStorage.getItem("access");
  if (!token) throw new Error("No token found");

  let res = await fetch(`http://127.0.0.1:8000${url}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // If access token expired
  if (res.status === 401) {
  const refresh = localStorage.getItem("refresh");
  if (refresh) {
    const refreshRes = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });
    const newData = await refreshRes.json();
    if (newData.access) {
      localStorage.setItem("access", newData.access);
      return apiGet(url); // retry API call
    }
  }
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  window.location.href = "/auth/login";
}
  return res.json();
}
