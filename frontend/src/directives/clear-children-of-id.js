
export default [
    "clear-children-of-id",
    {
        created(
            el,
            binding
            //, vnode
        ) {
            let myNode = document.getElementById(binding.value)
            while (myNode.lastElementChild) {
                myNode.removeChild(myNode.lastElementChild);
            }
        },
    },
];

