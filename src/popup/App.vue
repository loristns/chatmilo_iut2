<template>
<div>
    <main id="loading" v-if="!loaded">
        <p>Chargement...</p>
    </main>

    <main id="loaded" v-if="loaded">
        <p id="user-message" v-if="userMessage !== undefined">{{ userMessage }}</p>
        <p id="bot-answer" v-if="botAnswer !== undefined">{{ botAnswer }}</p>
        <br/>
        <div id="inputbox">
            <input
                v-model="userInput"
                @keyup.enter="newMessage()"
                type="text"
                placeholder="Demander quelque chose"
            />

            <button @click="newMessage()"> > </button>
            | 
            <button
                @click="toggleSR()"
                 v-if="speechRecognition !== undefined"
                 :class="{ isRecording }"
            >
                ?
            </button>
        </div>

    </main>
</div>
</template>

<script>
import * as bot from "../bot/bot.js";

export default {
    name: 'App',

    data() {
        return {
            userInput: '',
            userMessage: undefined,
            botAnswer: 'Bienvenue dans Chatmilo !',
            loaded: false,
            isRecording: false,
            speechRecognition: 'webkitSpeechRecognition' in window 
                // eslint-disable-next-line no-undef
                ? new webkitSpeechRecognition() 
                : undefined,
        };
    },

    methods: {
        newMessage() {
            this.userMessage = this.userInput;
            this.userInput = '';

            this.handleMessage(this.userMessage);
        },

        toggleSR() {
            this.isRecording = !this.isRecording;

            if (this.isRecording) {
                this.speechRecognition.start();
            } else {
                this.speechRecognition.stop();
            }
        },

        SRNotAllowed(event) {
            if (event.error === 'not-allowed') {
                this.isRecording = false;
                browser.tabs.create({ url: './request-speech.html' });
            }
        },

        async onNewRecord(event) {
            console.log(event);
            this.userMessage = event.results[0][0].transcript;
            this.speechRecognition.stop();
            this.isRecording = false;

            const answer = await this.handleMessage(this.userMessage, 2500);

            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(answer);
                utterance.lang = 'fr-FR';
                speechSynthesis.speak(utterance);
            }
        },

        async handleMessage(message, delay) {
            const digest = await bot.nlu.ask(message);

            let answer;

            if (digest.turnConfidence < 0.3) {
                answer = bot.actions['unknown'];
            } else {
                answer = bot.actions[digest.actions[0]];
            }

            if (digest.slots['class#Categorical'].category) {
                answer.message = answer.message.replaceAll(
                    '$class', digest.slots['class#Categorical'].category.toUpperCase()
                );
            }
        
            this.botAnswer = answer.message;

            if (answer.url) {
                let url = answer.url;

                if (digest.slots['class#Categorical'].category) {
                    url = url.replaceAll(
                        '$class', digest.slots['class#Categorical'].category.toUpperCase()
                    );
                }

                setTimeout(() => browser.tabs.create({ url }), delay === undefined ? 1000 : delay);
            }
            
            return answer.message;
        }
    },

    mounted() {
        bot.load().then(() => {
            this.loaded = true;
        });

        if (this.speechRecognition !== undefined) {
            this.speechRecognition.lang = 'fr-FR';
            this.speechRecognition.continuous = true;
            this.speechRecognition.onresult = this.onNewRecord;
            this.speechRecognition.onerror = this.SRNotAllowed;
        }
    }
};
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
    
    html, body {
        width: 550px;
        height: 200px;
        background-color: black;
        color: white;
        font-family: 'Press Start 2P', Verdana, Geneva, Tahoma, sans-serif;
        overflow: hidden;
    }

    main {
        text-align: center;
    }

    input, button {
        border: none;
        background-color: black;
        color: white;
        font-family: inherit;
    }

    input {
        width: 80%;
    }
    
    *:focus {
        outline: none;
    }

    #inputbox {
        position: absolute;
        bottom: 1em;
        right: 0;
        left: 0;
    }

    ::placeholder {
        font-family: 'Press Start 2P', Verdana, Geneva, Tahoma, sans-serif;
    }

    #bot-answer {
        color: rgb(105, 236, 219);
    }

    .isRecording {
        color: red;
    }
</style>
