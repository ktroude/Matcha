import { goto } from "$app/navigation";

export async function retry(func: Function, params: any) {
  const response = await fetch(`http://localhost:3000/auth/refresh`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status > 400) goto("/");
  func(params);
}
