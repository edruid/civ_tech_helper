function addClickHandler(elem, name) {
	elem.addEventListener('click', function(e) {
		civ.buy(name)
	}, false);
}
Civ = function() {
}
Civ.prototype = {
	techs: {},
	color_cards: {
		'green': new Array(),
		'blue': new Array(),
		'yellow': new Array(),
		'red': new Array(),
		'orange': new Array()
	},
	colors: {
		'green': 0,
		'blue': 0,
		'yellow': 0,
		'red': 0,
		'orange': 0
	},
	special_bonuses: {},

	add_tech: function(price, cols, name, bonuses, special_bonus) {
		var tech = {
			price: price,
			curr_price: price,
			spec_bonus: 0,
			colors: cols,
			name: name,
			bonuses: bonuses,
			special_bonus: special_bonus,
			bought: false
		}
		for(var c in tech.colors) {
			c = tech.colors[c]
			if(this.color_cards[c] == null) {
				alert("Not a color: " + c + " for " + name)
			}
			this.color_cards[c].push(tech.name)
		}
		if(this.techs[name] != null) {
			alert("Duplicate declaration of " + name)
		}
		this.techs[name] = tech
		if(special_bonus != null) {
			this.special_bonuses[special_bonus.name] = special_bonus.value
		}
	},

	cart: function() {
		var cbs = document.forms["techs"]["buy[]"]
		var sum = 0
		for(var i in cbs) {
			cb = cbs[i]
			if(cb && cb.checked) {
				console.log(cb.value)
				var t = this.techs[cb.value]
				sum += t.curr_price
			}
		}
		var sum_field = document.getElementById('sum')
		sum_field.innerHTML = sum
		console.log('sum: ' + sum)
	},

	purchase: function() {
		var cbs = document.forms["techs"]["buy[]"]
		for(var i in cbs) {
			cb = cbs[i]
			if(cb && cb.checked) {
				console.log("purchase: " + cb.value)
				this.buy(cb.value)
			}
		}
		this.cart()
	},

	buy: function(name) {
		var t = this.techs[name]
		if(t.bought) {
			return null
		}
		for(var color in t.bonuses) {
			this.colors[color] += t.bonuses[color]
		}
		for(var color in t.bonuses) {
			for(var i in this.color_cards[color]) {
				var name = this.color_cards[color][i]
				tech = this.techs[name]
				var b = 0
				for(var i in tech.colors) {
					b = Math.max(b, this.colors[tech.colors[i]])
				}
				this.techs[name].curr_price = tech.price - b - tech.spec_bonus
			}
		}
		if(t.special_bonus) {
			tech = this.techs[t.special_bonus.name]
			if(tech == null) {
				alert("missing tech " + t.special_bonus.name + " referensed by " + t.name)
			}
			tech.spec_bonus += t.special_bonus.value
			tech.curr_price -= t.special_bonus.value
		}
		t.bought = true
		this.refresh()
//		this.print()
	},

	refresh: function() {
		for(var c in this.colors) {
			document.getElementById(c).innerHTML = this.colors[c]
		}
		for(var name in this.techs) {
			var curr = document.getElementById(name)
			var t = this.techs[name]
			curr.innerHTML = t.curr_price
			if(t.bought) {
				document.getElementById(name + '-buy').innerHTML = 'bought'
			}
		}
	},

	print: function() {
		for(var c in this.colors) {
			document.getElementById(c).innerHTML = this.colors[c]
		}

		tbody = document.getElementById('techlist')
		while(tbody.hasChildNodes()) {
			tbody.removeChild(tbody.firstChild)
		}

		for(var name in this.techs) {
			var t = this.techs[name]
			var tr = document.createElement('tr')
			var td

			td = document.createElement('td')
			if(t.bought) {
				button = document.createTextNode('bought')
			} else {
				button = document.createElement('input')
				button.type = 'checkbox'
				button.name = 'buy[]'
				button.value = t.name
				button.addEventListener('change', function() {
					civ.cart()
				})
			}
			td.id = name + '-buy'
			td.appendChild(button)
			tr.appendChild(td)

			td = document.createElement('td')
			td.appendChild(document.createTextNode(t.curr_price))
			td.id = name
			tr.appendChild(td)

			td = document.createElement('td')
			td.appendChild(document.createTextNode(t.price))
			tr.appendChild(td)

			td = document.createElement('td')
			td.appendChild(document.createTextNode(t.name))
			tr.appendChild(td)

			td = document.createElement('td')
			for(var k in t.colors) {
				var span = document.createElement('span')
				span.style = 'margin: 2px; background-color: ' + t.colors[k]
				span.title = t.colors[k]
				span.appendChild(document.createTextNode(t.colors[k][0]))
				td.appendChild(span)
			}
			tr.appendChild(td)

			td = document.createElement('td')
			var bonus = []
			for(var k in t.bonuses) {
				var span = document.createElement('span')
				span.style = 'margin: 2px; background-color: ' + k
				span.title = k
				span.appendChild(document.createTextNode(k[0]+t.bonuses[k]+' '))
				td.appendChild(span)
			}
			td.appendChild(document.createTextNode(bonus.join(', ')))
			tr.appendChild(td)

			td = document.createElement('td')
			var spec = ''
			if(t.special_bonus != null) {
				spec = t.special_bonus.name + ': ' + t.special_bonus.value
			}
			td.appendChild(document.createTextNode(spec))
			tr.appendChild(td)

			tbody.appendChild(tr)
		}
	}
}
civ = new Civ()
/*Civ.add_tech( 60, ['orange'],           'Masonry'            , {'green':  5,                                      'orange': 10}, { value: 10, name: 'Engeneering'})
Civ.add_tech( 50, ['orange'],           'Cloth Making'       , {             'blue':  5,                          'orange': 10}, { value: 10, name: 'Naval warfare'})
Civ.add_tech( 60, ['orange'],           'Pottery'            , {             'blue':  5,                          'orange': 10}, { value: 10, name: 'Agriculture'})
Civ.add_tech( 50, ['blue']  ,           'Sculpture'          , {             'blue': 10,               'red':  5              }, { value: 10, name: 'Architecture'})
Civ.add_tech( 60, ['green'] ,           'Empiricism'         , {'green': 10, 'blue':  5, 'yellow':  5, 'red':  5, 'orange':  5}, { value: 10, name: 'Medicine'})
Civ.add_tech( 90, ['orange'],           'Metalworking'       , {'green':  5,                                      'orange': 10}, { value: 10, name: 'Military'})
Civ.add_tech( 80, ['green'] ,           'Astronomy'          , {'green': 10,             'yellow':  5                         }, { value: 10, name: 'Calendar'})
Civ.add_tech( 60, ['red'],              'Mythology'          , {             'blue':  5, 'yellow': 10                         }, { value: 10, name: 'Literacy'})
Civ.add_tech(120, ['orange'],           'Agriculture'        , {'green':  5,                                      'orange': 10}, { value: 20, name: 'Democracy'})
Civ.add_tech(110, ['blue', 'red'],      'Literacy'           , {'green':  5, 'blue': 10, 'yellow':  5, 'red': 10, 'orange':  5}, { value: 20, name: 'Mathematics'})
Civ.add_tech(140, ['green'] ,           'Medicine'           , {'green': 10,                                      'orange':  5}, { value: 20, name: 'Anatomy'})
Civ.add_tech( 50, ['blue', 'yellow'],   'Mysticism'          , {             'blue':  5, 'yellow':  5                         }, { value: 10, name: 'Monument'})
Civ.add_tech( 60, ['green', 'red'],     'Written record'     , {'green':  5,                           'red':  5              }, { value: 10, name: 'Cartography'})
Civ.add_tech( 50, ['red'],              'Urbanism'           , {'green':  5,                           'red': 10              }, { value: 10, name: 'Diplomacy'})
Civ.add_tech( 60, ['red'],              'Monarchy'           , {                         'yellow':  5, 'red': 10              }, { value: 10, name: 'Law'})
Civ.add_tech( 80, ['blue']  ,           'Drama and poetry'   , {             'blue': 10, 'yellow':  5                         }, { value: 10, name: 'Rhetoric'})
Civ.add_tech( 80, ['blue']  ,           'Music'              , {             'blue': 10, 'yellow':  5                         }, { value: 10, name: 'Enlightenment'})
Civ.add_tech( 90, ['green'] ,           'Coinage'            , {'green': 10,                           'red':  5              }, { value: 10, name: 'Trade routes'})
Civ.add_tech( 80, ['red'],              'Deism'              , {                         'yellow': 10,            'orange':  5}, { value: 10, name: 'Fundamentalism'})
Civ.add_tech( 80, ['yellow', 'red'],    'Theocracy'          , {                         'yellow':  5, 'red':  5              }, { value: 10, name: 'Universial doctrine'})
Civ.add_tech(140, ['blue']  ,           'Architecture'       , {'green':  5, 'blue': 10                                       }, { value: 20, name: 'Mining'})
Civ.add_tech(130, ['blue']  ,           'Rhetoric'           , {             'blue': 10,               'red':  5              }, { value: 20, name: 'Politics'})
Civ.add_tech(160, ['green', 'orange'],  'Engeneering'        , {'green':  5,                                      'orange':  5}, { value: 20, name: 'Roadbuilding'})
Civ.add_tech(160, ['green'] ,           'Cartography'        , {'green': 10, 'blue':  5                                       }, { value: 20, name: 'Library'})
Civ.add_tech(180, ['yellow', 'orange'], 'Monument'           , {                         'yellow':  5,            'orange':  5}, { value: 20, name: 'Wonder of the world'})
Civ.add_tech(180, ['orange'],           'Trade routes'       , {                         'yellow':  5,            'orange': 10}, { value: 20, name: 'Trade empire'})
Civ.add_tech(160, ['red'],              'Naval warfare'      , {                                       'red': 10, 'orange':  5}, { value: 20, name: 'Diaspora'})
Civ.add_tech(180, ['green'] ,           'Calendar'           , {'green': 10,                           'red':  5              }, { value: 20, name: 'Public Works'})
Civ.add_tech(150, ['red'],              'Fundamentalism'     , {             'blue':  5, 'yellow': 10                         }, { value: 20, name: 'Monotheism'})
Civ.add_tech(160, ['red'],              'Enlightenment'      , {                         'yellow': 10,            'orange':  5}, { value: 20, name: 'Philosophy'})
Civ.add_tech(160, ['red'],              'Universial doctrine', {                         'yellow': 10, 'red':  5              }, { value: 20, name: 'Theology'})
Civ.add_tech(180, ['blue']  ,           'Diplomacy'          , {             'blue': 10,               'red':  5              }, { value: 20, name: 'Provincial Empire'})
Civ.add_tech(170, ['red'],              'Law'                , {                         'yellow':  5, 'red': 10              }, { value: 20, name: 'Cultural Ascendancy'})
Civ.add_tech(170, ['red'],              'Military'           , {                                       'red': 10, 'orange':  5}, { value: 20, name: 'Advanced Military'})
Civ.add_tech(220, ['orange'],           'Roadbuilding'       , {'green':  5,                                      'orange': 10}, null)
Civ.add_tech(230, ['orange'],           'Mining'             , {'green':  5,                                      'orange': 10}, null)
Civ.add_tech(220, ['green'] ,           'Library'            , {'green': 10, 'blue':  5                                       }, null)
Civ.add_tech(240, ['green', 'blue'],    'Mathematics'        , {'green': 10, 'blue': 10, 'yellow': 10, 'red': 10, 'orange': 10}, null)
Civ.add_tech(220, ['red'],              'Democracy'          , {             'blue':  5,               'red': 10              }, null)
Civ.add_tech(230, ['blue']  ,           'Politics'           , {             'blue': 10, 'yellow':  5                         }, null)
Civ.add_tech(240, ['green', 'yellow'],  'Philosophy'         , {'green':  5,             'yellow':  5                         }, null)
Civ.add_tech(260, ['orange'],           'Trade empire'       , {                                       'red':  5, 'orange': 10}, null)
Civ.add_tech(230, ['red'],              'Public Works'       , {                                       'red': 10, 'orange':  5}, null)
Civ.add_tech(240, ['red'],              'Monotheism'         , {                         'yellow': 10, 'red':  5              }, null)
Civ.add_tech(280, ['blue', 'orange'],   'Wonder of the world', {             'blue':  5,                          'orange':  5}, null)
Civ.add_tech(270, ['green'] ,           'Anatomy'            , {'green': 10,                                      'orange':  5}, null)
Civ.add_tech(250, ['red'],              'Theology'           , {'green':  5,             'yellow': 10                         }, null)
Civ.add_tech(260, ['red'],              'Advanced Military'  , {'green':  5,                           'red': 10              }, null)
Civ.add_tech(260, ['red'],              'Provincial Empire'  , {                         'yellow':  5, 'red': 10              }, null)
Civ.add_tech(280, ['blue']  ,           'Cultural Ascendancy', {             'blue': 10, 'yellow':  5                         }, null)
Civ.add_tech(270, ['red'],              'Diaspora'           , {             'blue':  5, 'yellow': 10                         }, null)
*/
