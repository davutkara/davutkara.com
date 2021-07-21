
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
 * @param {String|Number} headKey 
 * @param {String|Number} lastKey 
 * @param {Array<Array,Array>} mapSetArgumentsArray 
 */
export const MapSplice = function (mapObject, headKey, lastKey, mapSetArgumentsArray) {
    const index1 = Number.isInteger(headKey) ? headKey : getIndexOfMapKey(mapObject, headKey);
    const deleteCount = Number.isInteger(lastKey) ? lastKey : Math.abs(getIndexOfMapKey(mapObject, lastKey) - index1);

    const list = Array.from(mapObject.keys()).map((path) => [
        path,
        mapObject.get(path),
    ]);

    mapObject.clear();

    list.splice(index1, deleteCount, ...mapSetArgumentsArray);

    list.forEach(([key, value]) => {
        mapObject.set(key, value)
    })
    return mapObject;
}