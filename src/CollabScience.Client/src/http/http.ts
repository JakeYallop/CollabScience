type HttpMethods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD" | "CONNECT" | "TRACE";
interface TypedResponse<T> extends Omit<Response, "json"> {
    json(): Promise<T>;
}

export async function makeRequest<TResponse, TParams = unknown>(
    url: string,
    method: HttpMethods,
    body?: TParams
): Promise<TypedResponse<TResponse>> {
    const options: RequestInit = {
        method: method,
        ...(body
            ? {
                  body: JSON.stringify(body),
                  headers: {
                      "Content-Type": "application/json",
                  },
              }
            : {}),
    };
    return await fetch(url, options);
}
