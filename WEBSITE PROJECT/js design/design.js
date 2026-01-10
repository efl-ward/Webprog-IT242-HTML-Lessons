/**
 * WEBPROG IT242 - Midterm Project
 * Developer: Eduard Florene Serna
 * Framework: Vue.js 3 
 */

const { createApp } = Vue;

// --- COMPONENT 1: PHOTO GALLERY ---
const PictureGallery = {
    template: `
        <div class="gallery-container">
            <div class="row g-3">
                <div v-for="(img, index) in images" :key="index" class="col-6 col-md-3">
                    <div class="gallery-item" @click="openLightbox(img)">
                        <img :src="img.url" :alt="img.caption" class="img-fluid rounded shadow-sm">
                        <div class="overlay"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
                    </div>
                </div>
            </div>

            <transition name="fade">
                <div v-if="selectedImg" class="lightbox-overlay" @click="selectedImg = null">
                    <div class="lightbox-content animate-pop">
                        <img :src="selectedImg.url" class="img-fluid rounded">
                        <p class="text-center mt-2 text-info fw-bold">{{ selectedImg.caption }}</p>
                    </div>
                </div>
            </transition>
        </div>
    `,
    data() {
        return {
            selectedImg: null,
            images: [
                { url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420', caption: 'Gaming Setup' },
                { url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4', caption: 'Coding Passion' },
                { url: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4', caption: 'Movie Night' },
                { url: 'https://luxlux.net/lux/wp-content/uploads/steph-curry-4-1-scaled.jpeg', caption: 'Inspiration' }
            ]
        }
    },
    methods: {
        openLightbox(img) {
            this.selectedImg = img;
        }
    }
};

// --- COMPONENT 2: GUESTBOOK (Advanced Persistence) ---
const GuestbookForm = {
    template: `
        <div class="guestbook-box">
            <form @submit.prevent="submitEntry" class="mb-4">
                <div class="row g-2">
                    <div class="col-md-4">
                        <input v-model="form.name" type="text" class="form-control glass-input" placeholder="Your Name" required>
                    </div>
                    <div class="col-md-8">
                        <input v-model="form.message" type="text" class="form-control glass-input" placeholder="Leave a comment..." required>
                    </div>
                </div>
                <button type="submit" class="btn btn-info w-100 mt-2 fw-bold text-white shadow">Post to Guestbook</button>
            </form>

            <div class="comments-list mt-3">
                <transition-group name="list" tag="div">
                    <div v-for="entry in entries" :key="entry.id" class="comment-card p-3 mb-2 animate-pop">
                        <div class="d-flex justify-content-between">
                            <strong class="text-info">@{{ entry.name }}</strong>
                            <small class="text-muted">{{ entry.timestamp }}</small>
                        </div>
                        <p class="mb-0 mt-1">{{ entry.message }}</p>
                    </div>
                </transition-group>
                <p v-if="entries.length === 0" class="text-center text-muted">No messages yet. Be the first!</p>
            </div>
        </div>
    `,
    data() {
        return {
            form: { name: '', message: '' },
            // Advanced: Loads data from Browser LocalStorage
            entries: JSON.parse(localStorage.getItem('myGuestbook') || '[]')
        }
    },
    methods: {
        submitEntry() {
            const newEntry = {
                id: Date.now(),
                name: this.form.name,
                message: this.form.message,
                timestamp: new Date().toLocaleString()
            };
            this.entries.unshift(newEntry);
            
            // Save to LocalStorage (Persists even after refresh)
            localStorage.setItem('myGuestbook', JSON.stringify(this.entries));
            
            // Reset Form
            this.form.name = '';
            this.form.message = '';
        }
    }
};

// --- MAIN APP INSTANCE ---
const app = createApp({
    data() {
        return {
            greetingText: "",
            profile: {
                name: "Eduard Florene Serna",
                nickname: "Ward",
                bio: "IT Student at Asia Pacific College. Aspiring to be successful and wealthy.",
                details: {
                    "Major": "Information Technology",
                    "Hobby": "Motorcycle Riding",
                    "Sport": "Badminton"
                    "Music": "RNB, INDIE POP"
                }
            },
            skills: ["UI/UX", "Java", "Python", "MySQL", "Vue.js", "Bootstrap 5"],
            education: [
                { level: "College", name: "Asia Pacific College" },
                { level: "Senior High", name: "Learn & Explore Montessori" },
                { level: "Junior High", name: "Signal Village National HS" }
            ]
        }
    },
    mounted() {
        this.runTypewriter();
    },
    methods: {
        runTypewriter() {
            const hour = new Date().getHours();
            let msg = hour < 12 ? "Good Morning!" : hour < 18 ? "Good Afternoon!" : "Good Evening!";
            const fullMsg = `${msg} Welcome to my Portfolio!!.`;
            
            let i = 0;
            const timer = setInterval(() => {
                this.greetingText += fullMsg[i];
                i++;
                if (i >= fullMsg.length) clearInterval(timer);
            }, 60);
        }
    }
});

// Component Registration
app.component('picture-gallery', PictureGallery);
app.component('guestbook-form', GuestbookForm);

// Mount App
app.mount('#app');