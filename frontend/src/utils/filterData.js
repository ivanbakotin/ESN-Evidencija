export default function filterData(id, list) {
    list.forEach((e, index) => {
        if (e.id == id) list.splice(index, 1)
    });
}
