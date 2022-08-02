Vue.createApp({
  data() {
    return {
      lista_planta: [],
      planta: {},
      initMaterialize: true,
      edit_planta: {},
      del_planta: {},
      copy_edit_planta: {},
      errors: {
        document: "",
        name: "",
        charge: "",
        salary: "",
        image: "",
      },
      modal: {},
      search: "",
    }
  },
  mounted() {


    this.get_token();
    this.index();

  },

  created() {

  },

  updated() {
    if (this.initMaterialize) {
      M.AutoInit();
      this.initMaterialize = false
    }
    M.updateTextFields()
    let id = this.edit_planta.id

  },
  methods: {
    async get_token() {
      response = await axios.get(" http://127.0.0.1:8000/sanctum/csrf-cookie")
    },

    async index() {
      let response = await axios.get(" http://127.0.0.1:8000/api/planta")
      this.lista_planta = response.data;
      // console.log(response);
    },
    async store() {
      this.errors = {
        document: "",
        name: "",
        charge: "",
        salary: "",
        image: "",
      }
      try {
        let response = await axios.post(
          "http://127.0.0.1:8000/api/planta",
          this.planta,
        )
        this.modal.close()

        this.index()
      }
      catch (e) {
        this.errors = e.response.data.errors

        // console.log(e.response.data.errors)
      }

    },
    edit(p) {
      this.edit_planta = p
      this.modal = M.Modal.init(
        document.getElementById('editar'),
        { dismissible: false }
      )
      this.modal.open()
      console.log(this.edit_planta)

      Object.assign(this.copy_edit_planta, this.edit_planta)

    },
    cancel_modal() {
      Object.assign(this.edit_planta, this.copy_edit_planta)

    },

    async update() {
      let id = this.edit_planta.id
      let response = await axios.put(" http://127.0.0.1:8000/api/planta/" + id,
        this.edit_planta
      );
      this.index()
    },

    delete_planta(p) {
      this.del_planta = p
    },

    async destroy() {
      let id = this.del_planta.id
      let response = await axios.delete(" http://127.0.0.1:8000/api/planta/" + id)
      this.index()
    },

    create() {

      this.modal = M.Modal.init(
        document.getElementById('nuevo'),
        { dismissible: false }
      )
      this.modal.open()


    },

    filter_planta() {
      this.lista_planta = this.lista_planta.filter((item) => (item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1)
      )
    },

  },



}).mount('#app')