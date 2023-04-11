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
import { defineComponent } from "vue";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { ALTERAR_PROJETO } from "@/store/tipoMutacoes";
import useNotificador from '@/hooks/notificador'; 
import { ALTERA_PROJETO, CADASTRAR_PROJETO } from "@/store/tipoAcoes";

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String
    }
  },
  mounted () {
    if(this.id) {
      const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
      this.nomeDoProjeto = projeto?.nome || ''
    }
  },
  data() {
    return {
      nomeDoProjeto: ""
    };
  },
  methods: {
    salvar() {
      if (this.id) {
        this.store.dispatch(ALTERA_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjeto
        }).then(() => {
          this.lidarComSucesso();
        })
      } else {
        // não é mais dispatch mas sim commit 
        this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
        .then(() => {
          this.lidarComSucesso();
        })
      }
    }, 
    lidarComSucesso(){
      this.nomeDoProjeto = "";
      this.notificar(TipoNotificacao.SUCESSO, 'Excelente', 'O projeto foi cadastrado com sucesso')
      this.$router.push('/projetos')
    }
  },
  setup () {
    const store = useStore()
    const { notificar } = useNotificador()
    return {
      store,
      notificar
    }
  }
});
</script>

  <style scoped>
  .projetos {
    padding: 1.25rem;
  }
  </style>