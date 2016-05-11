<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="This is the home page for CMPE272 project">
    <meta name="author" content="Alvin Ko">
    <link rel="icon" href="favicon.ico">

    <title>Home</title>

    <!-- Bootstrap core CSS -->
    <link href="bootstrap/dist/css/bootstrap.min.css" rel="stylesheet"> <!--change here-->

    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <link href="assets/css/ie10-viewport-bug-workaround.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="bootstrap/custom/jumbotron.css" rel="stylesheet"><!--change here-->

    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="assets/js/ie-emulation-modes-warning.js"></script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="index.php">Project SF Transit Map</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="about.php">About</a></li>
            <li><a href="contact.php">Contact</a></li>
            <li><a href="map.html">Map</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
      </div>
    </nav>

    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="container">
      <div class="jumbotron">
        <div class= "trans">
        <h1>Welcome to</h1>
        <p>Project SF Transit Time</p>
        <p><a class="btn btn-primary btn-lg" href="about.php" role="button">Learn more &raquo;</a></p>
      </div>
      </div>
    </div>

    <div class="container">
      <!-- Example row of columns -->
      <hr class="featurette-divider">
      <div class="row">
        <div class="col-md-4">
          <h2>About</h2>
          <p>Project SF Transit Time displays a map of SF and shows the user the travel time from a selected point of origin to everywhere else within the city. </p>
          <p><a class="btn btn-default" href="about.php" role="button">View details &raquo;</a></p>
        </div>
        <div class="col-md-4">
          <h2>Contact</h2>
          <p>This project was founded in the Enterprise Software Platforms class at SJSU. Project SF Transit Time members are: Dora Jia, Alvin Ko, Miao Shi, Tang Wei</p>
          <p><a class="btn btn-default" href="contact.php" role="button">View details &raquo;</a></p>
       </div>
        <div class="col-md-4">
          <h2>Map</h2>
          <p>We at Project SF Transit Time hope that you appreciate the dedication we put into this site. Click on the button below to get started.</p>
          <p><a class="btn btn-default" href="map.html" role="button">View details &raquo;</a></p>
        </div>
      </div>

      <hr>

      <footer>
        <p class="pull-right"><a href="#">Back to top</a></p>
        <p>&copy; 2016 Project SF Transit Time &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
      </footer>
    </div> <!-- /container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="assets/js/vendor/jquery.min.js"><\/script>')</script>
    <script src="dist/js/bootstrap.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="assets/js/ie10-viewport-bug-workaround.js"></script>
  </body>
</html>
