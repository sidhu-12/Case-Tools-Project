<?php
$conn=mysqli_connect("localhost","root","","sqlinject");
$uid=$_POST['username'];
    $pass=$_POST['password'];
$query="SELECT count(*) as count from users where userid='$uid' and pass='$pass'";
        $result=mysqli_query($conn,$query);
        if(mysqli_num_rows($result)>0){
            $rows=mysqli_fetch_assoc($result);
            if($rows['count']>0){
            $_SESSION['success']="You are logged in";
            $_SESSION['username']=$rows['userid'];
            $_SESSION['name']=$rows['name'];
            setcookie("username",$rows['userid'],0);
           header('location: hello.php');

        }
        else{
            $_SESSION['error1']="Mail Id not verified";
            array_push($errors,'Mail Id not verified');
            header('location: hello2.php');
        }
    }
    
       ?>
