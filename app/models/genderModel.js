const genderBD = [

    {
        id: 1,
        description: 'Feminine',
    },
    {
        id: 2,
        description: 'Masculine',
    },
    {
        id: 3,
        description: 'Não binárie',
    },
];

const listGender = () => {

    return genderBD

};

const BuscaPorId = (id) => {

    const result = genderBD.filter((item) => {
           return parseInt(item.id) === parseInt(id);
    });

    return result.length > 0 ? result[0] : undefined;

}

const BuscaPorDescricao = (id) => {

    const result = genderBD.filter((item) => {
        return item.id === id;
    });

    return result.length > 0 ? result[0] : undefined;

}

module.exports = {
    listGender,
    BuscaPorId
}