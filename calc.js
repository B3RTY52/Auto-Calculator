document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelectorAll('.select'),
        price = document.querySelector('#price'),
        btn = document.querySelector('.btn'),
        dataKeepers = document.querySelectorAll('input'),
        engine = document.querySelectorAll('.engine');

    let fullPrice, firstSum, secondSum, thirdSum;

    btn.addEventListener('click', () => {
        dataKeepers.forEach(el => console.log(el.value));
    });

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

    function postData(id, value) {
        document.querySelector(`#${id}`).value = `${value}`;
    }

    // function renderSum(...numbers) {
    //     fullPrice = numbers.reduce((acc, curr) => acc + curr, 0);
    //     document.querySelector('.final-sum').textContent = `${fullPrice + 3500 + 600}$`;
    // }

    function firstSumCounter() {
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
                fees += 725 + 99;
            }
            if (firstSum >= 6000 && firstSum < 7500) {
                fees += 750 + 119;
            }
            if (firstSum >= 7500 && firstSum < 15000) {
                fees += 800 + 129;
            }
            if (firstSum >= 15000) {
                fees += Math.round((firstSum * 7) / 100) + 129;
            }
        }
        postData('auction-fees', fees);
        // document.querySelector('.auction-fees').textContent = `${fees} $`;
        firstSum = fees + firstSum + 500;
        postData('first-sum', firstSum);
    }

    price.addEventListener('input', () => {
        firstSum = +(0 + price.value.replace(/\D/g, ''));
        firstSumCounter();
        //     document.querySelector('.price').textContent = `${firstSum} $`;
        //     document.querySelector('.first-sum').textContent = `${firstCount()}$`;
        // renderSum(firstSum)
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

                if (type.parentElement.classList.contains('cars-type')) {
                    let shipping = 2000,
                        ensurance = 1000;

                    if (e.target.id === 'Кроссовер/Внедорожник') {
                        shipping = 2090;
                    }
                    if (e.target.id === 'Пикап') {
                        shipping = 2120;
                    }
                    secondSum = shipping + ensurance;
                    postData('shipping', shipping);
                    postData('second-sum', secondSum);
                    // document.querySelector('.shipping').textContent = `${shipping}$`;
                    // document.querySelector('.ensurance').textContent = `${ensurance}$`;
                    // document.querySelector('.second-sum').textContent = `${secondSum}$`;
                }

                if (type.parentElement.classList.contains('capacity')) {
                    postData('capacity', `${e.target.id}`);
                }

                if (type.parentElement.classList.contains('age')) {
                    postData('age', `${e.target.id}`);
                }
            })
        });

        function thirdSumCounter() {
            const age = document.querySelector('#age').value,
                capacity = document.querySelector('#capacity').value,
                power = document.querySelector('#power').value,
                toCheck = document.querySelector('.hp').parentElement;

            if (toCheck.classList.contains('hidden')) {
                let year = new Date().getFullYear(), index;
                year = year - age;

                if (year <= 3) {
                    index = 6;
                }
                if (capacity <= 1500) {
                    3 < year && year <= 5 ? index = 1.7 : index = 3.5;
                }
                if (3 < year && year <= 5) {

                }
            }
        }

        // 1. До 3х лет - 5.5 евро за 1см3 + 200$ любой объем
        // 2. от 3 - 5 лет
        // - 1000-1500 см3 - 1.5 евро за 1см3 +200$
        // - 1501-1800 см3 - 2.5 евро за 1см3 +200$
        // - 1801 - 2300 см3 - 2.7 евро за 1см3 +200$
        // - 2301 - 3000 см3 - 3 евро за 1см3 +200$
        // - 3001 и более - 3.6 евро за 1см3 +200$
        // 3. от 5 лет и старше
        // - 1000-1500 см3 - 3.2 евро за 1см3 +200$
        // - 1501-1800 см3 - 3.5 евро за 1см3 +200$
        // - 1801 - 2300 см3 - 4.8 евро за 1см3 +200$
        // - 2301 - 3000 см3 - 5 евро за 1см3 +200$
        // - 3001 и более - 5.7 евро за 1см3 +200$


        // // Разбиваем строку на части по запятой и удаляем пробелы
        // const parts = str.split(',').map(part => part.trim());

        // // Создаем пустой объект
        // const obj = {};

        // // Проходимся по каждой части, разбиваем ее на ключ и значение,
        // // и добавляем их в объект
        // parts.forEach(part => {
        //   const [key, value] = part.split(':').map(item => item.trim());
        //   obj[key] = parseInt(value); // Если нужно, можно преобразовать значение в число
        // });

        // console.log(obj); // { sum: 41, sum2: 43, sum3: 57 }

    });
});