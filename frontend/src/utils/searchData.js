export default function searchData(e, list, type_of_search) {
    let string;

    const search = list.filter(elem => {

        if (type_of_search == "clanovi") string = `${elem.ime} ${elem.prezime}`
        else if (type_of_search == "eventi") string = `${elem.ime_eventa}`

        return string.toLowerCase().includes(e.target.value) || 
               string.toUpperCase().includes(e.target.value)
    })

    return search
};
