
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
    // populare obiect
    obj1.an_fabricatie = an_fabricatie;
    obj1.lansat = lansat;
}

function replace_dimensiuni(i, lungime, latime, inaltime, cap_portbagaj){
    $('.'+i+'_lungime').text(lungime);
    $('.'+i+'_latime').text(latime);
    $('.'+i+'_inaltime').text(inaltime);
    $('.'+i+'_cap_portbagaj').text(cap_portbagaj);

    obj1.lungime = lungime;
    obj1.latime = latime;
    obj1.inaltime = inaltime;
    obj1.cap_portbagaj = cap_portbagaj;
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

    obj1.cap_motor = cap_motor;
    obj1.tip_motor = tip_motor;
    obj1.tip_carburant = tip_carburant;
    obj1.tip_cutie = tip_cutie;
    obj1.trepte_cutie = trepte_cutie;
    obj1.cai_putere = cai_putere;
    obj1.cuplu = cuplu;
    obj1.suspensie = suspensie;
    obj1.turbina = turbina;
    obj1.senzori = senzori;
    obj1.greutate = greutate;
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

    obj1.nr_portiere = nr_portiere;
    obj1.ac = AC;
    obj1.tip_ac = tip_AC;
    obj1.comenzi_volan = comenzi_volan;
    obj1.cruise_control = cruise_control;
    obj1.incalzire_scaune = incalzire_scaune;
    obj1.computer_bord = computer_bord;
    obj1.plafon_panoramic = plafon_panoramic;
    obj1.rating_siguranta = rating_NCAP;
    obj1.tapiterie = tapiterie;
}

function replace_siguranta(i, ESP, ABS, lane_assist, brake_assist, asistenta_up_down){
    $('.'+i+'_ESP').text(ESP);
    $('.'+i+'_ABS').text(ABS);
    $('.'+i+'_lane_assist').text(lane_assist);
    $('.'+i+'_brake_assist').text(brake_assist);
    $('.'+i+'_asistenta_up_down').text(asistenta_up_down);

    obj1.esp = ESP;
    obj1.abs = ABS;
    obj1.lane_assist = lane_assist;
    obj1.brake_assist = brake_assist;
    obj1.asistenta_up_down = asistenta_up_down;
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

function stat_calculator(obj1, obj2){
    var obj_final= {
        obj1_final: 0,
        obj2_final: 0
    };

    /* Calculare scor pentru date identificare */
        var obj_identificare = {
            scor_1 :0,
            scor_2 :0
        };

        // calculare scor in functie de anul de fabricatie al fiecaruia
        if(obj1.an_fabricatie > obj2.an_fabricatie){
            obj_identificare.scor_1 += 3;
            obj_identificare.scor_2 += (obj2.an_fabricatie * 100 / obj1.an_fabricatie).toFixed(2);
        }else{
            obj_identificare.scor_2 += 3;
            obj_identificare.scor_1 += (obj1.an_fabricatie * 100 / obj2.an_fabricatie).toFixed(2);
        }
        // Calculare scor daca acesta a fost lansat sau nu
        if(obj1.lansat == 1 && obj2.lansat != 1){
            obj_identificare.scor_1 += 2;
        }else{
            obj_identificare.scor_2 += 2;
        }

    /* Calculare scor pentru dimensiuni */
        var obj_dimensiuni  = {
            scor_1: 0,
            scor_2: 0
        };
        // calculare scor pentru lungime
        if(obj1.lungime > obj2.lungime){
            obj_dimensiuni.scor_1 += 3;
            obj_dimensiuni.scor_2 += (obj2.lungime * 100 / obj1.lungime).toFixed(2);
        }else{
            obj_dimensiuni.scor_2 += 3;
            obj_dimensiuni.scor_1 += (obj1.lungime * 100 / obj2.lungime).toFixed(2);
        }
        // calculare scor pentru latime
        if(obj1.latime > obj2.latime){
            obj_dimensiuni.scor_1 += 1;
            obj_dimensiuni.scor_2 += (obj2.latime * 100 / obj1.latime).toFixed(2);
        }else{
            obj_dimensiuni.scor_2 += 1;
            obj_dimensiuni.scor_1 += (obj1.latime * 100 / obj2.latime).toFixed(2);
        }
        // calculare scor pentru inaltime
        if(obj1.inaltime > obj2.inaltime){
            obj_dimensiuni.scor_1 += 2;
            obj_dimensiuni.scor_2 += (obj2.inaltime * 100 / obj1.inaltime).toFixed(2);
        }else{
            obj_dimensiuni.scor_2 += 2;
            obj_dimensiuni.scor_1 += (obj1.inaltime * 100 / obj2.inaltime).toFixed(2);
        }
        // Calculare scor pentru capacitate portbagaj
        if(obj1.cap_portbagaj > obj2.cap_portbagaj){
            obj_dimensiuni.scor_1 += 4;
            obj_dimensiuni.scor_2 += (obj2.cap_portbagaj * 100 / obj1.cap_portbagaj).toFixed(2);
        }else{
            obj_dimensiuni.scor_2 += 4;
            obj_dimensiuni.scor_1 += (obj1.cap_portbagaj * 100 / obj2.cap_portbagaj).toFixed(2);
        }
    /* Calculare cost pentru date tehnice */
        var obj_tehnic = {
            scor_1 : 0,
            scor_2 : 0
        }
        // calculare scor pentru capacitate motor
        if(obj1.cap_motor > obj2.cap_motor){
            obj_tehnic.scor_1 += 10;
            obj_tehnic.scor_2 += (obj1.cap_motor * 100/ obj2.cap_motor).toFixed(2);
        }else{
            obj_tehnic.scor_2 += 10;
            obj_tehnic.scor_1 += (obj2.cap_motor * 100/ obj1.cap_motor).toFixed(2);
        }
        // calculare scor pentru tip motor
        if(obj1.tip_motor == 'Euro 6'){
            obj_tehnic.scor_1 += 3;
        }else if(obj1.tip_motor == 'Euro 5'){
            obj_tehnic.scor_1 += 2;
        }else if(obj1.tip_motor == 'Euro 4'){
            obj_tehnic.scor_1 += 1;
        }
        if(obj2.tip_motor == 'Euro 6'){
            obj_tehnic.scor_2 += 3;
        }else if(obj2.tip_motor == 'Euro 5'){
            obj_tehnic.scor_2 += 2;
        }else if(obj2.tip_motor == 'Euro 4'){
            obj_tehnic.scor_2 += 1;
        }
        // calculare scor dupa tip carburant
        if(obj1.tip_carburant == 'E'){
            obj_tehnic.scor_1 += 3;
        }else if(obj1.tip_carburant == 'H'){
            obj_tehnic.scor_1 += 2;
        }else if(obj1.tip_carburant == 'B'){
            obj_tehnic.scor_1 += 1;
        }
        if(obj2.tip_carburant == 'E'){
            obj_tehnic.scor_2 += 3;
        }else if(obj2.tip_carburant == 'H'){
            obj_tehnic.scor_2 += 2;
        }else if(obj2.tip_carburant == 'B'){
            obj_tehnic.scor_2 += 1;
        }
        // calculare scor dupa tip cutie
        if(obj1.tip_cutie == '2'){
            obj_tehnic.scor_1 += 2;
        }else if(obj1.tip_cutie == '1'){
            obj_tehnic.scor_1 += 1;
        }
        if(obj2.tip_cutie == '2'){
            obj_tehnic.scor_2 += 2;
        }else if(obj2.tip_cutie == '1'){
            obj_tehnic.scor_2 += 1;
        }
        // calculare scor dupa trepte cutie
        if(obj1.trepte_cutie > obj2.trepte_cutie){
            obj_tehnic.scor_1 += 2;
            obj_tehnic.scor_2 += (obj1.trepte_cutie * 100/ obj2.trepte_cutie).toFixed(2);
        }else{
            obj_tehnic.scor_2 += 2;
            obj_tehnic.scor_1 += (obj2.trepte_cutie * 100/ obj1.trepte_cutie).toFixed(2);
        }
        // calculare scor dupa cai putere
        if(obj1.cai_putere > obj2.cai_putere){
            obj_tehnic.scor_1 += 3;
            obj_tehnic.scor_2 += (obj1.cai_putere * 100/ obj2.cai_putere).toFixed(2);
        }else{
            obj_tehnic.scor_2 += 3;
            obj_tehnic.scor_1 += (obj2.cai_putere * 100/ obj1.cai_putere).toFixed(2);
        }
        // calculare scor dupa cuplu
        if(obj1.cuplu > obj2.cuplu){
            obj_tehnic.scor_1 += 2;
            obj_tehnic.scor_2 += (obj1.cuplu * 100/ obj2.cuplu).toFixed(2);
        }else{
            obj_tehnic.scor_2 += 2;
            obj_tehnic.scor_1 += (obj2.cuplu * 100/ obj1.cuplu).toFixed(2);
        }
        // calculare scor dupa suspensie
        if(obj1.suspensie == 'perne aer'){
            obj_tehnic.scor_1 += 3;
        }else if(obj1.suspensie == 'arcuri reglabile'){
            obj_tehnic.scor_1 += 2;
        }else if(obj1.suspensie == 'arcuri'){
            obj_tehnic.scor_1 += 1;
        }
        if(obj2.suspensie == 'perne aer'){
            obj_tehnic.scor_2 += 3;
        }else if(obj2.suspensie == 'arcuri reglabile'){
            obj_tehnic.scor_2 += 2;
        }else if(obj2.suspensie == 'arcuri'){
            obj_tehnic.scor_2 += 1;
        }
        // calculare scor dupa turbina
        if(obj1.turbina == 'multiple'){
            obj_tehnic.scor_1 += 3;
        }else if(obj1.turbina == 'mono'){
            obj_tehnic.scor_1 += 2;
        }else if(obj1.turbina == 'none'){
            obj_tehnic.scor_1 += 1;
        }
        if(obj2.turbina == 'multiple'){
            obj_tehnic.scor_2 += 3;
        }else if(obj2.turbina == 'mono'){
            obj_tehnic.scor_2 += 2;
        }else if(obj2.turbina == 'none'){
            obj_tehnic.scor_2 += 1;
        }
        // calculare scor dupa faruri
        if(obj1.turbina == 'led'){
            obj_tehnic.scor_1 += 2;
        }else if(obj1.turbina == 'xenon'){
            obj_tehnic.scor_1 += 1;
        }
        if(obj2.turbina == 'led'){
            obj_tehnic.scor_2 += 2;
        }else if(obj2.turbina == 'xenon'){
            obj_tehnic.scor_2 += 1;
        }
        // calculare scor dupa senzori
        if(obj1.senzori == 'full'){
            obj_tehnic.scor_1 += 2;
        }else if(obj1.senzori == 'parcare'){
            obj_tehnic.scor_1 += 1;
        }
        if(obj2.senzori == 'full'){
            obj_tehnic.scor_2 += 2;
        }else if(obj2.senzori == 'parcare'){
            obj_tehnic.scor_2 += 1;
        }
        // calculare scor dupa greutate
        if(obj1.greutate > obj2.greutate){
            obj_tehnic.scor_1 += 2;
            obj_tehnic.scor_2 += (obj1.greutate * 100/ obj2.greutate).toFixed(2);
        }else{
            obj_tehnic.scor_2 += 2;
            obj_tehnic.scor_1 += (obj2.greutate * 100/ obj1.greutate).toFixed(2);
        }
    /* Calculare cost pentru date confort */
        var obj_confort = {
            scor_1: 0,
            scor_2: 0
        }
        // calculare scor dupa numar portiere
        if(obj1.nr_portiere == '5'){
            obj_confort.scor_1 += 2;
        }else if(obj1.nr_portiere == '5'){
            obj_confort.scor_1 += 1;
        }
        if(obj2.nr_portiere == '5'){
            obj_confort.scor_2 += 2;
        }else if(obj2.nr_portiere == '5'){
            obj_confort.scor_2 += 1;
        }
        // calculare scor dupa AC
        if(obj1.ac == '1'){
            obj_confort.scor_1 += 1;
        }
        if(obj2.ac == '1'){
            obj_confort.scor_2 += 1;
        }
        // calculare scor dupa tip AC
        if(obj1.tip_ac == 'Climatronic'){
            obj_confort.scor_1 += 3;
        }else if(obj1.tip_ac == 'Bizonal'){
            obj_confort.scor_1 += 2;
        }else if(obj1.tip_ac == 'AC'){
            obj_confort.scor_1 += 1;
        }
        if(obj2.tip_ac == 'Climatronic'){
            obj_confort.scor_2 += 3;
        }else if(obj2.tip_ac == 'Bizonal'){
            obj_confort.scor_2 += 2;
        }else if(obj2.tip_ac == 'AC'){
            obj_confort.scor_2 += 1;
        }
        // calculare scor dupa comenzi volan
        if(obj1.comenzi_volan == '1'){
            obj_confort.scor_1 += 2;
        }
        if(obj2.comenzi_volan == '1'){
            obj_confort.scor_2 += 2;
        }
        //calculare scor dupa cruise control
        if(obj1.cruise_control == '1'){
            obj_confort.scor_1 += 1;
        }
        if(obj2.cruise_control == '1'){
            obj_confort.scor_2 += 1;
        }
        // calculare scor dupa rating siguranta
        obj_confort.scor_1 += obj1.rating_siguranta;
        obj_confort.scor_2 += obj2.rating_siguranta;
        // calculare scor dupa incalzire scaune
        if(obj1.incalzire_scaune == '1'){
            obj_confort.scor_1 += 1;
        }
        if(obj2.incalzire_scaune == '1'){
            obj_confort.scor_2 += 1;
        }
        // calculare scor dupa computer de bord
        if(obj1.computer_bord == '1'){
            obj_confort.scor_1 += 2;
        }
        if(obj2.computer_bord == '1'){
            obj_confort.scor_2 += 2;
        }
        // calculare scor dupa plafon panoramic
        if(obj1.plafon_panoramic == '1'){
            obj_confort.scor_1 += 1;
        }
        if(obj2.plafon_panoramic == '1'){
            obj_confort.scor_2 += 1;
        }
        // calculare scor dupa tip tapiterie
        if(obj1.tapiterie == 'alcantara'){
            obj_confort.scor_1 += 3;
        }else if(obj1.tapiterie == 'piele'){
            obj_confort.scor_1 += 2;
        }
        if(obj2.tapiterie == 'alcantara'){
            obj_confort.scor_2 += 3;
        }else if(obj2.tapiterie == 'piele'){
            obj_confort.scor_2 += 2;
        }
    /* Calculare cost pentru sisteme de siguranta */
        var obj_siguranta = {
            scor_1: 0,
            scor_2: 0
        }
        // calculare cost dupa ESP
        if(obj1.esp == '1'){
            obj_siguranta.scor_1 += 7;
        }
        if(obj2.esp == '1'){
            obj_siguranta.scor_2 += 7;
        }
        // calculare cost dupa ABS
        if(obj1.abs == '1'){
            obj_siguranta.scor_1 += 8;
        }
        if(obj2.abs == '1'){
            obj_siguranta.scor_2 += 8;
        }
        // calculare cost dupa Lane Assist
        if(obj1.lane_assist == '1'){
            obj_siguranta.scor_1 += 3;
        }
        if(obj2.lane_assist == '1'){
            obj_siguranta.scor_2 += 3;
        }
        // calculare cost dupa Brake Assist
        if(obj1.brake_assist == '1'){
            obj_siguranta.scor_1 += 4;
        }
        if(obj2.brake_assist == '1'){
            obj_siguranta.scor_2 += 4;
        }
        // calculare cost dupa Asistenta up/down
        if(obj1.asistenta_up_down == '1'){
            obj_siguranta.scor_1 += 3;
        }
        if(obj2.asistenta_up_down == '1'){
            obj_siguranta.scor_2 += 3;
        }
    /* Calculare total */
        obj_final.obj1_final = obj_identificare.scor_1 + obj_dimensiuni.scor_1 + obj_tehnic.scor_1 + obj_confort.scor_1 + obj_siguranta.scor_1;
        obj_final.obj2_final = obj_identificare.scor_2 + obj_dimensiuni.scor_2 + obj_tehnic.scor_2 + obj_confort.scor_2 + obj_siguranta.scor_2;
    return obj_final;
}

/* Global variables */

window.producator_1 = '';
window.model_1 = '';
window.producator_2 = '';
window.model_2 = '';

var obj1 = {
    an_fabricatie, lansat, 
    lungime, latime, inaltime, cap_portbagaj, 
    cap_motor, tip_motor, tip_carburant, tip_cutie, trepte_cutie, cai_putere, cuplu, suspensie, turbina, senzori, greutate,
    nr_portiere, ac, tip_ac, comenzi_volan, cruise_control, incalzire_scaune, rating_siguranta, computer_bord, plafon_panoramic, tapiterie,
    esp, abs, lane_assist, brake_assist, asistenta_up_down
};
var obj2 = {
    an_fabricatie, lansat, 
    lungime, latime, inaltime, cap_portbagaj, 
    cap_motor, tip_motor, tip_carburant, tip_cutie, trepte_cutie, cai_putere, cuplu, suspensie, turbina, senzori, greutate,
    nr_portiere, ac, tip_ac, comenzi_volan, cruise_control, incalzire_scaune, rating_siguranta, computer_bord, plafon_panoramic, tapiterie,
    esp, abs, lane_assist, brake_assist, asistenta_up_down
}

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