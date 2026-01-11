const { createApp } = Vue;

const PictureGallery = {
    template: `
        <div class="row g-3">
            <div v-for="(img, i) in images" :key="i" class="col-6 col-md-3">
                <div class="gallery-wrapper" @click="selectedImg = img">
                    <img :src="img.url" class="img-fluid rounded shadow-sm gallery-thumb" style="height: 200px; object-fit: cover; width: 100%;">
                    <div class="gallery-overlay"><span>View</span></div>
                </div>
            </div>
            <div v-if="selectedImg" class="lightbox" @click="selectedImg = null">
                <img :src="selectedImg.url" class="animate-pop img-fluid">
            </div>
        </div>
    `,
    data() {
        return {
            selectedImg: null,
            images: [
                { url: 'https://photos.fife.usercontent.google.com/pw/AP1GczPmK_uLH_s0Y6LjqaISdYnGMdnIOMQcFQebeqTW9XKdObzsDa8xNJgtLQ=s220-no?authuser=0' },
                { url: 'https://photos.fife.usercontent.google.com/pw/AP1GczM_0dcTZsybVNmekX16YyQVAccjcbhgHzID-mHGNnbuZW7nSXR0TRB6MA=w719-h959-s-no-gm?authuser=0' },
                { url: 'https://photos.fife.usercontent.google.com/pw/AP1GczM5CcuEgHJmetWC9Vffx_XI57rdEdq8nV0WznS03o0QSIJPoiCBusfBbQ=w719-h959-s-no-gm?authuser=0' },
                { url: 'https://photos.fife.usercontent.google.com/pw/AP1GczMugOtaYwG50e_jEQB2wk5s_uLlXYbSHV7n8VM5yacxzmU8bitc0fq96w=w639-h959-s-no-gm?authuser=0' }
            ]
        }
    }
};

const GuestbookForm = {
    template: `
        <div class="guestbook-container mx-auto" style="max-width: 600px;">
            <form @submit.prevent="save" class="p-4 mb-4 glass-card">
                <input v-model="name" class="form-control mb-2 bg-dark text-white border-secondary" placeholder="Your Name" required>
                <textarea v-model="msg" class="form-control mb-2 bg-dark text-white border-secondary" placeholder="Message" required></textarea>
                <button class="btn btn-info w-100 fw-bold text-white shadow">Sign Guestbook</button>
            </form>
            <div class="comments-scroll">
                <div v-for="post in posts" :key="post.time" class="p-3 mb-2 animate-pop border-bottom border-secondary">
                    <strong class="text-info">{{ post.user }}</strong>
                    <p class="mb-1 small text-light">{{ post.text }}</p>
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
            greetingMessage: "", 
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
    mounted() { 
        this.runTypewriter(); 
    },
    methods: {
        runTypewriter() {
            const hour = new Date().getHours();
            let msgPrefix = hour < 12 ? "Good Morning!" : hour < 18 ? "Good Afternoon!" : "Good Evening!";
            const fullMsg = `${msgPrefix} Welcome to my Portfolio!!`;
            let i = 0;
            const timer = setInterval(() => {
                if (i < fullMsg.length) {
                    this.greetingMessage += fullMsg[i];
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, 60);
        }
    }
});

app.component('picture-gallery', PictureGallery);
app.component('guestbook-form', GuestbookForm);
app.mount('#app');