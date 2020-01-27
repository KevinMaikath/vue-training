const app = new Vue({
    el: '#app',
    data: {
        // Intro
        message: 'Hello world!',
        title: 'my app',
        count: 0,
        display: false,
        btn_disabled: true,

        // Template directives
        nameInput: 'Write your name!',
        allow_submit: false,
        songs: ['Generator', 'Touch', 'Devotion'],
        songInfo: {
            title: 'Phoenix',
            author: 'Hybrid Minds',
            album: 'Phoenix'
        },

        // Event handling

        // Styling
        color_red: 'red',
        custom_size: 20,
        borderStyleObject: {
            color: 'blue',
            border: '1px solid black'
        },

        // Forms binding
        checkedNames: [],
        toggle: 'Checked',   // The checkbox will be checked as the value matches 'true-value'
        myNum: 0,
        myString: ''
    },
    computed: {
        // Arrow functions don't work here!
        shoutItOut: function () {
            return this.message.toUpperCase()
        }
    },
    methods: {
        incrementCounter: function () {
            this.count++
        },
        incrementBy: function (num) {
            this.count += num
        }
    }
})

function form1Submit() {
    console.log(app.$data.nameInput)
}

function pleaseLetMeSubmit() {
    app.$data.allow_submit = true
}

setTimeout(() => {
    console.log(app.$data.message)
    app.$data.message = 'Bye rebooters'     // $data is unnecessary

    app.songs.push('Kaleidoscope')
}, 3000);