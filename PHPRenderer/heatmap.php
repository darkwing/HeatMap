<?php
	/* load  */
	if(isset($_GET['load'])) {
	
		/* vars */
		$spots = array();
	
		/* connect to the db */
		$connection = mysql_connect('localhost','dbuser','dbpass');
		mysql_select_db('dbname',$connection);
	
		/* get spots */
		$query = 'SELECT * FROM example_heatmap WHERE zone = \''.mysql_escape_string($_GET['zone']).'\' LIMIT 2000';
		$result = mysql_query($query,$connection);
		while($record = mysql_fetch_assoc($result)) {
			$spots[] = $record;
		}
	
		/* close db connection */
		mysql_close($connection);
	
		/* return result */
		$json = json_encode($spots);
		echo $json;
		die();
	}
	/* save */
	elseif(isset($_GET['save']) && isset($_GET['data']) && count($_GET['data'])) {
	
		/* vars */
		$query = 'INSERT INTO example_heatmap (zone,x,y,date_clicked) VALUES ';
		$queryRecords = array();
		$records = 0;
	
		/* connect to the db */
		$connection = mysql_connect('localhost','dbuser','dbpass');
		mysql_select_db('dbname',$connection);
	
		/* save! */
		foreach($_GET['data'] as $data) {
			$queryRecords[] =  '(\''.mysql_escape_string($_GET['zone']).'\','.mysql_escape_string($data['x']).','.mysql_escape_string($data['y']).',NOW())';
			$records++;
		}
	
		/* execute query, close */
		$query.= implode(',',$queryRecords);
		mysql_query($query,$connection);
		mysql_close($connection);
	
		/* return result */
		die(count($records));
	}
?>