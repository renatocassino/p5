class Node {
    value: any;
    next: Node | null;
    prev: Node | null;

    constructor(value: any) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoubleLinkedList {
    head: Node;
    tail: Node;
    length: number;

    constructor(value: any) {
        this.head = new Node(value);

        this.tail = this.head;
        this.length = 1;
    }

    append(value: any) {
        const newNode = new Node(value);
        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
        this.length++;

        return this;
    }
    
    prepend(value: any) {
        const newNode = new Node(value);

        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
        this.length++;

        return this;
    }

    printList() {
        let arr = [];
        let currentNode: Node | null = this.head;
        while(currentNode) {
            arr.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return arr.join('-->');
    }

    insert(index: number, value: any) {
        const newNode = new Node(value);

        if (index >= this.length) {
            return this.append(value);
        }

        let leader = this.traverseToIndex(index - 1) as Node;
        const follower = leader.next;
        leader.next = newNode;
        newNode.prev = leader;
        newNode.next = follower;
        follower!.prev = newNode;

        this.length++;

        return this;
    }

    remove(index: number) {
        if (index >= this.length) {
            return null;
        }

        let beforeCurrNode = this.traverseToIndex(index-1) as Node;
        const unwantedNode = beforeCurrNode!.next;
        beforeCurrNode!.next = unwantedNode!.next;

        this.length--;
        return unwantedNode;
    }

    traverseToIndex(index: number): Node | null {
        let currNode: Node | null = this.head;
        for (let i = 0; i !== index; i++) {
            currNode = currNode!.next;
        }

        return currNode;
    }
}

const myLinkedList = new DoubleLinkedList(10);
myLinkedList.append(5);
myLinkedList.append(16);
myLinkedList.prepend(1);
myLinkedList.insert(2, 99);
myLinkedList.remove(2);
console.log(myLinkedList.printList());

console.log(myLinkedList);