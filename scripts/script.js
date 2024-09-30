'use strict';

$(() => {
    document.getElementById('burger').onclick = function () {
        document.getElementById('menu').classList.add('open');
    }

    document.querySelectorAll('#menu *').forEach((item) => {
        item.onclick = () => {
            document.getElementById('menu').classList.remove('open');
        }
    });

    const formButton = $('#form_btn');
    const inputOrder = $('#input_order');
    const inputName = $('#input_name');
    const inputPhone = $('#input_phone');
    const errorText = $('.error_text');
    const borderInput = $('.order__input');
    const loader = $('.loader_wrap');


    // Почему когда я пишу return false; то функция не отрабатывает, если пишу e.preventDefault(); то отрабатывает?
    function number(e) {
        let num = parseInt(e.key)
        if (isNaN(num) && e.key !== 'Backspace' && e.key !== 'F5' && e.key !== 'Delete' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
            e.preventDefault();
        }
    }

    function words(e) {
        let num = parseInt(e.key)
        if (!isNaN(num)) {
            e.preventDefault();
        }
    }

    inputOrder.keydown((e) => {
        words(e);
    });

    inputPhone.keydown((e) => {
        number(e);
    });


    inputName.keydown((e) => {
        words(e);
    });

    formButton.click(() => {
        errorText.hide();
        let errors = false;
        borderInput.css('border-color', '#821328').css('border-width', '1px');

        if (!inputOrder.val()) {
            inputOrder.next().show();
            inputOrder.css('border-color', 'red').css('border-width', '2px');
            errors = true;
        }
        if (!inputName.val() || inputName.val().length < 2) {
            inputName.next().show();
            inputName.css('border-color', 'red').css('border-width', '2px');
            errors = true;

        }
        if (!inputPhone.val()) {
            inputPhone.next().show();
            inputPhone.css('border-color', 'red').css('border-width', '2px');
            errors = true;
        }

        if (!errors) {
            loader.css('display', 'flex');
            $.ajax({
                method: 'POST',
                url: 'https://testologia.ru/checkout',
                data: {product: inputOrder.val(), name: inputName.val(), phone: inputPhone.val()},
            })
                .done(function (msg) {
                    if (msg.success === 1 && msg.hasOwnProperty('success')) {
                        $('.successful-order').css('display', 'flex');
                        $('.order__title').css('display', 'none');
                        $('.order__form').css('display', 'none');
                        $('.order__description').css('display', 'none');
                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ!');
                    }
                    loader.css('display', 'none');
                });
        }
    });
});