<div class="comparator-selector container">
    <div class="selector-1-label selector-label container">
    Selectează detaliile primei mașini, utilizând meniurile de selectare de mai jos:
    </div>
    <div class="selector-1 container">
        <div class="row">
            <!-- Selector clasa -->
            <div class="col-sm-3">
                <label for="clasa_1"> Selectează clasa mașinii:</label>
                <select name="select_clasa" id="clasa_1" class="form-control">
                    <option default disabled selected>Selectează...</option>
                    <?php
                    foreach($lista_clase as $lc){
                        echo '<option value="'.$lc[0].'"> '.$lc[1].' </option>';
                    }
                    ?>
                </select>
            </div>
            <!-- Selector subclasa -->
            <div class="col-sm-3">
                <label for="subclasa_1"> Selectează subclasa mașinii:</label>
                <select name="select_subclasa" id="subclasa_1" class="form-control" disabled>
                    <option default disabled selected>Selectează...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </div>
            <!-- Selector producator -->
            <div class="col-sm-3">
                <label for="producator_1"> Selectează producătorul:</label>
                <select name="select_producator" id="producator_1" class="form-control" disabled>
                    <option default disabled selected>Selectează...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </div>
            <!-- Selector model -->
            <div class="col-sm-3">
                <label for="model_1"> Selectează modelul:</label>
                <select name="select_model" id="model_1" class="form-control" disabled>
                    <option default disabled selected>Selectează...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </div>
        </div>
        <div class="selector-1-final">
        Ai ales: <span class='selected-final-1 selected-final'>..............</span>
        </div>
    </div>
    <div class="selector-2-label selector-label container">
    Selectează detaliile celei de-a doua mașini, utilizând meniurile de selectare de mai jos:
    </div>
    <div class="selector-2 container">
        <div class="row">
            <!-- Selector clasa -->
            <div class="col-sm-3">
                <label for="clasa_2"> Selectează clasa mașinii:</label>
                <select name="select_clasa" id="clasa_2" class="form-control">
                    <option default disabled selected>Selectează...</option>
                    <?php
                    foreach($lista_clase as $lc){
                        echo '<option value="'.$lc[0].'"> '.$lc[1].' </option>';
                    }
                    ?>
                </select>
            </div>
            <!-- Selector subclasa -->
            <div class="col-sm-3">
                <label for="subclasa_2"> Selectează subclasa mașinii:</label>
                <select name="select_subclasa" id="subclasa_2" class="form-control" disabled>
                    <option default disabled selected>Selectează...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </div>
            <!-- Selector producator -->
            <div class="col-sm-3">
                <label for="producator_2"> Selectează producătorul:</label>
                <select name="select_producator" id="producator_2" class="form-control" disabled>
                    <option default disabled selected>Selectează...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </div>
            <!-- Selector model -->
            <div class="col-sm-3">
                <label for="model_2"> Selectează modelul:</label>
                <select name="select_model" id="model_2" class="form-control" disabled>
                    <option default disabled selected>Selectează...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </div>
        </div>
        <div class="selector-2-final">
        Ai ales: <span class='selected-final-2 selected-final'>..............</span>
        </div>
    </div>
    <div class="buton_container container">
        <button type="button" class="btn btn-info btn-block btn-compara">Compară!</button>
    </div>
</div>

<div class="comparator-container">
    <!-- Header principal -->
    <table class="table">
        <thead class="thead-dark">
            <tr class='row'>
                <th class="col-sm-4">Specificații</th>
                <th class="col-sm-4 selected-final-1">Opel Corsa</th>
                <th class="col-sm-4 selected-final-2">VW Golf 5</th>
            </tr>
        </thead>
    </table>
    <!-- Date identificare -->
    <table class="table">
        <thead class="thead-light">
            <tr class='row'>
                <th class="col-sm-4">Date de identificare</th>
                <th class="col-sm-4"></th>
                <th class="col-sm-4"></th>
            </tr>
        </thead>
        <tbody>
            <tr class='row'>
                <td class="col-sm-4">Denumire producător</td>
                <td class="col-sm-4 1_den_producator">Test 1</td>
                <td class="col-sm-4 2_den_producator">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Tip model</td>
                <td class="col-sm-4 1_tip_model">Test 1</td>
                <td class="col-sm-4 2_tip_model">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">An Fabricație</td>
                <td class="col-sm-4 1_an_fabricatie">Test 1</td>
                <td class="col-sm-4 2_an_fabricatie">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Prețul actual</td>
                <td class="col-sm-4 1_pret_masina">Test 1</td>
                <td class="col-sm-4 2_pret_masina">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Lansat</td>
                <td class="col-sm-4 1_lansat">Test 1</td>
                <td class="col-sm-4 2_lansat">Test 2</td>
            </tr>
        </tbody>
    </table>
    <!-- Specificatii dimensiuni -->
    <table class="table">
        <thead class="thead-light">
            <tr class='row'>
                <th class="col-sm-4">Dimensiuni</th>
                <th class="col-sm-4"></th>
                <th class="col-sm-4"></th>
            </tr>
        </thead>
        <tbody>
            <tr class='row'>
                <td class="col-sm-4">Lungime (cm)</td>
                <td class="col-sm-4 1_lungime">Test 1</td>
                <td class="col-sm-4 2_lungime">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Lățime (cm)</td>
                <td class="col-sm-4 1_latime">Test 1</td>
                <td class="col-sm-4 2_latime">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Înălțime (cm)</td>
                <td class="col-sm-4 1_inaltime">Test 1</td>
                <td class="col-sm-4 2_inaltime">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Capacitate portbagaj(L)</td>
                <td class="col-sm-4 1_cap_portbagaj">Test 1</td>
                <td class="col-sm-4 2_cap_portbagaj">Test 2</td>
            </tr>
        </tbody>
    </table>
    <!-- Specificatii tehnice -->
    <table class="table">
        <thead class="thead-light">
            <tr class='row'>
                <th class="col-sm-4">Date tehnice</th>
                <th class="col-sm-4"></th>
                <th class="col-sm-4"></th>
            </tr>
        </thead>
        <tbody>
            <tr class='row'>
                <td class="col-sm-4">Capacitate motor</td>
                <td class="col-sm-4 1_cap_motor">Test 1</td>
                <td class="col-sm-4 2_cap_motor">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Consum (L/100 Km)</td>
                <td class="col-sm-4 1_consum">Test 1</td>
                <td class="col-sm-4 2_consum">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Tip motor</td>
                <td class="col-sm-4 1_tip_motor">Test 1</td>
                <td class="col-sm-4 2_tip_motor">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Tip carburant</td>
                <td class="col-sm-4 1_tip_carburant">Test 1</td>
                <td class="col-sm-4 2_tip_carburant">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Tip cutie</td>
                <td class="col-sm-4 1_tip_cutie">Test 1</td>
                <td class="col-sm-4 2_tip_cutie">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Trepte cutie</td>
                <td class="col-sm-4 1_trepte_cutie">Test 1</td>
                <td class="col-sm-4 2_trepte_cutie">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Cai putere</td>
                <td class="col-sm-4 1_cai_putere">Test 1</td>
                <td class="col-sm-4 2_cai_putere">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Cuplu (Nm)</td>
                <td class="col-sm-4 1_cuplu">Test 1</td>
                <td class="col-sm-4 2_cuplu">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Suspensie</td>
                <td class="col-sm-4 1_suspensie">Test 1</td>
                <td class="col-sm-4 2_suspensie">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Turbină</td>
                <td class="col-sm-4 1_turbina">Test 1</td>
                <td class="col-sm-4 2_turbina">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Faruri</td>
                <td class="col-sm-4 1_faruri">Test 1</td>
                <td class="col-sm-4 2_faruri">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Senzori</td>
                <td class="col-sm-4 1_senzori">Test 1</td>
                <td class="col-sm-4 2_senzori">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Greutate (Kg)</td>
                <td class="col-sm-4 1_greutate">Test 1</td>
                <td class="col-sm-4 2_greutate">Test 2</td>
            </tr>
        </tbody>
    </table>
    <div class="grafice_performanta container-fluid">
        <div class="row">
            <div class="col-sm-6">
                <canvas id="comparator-consum"></canvas>
            </div>
            <div class="col-sm-6">
                <canvas id="comparator-pret"></canvas>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <canvas id="comparator-cai_putere"></canvas>
            </div>
            <div class="col-sm-6">
                <canvas id="comparator-capacitate_motor"></canvas>
            </div>
        </div>
    </div>
    <hr>
    <div class="container">
        <div class="row">
                    <div class="col-sm-9">
                        <canvas id="evolutia-preturilor"></canvas>
                    </div>
                    <div class="col-sm-3 column">
                        <label for="">Verifică evoluția prețului</label>
                        <input type="number" class='form-control i_evolutia_preturilor' placeholder = 'Ex: 3'>
                        <br>
                        <button class="button btn btn-info btn-block btn_evolutia_preturilor">Actualizează</button>
                    </div>
        </div>
    </div>
    <hr>
    <!-- Date pentru confort -->
    <table class="table">
        <thead class="thead-light">
            <tr class='row'>
                <th class="col-sm-4">Date confort</th>
                <th class="col-sm-4"></th>
                <th class="col-sm-4"></th>
            </tr>
        </thead>
        <tbody>
            <tr class='row'>
                <td class="col-sm-4">Număr portiere</td>
                <td class="col-sm-4 1_nr_portiere">Test 1</td>
                <td class="col-sm-4 2_nr_portiere">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Aer condiționat</td>
                <td class="col-sm-4 1_AC">Test 1</td>
                <td class="col-sm-4 2_AC">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Tip AC</td>
                <td class="col-sm-4 1_tip_AC">Test 1</td>
                <td class="col-sm-4 2_tip_AC">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Comenzi volan</td>
                <td class="col-sm-4 1_comenzi_volan">Test 1</td>
                <td class="col-sm-4 2_comenzi_volan">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Cruise Control</td>
                <td class="col-sm-4 1_cruise_control">Test 1</td>
                <td class="col-sm-4 2_cruise_control">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Rating siguranță (Euro NCAP)</td>
                <td class="col-sm-4 1_rating_NCAP">Test 1</td>
                <td class="col-sm-4 2_rating_NCAP">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Încălzire în scaune</td>
                <td class="col-sm-4 1_incalzire_scaune">Test 1</td>
                <td class="col-sm-4 2_incalzire_scaune">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Computer de bord</td>
                <td class="col-sm-4 1_computer_bord">Test 1</td>
                <td class="col-sm-4 2_computer_bord">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Plafon panoramic</td>
                <td class="col-sm-4 1_plafon_panoramic">Test 1</td>
                <td class="col-sm-4 2_plafon_panoramic">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Tip tapițerie</td>
                <td class="col-sm-4 1_tapiterie">Test 1</td>
                <td class="col-sm-4 2_tapiterie">Test 2</td>
            </tr>
        </tbody>
    </table>
    <!-- Date pentru siguranta -->
    <table class="table">
        <thead class="thead-light">
            <tr class='row'>
                <th class="col-sm-4">Sisteme de siguranță</th>
                <th class="col-sm-4"></th>
                <th class="col-sm-4"></th>
            </tr>
        </thead>
        <tbody>
            <tr class='row'>
                <td class="col-sm-4">ESP</td>
                <td class="col-sm-4 1_ESP">Test 1</td>
                <td class="col-sm-4 2_ESP">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">ABS</td>
                <td class="col-sm-4 1_ABS">Test 1</td>
                <td class="col-sm-4 2_ABS">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Lane Assist</td>
                <td class="col-sm-4 1_lane_assist">Test 1</td>
                <td class="col-sm-4 2_lane_assist">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Brake Assist</td>
                <td class="col-sm-4 1_brake_assist">Test 1</td>
                <td class="col-sm-4 2_brake_assist">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Asistență la urcare/coborâre</td>
                <td class="col-sm-4 1_asistenta_up_down">Test 1</td>
                <td class="col-sm-4 2_asistenta_up_down">Test 2</td>
            </tr>
        </tbody>
    </table>
    <!-- Calculator de costuri pentru fiecare masina -->
    <table class="table">
        <thead class="thead-light">
            <tr class='row'>
                <th class="col-sm-2">Calculator întreținere</th>
                <th class='col-sm-10'>
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-2">
                                <label for="km_an">Km / An</label>
                                <input type="text" class="form-control" placeholder="15000" id="km_an">
                            </div>
                            <div class="col-sm-2">
                                <label for="varsta">Combustibil (lei/l):</label>
                                <input type="text" class="form-control" placeholder="4,77" id="pret_comb">
                            </div>
                            <div class="col-sm-1">
                                <label for="varsta">Vârsta</label>
                                <input type="text" class="form-control" placeholder="25" id="varsta">
                            </div>
                            <div class="col-sm-2">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="rovinieta">
                                    <label class="form-check-label" for="rovinieta">
                                        Include rovinieta
                                    </label>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <label for="ani_calcul" title="Numărul de ani determină valoarea finală a calculării."> Selectează numărul de ani:</label>
                                <select name="select_clasa" id="ani_calcul" class="form-control">
                                    <option default disabled selected>Selectează...</option>
                                    <option value="1">1 an</option>
                                    <option value="2">2 ani</option>
                                    <option value="3">3 ani</option>
                                    <option value="4">4 ani</option>
                                    <option value="5">5 ani</option>
                                    <option value="6">6 ani</option>
                                    <option value="7">7 ani</option>
                                    <option value="8">8 ani</option>
                                    <option value="9">9 ani</option>
                                    <option value="10">10 ani</option>
                                </select>
                            </div>
                            <div class="col-sm-2">
                                <button type="button" class="btn btn-primary btn-calculator-apply">Calculează</button>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </thead>
        <tbody class="calculator_rezultate">
            <tr class='row'>
                <td class="col-sm-4">Cost Combustibil</td>
                <td class="col-sm-4 cost_combustibil_1">Test 1</td>
                <td class="col-sm-4 cost_combustibil_2">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Asigurare RCA</td>
                <td class="col-sm-4 asigurare_1">Test 1</td>
                <td class="col-sm-4 asigurare_2">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Impozit și rovinietă</td>
                <td class="col-sm-4 impozit_1">Test 1</td>
                <td class="col-sm-4 impozit_2">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Reparații și revizii</td>
                <td class="col-sm-4 revizii_1">Test 1</td>
                <td class="col-sm-4 revizii_2">Test 2</td>
            </tr>
            <tr class='row'>
                <td class="col-sm-4">Costuri totale</td>
                <td class="col-sm-4 cost_total_1">Test 1</td>
                <td class="col-sm-4 cost_total_2">Test 2</td>
            </tr>
            <tr class='row table-warning'>
                <td class="col-sm-4">Total</td>
                <td class="col-sm-4 total_1">Test 1</td>
                <td class="col-sm-4 total_2">Test 2</td>
            </tr>
            <tr class='row table-primary'>
                <td class="col-sm-4">Preț de vânzare după 5 ani</td>
                <td class="col-sm-4 pret_1">Test 1</td>
                <td class="col-sm-4 pret_2">Test 2</td>
            </tr>
        </tbody>
    </table>
    <!-- Tabel scor final -->
    <table class="table table_scor_final">
        <thead class="thead-light">
            <tr class='row'>
                <th class="col-sm-4">Scor mașină</th>
                <th class="col-sm-4 scoruri_finale 1_scor_masina"></th>
                <th class="col-sm-4 scoruri_finale 2_scor_masina"></th>
            </tr>
        </thead>
    </table>
    <!-- Comparator raport preț-calitate -->
</div>