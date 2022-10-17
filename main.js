const body = document.querySelector('body');
const section = document.querySelector('section');
const gameWon = document.querySelector('span');
let cardsLeft = 16;

gameWon.textContent = '';

const getData = () => [
    { name: "1" },
    { name: "2" },
    { name: "3" },
    { name: "4" },
    { name: "5" },
    { name: "6" },
    { name: "7" },
    { name: "8" },
    { name: "1" },
    { name: "2" },
    { name: "3" },
    { name: "4" },
    { name: "5" },
    { name: "6" },
    { name: "7" },
    { name: "8" },
]

const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
}

const cardGenerator = () => {
    const cardData = randomize();

    cardData.forEach((item) => {
        const card = document.createElement('div');
        const face = document.createElement('div');
        const back = document.createElement('div');

        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';

        face.textContent = item.name;
        card.setAttribute('name', item.name)

        section.append(card);
        card.append(face);
        card.append(back);

        card.addEventListener('click', (e) => {
            card.classList.toggle('toggleCard');
            checkCards(e);
        })
    });

    let btn = document.createElement('button');
    btn.textContent = "Сыграть еще раз";
    btn.classList.toggle('btn');
    btn.style.display = 'none';
    btn.addEventListener('click', () => {
        restart();
        btn.style.display = 'none';
    });
    body.append(btn);
};

const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped');

    if (flippedCards.length === 2) {
        if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
            console.log("mach");
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                card.style.pointerEvents = 'none';
            })
            cardsLeft -= 2;
        } else {
            console.log("wrong");
            flippedCards.forEach((card) => {
                card.classList.remove('flipped');
                setTimeout(() => card.classList.remove('toggleCard'), 1000);
            });
        }
        if (cardsLeft === 0) {
            gameWon.textContent = 'Игра выиграна!';
            restartBtn();
        }
    }
};

const restart = () => {
    let cardData = randomize();
    let faces = document.querySelectorAll('.face');
    let cards = document.querySelectorAll('.card');
    section.style.pointerEvents = 'none';
    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard');

        setTimeout(() => {
            cards[index].style.pointerEvents = 'all';
            faces[index].textContent = item.name;
            cards[index].setAttribute('name', item.name);
            section.style.pointerEvents = 'all';
        }, 1000);

    });
    cardsLeft = 16;
    gameWon.textContent = '';
}

const restartBtn = () => {
    let btn = document.querySelector('button');
    btn.style.display = 'block';
}

cardGenerator();