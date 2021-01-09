/**
 * Copyright (c) Daniel Solarte Chaverra
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import Storage from "../core/Storage";

export function Controller(name?: string): ClassDecorator {
    return function (target) {
        name = name?.toLowerCase() ?? target.name.toLowerCase();

        Storage.addController({
            target,
            name,
        });
    };
}
