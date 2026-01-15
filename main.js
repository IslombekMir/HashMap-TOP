class Node {
    constructor(value = null) {
        this.value = value;
        this.nextNode = null;
    }
}

class LinkedList {
    constructor(head = null) {
        this._head = head;
    }

    append(value, node = this._head) {
        if (node.nextNode === null) {
            node.nextNode = new Node(value);
        } else {
            this.append(value, node.nextNode);
        }
    }
}

class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.buckets = new Array(16);
    }

    checkLinkedList(key, linkedList, node = null) {
        if(!linkedList) return false;
        if (!node) node = linkedList._head;
        if (node.value[0] === key) {
            return node;
        } else if (node.nextNode === null) {
            return false;
        } else {
            return this.checkLinkedList(key, linkedList, node.nextNode);
        }
    }

    checkLinkedListForRemove(key, linkedList, node = null, previousNode = null) {
        if(!linkedList) return false;
        if (!node) node = linkedList._head;
        if (node.value[0] === key) {
            return [previousNode, node, node.nextNode];
        } else if (node.nextNode === null) {
            return false;
        } else {
            return this.checkLinkedListForRemove(key, linkedList, node.nextNode, node);
        }
    }

    fillKeysArray(array, linkedList, node = null) {
        if (node === null) node = linkedList._head;
        array.push(node.value[0]);
        if (node.nextNode === null) return;
        this.fillKeysArray(array, linkedList, node.nextNode);
        return array;
    }

    keys(keys = []) {
        this.buckets.forEach(linkedList => {
            if (!linkedList) return;
            this.fillKeysArray(keys, linkedList);
        })
        return keys;
    }

    setWithoutResize(key, value) {
        const index = this.hash(key);

        if (!this.buckets[index]) {
            const headNode = new Node([key, value]);
            this.buckets[index] = new LinkedList(headNode);
        } else {
            const linkedList = this.buckets[index];

            if (!this.checkLinkedList(key, linkedList)) {
                linkedList.append([key, value]);
            } else {
                const node = this.checkLinkedList(key, linkedList);
                node.value[1] = value;
            }
        }
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    resizeBucket() {
        const entries = this.entries();
        this.capacity *= 2;
        this.buckets = new Array(this.capacity);
        entries.forEach(entry => {
            const [key, value] = entry;
            this.setWithoutResize(key, value);
        })
    }

    set(key, value) {

        const index = this.hash(key);

        if (!this.buckets[index]) {
            const headNode = new Node([key, value]);
            this.buckets[index] = new LinkedList(headNode);
        } else {
            const linkedList = this.buckets[index];

            if (!this.checkLinkedList(key, linkedList)) {
                linkedList.append([key, value]);
            } else {
                const node = this.checkLinkedList(key, linkedList);
                node.value[1] = value;
            }
        }

        if (this.length() > this.loadFactor * this.capacity) {
            this.resizeBucket();
        }
    }

    get(key) {
        const index = this.hash(key);
        const linkedList = this.buckets[index];

        return this.checkLinkedList(key, linkedList).value[1];
    }

    has(key) {
        const index = this.hash(key);
        const linkedList = this.buckets[index];

        return this.checkLinkedList(key, linkedList) ? true : false;
    }

    remove(key) {
        const index = this.hash(key);
        const linkedList = this.buckets[index];
        const [previousNode, currentNode, nextNode] = this.checkLinkedListForRemove(key, linkedList);

        if (previousNode === null) {
            if (nextNode === null) {
                this.buckets[index] = null;
                this.buckets = this.buckets.filter(bucket => bucket !== null);
            } else {
                linkedList._head = nextNode;
            }
        } else if (nextNode === null) {
            previousNode.nextNode = null;
        } else {
            previousNode.nextNode = nextNode;
        }
    }

    length() {
        const keys = this.keys();
        return keys.length;
    }

    clear() {
        this.buckets = [];
    }

    values() {
        const values = [];
        const keys = this.keys();
        keys.forEach(key => {
            values.push(this.get(key));
        })
        return values;
    }

    entries() {
        const entries = [];
        const keys = this.keys();
        keys.forEach(key => {
            entries.push([key, this.get(key)]);
        })
        return entries;
    }
}


const test = new HashMap() // or HashMap() if using a factory

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('ball', 'red');
test.set("ball", "something");

console.log(test.entries());
console.log(test);