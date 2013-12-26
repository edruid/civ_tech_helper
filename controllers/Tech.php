<?php

class TechC Extends Controller {
	protected $_default_site = 'index';

	public function index($params) {
		$this->_access_type('html');
		$this->techs = Tech::selection();
		$this->colors = Color::selection();
		$this->_partial('Layout/html', $this);
	}
}

?>
