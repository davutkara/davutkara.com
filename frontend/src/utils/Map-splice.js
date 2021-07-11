
/**
 * Get index of the key of the map object.
 * @param {Map} mapObject 
 * @param {*} key 
 * @returns 
 */
export const getIndexOfMapKey = function (mapObject, key) {
    const keys = Array.from(mapObject.keys());
    return keys.indexOf(key);
}

/**
 * Array.splice functionality for Map 
 * @param {Map} mapObject 
 * @param {Number} index1 
 * @param {Number} index2 
 * @param {Array<Array,Array>} mapSetArgumentsArray 
 */
export const MapSplice = function (mapObject, headKey, lastKey, mapSetArgumentsArray) {
    const index1 = getIndexOfMapKey(mapObject, headKey);
    const count = Math.abs(getIndexOfMapKey(mapObject, lastKey) - index1);

    const list = Array.from(mapObject.keys()).map((path) => [
        path,
        mapObject.get(path),
    ]);

    mapObject.clear();

    list.splice(index1, count, ...mapSetArgumentsArray);
    list.forEach(([key, value]) => {
        mapObject.set(key, value)
    })
    return mapObject;
}