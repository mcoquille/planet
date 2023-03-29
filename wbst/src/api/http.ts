import axios, { AxiosRequestConfig, AxiosTransformer } from 'axios';

import { errorTransform } from './errors';

enum HttpMethods {
	GET = 'get',
	HEAD = 'head',
	POST = 'post',
	PUT = 'put',
	PATCH = 'patch',
	DELETE = 'delete',
	OPTIONS = 'options',
}

type HttpRequester = (config: AxiosRequestConfig) => Promise<any>;

interface IHttpApi {
	get: (url: string, params?: {}, opts?: AxiosRequestConfig) => Promise<any>;
	head: (url: string, params?: {}, opts?: AxiosRequestConfig) => Promise<any>;
	post: (url: string, data?: {}, opts?: AxiosRequestConfig) => Promise<any>;
	put: (url: string, data?: {}, opts?: AxiosRequestConfig) => Promise<any>;
	patch: (url: string, data?: {}, opts?: AxiosRequestConfig) => Promise<any>;
	delete: (url: string, opts?: AxiosRequestConfig) => Promise<any>;
}

export interface IConfiguredHttp extends IHttpApi {
	setBaseUrl: (url: string) => void;
	setHeaders: (headers: object) => any;
	addRequestInterceptor: (fn: AxiosTransformer) => void;
}

const httpMethodsFactory = (request: HttpRequester): IHttpApi => ({
	get: (url: string, params: {} = {}, opts: {} = {}) =>
		request({ ...opts, url, params, method: HttpMethods.GET }),
	head: (url: string, params: {} = {}, opts: {} = {}) =>
		request({ ...opts, url, params, method: HttpMethods.HEAD }),
	post: (url: string, data: {} = {}, opts: {} = {}) =>
		request({ ...opts, url, data, method: HttpMethods.POST }),
	put: (url: string, data: {} = {}, opts: {} = {}) =>
		request({ ...opts, url, data, method: HttpMethods.PUT }),
	patch: (url: string, data: {} = {}, opts: {} = {}) =>
		request({ ...opts, url, data, method: HttpMethods.PATCH }),
	delete: (url: string, opts: {} = {}) =>
		request({ ...opts, url, method: HttpMethods.DELETE }),
});

export function configureHttp(): IConfiguredHttp {
	const xhr = axios.create();

	const makeRequest = (config: AxiosRequestConfig) =>
		xhr
			.request(config)
			.then((response) => response.data)
			.catch(errorTransform);
	const setBaseUrl = (url: string) => (xhr.defaults.baseURL = url);
	const setHeaders = (headers: object) =>
		(xhr.defaults.headers = { ...xhr.defaults.headers, ...headers });
	const addRequestInterceptor = (fn: AxiosTransformer) =>
		xhr.interceptors.request.use(fn);

	return {
		setBaseUrl,
		setHeaders,
		addRequestInterceptor,
		...httpMethodsFactory(makeRequest),
	};
}

export default configureHttp();
