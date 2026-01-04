const app = Vue.createApp({});

// Gallery Component
app.component('gallery-component', {
    data() {
        return {
            images: [
                { id: 1, src: 'https://via.placeholder.com/400x300', alt: 'Project One' },
                { id: 2, src: 'https://via.placeholder.com/400x300', alt: 'Project Two' },
                { id: 3, src: 'https://via.placeholder.com/400x300', alt: 'Project Three' }
            ]
        }
    },
    template: `
        <div>
            <h2>My Work Gallery</h2>
            <div class="gallery-grid">
                <img v-for="img in images" :key="img.id" :src="img.src" :alt="img.alt">
            </div>
        </div>
    `
});

// Guestbook / Feedback Component
app.component('guestbook-form', {
    data() {
        return {
            userName: '',
            userComment: '',
            comments: []
        }
    },
    methods: {
        addComment() {
            if (this.userName && this.userComment) {
                this.comments.push({
                    name: this.userName,
                    text: this.userComment,
                    date: new Date().toLocaleString()
                });
                this.userName = '';
                this.userComment = '';
            }
        }
    },
    template: `
        <div>
            <h2>Guestbook / Feedback</h2>
            <form @submit.prevent="addComment">
                <input v-model="userName" placeholder="Your Name" required>
                <textarea v-model="userComment" placeholder="Leave a comment..." rows="4" required></textarea>
                <button type="submit">Submit Feedback</button>
            </form>
            <div class="comments-list mt-3">
                <div v-for="c in comments" class="post">
                    <strong>{{ c.name }}</strong> <small>({{ c.date }})</small>
                    <p>{{ c.text }}</p>
                </div>
            </div>
        </div>
    `
});

app.mount('#app');