<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Masini extends CI_Controller {

	public function index()
	{	
		if($this->session->userdata('username') != ''){
			$this->load->view('/elements/header.php');
			$this->load->view('masini.php');
			$this->load->view('/elements/footer.php');
		}else{
			redirect('login');
		}
		
	}

	public function ajax_get_all_cars(){
		if($this->session->userdata('username') != ''){
			$all_cars = $this->db->query('SELECT sm.id_model, den_producator, den_model, (SELECT pret from preturi_modele WHERE id_model = sm.id_model ORDER BY an_fabricatie, trimestru DESC LIMIT 1) as pret FROM serii_modele sm ORDER BY den_producator, den_model ASC');
			
			$data = array();

			foreach($all_cars->result() as $ac){

				$row = array();

				$row[] = $ac->den_producator;
				$row[] = $ac->den_model;
				$row[] = substr($ac->pret, 0, -3);
				$row[] = '<span class="edit_model" model-id="'.$ac->id_model.'" model-name="'.$ac->den_producator.' '.$ac->den_model.'"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span> <span class="delete_model" model-id="'.$ac->id_model.'" model-name="'.$ac->den_producator.' '.$ac->den_model.'"><i class="fa fa-trash" aria-hidden="true"></i> </span>';

				$data[] = $row;
			}
			$output = array(
				"data" => $data
			);
			echo json_encode($output);
		}else{
			redirect('login');
		}
	}

	public function ajax_get_producator(){

		$sql = 'SELECT * FROM producatori';

		$all_manufacturers = $this->db->query($sql);

		$manufacturers_array = [];
		foreach($all_manufacturers->result() as $ac){
			array_push($manufacturers_array, [$ac->id_producator, $ac->den_producator]);
		}

		echo json_encode($manufacturers_array);

	}

	public function add_masina(){
		
		// preluarea datelor din formular
		$data = json_decode($_POST['masina']);

		// insert pentru tabelul serii_modele
		$sql_identificare = '
		INSERT INTO serii_modele
		(id_producator, den_producator, den_model, an_fabricatie, lansat)
		VALUES
		('.$data->producator.', 
		(SELECT den_producator FROM producatori WHERE id_producator = '.$data->producator.'),
		"'.$data->model.'",
		'.$data->an_fabricatie.',
		'.$data->lansat.'
		)
		';

		// insert pentru tabelul specificatii_tehnice
		$sql_tehnic = '
		INSERT INTO specificatii_tehnice
		(dimensiune_motor, tip_motor, consum, carburant, tip_cutie, trepte_cutie, cai_putere, cuplu, suspensie, turbina, faruri, senzori, greutate)
		VALUES
		('.$data->cap_motor.', "'.$data->tip_motor.'", '.$data->consum.', "'.$data->tip_carburant.'", "'.$data->tip_cutie.'", '.$data->trepte_cutie.', '.$data->cai_putere.', '.$data->cuplu.', "'.$data->suspensie.'", "'.$data->turbina.'", "'.$data->faruri.'", "'.$data->senzori.'", '.$data->greutate.')
		';

		// insert pentru tabela de specificatii_dimensiuni
		$sql_dimensiuni = '
		INSERT INTO specificatii_dimensiuni
		(lungime, latime, inaltime, portbagaj_lt)
		VALUES
		('.$data->lungime.', '.$data->latime.', '.$data->inaltime.', '.$data->cap_portbagaj.')
		';

		// insert pentru tabela specificatii_confort
		$sql_confort = '
		INSERT INTO specificatii_confort
		(nr_portiere, AC, tip_AC, comenzi_volan, cruise_control, rating_siguranta, incalzire_scaune, computer_bord, plafon_panoramic, tapiterie)
		VALUES
		('.$data->nr_portiere.', '.$data->ac.', "'.$data->tip_ac.'", '.$data->comenzi_volan.', '.$data->cruise_control.', '.$data->rating_siguranta.', '.$data->incalzire_scaune.', '.$data->computer_bord.', '.$data->plafon_panoramic.', "'.$data->tapiterie.'")
		';

		// insert pentru tabela specificatii_siguranta
		$sql_siguranta = '
		INSERT INTO specificatii_siguranta
		(ESP, ABS, Lane_assist, Brake_assist, Asistenta_urcare_coborare)
		VALUES
		('.$data->esp.', '.$data->abs.', '.$data->lane_assist.', '.$data->brake_assist.', '.$data->asistenta_up_down.')
		';

		// insert pentru tabela de preturi_modele
		$current_year = intval(date('Y'));
		$current_month = intval(date('n'));
			$trimestru = '';
		if($current_month >=1 && $current_month <=3){
			$trimestru = 1;
		}else if($current_month >=4 && $current_month <=6){
			$trimestru = 2;
		}else if($cureent_month >=7 && $current_month <=9){
			$trimestru = 3;
		}else if($current_month >=10 && $current_month <=12){
			$trimestru = 4;
		}

		$sql_pret = '
		INSERT INTO preturi_modele
		(pret, trimestru, an)
		VALUES 
		('.$data->car_price.', '.$trimestru.', '.$current_year.');
		';

		// insert pentru tabela de intretinere_modele
		$sql_intretinere = '
		INSERT INTO intretinere_modele
		(RCA20, RCA40, RCA60)
		VALUES
		('.$data->rca20.', '.$data->rca40.', '.$data->rca60.')
		';

		// insert pentru tabela depreciere_pret
		$val_dep = random_int(90, 99);
		$sql_depreciere = '
		INSERT INTO intretinere_modele
		(depreciere) VALUES ('.$val_dep.')
		';

		// pentru fiecare insert, se va face cate un query separat pentru fiecare tabel
		$this->db->trans_start();
		$this->db->query($sql_identificare);
		$this->db->query($sql_tehnic);
		$this->db->query($sql_dimensiuni);
		$this->db->query($sql_confort);
		$this->db->query($sql_siguranta);
		$this->db->query($sql_pret);
		$this->db->query($sql_intretinere);
		$this->db->query($sql_depreciere);
		$this->db->trans_complete();

		$output = '';
		if ($this->db->trans_status() === FALSE)
		{
			$output = ['0', 'Erori în înregistrare. Verifică codul.'];
		}else{
			$output = ['1', 'Înregistrare efectuată.'];
		}
		echo json_encode($output);
	}

	public function delete_masina(){

		$id_model = $_POST['id_model'];

		$sql_1 = 'DELETE FROM serii_modele WHERE id_model ='.$id_model;
		$sql_2 = 'DELETE FROM specificatii_confort WHERE id_model = '.$id_model ;
		$sql_3 = 'DELETE FROM specificatii_dimensiuni WHERE id_model = '.$id_model;
		$sql_4 = 'DELETE FROM specificatii_tehnice WHERE id_model = '.$id_model;
		$sql_5 = 'DELETE FROM specificatii_siguranta WHERE id_model ='.$id_model;
		$sql_6 = 'DELETE FROM preturi_modele WHERE id_model ='.$id_model;
		$sql_7 = 'DELETE FROM intretinere_modele WHERE id_model = '.$id_model;

		$this->db->trans_start();
		$this->db->query($sql_1);
		$this->db->query($sql_2);
		$this->db->query($sql_3);
		$this->db->query($sql_4);
		$this->db->query($sql_5);
		$this->db->query($sql_6);
		$this->db->query($sql_7);
		$this->db->trans_complete();

		$output = '';
		if ($this->db->trans_status() === FALSE)
		{
			$output = ['0', 'Erori în înregistrare. Verifică codul.'];
		}else{
			$output = ['1', 'Înregistrare efectuată.'];
		}
		echo json_encode($output);
	}

	public function edit_masina(){

		$id_model = $_POST['id_model'];
		$data = json_decode($_POST['masina']);

		// update masina la identificare
		$u_identificare = '
		UPDATE serii_modele SET
		id_producator = '.$data->producator.',
		den_producator = (SELECT den_producator FROM producatori WHERE id_producator = '.$data->producator.'),
		den_model = "'.$data->model.'",
		an_fabricatie = '.$data->an_fabricatie.',
		lansat = '.$data->lansat.'
		WHERE id_model = '.$id_model.'
		';

		// update masina la tehnic
		$u_tehnic = '
		UPDATE specificatii_tehnice SET
		dimensiune_motor = '.$data->cap_motor.',
		tip_motor = "'.$data->tip_motor.'",
		consum = '.$data->consum.',
		carburant = "'.$data->tip_carburant.'",
		tip_cutie = "'.$data->tip_cutie.'",
		trepte_cutie = '.$data->trepte_cutie.',
		cai_putere = '.$data->cai_putere.',
		cuplu = '.$data->cuplu.',
		suspensie = "'.$data->suspensie.'",
		turbina = "'.$data->turbina.'",
		faruri = "'.$data->faruri.'",
		senzori = "'.$data->senzori.'",
		greutate = '.$data->greutate.'
		WHERE id_model = '.$id_model.'
		';

		// update masina la dimensiuni

		$u_dimensiuni = '
		UPDATE specificatii_dimensiuni SET
		lungime = '.$data->lungime.',
		latime = '.$data->latime.',
		inaltime = '.$data->inaltime.',
		portbagaj_lt = '.$data->cap_portbagaj.'
		WHERE id_model = '.$id_model.'
		';

		// update masina la confort
		$u_confort = '
		UPDATE specificatii_confort SET
		nr_portiere = '.$data->nr_portiere.',
		AC = '.$data->ac.',
		tip_AC = "'.$data->tip_ac.'",
		comenzi_volan = '.$data->comenzi_volan.',
		cruise_control = '.$data->cruise_control.',
		rating_siguranta = '.$data->rating_siguranta.',
		incalzire_scaune = '.$data->incalzire_scaune.',
		computer_bord = '.$data->computer_bord.',
		plafon_panoramic = '.$data->plafon_panoramic.',
		tapiterie = "'.$data->tapiterie.'"
		WHERE id_model = '.$id_model.'
		';

		// update masina la siguranta
		$u_siguranta = '
		UPDATE specificatii_siguranta SET
		ESP = '.$data->esp.',
		ABS = '.$data->abs.',
		Lane_Assist = '.$data->lane_assist.',
		Brake_Assist = '.$data->brake_assist.',
		Asistenta_urcare_coborare = '.$data->asistenta_up_down.'
		WHERE id_model = '.$id_model.'
		';

		// update masina la RCA

		$u_rca = '
		UPDATE intretinere_modele SET
		RCA20 = '.$data->rca20.',
		RCA40 = '.$data->rca40.',
		RCA60 = '.$data->rca60.'
		WHERE id_model = '.$id_model.'
		';

		// la pret, daca exista deja linie, se face update. Altfel, se face insert
		$current_year = intval(date('Y'));
		$current_month = intval(date('n'));
			$trimestru = '';
		if($current_month >=1 && $current_month <=3){
			$trimestru = 1;
		}else if($current_month >=4 && $current_month <=6){
			$trimestru = 2;
		}else if($cureent_month >=7 && $current_month <=9){
			$trimestru = 3;
		}else if($current_month >=10 && $current_month <=12){
			$trimestru = 4;
		}

		// verificare daca exista linie
		$sql_verify_price = $this->db->query('SELECT * FROM preturi_modele WHERE id_model = '.$id_model.' AND trimestru = '.$trimestru.' AND an = '.$current_year.'');
		if($sql_verify_price->num_rows() == 0){
			$u_pret = '
			INSERT INTO preturi_modele
			(pret, trimestru, an)
			VALUES 
			('.$data->car_price.', '.$trimestru.', '.$current_year.');
			';
		}else{
			$u_pret = '
			UPDATE preturi_modele SET
			pret = '.$data->car_price.'
			WHERE id_model = '.$id_model.' AND trimestru = '.$trimestru.' AND an = '.$current_year.'
			';
		}
		
		$this->db->trans_start();
		$this->db->query($u_confort);
		$this->db->query($u_dimensiuni);
		$this->db->query($u_identificare);
		$this->db->query($u_pret);
		$this->db->query($u_rca);
		$this->db->query($u_tehnic);
		$this->db->query($u_siguranta);
		$this->db->trans_complete();

		$output = '';
		if ($this->db->trans_status() === FALSE)
		{
			$output = ['0', 'Erori în înregistrare. Verifică codul.'];
		}else{
			$output = ['1', 'Înregistrare efectuată.'];
		}
		echo json_encode($output);
	}

	public function get_individual(){
		$id_model = $_POST['id_model'];
		$data = array();

		// populare date model de identificare
		$date_identificare = $this->db->query('SELECT * FROM serii_modele sm INNER JOIN producatori p ON sm.id_producator = p.id_producator WHERE id_model = '.$id_model);

		if($date_identificare->num_rows() > 0){
			foreach($date_identificare->result() as $di){
				$data_identificare = array(
					"producator" => $di->id_producator,
					"model" => $di->den_model,
					"an_fabricatie" => $di->an_fabricatie,
					"lansat" => $di->lansat
				);
			}
		}

		// populare date model tehnic
		$date_tehnice = $this->db->query('SELECT * FROM specificatii_tehnice WHERE id_model = '.$id_model);

		if($date_tehnice->num_rows() > 0){
			foreach($date_tehnice->result() as $dt){
				$data_tehnice = array(
					"dim_motor" => $dt->dimensiune_motor,
					"tip_motor" => $dt->tip_motor,
					"consum" => $dt->Consum,
					"carburant" => $dt->carburant,
					"tip_cutie" => $dt->tip_cutie,
					"trepte_cutie" => $dt->trepte_cutie,
					"cai_putere" => $dt->cai_putere,
					"cuplu" => $dt->cuplu,
					"suspensie" => $dt->Suspensie,
					"turbina" => $dt->Turbina,
					"faruri" => $dt->Faruri,
					"senzori" => $dt->Senzori,
					"greutate" => $dt->greutate
				);
			}
		}

		// populare date model dimensiuni
		$date_dimensiuni = $this->db->query('SELECT * FROM specificatii_dimensiuni WHERE id_model = '.$id_model);

		if($date_dimensiuni->num_rows() > 0){
			foreach($date_dimensiuni->result() as $dd){
				$data_dimensiuni = array(
					"lungime" => $dd->lungime,
					"latime" => $dd->latime,
					"inaltime" => $dd->inaltime,
					"cap_portbagaj" => $dd->portbagaj_lt
				);
			}
		}

		// populare date model confort

		$date_confort = $this->db->query('SELECT * FROM specificatii_confort WHERE id_model ='.$id_model);

		if($date_confort->num_rows() > 0){
			foreach($date_confort->result() as $dc){
				$data_confort = array(
					"nr_portiere" => $dc->nr_portiere,
					"ac" => $dc->AC,
					"tip_ac" => $dc->tip_AC,
					"comenzi_volan" => $dc->Comenzi_volan,
					"cruise_control" => $dc->Cruise_control,
					"rating_siguranta" => $dc->rating_siguranta,
					"incalzire_scaune" => $dc->incalzire_scaune,
					"computer_bord" => $dc->computer_bord,
					"plafon_panoramic" => $dc->plafon_panoramic,
					"tapiterie" => $dc->tapiterie
				);
			}
		}

		// populare date model siguranta

		$date_siguranta = $this->db->query('SELECT * FROM specificatii_siguranta WHERE id_model = '.$id_model);

		if($date_siguranta->num_rows() > 0){
			foreach($date_siguranta-> result() as $ds){
				$data_siguranta = array(
					"esp" =>$ds->ESP,
					"abs" =>$ds->ABS,
					"lane_assist" =>$ds->Lane_Assist,
					"brake_assist" =>$ds->Brake_Assist,
					"asistenta_up_down" =>$ds->Asistenta_urcare_coborare
				);
			}
		}

		// populare date model RCA

		$date_rca = $this->db->query('SELECT * FROM intretinere_modele WHERE id_model = '.$id_model);

		if($date_rca->num_rows() > 0){
			foreach($date_rca->result() as $dr){
				$data_rca = array(
					"rca_20" => $dr->RCA20,
					"rca_40" => $dr->RCA40,
					"rca_60" => $dr->RCA60
				);
			}
		}

		$date_pret = $this->db->query('SELECT pret from preturi_modele WHERE id_model = '.$id_model.' ORDER BY an, trimestru DESC LIMIT 1');

		if($date_pret->num_rows() > 0){
			foreach($date_pret->result() as  $dp){
				$data_pret = array(
					"car_price" => $dp->pret
				);
			}
		}

		$data = array_merge($data_confort, $data_dimensiuni, $data_identificare, $data_rca, $data_tehnice, $data_siguranta, $data_pret);

		echo json_encode($data);
	}

	public function pie_data(){

		$sql_pie = $this->db->query('SELECT den_producator, COUNT(den_producator) as total FROM serii_modele GROUP BY den_producator ORDER BY  COUNT(den_producator) DESC LIMIT 15');
		$data_nume = [];
		$data_total = [];
		if($sql_pie->num_rows() > 0){
			foreach($sql_pie->result() as $pie){
				array_push($data_nume, $pie->den_producator);
				array_push($data_total ,intval($pie->total));
			}
		}

		$sql_total = $this->db->query('SELECT * FROM serii_modele');
		$data = array(
			"total_masini" => $sql_total->num_rows(),
			"nume" => $data_nume, 
			"total" => $data_total
		);

		echo json_encode($data);
	} 
}
