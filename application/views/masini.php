<div class="masini-container container-fluid">

    <!-- Tabelul ce afiseaza toate masinile din baza de date, sub forma de tabel -->
    <table class="tabel-masini table-striped table-bordered dt-responsive nowrap">
        <thead>
            <tr>
                <th>
                    Marcă
                </th>
                <th>
                    Model
                </th>
                <th>
                    Preț
                </th>
                <th>
                    Acțiuni
                </th>
            </tr>
        </thead>
    </table>

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary btn_masini_adauga" data-toggle="modal" data-target="#modal_adaugare_editare">
    Adaugă mașină
    </button>
    <hr>
    <div class="container">
        <div class="row">
            <div class="col-sm-3">
            Numărul total de mașini: <span class="total_masini">200 </span>
            </div>
            <div class="col-sm-9">
                <canvas id="pie_masini"></canvas>
            </div>
        </div>
    </div>
    

    <!-- Modal adaugare/editare -->
    <div class="modal fade" id="modal_adaugare_editare" tabindex="-1" role="dialog" aria-labelledby="modal_adaugare_editare" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Adaugă mașină</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <!-- Partea de identificare a masinii ce ramane permanent afisata in modal -->
            <div class="permanent_identificare">
            <!-- Aici vin input-urile pentru modal -->
                <label for="">Producător</label>
                <select class="form-control 1_producator"></select>

                <label for="">Model</label>
                <input type="text" class="form-control 1_model" placeholder="Numele modelului...">

                <label for="">An de fabricație</label>
                <input type="number" class="form-control 1_an_fabricatie" placeholder="Ex: 2020">

                <label for="">Preț (€)</label>
                <input type="number" class="form-control 1_pret" placeholder="Ex: 30000">

                <label for="">Lansat?</label>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="1_lansat">
                    <label class="form-check-label" for="1_lansat">
                        Da, modelul este lansat.
                    </label>
                </div>
            </div>
            <hr>
            <!-- Partea temporara, containerul ce se ocupa de continerea pasilor pentru adaugare/editare -->
            <div class="temporar_steps_masina">

                <!-- Temporar -->
                <div class="temporar temporar_2_tehnic">
                    <label for="">Dimensiune motor (cm3)</label>
                    <input type="number" class="form-control 2_dim_motor" placeholder="Ex: 2000">

                    <label for="">Tip motor</label>
                    <select class="form-control 2_tip_motor">
                        <option selected disabled default>Selectează tipul de motor</option>
                        <option value="Euro 1">Euro 1</option>
                        <option value="Euro 2">Euro 2</option>
                        <option value="Euro 3">Euro 3</option>
                        <option value="Euro 4">Euro 4</option>
                        <option value="Euro 5">Euro 5</option>
                        <option value="Euro 6">Euro 6</option>
                    </select>

                    <label for="">Consum (%)</label>
                    <input type="number" class="form-control 2_consum" placeholder="Ex: 10">

                    <label for="">Carburant</label>
                    <select class="form-control 2_carburant">
                        <option selected disabled default>Selectează tipul de carburant</option>
                        <option value="M">Motorină</option>
                        <option value="B">Benzină</option>
                        <option value="H">Hibrid (Benzină + Electric)</option>
                        <option value="E">Electric</option>
                    </select>

                    <label for="">Tip cutie</label>
                    <input type="text" class="form-control 2_tip_cutie" placeholder="Ex: manuală">

                    <label for="">Trepte cutie</label>
                    <input type="number" class="form-control 2_trepte_cutie" placeholder="Ex: 5">

                    <label for="">Cai putere</label>
                    <input type="number" class="form-control 2_cai_putere" placeholder="Ex: 200">

                    <label for="">Cuplu (Nm)</label>
                    <input type="number" class="form-control 2_cuplu" placeholder="Ex: 300">

                    <label for="">Suspensie</label>
                    <input type="text" class="form-control 2_suspensie" placeholder="Ex: Arcuri">

                    <label for="">Turbină</label>
                    <select class="form-control 2_turbina">
                        <option selected disabled default>Selectează o versiune</option>
                        <option value="none">Nu</option>
                        <option value="mono">Mono</option>
                        <option value="multipla">Multiplă</option>
                    </select>

                    <label for="">Faruri</label>
                    <select class="form-control 2_faruri">
                        <option selected disabled default>Selectează tipul de faruri</option>
                        <option value="halogen">Halogen</option>
                        <option value="xenon">Xenon</option>
                        <option value="led">LED</option>
                    </select>

                    <label for="">Senzori</label>
                    <select class="form-control 2_senzori">
                        <option selected disabled default>Selectează tipul de senzori</option>
                        <option value="fara">Nu are</option>
                        <option value="parcare">Senzori de parcare</option>
                        <option value="full">Senzori complet</option>
                    </select>

                    <label for="">Greutate (Kg)</label>
                    <input type="number" class="form-control 2_greutate" placeholder="Ex: 2600">

                </div>

                <!-- Temporar -->
                <div class="temporar temporar_3_dimensiuni">
                    <label for="">Lungime (cm)</label>
                    <input type="number" class="form-control 3_lungime" placeholder="Ex: 400">

                    <label for="">Lățime (cm)</label>
                    <input type="number" class="form-control 3_latime" placeholder="Ex: 300">

                    <label for="">Înălțime (cm)</label>
                    <input type="number" class="form-control 3_inaltime" placeholder="Ex: 140">

                    <label for="">Capacitate portbagaj (litri)</label>
                    <input type="number" class="form-control 3_cap_portbagaj" placeholder="Ex: 320">

                </div>

                <!-- Temporar -->
                <div class="temporar temporar_4_confort">
                    <label for="">Număr portiere</label>
                    <input type="number" class="form-control 4_portiere" placeholder="Ex: 4">

                    <label for="">Aer condiționat</label>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="4_ac">
                        <label class="form-check-label" for="4_ac">
                            Da, modelul are aer condiționat.
                        </label>
                    </div>

                    <label for="">Tip Aer condiționat</label>
                    <select class="form-control 4_tip_ac">
                        <option selected disabled default>Selectează tipul de aer condiționat</option>
                        <option value="AC">Aer condiționat simplu</option>
                        <option value="Bizonal">Bizonal</option>
                        <option value="climatronic">Climatronic</option>
                    </select>

                    <label for="">Comenzi volan</label>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="4_comenzi_volan">
                        <label class="form-check-label" for="4_comenzi_volan">
                            Da
                        </label>
                    </div>

                    <label for="">Cruise control</label>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="4_cruise_control">
                        <label class="form-check-label" for="4_cruise_control">
                            Da
                        </label>
                    </div>

                    <label for="">Rating siguranță</label>
                    <select class="form-control 4_rating_siguranta">
                        <option selected disabled default>Selectează ratingul</option>
                        <option value="1">O stea</option>
                        <option value="2">2 stele</option>
                        <option value="3">3 stele</option>
                        <option value="4">4 stele</option>
                        <option value="5">5 stele</option>
                    </select>

                    <label for="">Încălzire în scaune</label>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="4_incalzire_scaune">
                        <label class="form-check-label" for="4_incalzire_scaune">
                            Da
                        </label>
                    </div>

                    <label for="">Computer de bord</label>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="4_computer_bord">
                        <label class="form-check-label" for="4_computer_bord">
                            Da
                        </label>
                    </div>

                    <label for="">Plafon panoramic</label>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="4_plafon_panoramic">
                        <label class="form-check-label" for="4_plafon_panoramic">
                            Da
                        </label>
                    </div>

                    <label for="">Tapițerie</label>
                    <select class="form-control 4_tapiterie">
                        <option selected disabled default>Selectează tapițerie</option>
                        <option value="Textil">Textil</option>
                        <option value="Piele">Piele</option>
                        <option value="Alcantara">Alcantara</option>
                    </select>
                </div>

                <!-- Temporar -->
                <div class="temporar temporar_5_siguranta">
                    <label for="">ESP</label>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="5_esp">
                        <label class="form-check-label" for="5_esp">
                            Da
                        </label>
                    </div>

                    <label for="">ABS</label>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="5_abs">
                        <label class="form-check-label" for="5_abs">
                            Da
                        </label>
                    </div>

                    <label for="">Lane assist</label>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="5_lane_assist">
                        <label class="form-check-label" for="5_lane_assist">
                            Da
                        </label>
                    </div>

                    <label for="">Brake assist</label>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="5_brake_assist">
                        <label class="form-check-label" for="5_brake_assist">
                            Da
                        </label>
                    </div>

                    <label for="">Asistență la urcare/coborâre</label>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="5_asistenta_up_down">
                        <label class="form-check-label" for="5_asistenta_up_down">
                            Da
                        </label>
                    </div>
                </div>

                <div class="temporar temporar_6_rca">
                    <label for="">Preț RCA sub 20 de ani (lei)</label>
                    <input type="number" class="form-control 6_rca20" placeholder="Ex: 2200">

                    <label for="">Preț RCA între 20 și 40 de ani (lei)</label>
                    <input type="number" class="form-control 6_rca40" placeholder="Ex: 1400">

                    <label for="">Preț RCA peste 40 de ani (lei)</label>
                    <input type="number" class="form-control 6_rca60" placeholder="Ex: 1800">
                </div>
            </div>
            <div class="container">
                    <div class="error_adaugare_editare">
                        Nu toate câmpurile au fost completate. Verifică și încearcă din nou!
                    </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="button btn btn-secondary button_reset" reset-id="1">Resetează</button>
            <button class="button btn btn-light button_back" back-id="1">Înapoi</button>
            <button class="button btn btn-info button_next" next-id="1">Continuă</button>
            <button class="button btn btn-success button_final" edit-id="0">Salvează</button>
        </div>
        </div>
    </div>
    </div>

    <!-- Modal stergere -->
    <div class="modal fade" id="delete_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="delete_modal_title">Ștergere mașină</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            Sunteți sigur că doriți să ștergeți mașina <span class="nume_masina_modal"></span>?
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Renunță</button>
            <button type="button" class="btn btn-danger btn_sterge_masina">Da, șterge</button>
        </div>
        </div>
    </div>
    </div>

</div>