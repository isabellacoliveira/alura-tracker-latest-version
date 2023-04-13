import IProjeto from "@/interfaces/IProjeto";
import { Module } from "vuex";
import { Estado } from "@/store";
import { ADICIONA_PROJETO, ALTERAR_PROJETO, DEFINIR_PROJETOS, EXCLUIR_PROJETO } from "@/store/tipoMutacoes";
import { ALTERA_PROJETO, CADASTRAR_PROJETO, OBTER_PROJETOS, REMOVER_PROJETO } from "@/store/tipoAcoes";
import http from "@/http";

export interface EstadoProjeto {
    projetos: IProjeto[]
}
export const projeto: Module<EstadoProjeto, Estado> = {
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string){
            const projeto = {
                id: new Date().toISOString(), 
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        }, 
        [ALTERAR_PROJETO](state, projeto: IProjeto){
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        }, 
        [EXCLUIR_PROJETO](state, id: string){
            state.projetos = state.projetos.filter(proj => proj.id != id)
        }, 
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]){
            state.projetos = projetos
        }
    }, 
    actions: {
        [OBTER_PROJETOS] ({ commit }) {
            http.get('projetos')
            .then(resposta => commit(DEFINIR_PROJETOS, resposta.data)); 
        },
        [CADASTRAR_PROJETO] (contexto, nomeDoProjeto: string) {
            return http.post('/projetos', {
                nome: nomeDoProjeto
            })
        },
        [ALTERA_PROJETO] (contexto, projeto: IProjeto) {
            return http.put(`/projetos/${projeto.id}`, projeto)
        },
        [REMOVER_PROJETO] ({ commit }, id: string) {
            return http.delete(`/projetos/${id}`)
            .then(() => commit(EXCLUIR_PROJETO, id))
        }
    }
}