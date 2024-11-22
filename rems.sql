-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 13, 2020 at 05:06 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rems`
--

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `user` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`user`, `pass`) VALUES
('arshath', 'ars'),
('kawin', 'star'),
('lalith', '123'),
('muthu', 'car'),
('pothi', '789'),
('sidharth', 'jkl'),
('venkat', 'game'),
('vicky', 'dio');

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `regno` int(10) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `value` int(10) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`regno`, `owner`, `location`, `image`, `value`, `type`, `status`) VALUES
(100, 'kawin', 'chennai', 'p1.jpg', 9000, 'sell', 'available'),
(101, 'sidharth', 'porur', 'p2.jpg', 7000, 'rent', 'available'),
(103, 'venkat', 'mylapore', 'p3.jpg', 5000, 'auction', 'available'),
(104, 'arshath', 'guindy', 'p4.jpg', 9000, 'auction', 'available'),
(201, 'muthu', 'tambaram', 'p12.jpg', 8000, 'sell', 'available'),
(306, 'pothi', 'velachery', 'p6.jpg', 10000, 'rent', 'available'),
(501, 'lalith', 'guindy', 'p9.jpg', 6000, 'sell', 'available');

-- --------------------------------------------------------

--
-- Table structure for table `sold`
--

CREATE TABLE `sold` (
  `seller` varchar(255) NOT NULL,
  `buyer` varchar(255) NOT NULL,
  `sold_price` int(10) NOT NULL,
  `regno` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact_no` varchar(10) DEFAULT NULL,
  `card_no` varchar(16) DEFAULT NULL,
  `cvv` int(3) NOT NULL,
  `flag` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `email`, `contact_no`, `card_no`, `cvv`, `flag`) VALUES
('arshath', 'ars@mail', '9871625341', '4111190530212957', 452, 0),
('kawin', 'kawin@mail', '9444555237', '4916464052747741', 234, 0),
('lalith', 'lal@mail', '8725634512', '4033891433336901', 516, 0),
('muthu', 'muthu@mail', '9874639578', '4892509856728765', 539, 0),
('pothi', 'pothi@mail', '9386090289', '4882978889718450', 497, 0),
('sidharth', 'sid@gmail', '7200823451', '4556914161888096', 612, 0),
('venkat', 'venkat@mail', '9867534213', '4485245536701714', 961, 0),
('vicky', 'vicky@mail', '9673592817', '4556184059180887', 372, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`user`);

--
-- Indexes for table `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`regno`);

--
-- Indexes for table `sold`
--
ALTER TABLE `sold`
  ADD PRIMARY KEY (`regno`,`buyer`,`seller`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sold`
--
ALTER TABLE `sold`
  ADD CONSTRAINT `sold_ibfk_1` FOREIGN KEY (`regno`) REFERENCES `property` (`regno`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
