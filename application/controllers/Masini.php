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
			$all_cars = $this->db->query('SELECT den_producator, den_model, (SELECT pret from preturi_modele WHERE id_model = sm.id_model ORDER BY an_fabricatie, trimestru DESC LIMIT 1) as pret FROM serii_modele sm ORDER BY den_producator, den_model ASC');
			
			$data = array();

			foreach($all_cars->result() as $ac){

				$row = array();

				$row[] = '';
				$row[] = $ac->den_producator;
				$row[] = $ac->den_model;
				$row[] = $ac->pret;

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
}
