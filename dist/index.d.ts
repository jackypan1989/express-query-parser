import { NextFunction, Request, Response } from 'express';
declare type ParsedQuery = any;
interface Options {
    parseNull?: boolean;
    parseBoolean?: boolean;
}
export declare const parse: (target: ParsedQuery, options: Options) => ParsedQuery;
export declare const queryParser: (options: Options) => (req: Request, res: Response, next: NextFunction) => void;
export {};
