export interface IParsedFigure {
    type: string;
    coordinates: number[][][] | number[][][][];
}

export interface IFigure {
    id: number;
    org_id: number;
    figure: string;
    parsedFigure?: IParsedFigure;
}