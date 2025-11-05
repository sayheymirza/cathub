import { MemoryCacheMap } from 'memory-cache-map';

interface CacheOptions {
    ttl?: number; // Time to live in milliseconds
}

class CacheStorage<T = any> {
    private cache: MemoryCacheMap<string, T>;

    constructor(private defaultTtl?: number) {
        this.cache = new MemoryCacheMap();
    }

    set(key: string, value: T, options?: CacheOptions): void {
        const ttl = options?.ttl ?? this.defaultTtl;
        if (ttl) {
            this.cache.set(key, value, { timeToLive: ttl });
        } else {
            this.cache.set(key, value);
        }
    }

    get(key: string): T | undefined {
        return this.cache.get(key);
    }

    has(key: string): boolean {
        return this.cache.has(key);
    }

    delete(key: string) {
        return this.cache.delete(key);
    }

}

export default new CacheStorage();