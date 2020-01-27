# Vue - Tips

Vue summary about the basics and implementation.

# Index
- [Basics](#basics)
    - [Binding](#binding)
    - [Styling](#styling)
    - [Computed properties](#computed-properties)
    - [Directives](#directives)
    - [Event handling](#event-handling)
    - [Event modifiers](#event-modifiers)
    - [Event key modifiers](#event-key-modifiers)
    - [Vue CLI](#vue-cli)
    - [API Requests](#api-requests) (axios)
    - [Component Lifecycle](#component-lifecycle)
    - [Component Hierarchy](#component-hierarchy)
    - [Component Communication](#component-communication)
- [Vue Routing](#vue-routing)
    - [Setting up Vue Router](#setting-up-vue-router)
    - [Router configuration](#router-configuration)
    - [Components vs Views](#components-vs-view)
    - [Router links](#router-links)
    - [Redirects & Alias](#redirects-&-alias)
    - [Route Parameters](#route-parameters)
- [Vuetify](#Vuetify)
- [Vuex](#Vuex)
    - [Manual installation](#manual-installation) 
    - [Example (simple)](#example-(simple))
    - [Complete example](#complete-example)
    - [Using mapState](#using-mapstate)
    - [Getters](#getters)
    - [Mutations](#mutations)
    - [Actions](#actions)
- [Vuefire](#vuefire)
- [Ionic](#ionic)

# Basics

## Binding

Template:

```html
<img v-bind:src="photoUrl"/>
<img :src="photoUrl"/>
```

Script:

```javascript
const app = new Vue({
    data: {
        photoUrl: ''   
    }
})
```

## Styling

Template:

```html
<div class="product-box" :class="{'product-promotion': isPromoted}"></div>
<!-- It will have the class 'product-promotion' if 'isPromoted' = true -->


<div v-bind:class="styleObject"></div>
<!-- It will take the classes set in 'styleObject' -->
```

Script:

```javascript
data: {
    styleObject: {                    //  => Each attribute is a css class
        product-box: true,            //  => Each value is always a boolean
        product-promotion: false      //  => (whether the class is applied or not)
    }
}
```

```html
<div v-bind:class="[styleObject_1, styleObject_2]"></div>
<!-- We can set multiple 'styleObjects' -->
```

## Computed properties

```javascript
computed: {
    effusiveMessage: function() {
        return this.message.toUpperCase() // message is on data() {return {message: ''}}
    }
}
```

## Directives
- v-model       => two-way data binding
- v-bind
- v-if v-else-if v-else     => inserts the element in the DOM if true.
- v-show        => displays the html element if true (always stays in DOM)
- v-for (element in array) or ((element, index) in array) or ((value, key, index) in array)

Note: It is not recommended to use v-for with v-if directive. It is highly recommended to bind a key to each element in a v-for so Vue can keep change of which element of the array changed and does not reload the entire array when a single element changes.

```html
<ul id="app">
    <li v-for="(item, index) in array" :key="index">{{ index }}. {{ item.text }}</li>
</ul>
```

- Vue will detect: push(), pop(), shift(), unshift(), splice(), sort(), reverse()

- Vue will __NOT__ detect: array[index] = value; array.length = value; object.property = value;

## Event handling

```html
    <button v-on:click="onBtnClick()"></button>
    <button @:click="onBtnClick()"></button>
```
Events:
- click
- submit   -> forms
- mouseover
- keydown
- keypress
- ...

## Event modifiers: 
- stop 		        =>  Prevents event bubbling up the DOM tree
- prevent 	        =>  Prevents default behavior
- capture 	        =>  Capture mode is used for event handling
- self 		        =>  Only trigger if the target of the event is itself
- once 	                =>  Run the function at most once

## Event key modifiers: 
```html
<input v-on:keyup.13="addToCount"/>
<!-- It will trigger 'addToCount()' whenever 'Enter' (Key:13) is pressed -->
```

Note: interpolation on textareas won't work. Use v-model instead.

## VUE CLI
- vue create ```<appname>```  => new project
- vue serve             => serve project (nope)
- vue ui                => manage project with ui

- npm run serve         => correctly serve project

## API Requests

Use __axios__ library (has to be imported from npm):

```javascript
import axios from 'axios'

axios.get('/url')
    .then(response => {
        console.log(response.data)
    })
    .catch(error => console.log(error))
```

Instantiate it in a service:
```javascript
const apiClient = axios.create({
    baseUrl: "https://baseurl.com/data",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});

export default {
    getData() {
        return apiClient.get("/");
    }
}
```

## Component Lifecycle
### Creation 
- beforeCreate()
- created()             => called when vue has set-up events and data observation

### Mounting             
DOM insertion
- beforeMount()
- mounted()             => onInit

### Updating          
Triggered then a reactive property changes or re-render occurs
- beforeUpdate()
- updated()

### Destruction 
- beforeDestroy()
- destroyed()

## Component Hierarchy

```
/components                             => these components will be shared throughout all the app
    AppFooter.vue
    AppNavbat.vue
    AppSidebar.vue
/pages
    /ArticlePage
        index.vue               => parent component of the page
                                => contains all the necessary child components)
        ArticleList.vue
        ArticleTitle.vue        => page-specific components
    /UserPage
            index.vue
            LoginPanel.vue
```

## Component communication

### Parent to child
Use props to pass data from a parent to a child component.
Props store __read only__ values.

You can pass __hardcoded data__:
```html 
<my-component 
    prop1="Hello"
    prop2="World"
/>
```

Or vue __variables__:
```html
<my-component
    :prop1="var1"
    :prop2="var2"
/>
```

Declare the props in the child component:

```javascript
props: {
    name: { 
        type: String,
        required: true                 // => it will be optional otherwise
    },
    text: {
        type: String,
        default: 'Some good text'      // => default value
    },
    count: { type: Number }            // => undefined if it isn't set by the parent
}
```

### Child to parent

Child components can trigger event function on it's parent.
These functions have at least one parameter, the name of the triggered event.

#### In the child component:
```javascript
methods: {
    sendMessageToParent() {
        this.$emit('messageFromChild')         // => triggered the event 'messageFromChild'
    }
}
```

#### In the parent component:
```html
<child-component v-on:messageFromChild="childMessageReceived"/>
```
or
```html
<child-component @messageFromChild="childMessageReceived"/>
```

```javascript
methods: {
    childMessageReceived(arg1, arg2) {
        console.log
    }
}
```

### Direct Communication

Sometimes it is too complex to access a component through parents or grandparents. There is a way to communicate two components directly no matter how far they are from each other.

This kind of communication is done through the Event Bus.

### Emit event

Use '$root' vue instance to access the event bus.

```javascript
export default {
    name: 'CardComponent',
    methods: {
        sendMessageToEventBus() {
            this.$root.$emit('messageFromCardComponent', status) // emiting an event
        }
    }
}
```

### Listen to event

The listener of an Event Bus should be placed on the **mounted property**.

```javascript
export default {
    name: 'HeaderComponent',
    mounted() {
        this.$root.$on('messageFromCardComponent', (status) => {
            console.log('Message Received from Card Component');
        })
    }
}
```

# Vue Routing

## Setting up Vue Router

```
npm install vue-router
```

Note: we also need to tell Vue to use our router:

```javascript
Vue.use(Router)
```

Create a router file:
```
src/router.js
```

Each route is defined by:
- Path: '/route/URL'
- Name: 'route-name'
- Component: ComponentName

```javascript
{
    path: '/about',
    name: 'about',
    component: AboutComponent
}
```

Note: we need to import the components.

## Router configuration

src/router.js :
```javascript
import Vue from "vue";
import Router from "vue-router";

Vue.user(Router);

export default new Router({
    // RouteConfigObject        
    // => Routes as we defined before (they can have more config parameters) 
    routes: [
        {path: "/",     name: "home",   component: HomeComponent}
        {path: "/about",name: "about",  component: AboutComponent}
    ]
})
```

src/main.js :
```javascript
import App from "./App.vue";
import Vue from "vue";
import router from "vue-router";

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
```

## Components vs Views

When we create a project using vue-router, it will automatically create the folder `src/views`.
We will add there components that will be rendered by the router in _full-screen mode_,
replacing whatever was displayed before.

Therefore, we should put it in the views (Pages) that will be loaded by the vue-router.


## Router links

They are components that helps with the navigation.

Router-link has an attribute **to**, which contains the url to navigate to:
```html
<div id="nav">
    <router-link to="/">Home</router-link>      <!-- like an 'a' tag-->
    <router-link to="/about">About</router-link>
    <router-link :to="{name: 'about'}">Help</router-link>   <!-- declared route in router.js -->
</div>

<router-view/>
```

```<router-view/>``` will be a container where all the diferent routes will be loaded (rendered) to.
Instead of 'redirecting' us to the corresponding page, it will render the page (component) into the ```<router-view>```.

This way, we can keep all the common components (navbar, footer, etc.) and only replace the specific 'page component'.

Sometimes, we need multiple components for the same path.

```html
<router-view class="view one"/>             <!-- name="default" -->
<router-view class="view two" name="a"/>
<router-view class="view three" name="b"/>
```

```javascript
routes: {
    {
        path: '/',
        components: {
            default: Foo,       // FooComponent
            a: Bar,
            b: Baz
        }
    }
}
```

## Redirects & Alias

```javascript
routes: [
    {path: "/",     redirect: "/home"},     // Also -> redirect: {name: "home}
    {path: "/home", name: "home",   component: Home}
    {path: "/about",name: "about",  component: About, alias: "about-us"}
]
```

Alias allows us to set more than one url to the same path.
In the previous case, "/about" and "/about-us" will render the same component.

## Route parameters

```javascript
routes: [
    {path: "/products",     name:"productList",     component: ProductList},
    {path: "/product/:productId",  name:"productDetail",   component: ProductDetail},
    {
        path: "category/:categoryId/product/:productId",
        name:"CategoryProductDetail",
        component: CategoryProductDetail
        },
]
```

In the rendered component, get the route parameter with ```$route.params.productId```.
```$route``` is a global object that represents the state of the current active router.

You can also get the route parameters as props, setting the route props as true:

```javascript
// router
routes: [
    {
        path: "/product/:productId",
        name:"productDetail",
        component: ProductDetail,
        props: true
    }

// component
props: ["username"]
```


Using ```<router-link/>```:
```html
<router-link
    :to="{
        name: 'productDetail',
        params: {productId: '20'}
    }"
/>
```

## Programatically use router

Go to:
```javascript
this.$router.push('/url')
```

# Vuetify

Add Vuetify:

```
vue add vuetify
```

Example:
```html
<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <div>
                <v-img ...>
                <v-img ...>
            <div>

            <v-spacer></v-spacer>

            
            <v-btn>
                <v-icon></v-icon>
            <v-btn>
        </v-app-bar>

        <v-content>
            <router-view>
        </v-content>
    </v-app>
</template>
```
Yep, just another Bootstrap that works like Ionic components.
Check the [docs](https://vuetifyjs.com/es-MX/components/app-bars) for all the available components and their customization.

## Tips

You can set vuetify components as router-links including the atribute 'to=':
```html
<v-tab to="/home">Home</v-tab>      <!-- Redirect to '/home' -->
```

# Vuex

## Manual Installation

```
npm install --save vuex
npm install --save es6-promise
```

src/store.js
```javascript
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {}
});
```

The state (data) must be only modified through mutations, never directly.

The state is reactive, so that every component that retrieves data from it will update it's data when the store has been mutated.

src/main.js
```javascript
import store from "./store.js";

new Vue({
    store,
    render: h => h(App)
}).$mount("#app");
```

## Example (simple)

```javascript
const store = new Vuew.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
            state.count++
        }
    }
})
```

1. Access the state: ```store.state.count```
2. Trigger a state change: ```store.commit('increment')```

## Complete example

1. Component or view:

```html
<div id="app">
    <p>{{ count }}</p>
    <p>
        <button @click="increment">Incrementar</button>
        <button @click="decrement">Decrementar</button>
    </p>
</div>

<script>
import store from './store';

export default {
    computed: {
        count() {
            return store.state.count
        }
    },
    methods: {
        increment() {
            store.commit('increment')
        },
        decrement() {
            store.commit('decrement')
        }
    }
}
</script>
```

2. Vuex Store

```javascript
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment: state => state.count++,
        decrement: state => state.count--
    }
})
```

**Note:** We can access the store as ```this.$store.state.count``` (this works for components that are childs from a parent component that has already imported the store, as we are doing in the main.js).


## Using MapState

```javascript
import {mapState} from 'vuex'

...
computed: mapState([
    'name',     // this.name => store.state.name
    'email',    // this.email => store.state.email
    'photo',    // this.photo => store.state.photo
    'role'      // this.role => store.state.role
])
...
```

## Getters

Getters take ```state``` as their first argument:

```javascript
const store = new Vuex.Store({
    state: {
        todos: [
            { id: 1, text: '...', done: true},
            { id: 2, text: '...', done: false}
        ]
    },
    getters: {
        doneTodos: state => {
            return state.todos.filter(todo => todo.done)
        },
        doneTodosCount: (state, getters) => {
            return getters.doneTodos.length
        }
    }
})
```

Can be accesed on the ```store.getters```:

```javascript
...
computed: {
    doneTodosCount() {
        return this.$store.getters.doneTodosCount
    }
}
...
```

You can pass arguments to a getter:
```javascript
getters: {
    getTodoById: (state) => (id) => {
        return state.todos.filter(todo => todo.id === id)
    },
```
```javascript
...
return this.$store.getters.doneTodosById(2)
...
```

## Mutations

You can pass arguments (called 'payload') to a mutation:
```javascript
mutations: {
    increment (state, n) {
        state.count += n
    }
}
```

```javascript
store.commit('increment', 10)
```

Also (recommended):
```javascript
mutations: {
    increment (state, payload) {
        state.count += payload.amount
    }
}
```

```javascript
store.commit('increment', {
    amount: 10
})
```

Do it like a pro:
```javascript
store.commit({
    type: 'increment',
    amount: 10
})
```

__Note:__ mutations can't contain asynchronous functions.

## Actions

Actions are methods that commit mutations, but they can contain asynchronous functions. They take a context, instead of a state as their first parameter.

```javascript
actions: {
    increment (context) {
        context.commit('increment')
    }
}
```

Call the action:
```javascript
...
store.dispatch('increment')
...
```

The ```context``` object has the same set of methods as the store (```context.state```, ```context.getters```)

Actions with payload:
```javascript
...
store.dispatch('increment', {
    amount:10
})
// also:
store.dispatch({
    type: 'increment',
    amount: 10
})
...
```
Composing actions:
```javascript
actions: {
    async actionA (context) {
        context.commit('myData', await getDataFromAPI())
    },
    async actionB (context) {
        await context.dispatch('actionA')   // execute 'actionA' and wait for it
        context.commit('otherData', await getMoreData())
    }
}
```

```javascript
...
store.dispatch('actionA').then(() => {
    // 'actionA' already finished
})
...
```

# Vuefire

Installation:
```
npm install vuefire firebase
```

```javascript
import { firestorePlugin } from 'vuefire'

Vue.use(firestorePlugin)
```

__Note:__ use 'rtdbPlugin' for Real Time Database.

Get a database instance from Firebase (db.js):
```javascript
import firebase from 'firebase/app'
import 'firebase/firestore'

// Get a Firestore instance
export const db = firebase
  .initializeApp({ projectId: 'MY PROJECT ID' })
  .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true })
```


# Ionic

## Steps

1. Create a Vue project

```
vue create <PROJECT_NAME>

? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Router, Vuex, Linter
? Use history mode for router? Yes
? Pick a linter / formatter config: Basic
? Pick additional lint features: Lint on save
? Where do you prefer placing config for Babel, ESLint, etc.? In package.json
? Save this as a preset for future projects? No
``` 

2. Install dependencies

```
npm install --save @ionic/core @ionic/vue
npm install --save-dev ionicons@4.5.9-1
```

3. App.vue

```html
<template>
  <div id="app">
    <ion-app>
      <ion-vue-router/>
    </ion-app>
  </div>
</template>
```

4. router/index.js

```javascript
import Vue from "vue";
import { IonicVueRouter } from "@ionic/vue";
import firebase from "firebase";

Vue.use(IonicVueRouter);

const routes = [...];

const router = new IonicVueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
```

5. main.js

```javascript
import Vue from 'vue';
import App from './App.vue'
import router from './router'
import Ionic from "@ionic/vue";
import '@ionic/core/css/ionic.bundle.css';

Vue.use(Ionic);
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
```

6. Scripts

```
npm run serve 
npm run build
npm run lint
```
