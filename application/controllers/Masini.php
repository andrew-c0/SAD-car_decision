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
}
