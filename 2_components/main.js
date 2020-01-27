Vue.component('button-counter', {
    // In components, data must be a function
    // This way, every instance of the same component will have it's own 'data'
    data: function() {
        return {
            count: 0
        }
    },
    
    template:
        '<button @click="count++">'
        +   'You clicked me {{ count }} times'
        +   '</button>'
})


Vue.component('title-w-input', {
    props: ['title'],
    template: '<h3>{{ title }}</h3>'
})


// ############################## WARNING ####################################
// The root Vue instance has to be initialized AFTER the components
// ###########################################################################
new Vue({
    el: '#components-demo',
    data: {
        posts: [
            {id: 1, tittle: '1111'},
            {id: 2, tittle: '2222'},
            {id: 3, tittle: '3333'},
        ]
    }
})
