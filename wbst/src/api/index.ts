import figuresApiFactory, { IFiguresAPI} from './figures';
import { configureHttp } from './http';

const http = configureHttp();

http.setBaseUrl('http://localhost:8080');

export interface IApi {
    figures: IFiguresAPI,
}

const apiFactory = (): IApi => ({
    figures: figuresApiFactory(http),
})

const api = apiFactory();
export default api;