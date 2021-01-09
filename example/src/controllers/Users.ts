/**
 * Copyright (c) Daniel Solarte Chaverra
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

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
