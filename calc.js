document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelectorAll('.select'),
        price = document.querySelector('#price'),
        engine = document.querySelectorAll('.engine');

    let fullPrice, firstSum;

    function engineChoose(engines) {
        engines.forEach(el => {
            if (!el.classList.contains('hidden')) {
                el.classList.add('hidden');
            }
        })
    }

    function renderType(typesClass) {
        document.querySelector(typesClass).classList.remove('hidden');
    }

    function renderLists(list, amount, startFrom, rate) {
        for (let i = startFrom; i <= amount; i++) {
            list.querySelector('.menu-parameter-board').insertAdjacentHTML('beforeend', `
            <li class="values-list" id="${i * rate}">${i * rate}</li>
            `);
        }
    }

    function renderSum(...numbers) {
        fullPrice = numbers.reduce((acc, curr) => acc + curr, 0);
        document.querySelector('.final-sum').textContent = `${fullPrice + 3500 + 600}$`;
    }

    function firstCount() {
        let fees = 0;

        if (firstSum) {
            firstSum = +firstSum;
            if (0 < firstSum && firstSum < 50) {
                fees += 25;
            }
            if (firstSum >= 50 && firstSum < 100) {
                fees += 45 + 39;
            }
            if (firstSum >= 100 && firstSum < 200) {
                fees += 80 + 39;
            }
            if (firstSum >= 200 && firstSum < 400) {
                fees += 120 + 39;
            }
            if (firstSum >= 400 && firstSum < 500) {
                fees += 160 + 39;
            }
            if (firstSum >= 500 && firstSum < 600) {
                fees += 185 + 49;
            }
            if (firstSum >= 600 && firstSum < 700) {
                fees += 210 + 49;
            }
            if (firstSum >= 700 && firstSum < 800) {
                fees += 230 + 49;
            }
            if (firstSum >= 800 && firstSum < 900) {
                fees += 250 + 49;
            }
            if (firstSum >= 900 && firstSum < 1000) {
                fees += 275 + 49;
            }
            if (firstSum >= 1000 && firstSum < 1200) {
                fees += 325 + 69;
            }
            if (firstSum >= 1200 && firstSum < 1300) {
                fees += 350 + 69;
            }
            if (firstSum >= 1300 && firstSum < 1400) {
                fees += 365 + 69;
            }
            if (firstSum >= 1400 && firstSum < 1500) {
                fees += 380 + 69;
            }
            if (firstSum >= 1500 && firstSum < 2000) {
                fees += 440 + 79;
            }
            if (firstSum >= 2000 && firstSum < 3000) {
                fees += 500 + 89;
            }
            if (firstSum >= 3000 && firstSum < 4000) {
                fees += 600 + 89;
            }
            if (firstSum >= 4000 && firstSum < 6000) {
                fees += 750 + 99;
            }
            if (firstSum >= 7500 && firstSum < 15000) {
                fees += 800 + 129;
            }
            if (firstSum >= 15000) {
                fees += Math.round((firstSum * 7) / 100) + 129;
            }
        }

        document.querySelector('.auction-fees').textContent = `${fees} $`;
        return firstSum = fees + firstSum + 500;;
    }

    price.addEventListener('input', () => {
        firstSum = +(0 + price.value.replace(/\D/g, ''));
        document.querySelector('.price').textContent = `${firstSum} $`;
        document.querySelector('.first-sum').textContent = `${firstCount()}$`;
        renderSum(firstSum)
    });

    wrapper.forEach(el => {
        el.addEventListener('click', () => {
            el.querySelector('.menu-parameter-board').classList.toggle('hidden');
            el.querySelector('.menu-parameter-field').classList.toggle('hidden');
        })

        if (el.parentElement.classList.contains('benzin')) {
            renderLists(el, 30, 10, 100);
        }

        if (el.parentElement.classList.contains('year')) {
            console.log(123);
            renderLists(el, 2023, 2002, 1);
        }

        const carsType = el.querySelectorAll('.values-list');

        carsType.forEach(type => {
            type.addEventListener('click', (e) => {
                el.querySelector('.menu-parameter-value').textContent = `${e.target.id}`;
                if (e.target.id === 'Электрический') {
                    engineChoose(engine);
                    renderType('.electro');
                }

                if (e.target.id === 'Бензиновый' ||
                    e.target.id === 'Дизельный') {
                    engineChoose(engine);
                    renderType('.benzin');
                }
            })
        })
    });

});