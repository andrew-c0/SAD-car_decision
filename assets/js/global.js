
/* --- Chart.js --- */
if($('#comparator-tehnic').length > 0){
    var ctx = document.getElementById('comparator-tehnic').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        "data": {
            /* Categoriile pentru care se face comparatia */
            labels: ['Consum - Mai mic este mai bun', 'Greutate - Mai mic este mai bun'],
            datasets: 
            /* Valoarea fiecarei categorii */
            [
                {
                    label: 'VW Golf 5',
                    backgroundColor: '#00FF00',
                    borderWidth: 1,
                    /* Date pentru fiecare categorie */
                    data: [
                        20, 35
                    ]
                }, 
                {
                    label: 'Opel Corsa',
                    backgroundColor: '#0000FF',
                    data: [
                    14, 52
                    ]
                }
            ]
        }
    });
}

/* --- Document Ready --- */
$(document).ready( function () {
    /* --- Datatables --- */
    $('.tabel-masini').DataTable();
} );