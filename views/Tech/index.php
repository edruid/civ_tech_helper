<table>
	<thead>
		<tr>
			<?php foreach($colors as $color): ?>
				<th><?= $color ?></th>
			<?php endforeach ?>
		</tr>
	</thead>
</table>

<table id="techs">
	<thead>
		<th onclick="sort.sort(0)">Buy</th>
		<th onclick="sort.sort(1, sort.numericComparator)">Curr Price</th>
		<th onclick="sort.sort(2, sort.numericComparator)">Price</th>
		<th onclick="sort.sort(3)">Name</th>
		<th onclick="sort.sort(4)">Colors</th>
		<th onclick="sort.sort(5)">Bonuses</th>
		<th onclick="sort.sort(6)">spec Bonus</th>
	</thead>
	<tbody id="techlist">
		<tr><td>hej</td></tr>
	</tbody>
</body>
<script>
	<?php foreach($techs as $tech): ?>
		Civ.add_tech(
			<?= $tech->cost ?>,
			[
				<?php foreach($tech->TechColor as $color): ?>
					<?= $color ?>,
				<?php endforeach ?>
			],
			'<?= $tech->name ?>',
			{
				<?php foreach($tech->ColorBonus as $color): ?>
					'<?= $color->color ?>': <?= $color->bonus ?>,
				<?php endforeach ?>
			},
			<?php if($bonus = $tech->SpecificBonus): ?>
				{
					value: <?= $bonus->bonus ?>,
					name: '<?= $bonus->other ?>'
				}
			<?php else: ?>
				null
			<?php endif ?>
		)
	<?php endforeach ?>
		
	Civ.print()
	var sort = new Sort();
	sort.table = document.getElementById('techs')
</script>
		
