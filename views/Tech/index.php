<table>
	<thead>
		<tr>
			<?php foreach($colors as $color): ?>
				<th style="background-color: <?=$color?>"><?= $color ?></th>
			<?php endforeach ?>
		</tr>
	</thead>
	<tbody>
		<tr>
			<?php foreach($colors as $color): ?>
				<td id="<?=$color?>"></td>
			<?php endforeach ?>
		</tr>
	</tbody>
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
		<tr><td>You need javascript for this calculator</td></tr>
	</tbody>
</body>
<script type="text/javascript">
	window.onload = function () {
	console.log("printing techs")
	<?php foreach($techs as $tech): ?>
		civ.add_tech(
			<?= $tech->cost ?>,
			[
				<?php foreach($tech->TechColor as $color): ?>
					'<?= $color ?>',
				<?php endforeach ?>
			],
			'<?= $tech->tech ?>',
			{
				<?php foreach($tech->ColorBonus as $color): ?>
					'<?= $color->color ?>': <?= $color->bonus ?>,
				<?php endforeach ?>
			},
			<?php $bonus = $tech->SpecificBonus ?>
			<?php if(count($bonus) > 0): ?>
				<?php $bonus = $bonus[0] ?>
				{
					value: <?= $bonus->bonus ?>,
					name: '<?= $bonus->other ?>'
				}
			<?php else: ?>
				null
			<?php endif ?>
		)
	<?php endforeach ?>
	civ.print()
	}
		
	var sort = new Sort()
	sort.table = document.getElementById('techs')
</script>
		
