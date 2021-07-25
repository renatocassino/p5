class HashTable {
    data: any[]

    constructor(size: number) {
        this.data = new Array(size);
    }

    _hash(key: string) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i) * i) % this.data.length;
        }

        return hash;
    }

    set(key: string, value: number | string) {
        const indexKey = this._hash(key);
        if (!this.data[indexKey]) {
            this.data[indexKey] = [];
        }
        this.data[indexKey].push([key, value]);
    }

    get(key: string) {
        const indexKey = this._hash(key);
        const bucket = this.data[indexKey];

        if (!bucket) return;

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
    }

    keys() {
        let keys = [];
        for (let i = 0; i < this.data.length; i++) {
            if (!this.data[i]) continue;

            for (let j = 0; j < this.data[i].length; j++) {
                keys.push(this.data[i][j][0]);
            }
        }

        return keys;
    }
}

const myHash = new HashTable(50);
console.log(myHash._hash('someone'));

console.log(myHash.get('someData'), 'Get undefined');
myHash.set('someData', '12');
myHash.set('another', '32');
myHash.set('name', 'Someone');


console.log(myHash.get('someData'));

console.log(myHash.keys());