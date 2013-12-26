begin;

create table techs (
	tech        text not null,
	description text,
	cost        int,
	primary key (tech)
);

create table colors (
	color       text not null,
	primary key (color)
);

create table tech_colors (
	tech        text not null,
	color       text not null,
	primary key (tech, color),
	foreign key (tech) references techs (tech),
	foreign key (color) references colors (color)
);

create table color_bonuses (
	tech        text not null,
	color       text not null,
	bonus       int not null,
	primary key (tech, color),
	foreign key (tech) references techs (tech),
	foreign key (color) references colors (color)
);

create table specific_bonuses (
	tech        text not null,
	other       text not null,
	bonus       int not null,
	primary key (tech),
	foreign key (tech) references techs (tech),
	foreign key (other) references techs (tech)
);

create table calamity_types (
	type        text not null,
	primary key (type)
);

create table calamities (
	calamity    text not null,
	description text not null,
	number      int not null,
	type        text not null,
	primary key (calamity),
	foreign key (type) references calamity_types (type)
);

create table calamity_effects (
	tech        text not null,
	calamity    text not null,
	description text,
	type        text not null,
	primary key (tech, calamity),
	foreign key (calamity) references calamities (calamity),
	foreign key (tech) references techs (tech)
);

insert into colors (color) values
	('red'), ('green'), ('orange'), ('blue'), ('yellow');

insert into calamity_types (type) values
	('minor'), ('major'), ('non-tradable');

insert into techs (cost, tech) values
	( 60, 'Masonry'            ),
	( 50, 'Cloth Making'       ),
	( 60, 'Pottery'            ),
	( 50, 'Sculpture'          ),
	( 60, 'Empiricism'         ),
	( 90, 'Metalworking'       ),
	( 80, 'Astronomy'          ),
	( 60, 'Mythology'          ),
	(120, 'Agriculture'        ),
	(110, 'Literacy'           ),
	(140, 'Medicine'           ),
	( 50, 'Mysticism'          ),
	( 60, 'Written record'     ),
	( 50, 'Urbanism'           ),
	( 60, 'Monarchy'           ),
	( 80, 'Drama and poetry'   ),
	( 80, 'Music'              ),
	( 90, 'Coinage'            ),
	( 80, 'Deism'              ),
	( 80, 'Theocracy'          ),
	(140, 'Architecture'       ),
	(130, 'Rhetoric'           ),
	(160, 'Engeneering'        ),
	(160, 'Cartography'        ),
	(180, 'Monument'           ),
	(180, 'Trade routes'       ),
	(160, 'Naval warfare'      ),
	(180, 'Calendar'           ),
	(150, 'Fundamentalism'     ),
	(160, 'Enlightenment'      ),
	(160, 'Universial doctrine'),
	(180, 'Diplomacy'          ),
	(170, 'Law'                ),
	(170, 'Military'           ),
	(220, 'Roadbuilding'       ),
	(230, 'Mining'             ),
	(220, 'Library'            ),
	(240, 'Mathematics'        ),
	(220, 'Democracy'          ),
	(230, 'Politics'           ),
	(240, 'Philosophy'         ),
	(260, 'Trade empire'       ),
	(230, 'Public Works'       ),
	(240, 'Monotheism'         ),
	(280, 'Wonder of the world'),
	(270, 'Anatomy'            ),
	(250, 'Theology'           ),
	(260, 'Advanced Military'  ),
	(260, 'Provincial Empire'  ),
	(280, 'Cultural Ascendancy'),
	(270, 'Diaspora'           );

insert into tech_colors (color, tech) values
	('orange', 'Masonry'            ),
	('orange', 'Cloth Making'       ),
	('orange', 'Pottery'            ),
	('blue',   'Sculpture'          ),
	('green',  'Empiricism'         ),
	('orange', 'Metalworking'       ),
	('green',  'Astronomy'          ),
	('red',    'Mythology'          ),
	('orange', 'Agriculture'        ),
	('blue',   'Literacy'           ),
	('red',    'Literacy'           ),
	('green',  'Medicine'           ),
	('blue',   'Mysticism'          ),
	('yellow', 'Mysticism'          ),
	('green',  'Written record'     ),
	('red',    'Written record'     ),
	('red',    'Urbanism'           ),
	('red',    'Monarchy'           ),
	('blue',   'Drama and poetry'   ),
	('blue',   'Music'              ),
	('green',  'Coinage'            ),
	('red',    'Deism'              ),
	('yellow', 'Theocracy'          ),
	('red',    'Theocracy'          ),
	('blue',   'Architecture'       ),
	('blue',   'Rhetoric'           ),
	('green',  'Engeneering'        ),
	('orange', 'Engeneering'        ),
	('green',  'Cartography'        ),
	('yellow', 'Monument'           ),
	('orange', 'Monument'           ),
	('orange', 'Trade routes'       ),
	('red',    'Naval warfare'      ),
	('green',  'Calendar'           ),
	('red',    'Fundamentalism'     ),
	('red',    'Enlightenment'      ),
	('red',    'Universial doctrine'),
	('blue',   'Diplomacy'          ),
	('red',    'Law'                ),
	('red',    'Military'           ),
	('orange', 'Roadbuilding'       ),
	('orange', 'Mining'             ),
	('green',  'Library'            ),
	('green',  'Mathematics'        ),
	('blue',   'Mathematics'        ),
	('red',    'Democracy'          ),
	('blue',   'Politics'           ),
	('green',  'Philosophy'         ),
	('yellow', 'Philosophy'         ),
	('orange', 'Trade empire'       ),
	('red',    'Public Works'       ),
	('red',    'Monotheism'         ),
	('blue',   'Wonder of the world'),
	('orange', 'Wonder of the world'),
	('green',  'Anatomy'            ),
	('red',    'Theology'           ),
	('red',    'Advanced Military'  ),
	('red',    'Provincial Empire'  ),
	('blue',   'Cultural Ascendancy'),
	('red',    'Diaspora'           );

insert into color_bonuses (tech, color, bonus) values
	('Masonry', 'green', 5),
	('Masonry', 'orange', 10),
	('Cloth Making', 'blue', 5),
	('Cloth Making', 'orange', 10),
	('Pottery', 'blue', 5),
	('Pottery', 'orange', 10),
	('Sculpture', 'blue', 10),
	('Sculpture', 'red', 5),
	('Empiricism', 'green', 10),
	('Empiricism', 'blue', 5),
	('Empiricism', 'yellow', 5),
	('Empiricism', 'red', 5),
	('Empiricism', 'orange', 5),
	('Metalworking', 'green', 5),
	('Metalworking', 'orange', 10),
	('Astronomy', 'green', 10),
	('Astronomy', 'yellow', 5),
	('Mythology', 'blue', 5),
	('Mythology', 'yellow', 10),
	('Agriculture', 'green', 5),
	('Agriculture', 'orange', 10),
	('Literacy', 'green', 5),
	('Literacy', 'blue', 10),
	('Literacy', 'yellow', 5),
	('Literacy', 'red', 10),
	('Literacy', 'orange', 5),
	('Medicine', 'green', 10),
	('Medicine', 'orange', 5),
	('Mysticism', 'blue', 5),
	('Mysticism', 'yellow', 5),
	('Written record', 'green', 5),
	('Written record', 'red', 5),
	('Urbanism', 'green', 5),
	('Urbanism', 'red', 10),
	('Monarchy', 'yellow', 5),
	('Monarchy', 'red', 10),
	('Drama and poetry', 'blue', 10),
	('Drama and poetry', 'yellow', 5),
	('Music', 'blue', 10),
	('Music', 'yellow', 5),
	('Coinage', 'green', 10),
	('Coinage', 'red', 5),
	('Deism', 'yellow', 10),
	('Deism', 'orange', 5),
	('Theocracy', 'yellow', 5),
	('Theocracy', 'red', 5),
	('Architecture', 'green', 5),
	('Architecture', 'blue', 10),
	('Rhetoric', 'blue', 10),
	('Rhetoric', 'red', 5),
	('Engeneering', 'green', 5),
	('Engeneering', 'orange', 5),
	('Cartography', 'green', 10),
	('Cartography', 'blue', 5),
	('Monument', 'yellow', 5),
	('Monument', 'orange', 5),
	('Trade routes', 'yellow', 5),
	('Trade routes', 'orange', 10),
	('Naval warfare', 'red', 10),
	('Naval warfare', 'orange', 5),
	('Calendar', 'green', 10),
	('Calendar', 'red', 5),
	('Fundamentalism', 'blue', 5),
	('Fundamentalism', 'yellow', 10),
	('Enlightenment', 'yellow', 10),
	('Enlightenment', 'orange', 5),
	('Universial doctrine', 'yellow', 10),
	('Universial doctrine', 'red', 5),
	('Diplomacy', 'blue', 10),
	('Diplomacy', 'red', 5),
	('Law', 'yellow', 5),
	('Law', 'red', 10),
	('Military', 'red', 10),
	('Military', 'orange', 5),
	('Roadbuilding', 'green', 5),
	('Roadbuilding', 'orange', 10),
	('Mining', 'green', 5),
	('Mining', 'orange', 10),
	('Library', 'green', 10),
	('Library', 'blue', 5),
	('Mathematics', 'green', 10),
	('Mathematics', 'blue', 10),
	('Mathematics', 'yellow', 10),
	('Mathematics', 'red', 10),
	('Mathematics', 'orange', 10),
	('Democracy', 'blue', 5),
	('Democracy', 'red', 10),
	('Politics', 'blue', 10),
	('Politics', 'yellow', 5),
	('Philosophy', 'green', 5),
	('Philosophy', 'yellow', 5),
	('Trade empire', 'red', 5),
	('Trade empire', 'orange', 10),
	('Public Works', 'red', 10),
	('Public Works', 'orange', 5),
	('Monotheism', 'yellow', 10),
	('Monotheism', 'red', 5),
	('Wonder of the world', 'blue', 5),
	('Wonder of the world', 'orange', 5),
	('Anatomy', 'green', 10),
	('Anatomy', 'orange', 5),
	('Theology', 'green', 5),
	('Theology', 'yellow', 10),
	('Advanced Military', 'green', 5),
	('Advanced Military', 'red', 10),
	('Provincial Empire', 'yellow', 5),
	('Provincial Empire', 'red', 10),
	('Cultural Ascendancy', 'blue', 10),
	('Cultural Ascendancy', 'yellow', 5),
	('Diaspora', 'blue', 5),
	('Diaspora', 'yellow', 10);

insert into specific_bonuses (tech, bonus, other) values
	('Masonry'            , 10, 'Engeneering'),
	('Cloth Making'       , 10, 'Naval warfare'),
	('Pottery'            , 10, 'Agriculture'),
	('Sculpture'          , 10, 'Architecture'),
	('Empiricism'         , 10, 'Medicine'),
	('Metalworking'       , 10, 'Military'),
	('Astronomy'          , 10, 'Calendar'),
	('Mythology'          , 10, 'Literacy'),
	('Agriculture'        , 20, 'Democracy'),
	('Literacy'           , 20, 'Mathematics'),
	('Medicine'           , 20, 'Anatomy'),
	('Mysticism'          , 10, 'Monument'),
	('Written record'     , 10, 'Cartography'),
	('Urbanism'           , 10, 'Diplomacy'),
	('Monarchy'           , 10, 'Law'),
	('Drama and poetry'   , 10, 'Rhetoric'),
	('Music'              , 10, 'Enlightenment'),
	('Coinage'            , 10, 'Trade routes'),
	('Deism'              , 10, 'Fundamentalism'),
	('Theocracy'          , 10, 'Universial doctrine'),
	('Architecture'       , 20, 'Mining'),
	('Rhetoric'           , 20, 'Politics'),
	('Engeneering'        , 20, 'Roadbuilding'),
	('Cartography'        , 20, 'Library'),
	('Monument'           , 20, 'Wonder of the world'),
	('Trade routes'       , 20, 'Trade empire'),
	('Naval warfare'      , 20, 'Diaspora'),
	('Calendar'           , 20, 'Public Works'),
	('Fundamentalism'     , 20, 'Monotheism'),
	('Enlightenment'      , 20, 'Philosophy'),
	('Universial doctrine', 20, 'Theology'),
	('Diplomacy'          , 20, 'Provincial Empire'),
	('Law'                , 20, 'Cultural Ascendancy'),
	('Military'           , 20, 'Advanced Military');

commit;