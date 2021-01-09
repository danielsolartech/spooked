export type RouteMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface IRoute {
    target: Function;
    name: string;
    original_name: string;
    method: RouteMethod;
}

export default IRoute;
