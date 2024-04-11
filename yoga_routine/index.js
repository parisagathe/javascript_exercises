const main = document.querySelector("main");
const basicArray = [
    { pic: 0, min: 1 },
    { pic: 1, min: 1 },
    { pic: 2, min: 1 },
    { pic: 3, min: 1 },
    { pic: 4, min: 1 },
    { pic: 5, min: 1 },
    { pic: 6, min: 1 },
    { pic: 7, min: 1 },
    { pic: 8, min: 1 },
    { pic: 9, min: 1 },
]

let exerciseArray = [];

// Get stored exercises array

(() => {
    if (localStorage.exercises) {
        exerciseArray = JSON.parse(localStorage.exercises);
    } else {
        exerciseArray = basicArray;
    }
})();

class Exercise {
    constructor() {
        this.index = 0;
        this.minutes = exerciseArray[this.index].min;
        this.seconds = 0;
    }

    updateCountdown() {
        this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;

        setTimeout(() => {
            if (this.minutes === 0 && this.seconds === "00") {
                this.index++;
                this.ring();
                if (this.index < exerciseArray.length) {
                    this.minutes = exerciseArray[this.index].min;
                    this.seconds = 0;
                    this.updateCountdown()
                } else {
                    return page.finish();
                }
            } else if (this.seconds === "00") {
                this.minutes--;
                this.seconds = 59;
                this.updateCountdown();
            } else {
                this.seconds--;
                this.updateCountdown();
            }
        }, 1000);

        return (main.innerHTML = `
            <div class="exercice-container">
                <p>${this.minutes}:${this.seconds}</p>
                <img src="./assets/img/${exerciseArray[this.index].pic}.png">
                <div>${this.index + 1}/${exerciseArray.length}</div>
        `);
    }

    ring() {
        const audio = new Audio();
        audio.src = "./assets/audio/ring.mp3";
        audio.play();
    }
}

const utils = {
    pageContent: function (title, content, btn) {
        document.querySelector("h1").innerHTML = title;
        main.innerHTML = content;
        document.querySelector(".btn-container").innerHTML = btn;
    },

    handleEventMinutes: function() {
        document.querySelectorAll("input[type='number']").forEach((input) => {
            input.addEventListener("input", (e) => {
                exerciseArray.map((exo) => {
                    if (exo.pic == e.target.id) {
                        exo.min = parseInt(e.target.value);
                        this.store();
                    }
                })
            });
        });
    },

    handleEventArrow: function () {
        document.querySelectorAll(".arrow").forEach((arrow) => {
            arrow.addEventListener("click", (e) => {
                let position = 0;
                exerciseArray.map((exo) => {
                    if (exo.pic == e.target.dataset.pic && position !== 0) {
                        [exerciseArray[position], exerciseArray[position - 1]] = [exerciseArray[position -1], exerciseArray[position]];
                        page.lobby();
                        this.store();
                    } else {
                        position++;
                    }
                });
            });
        });
    },

    deleteItem: function () {
        document.querySelectorAll(".deleteBtn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                let newArr = exerciseArray.filter(
                    (exo) => exo.pic != e.target.dataset.pic
                );
                exerciseArray = newArr;
                page.lobby();
                this.store();
            });
        });
    },

    reboot: function () {
        exerciseArray = basicArray;
        page.lobby();
        this.store();
    },

    store: function () {
        localStorage.exercises = JSON.stringify(exerciseArray);
    }
};

const page = {
    lobby: function() {

        let mapArray = exerciseArray.map((exo) =>
            `
                <li>
                    <div class="card-header">
                        <input type="number" id=${exo.pic} min="1" max="10" value=${exo.min}>
                        <span>min</span>
                    </div>
                    <img src="./assets/img/${exo.pic}.png">
                    <i class="fas fa-arrow-alt-circle-left arrow" data-pic=${exo.pic}></i>
                    <i class="fas fa-times-circle deleteBtn" data-pic=${exo.pic}></i>
                </li>
            `
    ).join("");

    utils.pageContent(
        "Paramétrage <i id='reboot' class='fas fa-undo'></i>",
        "<ul>" + mapArray + "</ul>",
        "<button id='start'>Commencer<i class='far fa-play-circle'></i></button>"
    );
    utils.handleEventMinutes();
    utils.handleEventArrow();
    utils.deleteItem();
    reboot.addEventListener("click", () => utils.reboot());
    start.addEventListener("click", () => this.routine());
    },

    routine: function() {
        const exercise = new Exercise();
        utils.pageContent("Routine", exercise.updateCountdown(), null);
    },

    finish: function() {
        utils.pageContent(
            "C'est terminé !",
            "<button id='start'>Recommencer</button>",
            "<button id='reboot' class='btn-reboot'>Réinitialiser <i class='fas fa-times-circle'></i></button>"
        );

        start.addEventListener("click", () => this.routine());
        reboot.addEventListener("click", () => utils.reboot());
    },
};

page.lobby();