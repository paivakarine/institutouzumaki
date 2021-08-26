const maritalBD = [
    {
        id: 1,
        description: 'Solteire',
    },
     {
         id: 2,
         description: 'Divorciade',
     },

    {
        id: 3,
        description: 'Casade',
    },
    {
        id: 4,
        description: 'Viúve',
    }

];

const listMarital = () => {

    return maritalBD

};


const BuscaPorId = (id) => {

    const result = maritalBD.filter((item) => {
           return parseInt(item.id) === parseInt(id);
    });

    return result.length > 0 ? result[0] : undefined;

}

module.exports = {
    listMarital,
    BuscaPorId
}