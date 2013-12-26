<?php

class Color extends BasicObject {
	protected static function table_name() {
		return 'colors';
	}

	public function __tostring() {
		return $this->color;
	}
}

?>
