const axios = require('axios').default;

module.exports = {
    resolver: zipcode => axios({
            method: 'get',
            url: `${process.env.ZIPREST_URL}/${zipcode}/json/`,
    }).then(response => {
        return  {
            "zipcode": zipcode,
            "street": response.data.logradouro,
            "complement": response.data.complemento,
            "neighborhood": response.data.bairro,
            "locality": response.data.localidade,
            "uf": response.data.uf
        } 
    })
          
}