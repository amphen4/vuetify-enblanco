<template>
  <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Inicio de sesión</v-toolbar-title>
                <v-spacer />
                
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      large
                      href="https://codepen.io/johnjleider/pen/pMvGQO"
                      target="_blank"
                      v-on="on"
                    >
                      <v-icon>mdi-codepen</v-icon>
                    </v-btn>
                  </template>
                  <span>Link a algo</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Nombre de usuario"
                    name="login"
                    type="text"
                    prepend-icon="mdi-account"
                  />

                  <v-text-field
                    id="password"
                    label="Contraseña"
                    name="password"
                    type="password"
                    prepend-icon="mdi-lastpass"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
  export default {
    name: 'Login',

    data: () => ({
      hola: 'hola'
    }),
  }
</script>
