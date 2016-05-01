/**
 * This isn't really a config that can be changed per-environment, but rather
 * it's a place for data we need in multiple places, like the key layout.
 */

export const ROWS = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',']
];

export const KEYS = ROWS.reduce((prev, cur) => prev.concat(cur));
