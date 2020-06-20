import NodeCache, { Key}from "node-cache";

class CacheManager {
    constructor() {}

    private cache = new NodeCache({
        stdTTL: +(process.env.expire_room || 1800),
        deleteOnExpire: true
    });

    get<T>(key: Key): T | any {
       return this.cache.get(key) 
    }

    set(key: Key, value: unknown){
       this.cache.set(key, value) 
    }
}

export default new CacheManager();