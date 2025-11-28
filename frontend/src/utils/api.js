const BASE_URL = 'http://127.0.0.1:8000'
export async function apiGet(url) {
  const token = localStorage.getItem("access");
  if (!token) throw new Error("No token found");

  let res = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // If access token expired
  if (res.status === 401) {
    const refresh = localStorage.getItem("refresh");
    if (refresh) {
      const refreshRes = await fetch(`${BASE_URL}/api/token/refresh/`, {
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


export async function apiPost(url, data) {
  const token = localStorage.getItem("access");

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let res = await fetch(`${BASE_URL}${url}`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  // Handle expired access token
  if (res.status === 401) {
    const refresh = localStorage.getItem("refresh");
    if (refresh) {
      const refreshRes = await fetch(`${BASE_URL}/api/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      });

      const newData = await refreshRes.json();
      if (newData.access) {
        localStorage.setItem("access", newData.access);
        return apiPost(url, data); // retry original request
      }
    }

    // Logout fallback
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/auth/login";
  }

  return res.json();
}


export async function apiDelete(url) {
  const token = localStorage.getItem("access");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  let res = await fetch(`${BASE_URL}${url}`, {
    method: "DELETE",
    headers,
  });

  if (res.status === 401) {
    const refresh = localStorage.getItem("refresh");

    if (refresh) {
      const refreshRes = await fetch(`${BASE_URL}/api/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      });

      const newData = await refreshRes.json();
      if (newData.access) {
        localStorage.setItem("access", newData.access);
        return apiDelete(url);
      }
    }

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/auth/login";
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Delete failed");
  }

  return data;
}

