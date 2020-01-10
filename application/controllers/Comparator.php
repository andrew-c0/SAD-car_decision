<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Comparator extends CI_Controller {

	public function index()
	{	
		if($this->session->userdata('username') != ''){
			$data['lista_clase'] = $this->get_car_class();
			$this->load->view('/elements/header.php');
			$this->load->view('comparator.php', $data);
			$this->load->view('/elements/footer.php');
		}else{
			redirect('login');
		}
		
	}

	public function get_car_class(){
		if($this->session->userdata('username') != ''){

			$all_classes = $this->db->query('SELECT id_clasa, denumire_clasa FROM clase');

			$clase_array = [];
			foreach($all_classes->result() as $ac){
				array_push($clase_array, [$ac->id_clasa, $ac->denumire_clasa]);
			}

			return $clase_array;
		}else{
			redirect('login');
		}
	}

	public function get_car_subclass(){
		if($this->session->userdata('username') != ''){

			$car_class = $_POST['base'];

			$all_subclasses = $this->db->query('SELECT id_subclasa, denumire_subclasa FROM subclase WHERE id_clasa = '.$car_class);

			$subclase_array = [];
			foreach($all_subclasses->result() as $ac){
				array_push($subclase_array, [$ac->id_subclasa, $ac->denumire_subclasa]);
			}

			echo json_encode($subclase_array);
		}else{
			redirect('login');
		}
	}

	public function get_car_manufacturer(){
		if($this->session->userdata('username') != ''){

			$car_subclass = $_POST['base'];
			
			$all_manufacturers = $this->db->query('SELECT DISTINCT p.id_producator, p.den_producator FROM producatori p INNER JOIN serii_modele sm ON p.id_producator = sm.id_producator INNER JOIN clasificare c ON c.id_model = sm.id_model WHERE id_subclasa = '.$car_subclass);

			$manufacturers_array = [];
			foreach($all_manufacturers->result() as $ac){
				array_push($manufacturers_array, [$ac->id_producator, $ac->den_producator]);
			}

			echo json_encode($manufacturers_array);
		}else{
			redirect('login');
		}
	}

	public function get_car_model(){
		if($this->session->userdata('username') != ''){

			$car_manufacturer = intval($_POST['base'][0]);
			$car_subclass = intval($_POST['base'][1]);

			$all_models = $this->db->query('SELECT sm.id_model, sm.den_model FROM serii_modele sm INNER JOIN clasificare c ON c.id_model = sm.id_model WHERE id_producator = '.$car_manufacturer.' AND id_subclasa = '.$car_subclass.'');
			
			$models_array = [];
			foreach($all_models->result() as $ac){
				array_push($models_array, [$ac->id_model, $ac->den_model]);
			}

			echo json_encode($models_array);
		}else{
			redirect('login');
		}
	}

	public function get_model_data(){
		if($this->session->userdata('username') != ''){

			$id_model = $_POST['id_model'];

			/* Date identificare */
			$model_identificare = $this->db->query('SELECT den_producator, den_model, an_fabricatie, lansat FROM serii_modele WHERE id_model = '.$id_model);

			$model_array = [];
			foreach($model_identificare->result() as $mi){
				$model_array['identificare'] = [
					$mi->den_producator, 
					$mi->den_model, 
					$mi->an_fabricatie,
					$mi->lansat
				];
			}

			/* Date dimensiuni */

			$model_dimensiuni = $this->db->query('SELECT lungime, latime, inaltime, portbagaj_lt FROM specificatii_dimensiuni WHERE id_model = '.$id_model);

			foreach($model_dimensiuni->result() as $md){
				$model_array['dimensiuni'] = [
					$md->lungime,
					$md->latime,
					$md->inaltime,
					$md->portbagaj_lt
				];
			}

			$model_tehnice = $this->db->query('SELECT dimensiune_motor, consum, tip_motor, carburant, tip_cutie, trepte_cutie, cai_putere, cuplu, suspensie, turbina, faruri, senzori, greutate FROM specificatii_tehnice WHERE id_model = '.$id_model);

			foreach($model_tehnice->result() as $mt){
				$model_array['tehnice'] = [
					$mt->dimensiune_motor,
					$mt->consum,
					$mt->tip_motor,
					$mt->carburant,
					$mt->tip_cutie,
					$mt->trepte_cutie,
					$mt->cai_putere,
					$mt->cuplu,
					$mt->suspensie,
					$mt->turbina,
					$mt->faruri,
					$mt->senzori,
					$mt->greutate
				];
			}

			$model_confort = $this->db->query('SELECT nr_portiere, AC, tip_AC, comenzi_volan, cruise_control, rating_siguranta as rating_NCAP, incalzire_scaune, computer_bord, plafon_panoramic, tapiterie FROM specificatii_confort WHERE id_model = '.$id_model);

			foreach($model_confort->result() as $mc){
				$model_array['confort'] = [
					$mc->nr_portiere,
					$mc->AC,
					$mc->tip_AC,
					$mc->comenzi_volan,
					$mc->cruise_control,
					$mc->rating_NCAP,
					$mc->incalzire_scaune,
					$mc->computer_bord,
					$mc->plafon_panoramic,
					$mc->tapiterie
				];
			}

			$model_siguranta = $this->db->query('SELECT ESP, ABS, lane_assist, brake_assist, asistenta_urcare_coborare FROM specificatii_siguranta WHERE id_model = '.$id_model);

			foreach($model_siguranta->result() as $ms){
				$model_array['siguranta'] = [
					$ms->ESP,
					$ms->ABS,
					$ms->lane_assist,
					$ms->brake_assist,
					$ms->asistenta_urcare_coborare
				];
			}

			$model_pret = $this->db->query('SELECT pret from preturi_modele WHERE id_model = '.$id_model.' ORDER BY an, trimestru DESC LIMIT 1');
			foreach($model_pret->result() as $mp){
				$model_array['car_price'] = [
					$mp->pret
				];
			}

			echo json_encode($model_array);
		}else{
			redirect('login');
		}
	}

	public function get_rca_model(){
		if($this->session->userdata('username') != ''){

			$id_model = $_POST['id_model'];

			$all_models = $this->db->query('SELECT RCA20, RCA40, RCA60 FROM intretinere_modele WHERE id_model = '.$id_model.'');
			
			$models_array = [];
			foreach($all_models->result() as $ac){
				array_push($models_array, $ac->RCA20, $ac->RCA40, $ac->RCA60);
			}
			echo json_encode($models_array);
		}else{
			redirect('login');
		}
	}
}
