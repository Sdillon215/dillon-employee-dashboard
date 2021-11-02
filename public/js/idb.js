let db;

const request = indexedDB.open('purchase-order', 1);

request.onupgradedneeded = function (e) {
    const db = e.target.result;
    db.createObjectStore('new_order', { autoIncrement: true });
};

request.onsuccess = function (e) {
    db = e.target.result;

    if (navigator.onLine) {
        uploadOrder();
    }
};

request.onerror = function (e) {
    console.log(e.target.errorCode);
};

function saveOrder(record) {
    const transaction = db.transaction(['new_order'], 'readwrite');

    const orderObjectStore = transaction.objectStore('new_order');

    orderObjectStore.add(record);
};

function uploadOrder() {
    const transaction = db.transaction(['new_order'], 'readwrite');

    const orderObjectStore = transaction.objectStore('new_order');

    const getAll = orderObjectStore.getAll();

    getAll.onsuccess = function () {
        if (getAll.result.length > 0) {
            fetch('/api/transaction', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(serverResponse => {
                    if (serverResponse.message) {
                        throw new Error(serverResponse);
                    }
                    const transaction = db.transaction(['new_order'], 'readwrite');
                    const orderObjectStore = transaction.objectStore('new_order');
                    orderObjectStore.clear()
                    alert('Saved order has been submitted.');
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};

window.addEventListener('online', uploadOrder);