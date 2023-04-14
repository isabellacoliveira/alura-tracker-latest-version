<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label"> Nome do Projeto </label>
        <input
          type="text"
          class="input"
          v-model="nomeDoProjeto"
          id="nomeDoProjet"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>
  
<script lang="ts">
import { useStore } from "@/store";
import { defineComponent, ref } from "vue";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from '@/hooks/notificador'; 
import { ALTERA_PROJETO, CADASTRAR_PROJETO } from "@/store/tipoAcoes";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String
    }
  },
  setup (props) {
    const store = useStore()
    // acesso a rota atual (id pela rota) useRoute
    // acesso ao roteador do vue useRouter
    const router = useRouter()
    const { notificar } = useNotificador()
    const nomeDoProjeto = ref("")
    if(props.id){
      const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id)
      nomeDoProjeto.value = projeto?.nome || ''
    }
    const lidarComSucesso = () => {
      nomeDoProjeto.value = "";
      notificar(TipoNotificacao.SUCESSO, 'Excelente', 'O projeto foi cadastrado com sucesso')
      router.push('/projetos')
    }
    const salvar = () => {
      if (props.id) {
        store.dispatch(ALTERA_PROJETO, {
          id: props.id,
          nome: nomeDoProjeto.value
        }).then(() => {
          lidarComSucesso();
        })
      } else {
        store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
        .then(() => {
          lidarComSucesso();
        })
      }
    }
    return {
      salvar,
      nomeDoProjeto
    }
  }
});
</script>

  <style scoped>
  .projetos {
    padding: 1.25rem;
  }
  </style>