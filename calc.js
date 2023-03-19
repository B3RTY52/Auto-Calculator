document.addEventListener('DOMContentLoaded', () => {
    const carsType = document.querySelectorAll('.values-list'),
        board = document.querySelectorAll('.menu-parameter-board'),
        price = document.querySelector('#price'),
        menu = document.querySelector('.menu');

    console.log(price);

    carsType.forEach(el => el.addEventListener('click', (e) => {
        if (e.target.id === 'Электрический' ||
            e.target.id === 'Бензиновый' ||
            e.target.id === 'Дизельный') {

            document.querySelector('.engine-value').textContent = `${e.target.id}`;

            if (e.target.id === 'Электрический') {
                menu.insertAdjacentHTML('beforeend', `
                <div class="menu-parameter">
                <h3>Объем двигателя</h3>
                <div class="field-wrapper">
                        <div class="menu-parameter-field">
                            <p class="menu-parameter-value">1.5</p>
                            <i class="fa-solid fa-chevron-down chevron-icons"></i>
                        </div>
                        <ul class="menu-parameter-board">
                            <li class="values-list">Легковой</li>
                            <li class="values-list">Кроссовер/Внедорожник</li>
                            <li class="values-list">Пикап</li>
                        </ul>
                    </div>
                </div>
                `);
                console.log(1);
            }
        }
        if (e.target.id === 'Легковой' ||
            e.target.id === 'Кроссовер/Внедорожник' ||
            e.target.id === 'Пикап') {
            document.querySelector('.type-value').textContent = `${e.target.id}`;
            console.log(2);
        }
        console.log(e.target.id);
    }));

    price.addEventListener('input', () => {
        document.querySelector('.price').textContent = `${price.value.replace(/\D/g, '')}$`;
    })

    // board.addEventListener('click', (e) => {
    //     e.target.classList.add
    // });
});