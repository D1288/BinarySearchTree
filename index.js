
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
    _min(root){
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

}





const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const tree = new Tree(data);
console.log(tree.root);



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



//removes duplicate values and sorts the arry
function cleanAndSort(arr) {
    arr = [...new Set(arr)]
    return arr.sort((a, b) => a - b)
}

