import { INotificacao } from "@/interfaces/INotificacao";
import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "@vue/runtime-core";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONA_PROJETO, ALTERAR_PROJETO, DEFINIR_PROJETOS, DEFINIR_TAREFAS, EXCLUIR_PROJETO, NOTIFICAR } from "./tipoMutacoes";
import { ALTERA_PROJETO, CADASTRAR_PROJETO, OBTER_PROJETOS, OBTER_TAREFAS, REMOVER_PROJETO } from "./tipoAcoes";
import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";

interface Estado {
    projetos: IProjeto[], 
    tarefas: ITarefa[], 
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: {
        projetos: [], 
        tarefas: [], 
        notificacoes: []
    }, 
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string){
            const projeto = {
                id: new Date().toISOString(), 
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        }, 
        [ALTERAR_PROJETO](state, projeto: IProjeto){
            // encontrar o index do projeto 
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            // state projetos na posição que acabamos de achar vai receber 
            state.projetos[index] = projeto
        }, 
        [EXCLUIR_PROJETO](state, id: string){
            state.projetos = state.projetos.filter(proj => proj.id != id)
        }, 
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]){
            state.projetos = projetos
        }, 
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]){
            state.tarefas = tarefas
        }, 
        [NOTIFICAR] (state, novaNotificacao: INotificacao) {

            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)
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
            // vamos fazer o commit de uma mutation
            return http.delete(`/projetos/${id}`)
            // ao remover na api ela retorna o estado local 
            .then(() => commit(EXCLUIR_PROJETO, id))
        }, 
        [OBTER_TAREFAS] ({ commit }) {
            http.get('tarefas')
            .then(resposta => commit(DEFINIR_TAREFAS, resposta.data)); 
        },
    }
})

export function useStore(): Store<Estado>{
    return vuexUseStore(key)
}