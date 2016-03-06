/**
 * This isn't really a config that can be changed per-environment, but rather
 * it's a place for data we need in multiple places, like the key layout.
 */

export const ROWS = [
    ['q', 'w', 'e', 'r', 't'],
    ['a', 's', 'd', 'f', 'g'],
    ['z', 'x', 'c', 'v', 'b']
];

export const KEYS = ROWS.reduce((prev, cur) => prev.concat(cur));
