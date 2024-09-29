import {IWeatherData} from "../app.component";

const apiUrl = 'https://api.open-meteo.com/v1/forecast';

export function isOk(responseCode: number) {
  return responseCode >= 200 && responseCode <= 299;
}

async function returnError(resp: Response) {
  const respText = await resp.text();
  try {
    const err = JSON.parse(respText);
    return Error(err?.error ?? err?.message ?? respText ?? 'unknown error');
  } catch (error) {
    return Error(respText);
  }
}

async function readResponse<U>(resp: Response): Promise<U> {
  if (resp.status === 204) {
    return {} as U;
  }

  if (isOk(resp.status)) {
      return await resp.json();
  }

  throw await returnError(resp);
}

export async function apiGet<T>(
  url: string
): Promise<T> {

  const resp = await fetch(url);

  return readResponse<T>(resp);
}

export async function getWeatherData(params: string) {
  const data = await apiGet<Promise<IWeatherData | IWeatherData[]>>(`${apiUrl}?${params}`);
  return Array.isArray(data) ? data : [data]
}
