const btnEmpezar = document.getElementById('btnEmpezar');
const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');

class Game {

    constructor() {

        this.inicializar();
        this.generate_sequence();
        this.next_level();
    }

    inicializar() {
        this.select_color = this.select_color.bind(this);
        btnEmpezar.classList.add('hide');
        this.level = 1;
        this.colors = {celeste, violeta, naranja, verde};
    }

    generate_sequence() {
        this.sequence = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4));
    }

    next_level() {
        this.illuminate_sequence();
        this.addEventsClicksListener();
    }

    transform_number_to_color(number) {
        switch (number) {
            case 0:
                return 'celeste';
            case 1:
                return 'violeta';
            case 2:
                return 'naranja';
            case 3:
                return 'verde';
        }
    }

    illuminate_sequence() {
        for (let index = 0; index < this.level; index++) {
            const color = this.transform_number_to_color(this.sequence[index]);
            setTimeout(() => this.illuminate_color(color), 1000 * index);
        }
    }

    illuminate_color(color) {
        this.colors[color].classList.add('light');
        setTimeout(() => this.turn_off_color(color), 350);
    }

    turn_off_color(color) {
        this.colors[color].classList.remove('light');
    }

    addEventsClicksListener() {
        Object.keys(this.colors).forEach(index => this.colors[index].addEventListener('click', this.select_color));
    }

    select_color(ev) {
        console.log(this);
    }
}

function star_game() {
    var game = new Game();
}