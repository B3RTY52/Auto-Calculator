document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelectorAll('.select'),
        btn = document.querySelector('.btn'),
        calcValues = document.querySelectorAll('.hide'),
        renderElements = document.querySelectorAll('.render'),
        engine = document.querySelectorAll('.engine'),
        menuInputs = document.querySelectorAll('.menu-input');

    unrenderValues();

    function unrenderValues() {
        renderElements.forEach(el => {
            document.querySelector(`.${el.id}`)
                .querySelector('span').classList.add('hidden');
        });
    }

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
            list.querySelector('.menu-parameter-board')
                .insertAdjacentHTML('beforeend', `
            <li class="values-list" id="${i * rate}">${i * rate}</li>
            `);
        }
    }

    function postData(id, value) {
        document.querySelector(`#${id}`).value = `${value}`;
    }

    function firstSumCounter() {
        let fees = 0,
            firstSum = +(document.querySelector('#price').value);

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
        firstSum = fees + firstSum + 500;
        postData('first-sum', firstSum);
    }

    function thirdSumCounter() {
        const age = +document.querySelector('#age').value,
            capacity = +document.querySelector('#capacity').value,
            power = +document.querySelector('#power').value,
            price = +document.querySelector('#price').value,
            toCheck = document
                .querySelector('.hp').parentElement.parentElement;

        let year = new Date().getFullYear(),
            index,
            result;
        year = year - age;

        if (age && price) {
            if (capacity && toCheck.classList.contains('hidden')) {
                if (year <= 3) {
                    index = 6;
                }
                if (capacity <= 1500) {
                    3 <= year && year <= 5 ? index = 1.7 : index = 3.5;
                }
                if (capacity > 1500 && capacity <= 1800) {
                    3 <= year && year <= 5 ? index = 2.8 : index = 3.8;
                }
                if (capacity > 1800 && capacity <= 2300) {
                    3 <= year && year <= 5 ? index = 3 : index = 5.2;
                }
                if (capacity > 2300 && capacity <= 3000) {
                    3 <= year && year <= 5 ? index = 3.3 : index = 5.5;
                }
                if (capacity > 3000) {
                    3 <= year && year <= 5 ? index = 4 : index = 6.3;
                }
                result = capacity * index + 200;
            }

            if (power && !toCheck.classList.contains('hidden')) {
                if (power > 0 && power < 150) {
                    index = 0.7;
                }
                if (power >= 150) {
                    index = 7;
                }
                result = power * index + 200 + price * 0.15 + price * 0.2;
            }

            result = +Math.ceil(result);
            postData('custom-fees', result);
            postData('third-sum', result + 600);
            console.log(price);
        } else {
            postData('custom-fees', NaN);
        }
    }

    function fullPriceCounter() {
        const fullPrice =
            (+document.querySelector('#first-sum').value) +
            (+document.querySelector('#second-sum').value) +
            (+document.querySelector('#third-sum').value);
        postData('full-price', fullPrice);
    }

    menuInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            let value = +(input.value.replace(/\D/g, '')),
                id = e.target.id.replace(/-input/g, "");
            postData(`${id}`, value);
            unrenderValues();
        });
    })

    wrapper.forEach(el => {
        el.addEventListener('click', () => {
            el.querySelector('.menu-parameter-board').classList.toggle('hidden');
            el.querySelector('.menu-parameter-field').classList.toggle('hidden');
            unrenderValues();
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
                el.querySelector('.menu-parameter-value')
                    .textContent = `${e.target.id}`;

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

                    if (e.target.id === 'Кроссовер') {
                        shipping = 2090;
                    }
                    if (e.target.id === 'Пикап') {
                        shipping = 2120;
                    }
                    secondSum = shipping + ensurance;
                    postData('shipping', shipping);
                    postData('second-sum', secondSum);
                }

                if (type.parentElement.classList.contains('to-capacity')) {
                    postData('capacity', `${e.target.id}`);
                }

                if (type.parentElement.classList.contains('age')) {
                    postData('age', `${e.target.id}`);
                }
            })
        });
    });

    btn.addEventListener('click', () => {
        firstSumCounter();
        thirdSumCounter();
        fullPriceCounter();

        function checkArrayValues(list) {
            for (let i = 0; i < list.length; i++) {
                if (!list[i].value) {
                    return false;
                }
            }
            return true;
        }

        if (checkArrayValues(renderElements)) {
            renderElements.forEach(el => {
                document.querySelector(`.${el.id}`)
                    .querySelector('span').textContent = `${el.value}`;
            });

            calcValues.forEach(raw => {
                raw.classList.remove('hidden');
            });

        } else {
            const firstPart = document
                .querySelectorAll('.menu-parameter-input'),
                secondPart = document
                    .querySelectorAll('.menu-parameter-field'),
                allTheList = [...firstPart, ...secondPart];

            allTheList.forEach(selector => {
                selector.classList.add('error');
                setTimeout(() => selector.classList.remove('error'), 2000);
            });

            document.querySelectorAll('.btn-span').forEach(btn => {
                btn.classList.toggle('hidden');
                setTimeout(() => btn.classList.toggle('hidden'), 2000);
            });
        }
    });
});