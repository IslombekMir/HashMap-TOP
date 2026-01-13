class Hashmap {
    constructor() {
        let loadFactor = 0.75;
        let capacity = 16;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode;
    }
}


const hashMap = new Hashmap();
console.log(hashMap.hash("yek"));