const projeto = {
    id: 1, 
    descricao: 'Alura Tracker'
}

const proxy = new Proxy(projeto, {
    get(projetoOriginal, chave, receptor){
        console.log(`Alguém solicitou a chave do projeto: ${chave}`)
        return Reflect.get(projetoOriginal, chave, receptor)
    },
    set(projetoOriginal, chave, valor){
        console.log(`Alguém gerou a chave do projeto: ${chave} com o valor: ${valor}`)
        return projetoOriginal[chave] = valor
    }
})

proxy.descricao = 'Reatividade é bacana'
console.log(projeto.descricao); 
