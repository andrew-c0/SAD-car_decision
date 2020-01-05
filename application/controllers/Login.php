<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

    public function index()
    {
        $this->load->view('login.php');
    }

    public function check_login(){
        $username = $_POST['username'];
        $password = $_POST['password'];

        // verificarea daca exista in baza de date username
        $check_user = $this->db->query('SELECT * FROM users WHERE username = "'.$username.'"');
        if($check_user->num_rows() > 0){
            // verificarea daca exista in baza de date username cu acea parola
            $check_user_password = $this->db->query('SELECT * FROM users WHERE username = "'.$username.'" AND password = SHA1("'.$password.'")');
            if($check_user_password->num_rows() > 0){
                //echo 'User found!';
                $login = array(
                    'username' => $username,
                    'nume_user' => $check_user_password->result()[0]->nume_user
                );

                $this->session->set_userdata($login);

                redirect('main', 'refresh');
            }else{
                echo 'Wrong password!';
            }
        }else{
            echo 'User not found!';
        }
    }

    public function logout(){
        session_destroy();

        redirect('login', 'refresh');
    }
}

?>