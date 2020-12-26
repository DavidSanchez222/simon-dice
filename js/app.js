const btnEmpezar = document.getElementById('btnEmpezar');
const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const MAX_LEVEL = 1;

class Game {

    constructor() {
        this.inicializar = this.inicializar.bind(this);
        this.inicializar();
        this.generate_sequence();
        setTimeout(this.next_level, 500);
    }

    inicializar() {
        this.select_color = this.select_color.bind(this);
        this.next_level = this.next_level.bind(this);
        this.toggle_btnEmpezar()
        this.level = 1;
        this.colors = {celeste, violeta, naranja, verde};
    }
    
    toggle_btnEmpezar() {
        if (btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide');
        } else {
            btnEmpezar.classList.add('hide');
        }
    }

    generate_sequence() {
        this.sequence = new Array(MAX_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4));
    }

    next_level() {
        this.sublevel = 0;
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

    transform_color_to_number(color) {
        switch (color) {
            case 'celeste':
                return 0;
            case 'violeta':
                return 1;
            case 'naranja':
                return 2;
            case 'verde':
                return 3;
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
    
    removeEventsClicksListener() {
        Object.keys(this.colors).forEach(index => this.colors[index].removeEventListener('click', this.select_color));
    }

    select_color(ev) {
        const name_color = ev.target.dataset.color;
        const color_number = this.transform_color_to_number(name_color);
        this.illuminate_color(name_color);
        if(color_number == this.sequence[this.sublevel]) {
            this.sublevel++;
            if(this.sublevel === this.level) {
                this.level++;
                this.removeEventsClicksListener()
                if(this.level === (MAX_LEVEL + 1)) {
                    this.winner()
                } else {
                    setTimeout(this.next_level, 1500)
                }
            }
        } else {
            this.loser()
        }
    }

    winner() {
        swal('Simon dice', 'Felicitaciones ganaste el juego!!', 'success')
            .then(this.inicializar);
    }

    loser() {
        swal('Simon dice', 'Lo lamentamos, perdiste :( !!', 'error')
            .then(() => {
                this.removeEventsClicksListener()
                this.inicializar()
            });
    }
}

function star_game() {
    var game = new Game();
}