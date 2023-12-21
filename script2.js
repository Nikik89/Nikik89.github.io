$(document).ready(function() {
    $('#phone').on('input', function() {
        let phoneNumber = $(this).val().replace(/[^\d]/g, '');
        
        if (phoneNumber.length >= 1) {
            phoneNumber = '+7 (' + phoneNumber.substring(1, 4) + ') ' +
                           phoneNumber.substring(4, 7) + '-' +
                           phoneNumber.substring(7, 9) + '-' +
                           phoneNumber.substring(9, 11);
        }

        $(this).val(phoneNumber);
    });
});
document.getElementById('serviceType').addEventListener('change', function () {
    var selectedServiceType = this.value;
    var serviceDivs = document.querySelectorAll('.service-category');
    
    serviceDivs.forEach(function (div) {
        if (div.id === selectedServiceType) {
            div.classList.remove('hidden');
        } else {
            div.classList.add('hidden');
        }
    });
});

document.getElementById('service').addEventListener('change', function () {
    updateSelectedServices();
    recalculatePrice();
});

function updateSelectedServices() {
    var checkboxes = document.querySelectorAll('#service input[type=checkbox]:checked');
    var selectedServicesList = document.getElementById('selectedServices');
    selectedServicesList.innerHTML = 'Выбранные услуги:';
    checkboxes.forEach(function (checkbox) {
        // Добавляем выбранную услугу в список выбранных
        var serviceItem = document.createElement('p');
        serviceItem.classList.add('selected-service');
        serviceItem.textContent = checkbox.value;
        selectedServicesList.appendChild(serviceItem);
    });
}

function recalculatePrice() {
    var selectedServices = document.querySelectorAll('.service-category:not(.hidden) input[type=checkbox]:checked');
    var totalPrice = 0;

    selectedServices.forEach(function (checkbox) {
        totalPrice += parseInt(checkbox.getAttribute('data-price'), 10);
    });

    document.getElementById('outputPrice').textContent = 'Цена: ' + totalPrice;
}

//Сегодняшее число
var bookingDateInput = document.getElementById('bookingDate');
const currentDate = new Date();
var min = currentDate.toISOString().slice(0,16);
bookingDateInput.min = min;

//Запись в json
document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        gender: document.querySelector('input[name="Пол"]:checked').value,
        phone: document.getElementById('phone').value,
        service: getSelectedServices(),
        booking_date: document.getElementById('bookingDate').value,
        comment: document.getElementById('comment').value
    };

    // Отправляем данные на сервер с использованием AJAX
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'process_form.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    };

    xhr.send(JSON.stringify(formData));
    alert('Вы успешно записались! В скором времени с вами свяжутся по номеру:\n' + document.getElementById('phone').value);
    document.getElementById('myForm').reset();
});
document.getElementById('myForm').addEventListener('reset', function () {
    clearForm();
});
function clearForm(){
    var checkboxes = document.querySelectorAll('#service input[type=checkbox]');
    checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
        checkbox.disabled = false;
    });

    var selectedServicesList = document.getElementById('selectedServices');
    var outputPrice = document.getElementById('outputPrice');
    selectedServicesList.innerHTML = 'Выбранные услуги:';
    outputPrice.textContent = 'Цена: 0';
}
function getSelectedServices() {
    const selectedServices = [];
    const checkboxes = document.querySelectorAll('#service input[type="checkbox"]:checked');
    checkboxes.forEach(function (checkbox) {
        selectedServices.push({
            service: checkbox.value,
            price: parseFloat(checkbox.getAttribute('data-price'))
        });
    });
    return selectedServices;
}



