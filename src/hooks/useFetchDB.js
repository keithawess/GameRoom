export default function useFetchDB(method) {
    async function callAPI(url, body = null) {
      let opts = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (method === "POST" || method === "PUT" || method === "DELETE" || method === "PATCH") {
        opts = { ...opts, body: JSON.stringify(body) };
      }
      try {
        const response = await fetch(url, opts);
        if (response.ok) {
          const json = await response.json();
          return json;
        } else {
          throw response;
        }
      } catch (e) {
        console.log(e);
        return { error: `Something went wrong on path ${url}.` };
      }
    }
    return { callAPI };
  }
  