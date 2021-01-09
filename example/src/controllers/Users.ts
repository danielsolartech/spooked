import { Controller, Route, Request, Response } from 'spooked';

@Controller()
class Users {
    @Route('GET')
    all(request: Request, response: Response): void {
        response.jsonp({
            message: 'hello',
        });
    }
}

export default Users;
