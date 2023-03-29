import { IConfiguredHttp } from './http';
import { IFigure } from './types';

export interface IFiguresAPI {
	getOrgIds: () =>  Promise<number[]>;
    getFigures: () => Promise<IFigure[]>;
}

const figuresApiFactory = (http: IConfiguredHttp): IFiguresAPI => ({
    async getOrgIds () {
        return http.get('/get_org_ids').catch((err) => {
            return {
                message: err.response.data.message,
				statusCode: err.response.data.status,
                org_id: []
            }
        })
    },
    async getFigures () {
        return http.get('/get_figures').catch((err) => {
            return {
                message: err.response.data.message,
				statusCode: err.response.data.status,
                figures: []
            }
        })
    },
});

export default figuresApiFactory;