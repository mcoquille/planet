import { AxiosError } from 'axios';

interface IApiRequestErrorData {
	status: number;
	statusText: string;
	headers: { [key: string]: string; };
	method?: string;
	url?: string;
	body?: any;
}

export class ApiRequestError extends Error {
	public data: IApiRequestErrorData;
	constructor(message: string, data: IApiRequestErrorData) {
		super(message);
		this.data = data || {} as IApiRequestErrorData;
	}
}

const buildApiError = (error: AxiosError): { message: string, data: IApiRequestErrorData } => {
	if (!error || !error.response) return {
		message: 'Unknown API error',
		data: { status: -1, statusText: 'UNKNOWN STATUS', headers: {} }
	};
	const { status, statusText, data: body } = error.response;
	const { headers, method, url } = error.response.config;
	const message = `${status}: ${statusText}`;
	const data = { status, statusText, headers, method, url, body };
	return { message, data };

};

export const errorTransform = (error: AxiosError) => {
	if (error && error.response) {
		const { message, data } = buildApiError(error);
		throw new ApiRequestError(message, data);
	}
	throw error;
};
