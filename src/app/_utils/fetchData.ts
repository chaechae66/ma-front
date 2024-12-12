interface FetchResult<T> {
  data: { [K in keyof T]: T[K] };
  error: {
    name: string;
    message: string;
    details: { result: { error: { name: string; message: string } } };
  } | null;
}

export async function fetchData<T>(
  urlMap: Record<keyof T, string>
): Promise<FetchResult<T>> {
  try {
    const entries = Object.entries(urlMap) as [keyof T, string][];
    const responses = await Promise.all(
      entries.map(([key, url]) => fetch(url))
    );

    for (const response of responses) {
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          JSON.stringify({
            name: "HTTPError",
            message: `HTTP error! status: ${response.status} for URL: ${response.url}`,
            details: errorData,
          })
        );
      }
    }

    const data = await Promise.all(responses.map((res) => res.json()));

    const result = entries.reduce((acc, [key], index) => {
      acc[key] = data[index];
      return acc;
    }, {} as { [K in keyof T]: T[K] });

    return { data: result, error: null };
  } catch (error) {
    console.error("Error fetching data:", error);

    let errorResult;
    if (error instanceof Error) {
      try {
        errorResult = JSON.parse(error.message);
      } catch (parseError) {
        errorResult = { name: "UnknownError", message: error.message };
      }
    }

    return { data: {} as T, error: errorResult };
  }
}
