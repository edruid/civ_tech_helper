<?php

class TechColor extends BasicObject {
	protected static function table_name() {
		return 'tech_colors';
	}

	public function __tostring() {
		return $this->color;
	}
}

?>
