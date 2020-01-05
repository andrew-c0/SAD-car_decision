
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
                    label: 'Mașina ideală',
                    backgroundColor: '#FF0000',
                    borderWidth: 1,
                    /* Date pentru fiecare categorie */
                    data: [
                        25, 40
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

/* Global functions */
// Selectare masina cu automatizare enable-disable

function enable_select(selector, i){
    if(selector == 'clasa'){
            /* Enable de select + resetare index + golire alegere */
            $('#subclasa_'+i).attr('disabled', false);
            $('#subclasa_'+i).prop('selectedIndex',0);
            $('#producator_'+i).attr('disabled', true);
            $('#producator_'+i).prop('selectedIndex',0);
            $('#model_'+i).attr('disabled', true);
            $('#model_'+i).prop('selectedIndex',0);
            $('.selector-'+i+'-final').hide();
            $('.comparator-container').hide();
    }else if(selector == 'subclasa'){
            /* Enable de select + resetare index + golire alegere */
            $('#producator_'+i).attr('disabled', false);
            $('#producator_'+i).prop('selectedIndex',0);
            $('#model_'+i).attr('disabled', true);
            $('#model_'+i).prop('selectedIndex',0);
            $('.selector-'+i+'-final').hide();
            $('.comparator-container').hide();
    }else if(selector == 'producator'){
            /* Enable de select + resetare index + golire alegere */
            $('#model_'+i).prop('selectedIndex',0);
            $('#model_'+i).attr('disabled', false);
            $('.selector-'+i+'-final').hide();
            $('.comparator-container').hide();
    }
}

// Generare costuri pentru fiecare masina in parte in cazul fiecarei masini

function generate_costs(cap_cilindrica,pret_combustibil, km_an, consum, rovinieta, ani, pret_masina){
    var obj = {
        combustibil: 0,
        impozit: 0,
        rovinieta: 0,
        reparatii_revizii: 0,
        pret_5_ani: 0,
        cost_final : 0
    };
    /* Pretul pentru combustibil pentru un an */
    obj.combustibil = pret_combustibil * (consum * km_an / 100);
    /* Pretul pentru impozit pentru un an, in functie de dimensiunea in cm3 a motorului */
    switch (cap_cilindrica){
        case (cap_cilindrica <= 1600):
            obj.impozit = 8 * Math.round(cap_cilindrica / 200);
            break;
        case (cap_cilindrica >= 1601 && cap_cilindrica <= 2000):
            obj.impozit = 18 * Math.round(cap_cilindrica / 200);
            break;
        case (cap_cilindrica >= 2001 && cap_cilindrica <= 2600):
            obj.impozit = 56 * Math.round(cap_cilindrica / 200);
            break;
        case (cap_cilindrica >= 2601 && cap_cilindrica <= 3000):
            obj.impozit = 144 * Math.round(cap_cilindrica / 200);
            break;
        case (cap_cilindrica >= 300):
            obj.impozitv = 224 * Math.round(cap_cilindrica / 200);
            break;
        default: 
            obj.impozit = 8 * Math.round(cap_cilindrica / 200);
    }
    obj.impozit = Math.round(obj.impozit);
    /* Pretul rovinietei, in caz ca se doreste luarea in calcul a acesteia */
    if(rovinieta != ''){
        obj.rovinieta = 120;
    }else{
        obj.rovinieta = 0;
    }

    if(pret_masina !=''){
        /* Pretul reparatiilor si reviziilor pe perioada unui an - valoare estimativa*/
        obj.reparatii_revizii = Math.round(0.195 *pret_masina);
        /* Pretul masinii dupa 5 ani - valoare estimativa */
        obj.pret_5_ani = Math.round(0.728 *pret_masina);
    }
    /* Costuri finale, in functie de parametrii anteriori */
    obj.cost_final = (obj.combustibil + obj.impozit + obj.rovinieta + obj.reparatii_revizii)* ani;

    return obj; 
}

function replace_calculator( i,cost_combustibil, asigurare, impozit, revizii, pret, cost_total, total){
    var curs_eur = 4.77;
    $('.cost_combustibil_'+ i).text(Math.round(cost_combustibil / 4.77) + ' €' );
    $('.asigurare_'+i).text(Math.round(asigurare/ curs_eur) + ' €');
    $('.impozit_'+i).text(Math.round(impozit/ curs_eur) + ' €');
    $('.revizii_'+i).text(Math.round(revizii/ curs_eur) + ' €');
    $('.pret_'+i).text(Math.round(pret/ curs_eur) + ' €');
    $('.cost_total_'+i).text(Math.round(cost_total/ curs_eur) + ' €');
    $('.total_'+i).text(Math.round(total/ curs_eur)+ ' €');
}

function populate_select(base_source, ajax_function, position){
    $.ajax({
        type: 'POST',
        url: 'comparator/'+ ajax_function,
        data: {
            base: base_source,
        }, success: function(data){
            data = JSON.parse(data);
            $(''+position+'').html('');
            $(''+position+'').append('<option default disabled selected>Selectează...</option>');    
            data.forEach(function(item){
                $(''+position+'').append('<option value="'+item[0] +'"> '+item[1]+' </option>');    
            })
        }, error: function(){
            console.log('Selector populating didn\'t worked');
        }
    });
}

/* functii care schimba imperativ datele din tabele cu informatii despre masini */

function replace_identificare(i, den_producator, tip_model, an_fabricatie, lansat){
    $('.'+i+'_den_producator').text(den_producator);
    $('.'+i+'_tip_model').text(tip_model);
    $('.'+i+'_an_fabricatie').text(an_fabricatie);
    $('.'+i+'_lansat').text(lansat);
}

function replace_dimensiuni(i, lungime, latime, inaltime, cap_portbagaj){
    $('.'+i+'_lungime').text(lungime);
    $('.'+i+'_latime').text(latime);
    $('.'+i+'_inaltime').text(inaltime);
    $('.'+i+'_cap_portbagaj').text(cap_portbagaj);
}

function replace_tehnice(i, cap_motor, tip_motor, tip_carburant, tip_cutie, trepte_cutie, cai_putere, cuplu, suspensie, turbina, faruri, senzori, greutate){
    $('.'+i+'_cap_motor').text(cap_motor);
    $('.'+i+'_tip_motor').text(tip_motor);
    $('.'+i+'_tip_carburant').text(tip_carburant);
    $('.'+i+'_tip_cutie').text(tip_cutie);
    $('.'+i+'_trepte_cutie').text(trepte_cutie);
    $('.'+i+'_cai_putere').text(cai_putere);
    $('.'+i+'_cuplu').text(cuplu);
    $('.'+i+'_suspensie').text(suspensie);
    $('.'+i+'_turbina').text(turbina);
    $('.'+i+'_faruri').text(faruri);
    $('.'+i+'senzori').text(senzori);
    $('.'+i+'_greutate').text(greutate);
}

function replace_confort(i, nr_portiere, AC, tip_AC, comenzi_volan, cruise_control, rating_NCAP, incalzire_scaune, computer_bord, plafon_panoramic, tapiterie){
    $('.'+i+'_nr_portiere').text(nr_portiere);
    $('.'+i+'_AC').text(AC);
    $('.'+i+'_tip_AC').text(tip_AC);
    $('.'+i+'_comenzi_volan').text(comenzi_volan);
    $('.'+i+'_cruise_control').text(cruise_control);
    $('.'+i+'_rating_NCAP').text(rating_NCAP);
    $('.'+i+'_incalzire_scaune').text(incalzire_scaune);
    $('.'+i+'_computer_bord').text(computer_bord);
    $('.'+i+'_plafon_panoramic').text(plafon_panoramic);
    $('.'+i+'_tapiterie').text(tapiterie);
}

function replace_siguranta(i, ESP, ABS, lane_assist, brake_assist, asistenta_up_down){
    $('.'+i+'_ESP').text(ESP);
    $('.'+i+'_ABS').text(ABS);
    $('.'+i+'_lane_assist').text(lane_assist);
    $('.'+i+'_brake_assist').text(brake_assist);
    $('.'+i+'_asistenta_up_down').text(asistenta_up_down);
}

function retrieve_model_data(i, id_model){
    $.ajax({
        type: 'POST',
        url: 'comparator/get_model_data',
        data: {
            id_model: id_model
        }, 
        success: function (data){
            data = JSON.parse(data);
            replace_identificare(
                i, 
                data['identificare'][0], 
                data['identificare'][1], 
                data['identificare'][2],
                data['identificare'][3]
            );
            replace_dimensiuni(
                i,
                data['dimensiuni'][0],
                data['dimensiuni'][1],
                data['dimensiuni'][2],
                data['dimensiuni'][3]
            );
            replace_tehnice(
                i,
                data['tehnice'][0],
                data['tehnice'][1],
                data['tehnice'][2],
                data['tehnice'][3],
                data['tehnice'][4],
                data['tehnice'][5],
                data['tehnice'][6],
                data['tehnice'][7],
                data['tehnice'][8],
                data['tehnice'][9],
                data['tehnice'][10],
                data['tehnice'][11]
            );
            replace_confort(
                i,
                data['confort'][0],
                data['confort'][1],
                data['confort'][2],
                data['confort'][3],
                data['confort'][4],
                data['confort'][5],
                data['confort'][6],
                data['confort'][7],
                data['confort'][8],
                data['confort'][9]
            );
            replace_siguranta(
                i,
                data['siguranta'][0],
                data['siguranta'][1],
                data['siguranta'][2],
                data['siguranta'][3],
                data['siguranta'][4]
            );
        }, error: function(){
            alert('Nu am putut găsi date despre acest model de mașină. Încercați mai târziu.');
        }
    })
}

/* Global variables */

window.producator_1 = '';
window.model_1 = '';
window.producator_2 = '';
window.model_2 = '';

/* --- Document Ready --- */
$(document).ready( function () {

    /* Lista masini */
    /* --- Datatables --- */
    $('.tabel-masini').DataTable({
        ajax:{
            url: 'masini/ajax_get_all_cars',
            type: 'post'
        } 
    });
    

    /* Comparator */
    /* Selector masina - enable/disable urmatoarele select-uri pentru prima masina*/
    $(document).on('change', '#clasa_1', function(){
        enable_select('clasa', 1);
        var clasa = $('#clasa_1 option:selected').attr('value');
        populate_select(clasa, 'get_car_subclass', '#subclasa_1');
    });
    $(document).on('change', '#subclasa_1', function(){
        enable_select('subclasa', 1);
        var subclasa = $('#subclasa_1 option:selected').attr('value');
        populate_select(subclasa, 'get_car_manufacturer', '#producator_1');
    });
    $(document).on('change', '#producator_1', function(){
        enable_select('producator', 1);
        window.producator_1 = $('#producator_1 option:selected').attr('value');
        var subclasa = $('#subclasa_1 option:selected').attr('value');
        var producator = $('#producator_1 option:selected').attr('value');
        populate_select([producator, subclasa], 'get_car_model', '#model_1');
    });
    $(document).on('change', '#model_1', function(){
        window.model_1 = $('#model_1 option:selected').attr('value');
        var den_producator = $('#producator_1 option:selected').text();
        var den_model = $('#model_1 option:selected').text();
        $('.selected-final-1').text(den_producator + ' ' + den_model);
        retrieve_model_data(1, window.model_1);
        $('.selector-1-final').show();
    });
    /* Selector masina - enable/disable urmatoarele select-uri pentru a doua masina*/
    $(document).on('change', '#clasa_2', function(){
        enable_select('clasa', 2);
        var clasa = $('#clasa_2 option:selected').attr('value');
        populate_select(clasa, 'get_car_subclass', '#subclasa_2');
    });
    $(document).on('change', '#subclasa_2', function(){
        enable_select('subclasa', 2);
        var subclasa = $('#subclasa_2 option:selected').attr('value');
        populate_select(subclasa, 'get_car_manufacturer', '#producator_2');
    });
    $(document).on('change', '#producator_2', function(){
        enable_select('producator', 2);
        window.producator_2 = $('#producator_2 option:selected').attr('value');
        var subclasa = $('#subclasa_2 option:selected').attr('value');
        var producator = $('#producator_2 option:selected').attr('value');
        populate_select([producator, subclasa], 'get_car_model', '#model_2');
    });
    $(document).on('change', '#model_2', function(){
        window.model_2 = $('#model_2 option:selected').attr('value');
        var den_producator = $('#producator_2 option:selected').text();
        var den_model_val = $('#model_1 option:selected').attr('value');
        var den_model_val_2 = $('#model_2 option:selected').attr('value');
        var den_model_2 = $('#model_2 option:selected').text();
        $('.selected-final-2').text(den_producator + ' ' + den_model_2);
        retrieve_model_data(2, window.model_2);
        $('.selector-2-final').show();
        if(den_model_val != '' && den_model_val_2 != ''){
            $('.comparator-container').show();
        }else{
            $('.comparator-container').hide();
        }
    });
    /* La click pe butonul de calculare a costurilor de intretinere, se va face calculul + se va afisa dedesubt tabelul specific */
    $(document).on('click', '.btn-calculator-apply', function(){
        // valorile din formular
        var cap_cilindrica_1 = $('.cap_cilindrica_1').text();
        var cap_cilindrica_2 = $('.cap_cilindrica_2').text();
        var consum_1 = $('.consum_1').text();
        var consum_2 = $('.consum_2').text();
        var pret_1 = $('.pret_masina_1').text();
        var pret_2 = $('.pret_masina_2').text();

        // valorile din calculator
        var km_an = $('#km_an').val();
        var pret_comb = $('#pret_comb').val();
        var varsta = $('#varsta').val();
        var rovinieta = $('#rovinieta').is(':checked');
        var ani_calcul = $('#ani_calcul option:selected').attr('value');

        if(
            km_an != '' &&
            pret_comb != '' &&
            varsta != '' &&
            rovinieta != '' &&
            ani_calcul != ''
        ){  
            /* Calculare pentru prima masina */
            calcul_1 = generate_costs(cap_cilindrica_1, pret_comb, km_an, consum_1, rovinieta, ani_calcul, pret_1);
            replace_calculator(1, calcul_1.combustibil, 0, calcul_1.impozit, calcul_1.reparatii_revizii, calcul_1.pret_5_ani, calcul_1.cost_final, calcul_1.cost_final + pret_1);
            /* Calculare pentru a doua masina */
            calcul_2 = generate_costs(cap_cilindrica_2, pret_comb, km_an, consum_2, rovinieta, ani_calcul, pret_2);
            replace_calculator(2, calcul_2.combustibil, 0, calcul_2.impozit, calcul_2.reparatii_revizii, calcul_2.pret_5_ani, calcul_2.cost_final, calcul_2.cost_final + pret_2);
            $('.calculator_rezultate').show();
        }else{
            alert('Completați toți parametrii înainte de a calcula!');
        }
    });


} );