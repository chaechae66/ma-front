interface FetchResult<T> {
  data: { [K in keyof T]: T[K] };
  error: Error | null;
}

export async function fetchData<T>(
  urlMap: Record<keyof T, string>
): Promise<FetchResult<T>> {
  try {
    const entries = Object.entries(urlMap) as [keyof T, string][];
    const responses = await Promise.all(
      entries.map(([key, url]) => fetch(url))
    );

    responses.forEach((response) => {
      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} for URL: ${response.url}`
        );
      }
    });

    const data = await Promise.all(responses.map((res) => res.json()));

    const result = entries.reduce((acc, [key], index) => {
      acc[key] = data[index];
      return acc;
    }, {} as { [K in keyof T]: T[K] });

    return { data: result, error: null };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: {} as T, error: error as Error };
  }
}
