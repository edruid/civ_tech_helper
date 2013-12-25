<?php

class TechC Extends Controller {
	public function index($params) {
		$this->_access_type('html');
		$this->techs = Tech::selection();
		$this->colors = Color::selection();
		self::Layout('html', $this);
	}
}

?>
