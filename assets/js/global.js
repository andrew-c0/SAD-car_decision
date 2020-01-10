
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

function generate_costs(cap_cilindrica,pret_combustibil, km_an, consum, id_model, varsta, rovinieta, ani, pret_masina){
    var obj = {
        combustibil: 0,
        impozit: 0,
        rca: 0,
        rovinieta: 0,
        reparatii_revizii: 0,
        pret_5_ani: 0,
        cost_final : 0
    };
    /* Pretul pentru combustibil pentru un an */
        // modificarea pretului de consum in caz ca se utilizeaza virgula
        console.log(pret_combustibil);
        pret_combustibil_unformatted = pret_combustibil.toString();
        pret_combustibil_formatted = pret_combustibil_unformatted.replace(',', '.').replace(' ', '');
        pret_combustibil = parseFloat(pret_combustibil_formatted);
        console.log(pret_combustibil, pret_combustibil_unformatted, pret_combustibil_formatted);
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
    varsta = parseInt(varsta);
    if(varsta > 0){
        $.ajax({
            type: 'post',
            url: 'comparator/get_rca_model',
            async: false,
            data: {
                id_model: id_model
            }, success: function(data){
                var plata_varsta = JSON.parse(data);
                if(varsta <= 20){
                    obj.rca = parseInt(plata_varsta[0]);
                }else if(varsta > 20 && varsta <= 40){
                    obj.rca = parseInt(plata_varsta[1]);
                }else if(varsta > 40){
                    obj.rca = parseInt(plata_varsta[2]);
                }else{
                    obj.rca = 0;
                }
            }
        });
    }else{
        obj.rca = 0;
    }
    pret_masina = parseInt(pret_masina);
    if(pret_masina !=''){
        /* Pretul reparatiilor si reviziilor pe perioada unui an - valoare estimativa*/
        obj.reparatii_revizii = Math.round(0.195 *pret_masina);
        /* Pretul masinii dupa 5 ani - valoare estimativa */
        obj.pret_5_ani = Math.round(0.728 *pret_masina);
    }
    /* Costuri finale, in functie de parametrii anteriori */
    obj.cost_final = (obj.combustibil + obj.impozit + obj.rca + obj.rovinieta + obj.reparatii_revizii)* ani;
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

function replace_identificare(i, den_producator, tip_model, an_fabricatie, lansat, car_price, id_model){
    $('.'+i+'_den_producator').text(den_producator);
    $('.'+i+'_tip_model').text(tip_model);
    $('.'+i+'_an_fabricatie').text(an_fabricatie);
    if(lansat == 1){
        $('.'+i+'_lansat').text('Da');
    }else{
        $('.'+i+'_lansat').text('Nu');
    }
    $('.'+i+'_pret_masina').text(parseInt(car_price) + " €");
    // populare obiect

    window['obj'+i].id_model = parseInt(id_model);
    window['obj'+i].an_fabricatie = parseInt(an_fabricatie);
    window['obj'+i].lansat = parseInt(lansat);
    window['obj'+i].car_price = parseInt(car_price);
}

function replace_dimensiuni(i, lungime, latime, inaltime, cap_portbagaj){
    $('.'+i+'_lungime').text(lungime);
    $('.'+i+'_latime').text(latime);
    $('.'+i+'_inaltime').text(inaltime);
    $('.'+i+'_cap_portbagaj').text(cap_portbagaj);

    window['obj'+i].lungime = parseInt(lungime);
    window['obj'+i].latime = parseInt(latime);
    window['obj'+i].inaltime = parseInt(inaltime);
    window['obj'+i].cap_portbagaj = parseInt(cap_portbagaj);
}

function replace_tehnice(i, cap_motor, consum, tip_motor, tip_carburant, tip_cutie, trepte_cutie, cai_putere, cuplu, suspensie, turbina, faruri, senzori, greutate){
    $('.'+i+'_cap_motor').text(cap_motor);
    $('.'+i+'_tip_motor').text(tip_motor);
    $('.'+i+'_consum').text(consum);
    if(tip_carburant == 'M'){
        $('.'+i+'_tip_carburant').text('Motorină');
    }else if(tip_carburant == 'B'){
        $('.'+i+'_tip_carburant').text('Benzină');
    }else if(tip_carburant == 'H'){
        $('.'+i+'_tip_carburant').text('Hibrid (Benzină + Electric)');
    }else if(tip_carburant == 'E'){
        $('.'+i+'_tip_carburant').text('Electric');
    }
    $('.'+i+'_tip_cutie').text(tip_cutie);
    $('.'+i+'_trepte_cutie').text(trepte_cutie);
    $('.'+i+'_cai_putere').text(cai_putere);
    $('.'+i+'_cuplu').text(cuplu);
    $('.'+i+'_suspensie').text(suspensie);
    if(turbina == 'none'){
        $('.'+i+'_turbina').text('Nu');
    }else if(turbina == 'mono'){
        $('.'+i+'_turbina').text('Simplă');
    }else{
        $('.'+i+'_turbina').text(turbina);
    }
    $('.'+i+'_faruri').text(faruri);
    if(senzori == 'fara'){
        $('.'+i+'_senzori').text('Fără');
    }else if(senzori == 'parcare'){
        $('.'+i+'_senzori').text('Senzori de parcare față + spate');
    }else if(senzori == 'full'){
        $('.'+i+'_senzori').text('Senzori de parcare față + spate, Senzor de ploaie, Senzor de lumină');
    }
    $('.'+i+'_greutate').text(greutate);

    window['obj'+i].cap_motor = parseInt(cap_motor);
    window['obj'+i].consum = parseInt(consum);
    window['obj'+i].tip_motor = tip_motor;
    window['obj'+i].tip_carburant = tip_carburant;
    window['obj'+i].tip_cutie = tip_cutie;
    window['obj'+i].trepte_cutie = parseInt(trepte_cutie);
    window['obj'+i].cai_putere = parseInt(cai_putere);
    window['obj'+i].cuplu = parseInt(cuplu);
    window['obj'+i].suspensie = suspensie;
    window['obj'+i].turbina = turbina;
    window['obj'+i].senzori = senzori;
    window['obj'+i].greutate = parseInt(greutate);
}

function replace_confort(i, nr_portiere, AC, tip_AC, comenzi_volan, cruise_control, rating_NCAP, incalzire_scaune, computer_bord, plafon_panoramic, tapiterie){
    $('.'+i+'_nr_portiere').text(nr_portiere);
    if(AC == 0){
        $('.'+i+'_AC').text('Nu');
    }else{
        $('.'+i+'_AC').text('Da');
    }
    $('.'+i+'_tip_AC').text(tip_AC);
    if(comenzi_volan == 1){
        $('.'+i+'_comenzi_volan').text('Da');
    }else{
        $('.'+i+'_comenzi_volan').text('Nu');
    }
    if(cruise_control == 1){
        $('.'+i+'_cruise_control').text('Da');
    }else{
        $('.'+i+'_cruise_control').text('Nu');
    }
    if(incalzire_scaune == 1){
        $('.'+i+'_incalzire_scaune').text('Da');
    }else{
        $('.'+i+'_incalzire_scaune').text('Nu');
    }
    $('.'+i+'_rating_NCAP').text(rating_NCAP + '/5 stele');
    if(computer_bord == 1){
        $('.'+i+'_computer_bord').text('Da');
    }else{
        $('.'+i+'_computer_bord').text('Nu');
    }
    if(plafon_panoramic == 1){
        $('.'+i+'_plafon_panoramic').text('Da');
    }else{
        $('.'+i+'_plafon_panoramic').text('Nu');
    }
    $('.'+i+'_tapiterie').text(tapiterie);

    window['obj'+i].nr_portiere = nr_portiere;
    window['obj'+i].ac = AC;
    window['obj'+i].tip_ac = tip_AC;
    window['obj'+i].comenzi_volan = comenzi_volan;
    window['obj'+i].cruise_control = cruise_control;
    window['obj'+i].incalzire_scaune = incalzire_scaune;
    window['obj'+i].computer_bord = computer_bord;
    window['obj'+i].plafon_panoramic = plafon_panoramic;
    window['obj'+i].rating_siguranta = rating_NCAP;
    window['obj'+i].tapiterie = tapiterie;
}

function replace_siguranta(i, ESP, ABS, lane_assist, brake_assist, asistenta_up_down){
    $('.'+i+'_ESP').text(ESP == 1 ? 'Da' : 'Nu');
    $('.'+i+'_ABS').text(ABS == 1 ? 'Da' : 'Nu');
    $('.'+i+'_lane_assist').text(lane_assist == 1 ? 'Da' : 'Nu');
    $('.'+i+'_brake_assist').text(brake_assist == 1 ? 'Da' : 'Nu');
    $('.'+i+'_asistenta_up_down').text(asistenta_up_down == 1 ? 'Da' : 'Nu');

    window['obj'+i].esp = ESP;
    window['obj'+i].abs = ABS;
    window['obj'+i].lane_assist = lane_assist;
    window['obj'+i].brake_assist = brake_assist;
    window['obj'+i].asistenta_up_down = asistenta_up_down;

    //console.log(window['obj'+i]);
}

// Incarcare date despre modelul ales
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
                data['identificare'][3],
                data['car_price'][0],
                id_model
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
                data['tehnice'][11],
                data['tehnice'][12]
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

// calculatorul ce calculeaza coeficientul pentru aflarea calitatii masinii
function stat_calculator(obj1, obj2){
    //console.log(obj1);
    //console.log(obj2);
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
            obj_identificare.scor_2 += parseFloat((obj2.an_fabricatie * 3 / obj1.an_fabricatie).toFixed(6));
        }else{
            obj_identificare.scor_2 += 3;
            obj_identificare.scor_1 += parseFloat((obj1.an_fabricatie * 3 / obj2.an_fabricatie).toFixed(6));
        }
        // Calculare scor daca acesta a fost lansat sau nu
        if(obj1.lansat == 1){
            obj_identificare.scor_1 += 2;
        }
        if(obj2.lansat == 1){
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
            obj_dimensiuni.scor_2 += parseFloat((obj2.lungime * 3 / obj1.lungime).toFixed(6));
        }else{
            obj_dimensiuni.scor_2 += 3;
            obj_dimensiuni.scor_1 += parseFloat((obj1.lungime * 3 / obj2.lungime).toFixed(6));
        }
        // calculare scor pentru latime
        if(obj1.latime > obj2.latime){
            obj_dimensiuni.scor_1 += 1;
            obj_dimensiuni.scor_2 += parseFloat((obj2.latime * 1 / obj1.latime).toFixed(6));
        }else{
            obj_dimensiuni.scor_2 += 1;
            obj_dimensiuni.scor_1 += parseFloat((obj1.latime * 1 /obj2.latime).toFixed(6));
        }
        // calculare scor pentru inaltime
        if(obj1.inaltime > obj2.inaltime){
            obj_dimensiuni.scor_1 += 2;
            obj_dimensiuni.scor_2 += parseFloat((obj2.inaltime * 2 / obj1.inaltime).toFixed(6));
        }else{
            obj_dimensiuni.scor_2 += 2;
            obj_dimensiuni.scor_1 += parseFloat((obj1.inaltime * 2 / obj2.inaltime).toFixed(6));
        }
        // Calculare scor pentru capacitate portbagaj
        if(obj1.cap_portbagaj > obj2.cap_portbagaj){
            obj_dimensiuni.scor_1 += 4;
            obj_dimensiuni.scor_2 += parseFloat((obj2.cap_portbagaj * 4 / obj1.cap_portbagaj).toFixed(6));
        }else{
            obj_dimensiuni.scor_2 += 4;
            obj_dimensiuni.scor_1 += parseFloat((obj1.cap_portbagaj * 4 / obj2.cap_portbagaj).toFixed(6));
        }
    /* Calculare cost pentru date tehnice */
        var obj_tehnic = {
            scor_1 : 0,
            scor_2 : 0
        }
        // calculare scor pentru capacitate motor
        if(obj1.cap_motor > obj2.cap_motor){
            obj_tehnic.scor_1 += 10;
            obj_tehnic.scor_2 += parseFloat((obj1.cap_motor * 10/ obj2.cap_motor).toFixed(6));
        }else{
            obj_tehnic.scor_2 += 10;
            obj_tehnic.scor_1 += parseFloat((obj2.cap_motor * 10/ obj1.cap_motor).toFixed(6));
        }
        // calculare scor pentru consum mixt
        if(obj1.consum > obj2.consum){
            obj_tehnic.scor_1 += 5;
            obj_tehnic.scor_2 += parseFloat((obj1.consum * 5/ obj2.consum).toFixed(6));
        }else{
            obj_tehnic.scor_2 += 5;
            obj_tehnic.scor_1 += parseFloat((obj2.consum * 5/ obj1.consum).toFixed(6));
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
        if(obj1.tip_cutie == 'dual automata'){
            obj_tehnic.scor_1 += 2;
        }else if(obj1.tip_cutie == 'automata'){
            obj_tehnic.scor_1 += 1;
        }
        if(obj2.tip_cutie == 'dual automata'){
            obj_tehnic.scor_2 += 2;
        }else if(obj2.tip_cutie == 'automata'){
            obj_tehnic.scor_2 += 1;
        }
        // calculare scor dupa trepte cutie
        if(obj1.trepte_cutie > obj2.trepte_cutie){
            obj_tehnic.scor_1 += 2;
            obj_tehnic.scor_2 += parseFloat((obj1.trepte_cutie * 3/ obj2.trepte_cutie).toFixed(6));
        }else{
            obj_tehnic.scor_2 += 2;
            obj_tehnic.scor_1 += parseFloat((obj2.trepte_cutie * 3/ obj1.trepte_cutie).toFixed(6));
        }
        // calculare scor dupa cai putere
        if(obj1.cai_putere > obj2.cai_putere){
            obj_tehnic.scor_1 += 3;
            obj_tehnic.scor_2 += parseFloat((obj1.cai_putere * 3/ obj2.cai_putere).toFixed(6));
        }else{
            obj_tehnic.scor_2 += 3;
            obj_tehnic.scor_1 += parseFloat((obj2.cai_putere * 3/ obj1.cai_putere).toFixed(6));
        }
        // calculare scor dupa cuplu
        if(obj1.cuplu > obj2.cuplu){
            obj_tehnic.scor_1 += 2;
            obj_tehnic.scor_2 += parseFloat((obj1.cuplu * 2/ obj2.cuplu).toFixed(6));
        }else{
            obj_tehnic.scor_2 += 2;
            obj_tehnic.scor_1 += parseFloat((obj2.cuplu * 2/ obj1.cuplu).toFixed(6));
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
            obj_tehnic.scor_2 += parseFloat((obj1.greutate * 2/ obj2.greutate).toFixed(6));
        }else{
            obj_tehnic.scor_2 += 2;
            obj_tehnic.scor_1 += parseFloat((obj2.greutate* 2/ obj1.greutate).toFixed(6));
        }
    /* Calculare cost pentru date confort */
        var obj_confort = {
            scor_1: 0,
            scor_2: 0
        }
        // calculare scor dupa numar portiere
        if(obj1.nr_portiere == '4'){
            obj_confort.scor_1 += 2;
        }else if(obj1.nr_portiere == '3'){
            obj_confort.scor_1 += 1;
        }
        if(obj2.nr_portiere == '4'){
            obj_confort.scor_2 += 2;
        }else if(obj2.nr_portiere == '3'){
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
        obj_confort.scor_1 += parseInt(obj1.rating_siguranta);
        obj_confort.scor_2 += parseInt(obj2.rating_siguranta);
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
        if(obj1.tapiterie == 'Alcantara'){
            obj_confort.scor_1 += 3;
        }else if(obj1.tapiterie == 'Piele'){
            obj_confort.scor_1 += 2;
        }
        if(obj2.tapiterie == 'Alcantara'){
            obj_confort.scor_2 += 3;
        }else if(obj2.tapiterie == 'Piele'){
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
        obj_final.obj1_final = parseFloat((obj_identificare.scor_1 + obj_dimensiuni.scor_1 + obj_tehnic.scor_1 + obj_confort.scor_1 + obj_siguranta.scor_1).toFixed(2));
        //console.log(obj_identificare.scor_1, obj_dimensiuni.scor_1, obj_tehnic.scor_1, obj_confort.scor_1, obj_siguranta.scor_1);
        obj_final.obj2_final = parseFloat((obj_identificare.scor_2 + obj_dimensiuni.scor_2 + obj_tehnic.scor_2 + obj_confort.scor_2 + obj_siguranta.scor_2).toFixed(2));
        //console.log(obj_identificare.scor_2, obj_dimensiuni.scor_2, obj_tehnic.scor_2, obj_confort.scor_2, obj_siguranta.scor_2);
    /* Afisare total */
        $('.1_scor_masina').text(obj_final.obj1_final);
        $('.2_scor_masina').text(obj_final.obj2_final);
        // adaugare clase in functie de scoruri
        $('.1_scor_masina, .2_scor_masina').removeClass('score_win, score_lose');
        if(obj_final.obj1_final >= obj_final.obj2_final){
            $('.1_scor_masina').addClass('score_win');
            $('.2_scor_masina').addClass('score_lose');
        }else{
            $('.2_scor_masina').addClass('score_win');
            $('.1_scor_masina').addClass('score_lose');
        }
        $('.table_scor_final').show();
    return obj_final;
}

function add_class(selector, string_status = null){
    // daca obj1 < obj2
        $('.1_'+selector+', .2_'+selector+'').removeClass('green_plus red_minus');
    if(string_status == '1<2'){
        $('.2_'+selector+'').addClass('green_plus');
        $('.1_'+selector+'').addClass('red_minus');
    }else if(string_status == '1>2'){
        $('.1_'+selector+'').addClass('green_plus');
        $('.2_'+selector+'').addClass('red_minus');
    }else{
        $('.1_'+selector+', .2_'+selector+'').removeClass('green_plus red_minus');
    }
}

function check_visual_cars(obj1, obj2){

    // compararea pretului masinii
    if(obj1.car_price > obj2.car_price){
        add_class('pret_masina', '1>2');
    }else if(obj1.car_price < obj2.car_price){
        add_class('pret_masina', '1<2');
    }else{
        add_class('pret_masina');
    }

    // capacitate portbagaj
    if(obj1.cap_portbagaj > obj2.cap_portbagaj){
        add_class('cap_portbagaj', '1>2');
    }else if(obj1.cap_portbagaj < obj2.cap_portbagaj){
        add_class('cap_portbagaj', '1<2');
    }else{
        add_class('cap_portbagaj');
    }
    // consum
    if(obj1.consum < obj2.consum){
        add_class('consum', '1>2');
    }else if(obj1.consum > obj2.consum){
        add_class('consum', '1<2');
    }else{
        add_class('consum');
    }
    //tip motor
    //id.slice(id.length - 1)
    var motor_1 =  parseInt(obj1.tip_motor.slice(obj1.tip_motor.length - 1));
    var motor_2 =  parseInt(obj2.tip_motor.slice(obj2.tip_motor.length - 1));
    if(motor_1 > motor_2){
        add_class('tip_motor', '1>2');
    }else if(motor_1 < motor_2){
        add_class('tip_motor', '1<2');
    }else{
        add_class('tip_motor');
    }
    //trepte cutie
    if(obj1.trepte_cutie > obj2.trepte_cutie){
        add_class('trepte_cutie', '1>2');
    }else if(obj1.trepte_cutie < obj2.trepte_cutie){
        add_class('trepte_cutie', '1<2');
    }else{
        add_class('trepte_cutie');
    }
    //cai putere
    if(obj1.cai_putere > obj2.cai_putere){
        add_class('cai_putere', '1>2');
    }else if(obj1.cai_putere < obj2.cai_putere){
        add_class('cai_putere', '1<2');
    }else{
        add_class('cai_putere');
    }
    //cuplu
    if(obj1.cuplu > obj2.cuplu){
        add_class('cuplu', '1>2');
    }else if(obj1.cuplu < obj2.cuplu){
        add_class('cuplu', '1<2');
    }else{
        add_class('cuplu');
    }
    //greutate
    if(obj1.greutate < obj2.greutate){
        add_class('greutate', '1>2');
    }else if(obj1.greutate > obj2.greutate){
        add_class('greutate', '1<2');
    }else{
        add_class('greutate');
    }
    //nr_portiere
    if(obj1.nr_portiere > obj2.nr_portiere){
        add_class('nr_portiere', '1>2');
    }else if(obj1.nr_portiere < obj2.nr_portiere){
        add_class('nr_portiere', '1<2');
    }else{
        add_class('nr_portiere');
    }
    //AC
    if(obj1.ac > obj2.ac){
        add_class('AC', '1>2');
    }else if(obj1.ac < obj2.ac){
        add_class('AC', '1<2');
    }else{
        add_class('AC');
    }
    //Comenzi volan
    if(obj1.comenzi_volan > obj2.comenzi_volan){
        add_class('comenzi_volan', '1>2');
    }else if(obj1.comenzi_volan < obj2.comenzi_volan){
        add_class('comenzi_volan', '1<2');
    }else{
        add_class('comenzi_volan');
    }
    //Cruise control
    if(obj1.cruise_control > obj2.cruise_control){
        add_class('cruise_control', '1>2');
    }else if(obj1.cruise_control < obj2.cruise_control){
        add_class('cruise_control', '1<2');
    }else{
        add_class('cruise_control');
    }
    //Rating siguranta NCAP - parseInt
    var rating_NCAP1 = parseInt(obj1.rating_siguranta);
    var rating_NCAP2 = parseInt(obj2.rating_siguranta);
    if(rating_NCAP1 > rating_NCAP2){
        add_class('rating_NCAP', '1>2');
    }else if(rating_NCAP1 < rating_NCAP2){
        add_class('rating_NCAP', '1<2');
    }else{
        add_class('rating_NCAP');
    }
    //incalzire in scaune
    if(obj1.incalzire_scaune > obj2.incalzire_scaune){
        add_class('incalzire_scaune', '1>2');
    }else if(obj1.incalzire_scaune < obj2.incalzire_scaune){
        add_class('incalzire_scaune', '1<2');
    }else{
        add_class('incalzire_scaune');
    }
    //computer bord
    if(obj1.computer_bord > obj2.computer_bord){
        add_class('computer_bord', '1>2');
    }else if(obj1.computer_bord < obj2.computer_bord){
        add_class('computer_bord', '1<2');
    }else{
        add_class('computer_bord');
    }
    // plafon panoramic
    if(obj1.plafon_panoramic > obj2.plafon_panoramic){
        add_class('plafon_panoramic', '1>2');
    }else if(obj1.plafon_panoramic < obj2.plafon_panoramic){
        add_class('plafon_panoramic', '1<2');
    }else{
        add_class('plafon_panoramic');
    }
    // ESP
    if(obj1.esp > obj2.esp){
        add_class('ESP', '1>2');
    }else if(obj1.esp < obj2.esp){
        add_class('ESP', '1<2');
    }else{
        add_class('ESP');
    }
    // ABS
    if(obj1.abs > obj2.abs){
        add_class('ABS', '1>2');
    }else if(obj1.abs < obj2.abs){
        add_class('ABS', '1<2');
    }else{
        add_class('ABS');
    }
    // Lane Assist
    if(obj1.lane_assist > obj2.lane_assist){
        add_class('lane_assist', '1>2');
    }else if(obj1.lane_assist < obj2.lane_assist){
        add_class('lane_assist', '1<2');
    }else{
        add_class('lane_assist');
    }
    // Brake Assist
    if(obj1.brake_assist > obj2.brake_assist){
        add_class('brake_assist', '1>2');
    }else if(obj1.brake_assist < obj2.brake_assist){
        add_class('brake_assist', '1<2');
    }else{
        add_class('brake_assist');
    }
    // Asistenta up/down
    if(obj1.asistenta_up_down > obj2.asistenta_up_down){
        add_class('asistenta_up_down', '1>2');
    }else if(obj1.asistenta_up_down < obj2.asistenta_up_down){
        add_class('asistenta_up_down', '1<2');
    }else{
        add_class('asistenta_up_down');
    }
}

/* Global variables */

window.producator_1 = '';
window.model_1 = '';
window.producator_2 = '';
window.model_2 = '';

var obj1 = {
    id_model: 0, an_fabricatie: 0, lansat: 0, 
    lungime: 0, latime: 0, inaltime: 0, cap_portbagaj: 0, 
    cap_motor: 0, tip_motor: 0, tip_carburant: 0, tip_cutie: 0, trepte_cutie: 0, cai_putere: 0, cuplu: 0, suspensie: 0, turbina: 0, senzori: 0, greutate: 0,
    nr_portiere: 0, ac: 0, tip_ac: 0, comenzi_volan: 0, cruise_control: 0, incalzire_scaune: 0, rating_siguranta: 0, computer_bord: 0, plafon_panoramic: 0, tapiterie: 0,
    esp: 0, abs: 0, lane_assist: 0, brake_assist: 0, asistenta_up_down: 0, car_price: 0
};
var obj2 = {
    id_model: 0, an_fabricatie: 0, lansat: 0, 
    lungime: 0, latime: 0, inaltime: 0, cap_portbagaj: 0, 
    cap_motor: 0, tip_motor: 0, tip_carburant: 0, tip_cutie: 0, trepte_cutie: 0, cai_putere: 0, cuplu: 0, suspensie: 0, turbina: 0, senzori: 0, greutate: 0,
    nr_portiere: 0, ac: 0, tip_ac: 0, comenzi_volan: 0, cruise_control: 0, incalzire_scaune: 0, rating_siguranta: 0, computer_bord: 0, plafon_panoramic: 0, tapiterie: 0,
    esp: 0, abs: 0, lane_assist: 0, brake_assist: 0, asistenta_up_down: 0, car_price: 0
};

$(document).scroll(function() {
    var y = $(this).scrollTop();
    if (y > 600) {
      $('.stick_comparator_thead').fadeIn();
    } else {
      $('.stick_comparator_thead').fadeOut();
    }
  });

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
        var den_model = $('#model_2 option:selected').text();
        $('.selected-final-2').text(den_producator + ' ' + den_model);
        retrieve_model_data(2, window.model_2);
        $('.selector-2-final').show();
        /* 
        var calculator_object = stat_calculator(obj1, obj2);
        console.log(calculator_object);
        console.log(calculator_object.obj1_final);
        console.log(calculator_object.obj2_final); */
    });

    $(document).on('click', '.btn-compara', function(){
        if(
            window.model_1 != '' &&
            window.model_2 != ''
        ){
            // calculare scor pentru fiecare masina selectata
            stat_calculator(obj1, obj2);
            check_visual_cars(obj1, obj2);
            //console.log(calculator_result);
            $('.comparator-container').show();
        }else{
            alert('Alegeți ambele mașini pentru a compara!');
        }
    });

    /* La click pe butonul de calculare a costurilor de intretinere, se va face calculul + se va afisa dedesubt tabelul specific */
    $(document).on('click', '.btn-calculator-apply', function(){
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
            ani_calcul != ''
        ){  
            /* Calculare pentru prima masina */
            calcul_1 = generate_costs(obj1.cap_motor, pret_comb, km_an, obj1.consum, obj1.id_model, varsta, rovinieta, ani_calcul, obj1.car_price);
            replace_calculator(1, calcul_1.combustibil, calcul_1.rca, calcul_1.impozit, calcul_1.reparatii_revizii, calcul_1.pret_5_ani, calcul_1.cost_final, calcul_1.cost_final + obj1.car_price);
            /* Calculare pentru a doua masina */
            calcul_2 = generate_costs(obj2.cap_motor, pret_comb, km_an, obj2.consum, obj2.id_model, varsta, rovinieta, ani_calcul, obj2.car_price);
            replace_calculator(2, calcul_2.combustibil, calcul_2.rca, calcul_2.impozit, calcul_2.reparatii_revizii, calcul_2.pret_5_ani, calcul_2.cost_final, calcul_2.cost_final + obj2.car_price);
            $('.calculator_rezultate').show();
        }else{
            alert('Completați toți parametrii înainte de a calcula!');
        }
    });


} );