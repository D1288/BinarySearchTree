
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null
    }
}

class Tree {
    constructor(arr) {
        const sortedArr = cleanAndSort(arr)
        this.root = buildTree(sortedArr)
    }

    insert(val, node = this.root) {
        if (!node) this.root = new Node(val)
        else if (node.data > val) {
            if (node.left) this.insert(val, node.left)
            else node.left = new Node(val)
        } else if (node.right) this.insert(val, node.right)
        else node.right = new Node(val)
    }

    //helper function to find minumum value
    _min(root) {
        if (!root.left) return root.val
        else return this.min(root.left)
    }

    delete(val) {
        this.root = this.deleteNode(this.root, val)
    }

    deleteNode(root, val) {
        if (!root) return root

        if (val < root.data) {
            root.left = this.deleteNode(root.left, val)
        } else if (val > root.data) {
            root.right = this.deleteNode(root.right, val)
        } else {
            if (!root.left && !root.right) {
                return null
            }
            if (!root.left) {
                return root.right
            } else if (!root.right) {
                return root.left
            }
            root.value = this.min(root.right)
            root.right = this.deleteNode(root.right, root.value)
        }
        return root
    }

    find(root, val) {
        if (!root) return "Not in tree"

        if (root.data === val) {
            return root
        } else if (val > root.data) {
            return this.find(root.right, val)
        } else if (val < root.data) {
            return this.find(root.left, val)
        }
        return null
    }

    levelOrder(arr = [], queue = [], node = this.root) {
        if (!node) return

        arr.push(node.data)
        queue.push(node.left)
        queue.push(node.right)

        while (queue.length){
            const curr = queue[0]
            queue.shift()
            this.levelOrder(arr, queue, curr)
        }
        return arr
    }

    inOrder(node = this.root, arr = []) {
        if (!node) return []
        this.inOrder(node.left, arr)
        arr.push(node.data)
        this.inOrder(node.right, arr)
        return arr
    }

    preOrder(node = this.root, arr = []) {
        if (!node) return []
        arr.push(node.data)
        this.preOrder(node.left, arr)
        this.preOrder(node.right, arr)
        return arr
    }

    postOrder(node = this.root, arr = []) {
        if (!node) return []
        this.postOrder(node.left, arr)
        this.postOrder(node.right, arr)
        arr.push(node.data)
        return arr
    }

    height(node) {
        if (!node) return 0
        const left = this.height(node.left) + 1
        const right = this.height(node.right) + 1
        if (left < right) return right
        else return left
    }

    depth(node, root = this.root) {
        if (node.data < root.data) return this.depth(node, root.left) + 1
        if (node.data > root.data) return this.depth(node, root.right) + 1
        return 0
    }

    isBalanced(node = this.root) {
        if (!node) return true
        if (Math.abs(this.height(node.left) - this.height(node.right)) > 1) return false
        else return true
    }

    rebalance() {
        let arr = this.inOrder()
        this.root = buildTree(arr)
    }
}







//builds the BST
function buildTree(arr) {
    if (arr.length === 0) return null;
    if (arr.length === 1) return new Node(arr[0])

    const mid = Math.floor(arr.length / 2)
    const root = new Node(arr[mid])

    root.left = buildTree(arr.slice(0, mid))
    root.right = buildTree(arr.slice(mid + 1))
    return root
}

// random array generator
function randomArry() {
    let arr = []
    for (let i = 0; i < 10; i++) {
        let num = Math.floor(Math.random() * 100)
        arr.push(num)
    }
    return arr
}



//removes duplicate values and sorts the arry
function cleanAndSort(arr) {
    arr = [...new Set(arr)]
    return arr.sort((a, b) => a - b)
}


let data = randomArry()
const tree = new Tree(data)
console.log(tree.root)
console.log(tree.isBalanced());

console.log(tree.levelOrder());
console.log(tree.inOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());

tree.insert(300);
tree.insert(400);
tree.insert(500);

console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());

console.log(tree.levelOrder());
console.log(tree.inOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());











