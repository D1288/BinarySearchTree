class Node{
    constructor(data){
    this.data = data;
    this.left = null;
    this.right = null
    }
}

class Tree{
    constructor(arr){
        const sortedArr = cleanAndSort(arr)
        this.root = buildTree(sortedArr)
    }
}

function buildTree(arr){
    if(!arr.length){
        return null
    }
    const mid = Math.floor(arr.length / 2)
    const root = new Node(arr[mid])

    root.left = buildTree(arr.slice(0,mid))
    root.right = buildTree(arr.slice(mid))
    
    return root
}

function cleanAndSort(arr){
    arr = [...new Set(arr)]
    return arr.sort((a,b) => a - b)
}