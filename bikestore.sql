-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 25, 2025 at 01:46 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bikestore`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` enum('Mountain','Road','Electric') NOT NULL,
  `description` text DEFAULT NULL,
  `price` int(25) NOT NULL,
  `image_name` varchar(255) NOT NULL,
  `is_discount` tinyint(1) DEFAULT 0,
  `discount_percentage` decimal(5,2) DEFAULT 0.00,
  `original_price` int(25) DEFAULT NULL,
  `view_count` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `category`, `description`, `price`, `image_name`, `is_discount`, `discount_percentage`, `original_price`, `view_count`, `created_at`, `updated_at`) VALUES
(3, 'Colossus DH7', 'Mountain', 'The Collosus DH offers 4 geometry configurations using two flip-chips. Riders can fine-tune the bottom bracket position for either a mullet setup with a 27.5” rear wheel or a full 29er configuration. When using a smaller rear wheel, set the flip chip in its tallest position to maintain rear center height.', 44000000, 'colossusdh7.jpg', 1, 20.00, 55000000, 20, '2025-05-03 18:40:43', '2025-05-25 11:14:46'),
(5, 'SISKIU T8', 'Mountain', 'The Polygon Siskiu T series is a cutting-edge dual-suspension mountain bike, expertly crafted for trail riders seeking the perfect blend of performance and comfort. Designed to excel on challenging terrains, it has exceptional handling for both uphill climbs and exhilarating descents', 31000000, 'siskiut8.jpg\r\n', NULL, NULL, NULL, 30, '2025-05-24 21:48:39', '2025-05-25 11:40:24'),
(6, 'Syncline C5', 'Mountain', 'The Polygon Syncline C is a high-performance XC trail bike designed for riders seeking speed, control, and versatility across any terrain. Its lightweight carbon frame and optimized geometry offer exceptional handling, whether you\'re racing or exploring off-road trails', 21000000, 'synclinec5.jpg', NULL, NULL, NULL, 301, '2025-05-03 22:05:49', '2025-05-25 11:41:58'),
(7, 'Xtrada 7', 'Mountain', '\"Riding with Xtrada, feels like running as a wolf,\" they said. As an XC bike should be, Xtrada is born to run the game with you. Impeccably versatile, effortlessly fast, and obsessively comfortable. The Xtrada is a true cross country mountain bike with a geometry built for speed and stability coupled with tough, trail-ready components', 10600000, 'xtrada7.jpg', NULL, NULL, NULL, 50, '2025-05-24 22:08:27', '2025-05-25 11:40:45'),
(8, 'Premier 5', 'Mountain', 'Created for riders who want a versatile mountain bike. Built with a lightweight and durable AL6 frame with modern geometry for a more comfortable leisure ride, the Premier will keep you fall in love even more in cycling for years to come. The Premier series fit you and help you to define your mountains', 4365000, 'premier5.jpg', 1, 10.00, 4850000, 401, '2025-05-24 22:12:08', '2025-05-25 11:42:00'),
(9, 'Helios A9X Dura Ace C60', 'Road', 'The Polygon Helios A redefines performance cycling with its aerodynamic innovation and lightweight design. Built to minimize resistance and optimize efficiency, this cutting-edge road bike helps you chase new speeds and conquer the steepest climbs with ease and precision.', 80750000, 'heliosa9x.jpg', 1, 15.00, 95000000, 110, '2025-04-30 22:16:18', '2025-05-25 11:40:55'),
(10, 'Strattos S7D', 'Road', 'Elevate your cycling experience with the Polygon Strattos S ACX. Featuring a UCI-approved ACX carbon frame, this road bike offers exceptional responsiveness, smooth handling, and incredible speed. Perfect for long endurance rides or smashing personal records, it’s engineered to help you perform at your peak.', 19300000, 'strattoss7.jpg', NULL, NULL, NULL, 0, '2025-05-24 22:22:53', '2025-05-25 11:14:46'),
(11, 'Primum Pro SE', 'Road', 'PRIMUM PRO SE is equipped with carbon rims from Syte and hubs with 2 bearings on the front hub and 4 bearings on the rear hub. To glide on asphalt surfaces, this road bike uses Detonator 700x28C tires, made by Maxxis. Not only on the frame and fork, lightweight carbon material is also used on other parts, such as the aero-designed seatpost and handlebar.', 35750000, 'primumprose.jpg', NULL, NULL, NULL, 98, '2025-05-24 22:27:55', '2025-05-25 11:42:45'),
(12, 'Strattos S4', 'Road', 'The Polygon Strattos S is your gateway to unforgettable road cycling adventures. Designed with a lightweight ALX alloy frame and a vibration-damping carbon fork, it offers the perfect balance of comfort, performance, and style for both casual riders and competitive racers.', 10600000, 'strattoss4.jpg', NULL, NULL, NULL, 40, '2025-05-24 22:30:40', '2025-05-25 11:41:03'),
(13, 'Strattos S3', 'Road', 'The Polygon Strattos S is your gateway to unforgettable road cycling adventures. Designed with a lightweight ALX alloy frame and a vibration-damping carbon fork, it offers the perfect balance of comfort, performance, and style for both casual riders and competitive racers.', 7800000, 'strattoss3.jpg', NULL, NULL, NULL, 101, '2025-05-03 22:38:49', '2025-05-25 11:40:11'),
(14, 'Collosus TLE 0 AXS', 'Electric', 'We’re proud to unveil the latest evolution in our lineup: the Collosus TLE. Born from a passion to push the limits of our Collosus platform, the TLE was designed to elevate the trail experience for riders like you.', 92000000, 'colossustle0.jpg', 1, 20.00, 115000000, 212, '2025-05-03 22:41:31', '2025-05-25 11:43:03'),
(15, 'Tambora AE GX', 'Electric', 'Our new evolution in gravel bike! Inspired by the Tambora gravel to all-road series, the new Polygon Tambora gravel e-bike will unlock more power at any terrain, any speed with the BOSCH e-bike system', 56000000, 'tamboraae.jpg', 1, 30.00, 80000000, 10, '2025-05-24 22:45:52', '2025-05-25 11:42:29'),
(16, 'Siskiu HE (Bosch)', 'Electric', 'Why limit ourselves when we can blend exceptional convenience and sport in one extraordinary bike? The new e-SUV Siskiu HE series is a perfect combination of leisurely traverse urban city, swiftly hovering countryside, and everything in between', 60800000, 'siskiuhe.jpg', 1, 5.00, 64000000, 87, '2025-05-03 22:46:48', '2025-05-25 11:42:21'),
(17, 'Kalosi Lanes Prime', 'Electric', 'Whether it\'s way back home or way far from home, you can always choose who\'s gonna accompany you in the journey. So what\'s yours?', 36000000, 'kalosilanes.jpg', NULL, NULL, NULL, 91, '2025-05-24 22:50:08', '2025-05-25 11:42:12'),
(18, 'Gili Fitte', 'Electric', 'Mini velo e-Bike with smart features; an upgraded pedal assist system to multiply your power and its smart battery management system (BMS) that provides a longer battery lifetime and takes you farther.', 13500000, 'gilifitte.jpg', NULL, NULL, NULL, 57, '2025-05-22 22:50:46', '2025-05-25 11:41:11'),
(19, 'Gili Velo', 'Electric', 'Mini velo e-Bike with smart features; an upgraded pedal assist system to multiply your power and its smart battery management system (BMS) that provides a longer battery lifetime and takes you farther.', 12800000, 'gilivelo.jpg', NULL, NULL, NULL, 140, '2025-05-24 22:53:31', '2025-05-25 11:41:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_category` (`category`),
  ADD KEY `idx_discount` (`is_discount`),
  ADD KEY `idx_created_at` (`created_at`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
