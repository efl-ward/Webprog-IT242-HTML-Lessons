const { createApp } = Vue;

// COMPONENT: Gallery
const PictureGallery = {
    template: `
        <div class="row g-3">
            <div v-for="(img, i) in images" :key="i" class="col-6 col-md-3">
                <div class="gallery-wrapper" @click="selectedImg = img">
                    <img :src="img.url" class="img-fluid rounded shadow-sm gallery-thumb">
                    <div class="gallery-overlay"><span>View</span></div>
                </div>
            </div>
            <div v-if="selectedImg" class="lightbox" @click="selectedImg = null">
                <img :src="selectedImg.url" class="animate-pop">
            </div>
        </div>
    `,
    data() {
        return {
            selectedImg: null,
            images: [
                { url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420' },
                { url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4' },
                { url: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4' },
                { url: 'https://luxlux.net/lux/wp-content/uploads/steph-curry-4-1-scaled.jpeg' }
            ]
        }
    }
};

// COMPONENT: Guestbook
const GuestbookForm = {
    template: `
        <div class="guestbook-container mx-auto" style="max-width: 600px;">
            <form @submit.prevent="save" class="glass-input p-4 mb-4">
                <input v-model="name" class="form-control mb-2" placeholder="Your Name" required>
                <textarea v-model="msg" class="form-control mb-2" placeholder="Message" required></textarea>
                <button class="btn btn-info w-100 fw-bold text-white shadow">Sign Guestbook</button>
            </form>
            <div class="comments-scroll">
                <div v-for="post in posts" class="comment-card p-3 mb-2 animate-pop border-bottom border-secondary">
                    <strong>{{ post.user }}</strong>
                    <p class="mb-1 small">{{ post.text }}</p>
                    <small class="text-muted">{{ post.time }}</small>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            name: '', msg: '',
            posts: JSON.parse(localStorage.getItem('myGuestbook') || '[]')
        }
    },
    methods: {
        save() {
            const entry = { user: this.name, text: this.msg, time: new Date().toLocaleString() };
            this.posts.unshift(entry);
            localStorage.setItem('myGuestbook', JSON.stringify(this.posts));
            this.name = ''; this.msg = '';
        }
    }
};

const app = createApp({
    data() {
        return {
            greetingMessage: "", // MUST MATCH HTML
            profile: {
                name: "Eduard Florene Serna",
                nickname: "Ward",
                bio: "IT Student at Asia Pacific College. Aspiring to be successful and wealthy.",
                details: { "Major": "IT", "Hobby": "Motorcycles", "Sport": "Badminton" }
            },
            skills: ["Java", "Python", "MySQL", "Vue.js 3", "Bootstrap 5"],
            education: [
                { level: "College", name: "Asia Pacific College" },
                { level: "Senior High", name: "Learn & Explore Montessori" }
            ]
        }
    },
    mounted() { this.runTypewriter(); },
    methods: {
        runTypewriter() {
            const hour = new Date().getHours();
            let msg = hour < 12 ? "Good Morning!" : hour < 18 ? "Good Afternoon!" : "Good Evening!";
            const fullMsg = `${msg} Welcome to my Portfolio!!`;
            let i = 0;
            const timer = setInterval(() => {
                this.greetingMessage += fullMsg[i];
                i++;
                if (i >= fullMsg.length) clearInterval(timer);
            }, 60);
        }
    }
});

app.component('picture-gallery', PictureGallery);
app.component('guestbook-form', GuestbookForm);
app.mount('#app');