-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 10, 2026 at 11:15 AM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `osms`
--

-- --------------------------------------------------------

--
-- Table structure for table `billing_periods`
--

CREATE TABLE `billing_periods` (
  `id` int(11) NOT NULL,
  `ctrl_num` varchar(100) NOT NULL,
  `sc_id` int(11) NOT NULL,
  `bt_id` int(11) NOT NULL,
  `order_num` int(11) NOT NULL,
  `datetime_actioned` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `remarks` text,
  `total_payment` double DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `datetime_due` date DEFAULT NULL,
  `datetime_submit` datetime DEFAULT NULL,
  `uploaded_file` varchar(255) DEFAULT NULL,
  `total_utilized` double DEFAULT NULL,
  `total_unutilized` double DEFAULT NULL,
  `total_dropped` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `billing_periods`
--

INSERT INTO `billing_periods` (`id`, `ctrl_num`, `sc_id`, `bt_id`, `order_num`, `datetime_actioned`, `status`, `remarks`, `total_payment`, `user_id`, `datetime_due`, `datetime_submit`, `uploaded_file`, `total_utilized`, `total_unutilized`, `total_dropped`) VALUES
(62, 'PQM-123-00001', 8, 19, 1, '2025-08-27 09:36:01', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2025-08-27T09:36:01.952Z\"}]', 10000, 11, '2025-09-05', '2025-08-27 17:35:07', 'PQM-123-00001_50% TSF.xlsx', 10000, 0, 10),
(63, 'PQM-123-00001', 8, 18, 2, '2025-08-27 09:37:35', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2025-08-27T09:37:35.934Z\"}]', 25000, 11, '2025-10-16', '2025-08-27 17:37:11', 'PQM-123-00001_Full TSF.xlsx', 25000, 0, 10),
(64, 'PQM-123-00001', 8, 20, 3, '2025-08-27 09:39:04', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2025-08-27T09:39:04.642Z\"}]', 50000, 11, '2025-10-16', '2025-08-27 17:38:40', 'PQM-123-00001_TC.xlsx', 50000, 0, 7),
(65, 'PQM-123-00001', 8, 30, 4, '2025-08-27 09:40:38', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2025-08-27T09:40:38.179Z\"}]', 60000, 11, '2025-10-16', '2025-08-27 17:40:06', 'PQM-123-00001_EC.xlsx', 58993, 1007, 3),
(66, 'PQM-123-00002', 8, 19, 1, '2025-08-27 09:35:56', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2025-08-27T09:35:56.757Z\"}]', 30000, 11, '2025-09-08', '2025-08-27 17:34:48', 'PQM-123-00002_50% TSF.xlsx', 28000, 2000, 0),
(67, 'PQM-123-00002', 8, 18, 2, '2025-08-27 09:37:29', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2025-08-27T09:37:29.300Z\"}]', 50000, 11, '2025-10-17', '2025-08-27 17:36:40', 'PQM-123-00002_Full TSF.xlsx', 48000, 2000, 10),
(68, 'PQM-123-00002', 8, 20, 3, '2025-08-27 09:38:55', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2025-08-27T09:38:55.200Z\"}]', 60000, 11, '2025-10-17', '2025-08-27 17:38:24', 'PQM-123-00002_TC.xlsx', 55000, 5000, 23),
(69, 'PQM-123-00002', 8, 30, 4, '2025-08-27 09:40:32', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2025-08-27T09:40:32.066Z\"}]', 40000, 11, '2025-10-17', '2025-08-27 17:39:46', 'PQM-123-00002_EC.xlsx', 37899, 2101, 10),
(70, 'PQM-123-00003', 4, 19, 1, '2025-08-27 09:35:50', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2025-08-27T09:35:50.382Z\"}]', 10000, 11, '2025-09-09', '2025-08-27 17:33:05', 'PQM-123-00003_50% TSF.xlsx', 10000, 0, 0),
(71, 'PQM-123-00003', 4, 18, 2, '2025-08-27 09:37:22', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2025-08-27T09:37:22.420Z\"}]', 20000, 11, '2025-10-20', '2025-08-27 17:36:19', 'PQM-123-00003_Full TSF.xlsx', 20000, 0, 0),
(72, 'PQM-123-00003', 4, 20, 3, '2025-08-27 09:38:48', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2025-08-27T09:38:48.211Z\"}]', 30000, 11, '2025-10-20', '2025-08-27 17:38:04', 'PQM-123-00003_TC.xlsx', 30000, 0, 12),
(73, 'PQM-123-00003', 4, 30, 4, '2025-08-27 09:40:23', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2025-08-27T09:40:23.101Z\"}]', 25000, 11, '2025-10-20', '2025-08-27 17:39:22', 'PQM-123-00003_EC.xlsx', 25000, 0, 4),
(74, 'PQM-123-00003', 4, 21, 5, '2025-08-27 09:41:37', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2025-08-27T09:41:37.986Z\"}]', 40000, 11, '2025-10-29', '2025-08-27 17:41:24', 'PQM-123-00003_AC.xlsx', 39000, 1000, 2),
(75, 'PQM-123-00005', 8, 19, 1, '2025-08-27 09:49:35', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2025-08-27T09:49:35.233Z\"}]', 5000, 12, '2025-09-08', '2025-08-27 17:49:17', 'PQM-123-00005_50% TSF.xlsx', 5000, 0, 10),
(76, 'PQM-123-00005', 8, 18, 2, '2025-08-27 09:50:18', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2025-08-27T09:50:18.698Z\"}]', 10000, 12, '2025-10-17', '2025-08-27 17:50:02', 'PQM-123-00005_Full TSF.xlsx', 10000, 0, 0),
(77, 'PQM-123-00005', 8, 20, 3, '2025-08-27 09:51:09', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2025-08-27T09:51:09.694Z\"}]', 15000, 12, '2025-10-17', '2025-08-27 17:50:55', 'PQM-123-00005_TC.xlsx', 14888, 112, 1),
(78, 'PQM-123-00005', 8, 30, 4, NULL, 0, NULL, 15000, 12, '2025-10-17', '2025-08-27 17:51:42', 'PQM-123-00005_EC.xlsx', 14000, 1000, 0),
(79, 'PQM-123-00006', 4, 19, 1, '2025-08-27 09:49:27', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2025-08-27T09:49:27.017Z\"}]', 15000, 12, '2025-09-05', '2025-08-27 17:49:04', 'PQM-123-00006_50% TSF.xlsx', 15000, 0, 10),
(80, 'PQM-123-00006', 4, 18, 2, '2025-08-27 09:50:12', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2025-08-27T09:50:12.256Z\"}]', 30000, 12, '2025-10-16', '2025-08-27 17:49:51', 'PQM-123-00006_Full TSF.xlsx', 30000, 0, 0),
(81, 'PQM-123-00006', 4, 20, 3, '2025-08-27 09:51:03', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2025-08-27T09:51:03.929Z\"}]', 15000, 12, '2025-10-16', '2025-08-27 17:50:36', 'PQM-123-00006_TC.xlsx', 15000, 0, 3),
(82, 'PQM-123-00006', 4, 30, 4, '2025-08-27 09:51:50', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2025-08-27T09:51:50.604Z\"}]', 10000, 12, '2025-10-16', '2025-08-27 17:51:26', 'PQM-123-00006_EC.xlsx', 10000, 0, 1),
(83, 'PQM-123-00006', 4, 21, 5, '2025-08-27 09:53:31', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2025-08-27T09:53:31.009Z\"}]', 10000, 12, '2025-10-27', '2025-08-27 17:53:20', 'PQM-123-00006_AC.xlsx', 8000, 2000, 10),
(84, 'adsaasd', 2, 19, 1, NULL, NULL, NULL, 20000, NULL, '2025-10-31', NULL, NULL, NULL, NULL, NULL),
(85, 'adsaasd', 2, 18, 2, NULL, NULL, NULL, 40000, NULL, '2025-12-11', NULL, NULL, NULL, NULL, NULL),
(86, 'adsaasd', 2, 20, 3, NULL, NULL, NULL, 30000, NULL, '2025-12-11', NULL, NULL, NULL, NULL, NULL),
(87, 'adsaasd', 2, 21, 4, NULL, NULL, NULL, 20000, NULL, '2025-12-22', NULL, NULL, NULL, NULL, NULL),
(88, 'RQM-TTSP-2025-0001', 5, 19, 1, '2025-10-28 17:00:32', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2025-10-28 17:0:32\"}]', 62500, 20, '2025-04-18', '2025-10-28 03:25:30', NULL, 62500, NULL, NULL),
(89, 'RQM-TTSP-2025-0001', 5, 18, 2, '2026-02-20 01:51:01', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2026-2-20 1:51:1\"}]', 62500, 20, '2025-06-02', '2025-10-28 17:14:10', NULL, 62500, 0, 2),
(91, 'RQM-TTSP-2025-0001', 5, 20, 3, NULL, NULL, NULL, 62500, NULL, '2025-06-02', NULL, NULL, NULL, NULL, NULL),
(92, 'RQM-TTSP-2025-0002', 5, 19, 1, '2026-02-15 03:47:24', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2026-2-15 3:47:24\"}]', 62500, 20, '2025-04-18', '2025-10-28 17:51:26', NULL, 62500, 0, 0),
(93, 'RQM-TTSP-2025-0002', 5, 18, 2, NULL, NULL, NULL, 62500, NULL, '2025-06-02', NULL, NULL, NULL, NULL, NULL),
(94, 'RQM-TTSP-2025-0002', 5, 20, 3, NULL, NULL, NULL, 584775, NULL, '2025-06-02', NULL, NULL, NULL, NULL, NULL),
(95, 'TEST RQM-TTSP-2025-0003', 5, 19, 1, NULL, NULL, NULL, 10000, NULL, '2025-11-25', NULL, NULL, NULL, NULL, NULL),
(96, 'TEST RQM-TTSP-2025-0003', 5, 18, 2, NULL, NULL, NULL, 20000, NULL, '2026-01-07', NULL, NULL, NULL, NULL, NULL),
(97, 'TEST RQM-TTSP-2025-0003', 5, 20, 3, NULL, NULL, NULL, 30000, NULL, '2026-01-07', NULL, NULL, NULL, NULL, NULL),
(110, 'TEST 1', 5, 19, 1, '2025-11-17 17:46:38', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Revised\",\"datetime_added\":\"2025-11-17 17:33:32\"},{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"ok na\",\"status\":\"Completed\",\"datetime_added\":\"2025-11-17 17:46:38\"}]', 62500, 20, '2025-11-26', '2025-11-17 17:36:45', NULL, 60000, 2500, 1),
(111, 'TEST 1', 5, 18, 2, '2025-11-17 17:59:54', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"ok\",\"status\":\"Completed\",\"datetime_added\":\"2025-11-17 17:59:54\"}]', 62500, 20, '2026-01-08', '2025-11-17 17:59:10', NULL, 57500, 5000, 2),
(112, 'TEST 1', 5, 20, 3, '2025-11-17 22:33:17', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"ok\",\"status\":\"Completed\",\"datetime_added\":\"2025-11-17 22:33:17\"}]', 584775, 20, '2026-01-16', '2025-11-17 22:14:20', NULL, 491211, 93564, 4),
(113, 'TEST 2', 5, 19, 1, NULL, NULL, NULL, 10000, NULL, '2025-11-25', NULL, NULL, NULL, NULL, NULL),
(114, 'TEST 2', 5, 18, 2, NULL, NULL, NULL, 20000, NULL, '2026-01-07', NULL, NULL, NULL, NULL, NULL),
(115, 'TEST 2', 5, 20, 3, NULL, NULL, NULL, 30000, NULL, '2026-01-07', NULL, NULL, NULL, NULL, NULL),
(116, 'TEST 3', 5, 19, 1, '2025-11-18 13:13:14', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2025-11-18 13:13:14\"}]', 10000, 20, '2025-12-05', '2025-11-18 13:12:02', NULL, 9200, 800, 2),
(117, 'TEST 3', 5, 18, 2, '2025-11-18 13:20:15', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"ok\",\"status\":\"Completed\",\"datetime_added\":\"2025-11-18 13:20:15\"}]', 20000, 20, '2026-01-19', '2025-11-18 13:19:19', NULL, 16000, 4000, 5),
(118, 'TEST 3', 5, 20, 3, '2026-02-15 03:44:27', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Denied\",\"datetime_added\":\"2025-11-18 13:21:36\"},{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"haysss\",\"status\":\"Completed\",\"datetime_added\":\"2026-2-15 3:44:27\"}]', 30000, 20, '2026-01-19', '2025-11-18 14:04:58', NULL, 24000, 6000, 5),
(119, 'TEST 4', 5, 19, 1, '2025-11-18 17:54:30', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"need revision\",\"status\":\"Revised\",\"datetime_added\":\"2025-11-18 17:51:58\"},{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2025-11-18 17:54:30\"}]', 10000, 20, '2025-12-05', '2025-11-18 17:52:45', NULL, 10000, 0, 0),
(120, 'TEST 4', 5, 18, 2, '2025-11-18 17:56:06', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"ok\",\"status\":\"Completed\",\"datetime_added\":\"2025-11-18 17:56:6\"}]', 20000, 20, '2026-01-19', '2025-11-18 17:55:38', NULL, 18400, 1600, 2),
(121, 'TEST 4', 5, 20, 3, '2025-11-18 17:58:16', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2025-11-18 17:58:16\"}]', 30000, 20, '2026-01-19', '2025-11-18 17:57:46', NULL, 27600, 2400, 2),
(122, 'TEST 5', 5, 19, 1, '2026-02-15 03:36:34', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2026-2-15 3:36:34\"}]', 10000, 20, '2025-12-05', '2026-02-15 03:35:57', NULL, 10000, 0, 0),
(123, 'TEST 5', 5, 18, 2, '2026-02-15 03:41:55', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2026-2-15 3:41:55\"}]', 20000, 20, '2026-01-19', '2026-02-15 03:39:38', NULL, 0, 20000, 0),
(124, 'TEST 5', 5, 20, 3, '2026-02-15 03:43:35', 1, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2026-2-15 3:43:35\"}]', 30000, 20, '2026-01-19', '2026-02-15 03:43:12', NULL, 0, 30000, 0),
(125, 'TEST 21', 5, 19, 1, NULL, NULL, NULL, 123000, NULL, '2025-12-16', NULL, NULL, NULL, NULL, NULL),
(126, 'TEST 21', 5, 18, 2, NULL, NULL, NULL, 123000, NULL, '2026-01-20', NULL, NULL, NULL, NULL, NULL),
(127, 'TEST 21', 5, 20, 3, NULL, NULL, NULL, 100000, NULL, '2026-01-20', NULL, NULL, NULL, NULL, NULL),
(128, 'TEST 2026 FOR NOTIF', 5, 19, 1, NULL, NULL, NULL, 1000, NULL, '2026-03-02', NULL, NULL, NULL, NULL, NULL),
(129, 'TEST 2026 FOR NOTIF', 5, 18, 2, NULL, NULL, NULL, 2000, NULL, '2026-04-14', NULL, NULL, NULL, NULL, NULL),
(130, 'TEST 2026 FOR NOTIF', 5, 20, 3, NULL, NULL, NULL, 3000, NULL, '2026-04-14', NULL, NULL, NULL, NULL, NULL),
(131, 'asdasdasdas', 2, 19, 1, NULL, NULL, NULL, 1000, NULL, '2026-03-03', NULL, NULL, NULL, NULL, NULL),
(132, 'asdasdasdas', 2, 18, 2, NULL, NULL, NULL, 2312312, NULL, '2026-04-13', NULL, NULL, NULL, NULL, NULL),
(133, 'asdasdasdas', 2, 20, 3, NULL, NULL, NULL, 3123123, NULL, '2026-04-13', NULL, NULL, NULL, NULL, NULL),
(134, 'asdasdasdas', 2, 21, 4, NULL, NULL, NULL, 3123, NULL, '2026-04-22', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `billing_records`
--

CREATE TABLE `billing_records` (
  `id` int(10) UNSIGNED NOT NULL,
  `ctrl_num` varchar(26) DEFAULT NULL,
  `tc_id` int(10) UNSIGNED NOT NULL,
  `sc_id` int(10) UNSIGNED NOT NULL,
  `q_id` int(10) UNSIGNED NOT NULL,
  `batch_name` varchar(255) NOT NULL,
  `num_pax` int(11) UNSIGNED NOT NULL,
  `dropped_pax` int(11) DEFAULT NULL,
  `billed_amount` double DEFAULT NULL,
  `isWorkback` tinyint(4) NOT NULL DEFAULT '0',
  `remarks` text,
  `status_id` int(11) NOT NULL DEFAULT '0',
  `datetime_received` datetime DEFAULT NULL,
  `datetime_billed` datetime DEFAULT NULL,
  `datetime_added` datetime NOT NULL,
  `uploaded_by` int(10) UNSIGNED NOT NULL,
  `uploaded_file` varchar(255) DEFAULT NULL,
  `date_start` date NOT NULL,
  `date_end` date NOT NULL,
  `fiscal_yr` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `billing_records`
--

INSERT INTO `billing_records` (`id`, `ctrl_num`, `tc_id`, `sc_id`, `q_id`, `batch_name`, `num_pax`, `dropped_pax`, `billed_amount`, `isWorkback`, `remarks`, `status_id`, `datetime_received`, `datetime_billed`, `datetime_added`, `uploaded_by`, `uploaded_file`, `date_start`, `date_end`, `fiscal_yr`) VALUES
(13, 'PQM-123-00001', 1, 8, 66, 'JERSON ET AL', 100, NULL, NULL, 0, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":null,\"status\":\"Completed\",\"datetime_added\":\"2025-08-27T09:30:24.364Z\"}]', 3, NULL, NULL, '2025-08-27 17:29:00', 11, NULL, '2025-08-30', '2025-10-07', '2025-2026'),
(14, 'PQM-123-00002', 1, 8, 66, 'JOHN DOE ET AL', 200, NULL, NULL, 0, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":null,\"status\":\"Completed\",\"datetime_added\":\"2025-08-27T09:30:11.972Z\"}]', 3, NULL, NULL, '2025-08-27 17:29:45', 11, NULL, '2025-09-01', '2025-10-08', '2025-2026'),
(15, 'PQM-123-00003', 1, 4, 66, 'JERSON ET AL', 100, NULL, NULL, 0, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":null,\"status\":\"Completed\",\"datetime_added\":\"2025-08-27T09:32:06.349Z\"}]', 3, NULL, NULL, '2025-08-27 17:31:38', 11, NULL, '2025-09-02', '2025-10-09', '2025-2026'),
(16, 'PQM-123-00005', 2, 8, 66, 'MARIA CRUZ ET AL', 150, NULL, NULL, 0, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":null,\"status\":\"Completed\",\"datetime_added\":\"2025-08-27T09:48:26.476Z\"}]', 1, NULL, NULL, '2025-08-27 17:46:06', 12, NULL, '2025-09-01', '2025-10-08', '2025-2026'),
(17, 'PQM-123-00006', 2, 4, 64, 'JERSON ET AL', 100, NULL, NULL, 0, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":null,\"status\":\"Completed\",\"datetime_added\":\"2025-08-27T09:48:17.479Z\"}]', 3, NULL, NULL, '2025-08-27 17:46:50', 12, NULL, '2025-08-29', '2025-10-07', '2025-2026'),
(18, 'adsaasd', 2, 2, 66, 'asdsadasds', 100, NULL, NULL, 0, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":null,\"status\":\"Completed\",\"datetime_added\":\"2025-10-25 0:59:31\"}]', 1, NULL, NULL, '2025-10-25 00:58:03', 12, NULL, '2025-10-25', '2025-12-02', '2025-2026'),
(19, 'RQM-TTSP-2025-0001', 10, 5, 77, 'Almuete, Joemar et al', 25, NULL, NULL, 0, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":null,\"status\":\"Completed\",\"datetime_added\":\"2025-10-25 1:41:39\"}]', 1, NULL, NULL, '2025-10-25 01:40:26', 20, NULL, '2025-04-11', '2025-05-22', '2025-2026'),
(20, 'RQM-TTSP-2025-0002', 10, 5, 77, 'Almuete, Joemar et al', 25, NULL, NULL, 0, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":null,\"status\":\"Completed\",\"datetime_added\":\"2025-10-28 17:29:22\"}]', 1, NULL, NULL, '2025-10-28 17:28:44', 20, NULL, '2025-04-11', '2025-05-22', '2025-2026'),
(26, 'TEST 1', 10, 5, 77, 'Almuete, Joemar', 25, NULL, NULL, 0, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"ok\",\"status\":\"Completed\",\"datetime_added\":\"2025-11-17 16:49:24\"}]', 3, NULL, NULL, '2025-11-17 16:45:27', 20, NULL, '2025-11-19', '2025-12-30', '2025-2026'),
(27, 'TEST 2', 10, 5, 77, 'sample', 25, NULL, NULL, 0, NULL, 0, NULL, NULL, '2025-11-17 22:14:58', 20, NULL, '2025-11-18', '2025-12-29', '2025-2026'),
(28, 'TEST 3', 10, 5, 77, 'Sample name', 25, NULL, NULL, 0, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"\",\"status\":\"Completed\",\"datetime_added\":\"2025-11-18 13:11:32\"}]', 1, NULL, NULL, '2025-11-18 13:10:41', 20, NULL, '2025-11-29', '2026-01-08', '2025-2026'),
(29, 'TEST 4', 10, 5, 77, 'Jerson et al', 25, NULL, NULL, 0, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"ok\",\"status\":\"Completed\",\"datetime_added\":\"2025-11-18 17:47:57\"}]', 3, NULL, NULL, '2025-11-18 17:43:59', 20, NULL, '2025-11-28', '2026-01-08', '2025-2026'),
(30, 'TEST 5', 10, 5, 77, 'Jerson Test et al', 25, NULL, NULL, 0, '[{\"user_id\":4,\"name\":\"Staff, PO  \",\"remarks\":\"No remarks\",\"status\":\"Completed\",\"datetime_added\":\"2025-11-25 13:36:53\"}]', 1, NULL, NULL, '2025-11-25 12:56:39', 20, NULL, '2025-11-28', '2026-01-08', '2025-2026'),
(31, 'TEST 21', 10, 5, 77, 'Jerson Et al', 25, NULL, NULL, 0, NULL, 0, NULL, NULL, '2025-11-25 13:43:44', 20, NULL, '2025-11-28', '2026-01-08', '2025-2026'),
(32, 'TEST 2026 FOR NOTIF', 10, 5, 77, 'TEST BATCH', 100, NULL, NULL, 0, NULL, 0, NULL, NULL, '2026-02-20 02:08:36', 20, NULL, '2026-02-23', '2026-04-03', '2025-2026'),
(33, 'asdasdasdassssss', 1, 2, 66, 'dasdsdsdasdasd', 100, NULL, NULL, 0, NULL, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '2026-02-22 03:45:14', 5, NULL, '2026-02-24', '2026-04-02', '2025-2026');

-- --------------------------------------------------------

--
-- Table structure for table `billing_set_types`
--

CREATE TABLE `billing_set_types` (
  `id` int(11) NOT NULL,
  `sc_id` int(11) NOT NULL,
  `bt_id` int(11) NOT NULL,
  `order_num` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `billing_set_types`
--

INSERT INTO `billing_set_types` (`id`, `sc_id`, `bt_id`, `order_num`) VALUES
(23, 2, 19, 1),
(24, 2, 18, 2),
(25, 2, 20, 3),
(26, 2, 21, 4),
(27, 3, 27, 1),
(28, 3, 19, 2),
(29, 3, 18, 3),
(30, 3, 20, 4),
(31, 3, 30, 5),
(32, 3, 21, 6),
(33, 4, 19, 1),
(34, 4, 18, 2),
(35, 4, 20, 3),
(36, 4, 30, 4),
(37, 4, 21, 5),
(38, 5, 19, 1),
(39, 5, 18, 2),
(40, 5, 20, 3),
(42, 6, 19, 1),
(43, 6, 18, 2),
(44, 6, 20, 3),
(45, 6, 21, 4),
(46, 7, 22, 1),
(47, 7, 24, 2),
(48, 7, 25, 3),
(49, 7, 26, 4),
(50, 7, 28, 5),
(51, 7, 29, 6),
(52, 7, 18, 7),
(53, 7, 20, 8),
(54, 7, 21, 9),
(55, 8, 19, 1),
(56, 8, 18, 2),
(57, 8, 20, 3),
(58, 8, 30, 4),
(59, 1, 22, 1),
(60, 1, 23, 2),
(61, 1, 19, 3),
(62, 1, 18, 4),
(63, 1, 20, 5),
(64, 1, 30, 6),
(65, 1, 21, 7);

-- --------------------------------------------------------

--
-- Table structure for table `billing_types`
--

CREATE TABLE `billing_types` (
  `id` int(10) UNSIGNED NOT NULL,
  `description` varchar(100) NOT NULL,
  `abbre` varchar(20) DEFAULT NULL,
  `days` int(11) DEFAULT NULL,
  `isHTD` tinyint(4) NOT NULL DEFAULT '0',
  `tag_type` varchar(100) NOT NULL,
  `datetime_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `billing_types`
--

INSERT INTO `billing_types` (`id`, `description`, `abbre`, `days`, `isHTD`, `tag_type`, `datetime_added`) VALUES
(18, 'Full Training Support Fund', 'Full TSF', 7, 0, 'end train', '2025-07-21 15:43:18'),
(19, '50% Training Support Fund', '50% TSF', 5, 0, 'start train', '2025-07-21 15:44:02'),
(20, 'Training Cost', 'TC', 7, 0, 'end train', '2025-07-21 15:44:15'),
(21, 'Assessment Cost', 'AC', 7, 0, 'end assessment', '2025-07-21 15:44:28'),
(22, 'Group Personal Accident Insurance', 'GPAI', 1, 0, 'start train', '2025-07-21 15:44:39'),
(23, 'New Normal Allowance', 'NNA', 5, 0, 'start train', '2025-07-21 15:44:50'),
(24, 'Uniform Allowance', 'UA', 5, 0, 'start train', '2025-07-21 15:45:02'),
(25, 'Instructional Materials', 'IM', 5, 0, 'start train', '2025-07-21 15:45:16'),
(26, 'Miscellaneous Fees', 'MF', 5, 0, 'start train', '2025-07-21 15:45:29'),
(27, 'Book Allowance', 'BA', 5, 0, 'start train', '2025-07-21 15:45:44'),
(28, '30% Training Support Fund', '30% TSF', 5, 0, 'start train', '2025-07-21 15:47:58'),
(29, '40% Training Support Fund', '40% TSF', NULL, 1, 'half train', '2025-07-21 15:48:23'),
(30, 'Entrepreneurship Cost', 'EC', 7, 0, 'end train', '2025-07-21 15:48:23'),
(31, 'new item', 'NI', 5, 0, '', '2025-11-18 18:40:33');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `description` varchar(200) NOT NULL,
  `datetime_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `description`, `datetime_added`) VALUES
(1, 'Tourism (Hotel & Restaurant Services)', '2025-07-21 14:13:02'),
(2, 'Automotive and Land Transport', '2025-07-21 14:13:02'),
(3, 'Construction', '2025-07-21 14:13:02'),
(4, 'Electronics and ICT', '2025-07-21 14:13:02'),
(5, 'Garments', '2025-07-21 14:13:02'),
(6, 'Health, Social & Community Services', '2025-07-21 14:13:02'),
(7, 'HVAC-R', '2025-07-21 14:13:02'),
(8, 'Metals & Engineering', '2025-07-21 14:13:02'),
(9, 'Agriculture, Forestry & Fishery', '2025-07-21 14:13:02'),
(10, 'TVET Trainers Development', '2025-07-21 14:13:02');

-- --------------------------------------------------------

--
-- Table structure for table `insights`
--

CREATE TABLE `insights` (
  `id` int(11) NOT NULL,
  `from_score` decimal(5,3) NOT NULL DEFAULT '0.000',
  `to_score` decimal(5,3) NOT NULL DEFAULT '0.000',
  `description` text,
  `report_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `insights`
--

INSERT INTO `insights` (`id`, `from_score`, `to_score`, `description`, `report_name`) VALUES
(1, '1.000', '1.000', 'The scholarship program achieved full utilization of its allocated budget, reflecting outstanding financial execution. All training programs were implemented as scheduled, and all trainees successfully completed their courses, exemplifying TESDA’s model for resource efficiency and accountability.', 'Budget Utilization Rate for Scholarships'),
(2, '0.950', '0.990', 'Demonstrates near-perfect budget absorption across scholarship programs. Funds were strategically managed to ensure all trainings were completed, with minimal residuals representing prudent financial planning and strong operational discipline.', 'Budget Utilization Rate for Scholarships'),
(3, '0.900', '0.940', 'Indicates effective utilization of most allocated funds. The scholarship program supported full completion of all training schedules, showing solid financial management and responsible use of public resources aligned with TESDA’s targets.', 'Budget Utilization Rate for Scholarships'),
(4, '0.850', '0.890', 'The majority of the scholarship budget was used efficiently, enabling all training programs to be carried out. However, minor underutilization suggests room for improvement in optimizing fund distribution and tracking expenditures.', 'Budget Utilization Rate for Scholarships'),
(5, '0.800', '0.840', 'Reflects moderate utilization where funds were efficiently used but not maximized. Programs were implemented successfully, but financial absorption could be improved through enhanced forecasting and inter-center coordination.', 'Budget Utilization Rate for Scholarships'),
(6, '0.700', '0.790', 'Shows below-target utilization of funds. Although training programs were completed, the scholarship program’s resource management indicates inefficiencies or conservative spending patterns that limited full budget use.', 'Budget Utilization Rate for Scholarships'),
(7, '0.000', '0.700', 'A large portion of the scholarship budget remained unutilized despite successful program delivery. This underutilization suggests overestimation in fund allocation or excessive cost savings that should be analyzed to improve future planning accuracy.', 'Budget Utilization Rate for Scholarships'),
(8, '1.000', '1.000', 'The training center achieved perfect billing compliance, submitting all required documents completely and on time. This reflects outstanding administrative coordination and strict adherence to TESDA billing standards.', 'Billing Submission Compliance'),
(9, '0.950', '0.990', 'The center demonstrated near-perfect compliance, with timely and accurate billing submissions. Minor variances, such as minimal rechecking or late attachments, were observed but did not affect overall performance. This signifies strong financial and documentation alignment.', 'Billing Submission Compliance'),
(10, '0.900', '0.940', 'Billing submissions were generally complete and timely, with only occasional delays or missing validations. The center maintains a solid compliance record, indicating reliable internal coordination and process consistency.', 'Billing Submission Compliance'),
(11, '0.850', '0.890', 'The training center sustained a good level of billing compliance but encountered some delays or document revalidations. While performance remains acceptable, greater attention to verification and submission timelines is advised.', 'Billing Submission Compliance'),
(12, '0.800', '0.840', 'Compliance was moderate, showing several instances of late or incomplete submissions. Process inefficiencies or workload congestion may have contributed to delays. The center should improve administrative tracking and documentation flow.', 'Billing Submission Compliance'),
(13, '0.700', '0.790', 'The center experienced recurring delays or returned billings due to incomplete attachments or verification issues. This level of compliance reflects a need for stronger monitoring systems and improved coordination between finance and documentation units.', 'Billing Submission Compliance'),
(14, '0.000', '0.700', 'Billing compliance was significantly below standards, with multiple missed deadlines and incomplete submissions. These deficiencies suggest serious administrative gaps and require immediate corrective action to restore compliance and reporting integrity.', 'Billing Submission Compliance'),
(15, '1.000', '1.000', 'The training center demonstrated optimal use of its allocated funds, ensuring that all training programs were implemented as planned and all trainees completed their trainings. This full utilization reflects efficient financial planning and execution, aligning perfectly with TESDA’s standards for performance and accountability.', 'Budget Utilization Rate for Training Centers'),
(16, '0.950', '0.990', 'The center achieved near-complete utilization of its budget, indicating that funds were strategically applied to successfully implement training programs. Minor variances may reflect small adjustments, but overall performance denotes high operational efficiency and strong compliance.', 'Budget Utilization Rate for Training Centers'),
(17, '0.900', '0.940', 'A significant portion of the allocated budget was effectively utilized, enabling the successful completion of most training activities. This suggests sound budget management, though a small margin for improvement remains in maximizing fund application across all training areas.', 'Budget Utilization Rate for Training Centers'),
(18, '0.850', '0.890', 'The training center managed to utilize the majority of its allocation but showed some underutilization, possibly due to unimplemented activities or delayed program completion. While trainees benefited from the programs, there’s room to strengthen fund absorption to fully support TESDA’s training objectives.', 'Budget Utilization Rate for Training Centers'),
(19, '0.800', '0.840', 'Budget use was moderately efficient, with certain portions of the funds remaining unused. This may indicate operational delays, lower trainee turnout, or scheduling adjustments. The training center should enhance planning and coordination to improve resource utilization in future cycles', 'Budget Utilization Rate for Training Centers'),
(20, '0.700', '0.790', 'The training center faced noticeable inefficiencies in budget execution, suggesting potential bottlenecks in program implementation. This level of utilization signals the need for closer training program monitoring and re-evaluation.', 'Budget Utilization Rate for Training Centers'),
(21, '0.000', '0.700', 'A substantial part of the allocated budget remained unutilized, implying that several planned training activities were not completed or faced administrative setbacks. Immediate corrective measures are required to ensure that future allocations are effectively untilized and that trainees benefit as intended.', 'Budget Utilization Rate for Training Centers'),
(22, '0.970', '1.000', 'The training center achieved 97–100% utilization with complete and timely billing compliance. All reports were accurate and validated ahead of deadlines, showing exceptional fiscal discipline and adherence to TESDA standards.', 'Weighted Performance Score'),
(23, '0.940', '0.969', 'Attained 94–96% performance with consistently accurate submissions and minimal revisions. Financial operations are efficient and documentation processes are well-coordinated.', 'Weighted Performance Score'),
(24, '0.910', '0.939', 'Recorded 91–93% utilization and compliance, with most billings completed on time. Minor corrections were needed, reflecting solid but slightly improvable administrative management.', 'Weighted Performance Score'),
(25, '0.880', '0.909', 'Achieved 88–90% utilization with generally complete and timely billing. Occasional delays occurred but did not significantly affect overall compliance.', 'Weighted Performance Score'),
(26, '0.850', '0.879', 'Delivered 85–87% utilization and compliance, with some late or revalidated billings. Improved coordination between finance and documentation units is encouraged.', 'Weighted Performance Score'),
(27, '0.820', '0.849', 'Maintained 82–84% utilization and compliance, showing good progress but occasional verification delays. Strengthening submission tracking would enhance efficiency.', 'Weighted Performance Score'),
(28, '0.790', '0.819', 'Reached 79–81% performance, with several late billings or missing attachments. Administrative monitoring should be reinforced to improve timeliness.', 'Weighted Performance Score'),
(29, '0.760', '0.789', 'Recorded 76–78% utilization and billing compliance, hindered by documentation inconsistencies and delayed submissions. Workflow adjustments are necessary.', 'Weighted Performance Score'),
(30, '0.730', '0.759', 'Showed 73–75% performance with frequent billing delays and incomplete documentation. Fiscal coordination requires significant improvement.', 'Weighted Performance Score'),
(31, '0.700', '0.730', 'Registered 70–72% or below, reflecting low utilization and non-compliance. Multiple missed deadlines and incomplete submissions indicate urgent need for administrative corrective measures.', 'Weighted Performance Score');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `type` varchar(50) NOT NULL,
  `reference_id` int(10) UNSIGNED DEFAULT NULL,
  `reference_type` varchar(50) DEFAULT NULL,
  `created_by` int(10) UNSIGNED NOT NULL,
  `datetime_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `title`, `message`, `type`, `reference_id`, `reference_type`, `created_by`, `datetime_added`) VALUES
(1, 'Billing Update Status', 'Status updated to 1', 'billing_status', 89, 'billing', 20, '2026-02-20 01:51:01'),
(2, 'New Billing Submission', 'A new billing record has been submitted: TEST 2026 FOR NOTIF', 'billing_submission', 32, 'billing', 20, '2026-02-20 02:08:36'),
(3, 'New Billing Submission', 'A new billing record has been submitted: asdasdasdas', 'billing_submission', 33, 'billing', 5, '2026-02-22 03:45:14'),
(4, 'Billing Record Updated', 'Billing record asdasdasdassssss has been updated.', 'billing_update', 33, 'billing', 5, '2026-02-21 19:45:37');

-- --------------------------------------------------------

--
-- Table structure for table `notifications_recipients`
--

CREATE TABLE `notifications_recipients` (
  `id` int(10) UNSIGNED NOT NULL,
  `notification_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `datetime_read` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notifications_recipients`
--

INSERT INTO `notifications_recipients` (`id`, `notification_id`, `user_id`, `is_read`, `datetime_read`) VALUES
(1, 1, 5, 1, '2026-02-22 03:39:43');

--
-- Triggers `notifications_recipients`
--
DELIMITER $$
CREATE TRIGGER `trg_notifications_recipients_mark_as_read` BEFORE UPDATE ON `notifications_recipients` FOR EACH ROW BEGIN
    -- Only set datetime_read when is_read changes from 0 to 1
    IF OLD.is_read = 0 AND NEW.is_read = 1 THEN
        SET NEW.datetime_read = NOW();
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `qualifications`
--

CREATE TABLE `qualifications` (
  `id` int(10) UNSIGNED NOT NULL,
  `description` varchar(150) NOT NULL,
  `hrs` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `days` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `datetime_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `qualifications`
--

INSERT INTO `qualifications` (`id`, `description`, `hrs`, `days`, `category_id`, `datetime_added`) VALUES
(44, 'Bartending NC II', 326, 41, 1, '2025-07-21 14:31:12'),
(45, 'Bread and Pastry Production NC II', 141, 18, 1, '2025-07-21 14:35:59'),
(46, 'Cookery NC II', 316, 40, 1, '2025-07-21 14:36:10'),
(47, 'Commercial Cooking NC III', 244, 31, 1, '2025-07-21 14:36:21'),
(48, 'Food & Beverage Services NC II', 356, 45, 1, '2025-07-21 14:40:43'),
(49, 'Front Office Services NC II', 442, 55, 1, '2025-07-21 14:40:55'),
(50, 'Housekeeping NC II', 436, 55, 1, '2025-07-21 14:41:23'),
(51, 'Housekeeping NC III', 76, 10, 1, '2025-07-21 14:41:36'),
(52, 'Automotive Servicing NC I', 156, 20, 2, '2025-07-21 14:41:57'),
(53, 'Automotive Servicing NC II', 676, 85, 2, '2025-07-21 14:42:14'),
(54, 'Driving NC II', 120, 15, 2, '2025-07-21 14:42:28'),
(55, 'Motorcycle/Small Engine Servicing NC II', 278, 35, 2, '2025-07-21 14:42:45'),
(56, 'Carpentry NC II', 162, 20, 3, '2025-07-21 14:42:57'),
(57, 'Masonry NC II', 258, 32, 3, '2025-07-21 14:43:06'),
(58, 'Plumbing NC II', 202, 25, 3, '2025-07-21 14:43:28'),
(59, 'Electrical Installation & Maintenance NC II', 196, 25, 3, '2025-07-21 14:43:44'),
(60, 'Electronic Products Assembly & Servicing NC II', 196, 25, 4, '2025-07-21 14:44:09'),
(61, 'Computer Systems Servicing NC II', 280, 35, 4, '2025-07-21 14:44:23'),
(62, 'Dressmaking NC II', 275, 34, 5, '2025-07-21 14:44:38'),
(63, 'Tailoring NC II', 275, 34, 5, '2025-07-21 14:44:49'),
(64, 'Caregiving NC II', 786, 98, 6, '2025-07-21 14:45:04'),
(65, 'Hairdressing NC II', 656, 82, 6, '2025-07-21 14:45:16'),
(66, 'Beauty Care Services (Nail Care) NC II', 216, 27, 6, '2025-07-21 14:45:35'),
(67, 'Domestic Work NC II', 218, 27, 6, '2025-07-21 14:45:59'),
(68, 'RAC Servicing (DomRAC) NC II', 480, 60, 7, '2025-07-21 14:46:13'),
(69, 'RAC Servicing (PACU-CRE) NC III', 226, 28, 7, '2025-07-21 14:46:29'),
(70, 'Transport RAC NC II', 212, 27, 7, '2025-07-21 14:46:52'),
(71, 'Machining NC II', 337, 42, 8, '2025-07-21 14:47:05'),
(72, 'Shielded Metal Arc Welding NC I', 124, 16, 8, '2025-07-21 14:47:26'),
(73, 'Shielded Metal Arc Welding NC II', 268, 34, 8, '2025-07-21 14:47:45'),
(74, 'Agricultural Crops Production NC I', 302, 38, 9, '2025-07-21 14:48:02'),
(75, 'Agricultural Crops Production NC II', 336, 42, 9, '2025-07-21 14:48:12'),
(76, 'Agricultural Crops Production NC III', 445, 56, 9, '2025-07-21 14:48:22'),
(77, 'Organic Agriculture Production NC II', 232, 29, 9, '2025-07-21 14:48:32'),
(78, 'Animal Production (Swine) NC II', 306, 38, 9, '2025-07-21 14:48:42'),
(79, 'Aquaculture NC II', 1276, 160, 9, '2025-07-21 14:48:55'),
(80, 'Trainers Methodology Level I', 264, 33, 10, '2025-07-21 14:49:05');

-- --------------------------------------------------------

--
-- Table structure for table `scholarships`
--

CREATE TABLE `scholarships` (
  `id` int(10) UNSIGNED NOT NULL,
  `description` varchar(150) NOT NULL,
  `abbre` varchar(20) DEFAULT NULL,
  `datetime_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `scholarships`
--

INSERT INTO `scholarships` (`id`, `description`, `abbre`, `datetime_added`) VALUES
(1, 'Coconut Farmer Scholarship Program', 'CFSP', '2025-02-09 17:25:58'),
(2, 'Department of Transportation', 'DOTR', '2025-02-09 17:26:56'),
(3, 'Private Education Student Financial Assistance', 'PESFA', '2025-02-09 17:26:56'),
(4, 'Student Technologists and Entrepreneurs of the Philippines', 'STEP', '2025-02-09 17:26:56'),
(5, 'Tulong Trabaho Scholarship Program', 'TTSP', '2025-02-09 17:26:56'),
(6, 'Training for Work Scholarship Program', 'TWSP', '2025-02-09 17:26:56'),
(7, 'Universal Access to Quality Tertiary Education Act', 'UAQTEA', '2025-02-09 17:26:56'),
(8, 'Rice Extension Services Program', 'RESP', '2025-02-09 17:26:56');

-- --------------------------------------------------------

--
-- Table structure for table `trainees`
--

CREATE TABLE `trainees` (
  `id` int(11) NOT NULL,
  `fname` varchar(100) NOT NULL,
  `mname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `extension` varchar(20) DEFAULT NULL,
  `sg_number` varchar(255) DEFAULT NULL,
  `training_cost` double DEFAULT NULL,
  `ctrl_num` varchar(255) DEFAULT NULL,
  `bt_id` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'active',
  `date_dropped` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `trainees`
--

INSERT INTO `trainees` (`id`, `fname`, `mname`, `lname`, `extension`, `sg_number`, `training_cost`, `ctrl_num`, `bt_id`, `status`, `date_dropped`) VALUES
(51, 'ALMUETE', 'MANTAHINAY', 'JOEMAR', '', 'TTSP-2025-0001', 2500, 'RQM-TTSP-2025-0001', 19, 'active', NULL),
(52, 'ARMOCILLA', 'PADORA', 'EMMANUEL', '', 'TTSP-2025-0002', 2500, 'RQM-TTSP-2025-0001', 19, 'active', NULL),
(53, 'BLANCO', 'BACLI-AN', 'CHARMILLE', '', 'TTSP-2025-0003', 2500, 'RQM-TTSP-2025-0001', 19, 'active', '2025-12-12'),
(54, 'BOHOL', 'GANTALAO', 'BHRIAN', '', 'TTSP-2025-0004', 2500, 'RQM-TTSP-2025-0001', 19, 'active', NULL),
(55, 'CALOGMOC', 'MAGBUTONG', 'LOUKIE', '', 'TTSP-2025-0005', 2500, 'RQM-TTSP-2025-0001', 19, 'active', NULL),
(56, 'CASTRO', 'CAMBONGGA', 'RAYMOND', '', 'TTSP-2025-0006', 2500, 'RQM-TTSP-2025-0001', 19, 'active', NULL),
(57, 'CEBA', 'BAYACAG', 'NELBOY', '', 'TTSP-2025-0007', 2500, 'RQM-TTSP-2025-0001', 19, 'active', NULL),
(58, 'DIANA', 'VAJA', 'LILIA', '', 'TTSP-2025-0008', 2500, 'RQM-TTSP-2025-0001', 19, 'active', NULL),
(59, 'DIAPANA', 'DE VERA', 'LEIZEL', '', 'TTSP-2025-0009', 2500, 'RQM-TTSP-2025-0001', 19, 'active', NULL),
(60, 'ESPINOSA', 'LADO', 'JAYCHA', '', 'TTSP-2025-0010', 2500, 'RQM-TTSP-2025-0001', 19, 'active', NULL),
(61, 'GALGO', 'RIN', 'CARMILA', '', 'TTSP-2025-0011', 2500, 'RQM-TTSP-2025-0001', 19, 'active', NULL),
(62, 'INTIG', 'DEMAYO', 'RACHELLE ', '', 'TTSP-2025-0012', 2500, 'RQM-TTSP-2025-0001', 19, 'active', NULL),
(63, 'JUBAN', 'DIAMANTE', 'ALCHER', '', 'TTSP-2025-0013', 2500, 'RQM-TTSP-2025-0001', 19, 'active', NULL),
(64, 'LAVILLA', 'APILAT', 'GLYCE', '', 'TTSP-2025-0014', 2500, 'RQM-TTSP-2025-0001', 19, 'active', NULL),
(65, 'LITANA', 'ORABA', 'NOLLY', '', 'TTSP-2025-0015', 2500, 'RQM-TTSP-2025-0001', 19, 'active', NULL),
(66, 'MABUTING', 'BOHOL', 'GUILLERMO', 'JR', 'TTSP-2025-0016', 2500, 'RQM-TTSP-2025-0001', 19, 'active', NULL),
(67, 'NONONG', 'BANOTBOT', 'ELPRELY', '', 'TTSP-2025-0017', 2500, 'RQM-TTSP-2025-0001', 19, 'active', NULL),
(68, 'ONGCAY', 'MANDAGUIO', 'REYNALDO', '', 'TTSP-2025-0018', 2500, 'RQM-TTSP-2025-0001', 19, 'active', NULL),
(69, 'PALACA', 'MANLOZA', 'LOLITA', '', 'TTSP-2025-0019', 2500, 'RQM-TTSP-2025-0001', 19, 'active', NULL),
(70, 'PARAN', 'EMBUDO', 'IRENE', '', 'TTSP-2025-0020', 2500, 'RQM-TTSP-2025-0001', 19, 'active', NULL),
(71, 'PAUL', 'DOROMAL', 'CHERILYN', '', 'TTSP-2025-0021', 2500, 'RQM-TTSP-2025-0001', 19, 'active', NULL),
(72, 'RAMOS', 'CONDE', 'MARICEL', '', 'TTSP-2025-0022', 2500, 'RQM-TTSP-2025-0001', 19, 'active', NULL),
(73, 'REYES', 'LAGUMBAY', 'ALVIN', '', 'TTSP-2025-0023', 2500, 'RQM-TTSP-2025-0001', 19, 'active', NULL),
(74, 'TALIP', 'CALE', 'ROCHELLE', '', 'TTSP-2025-0024', 2500, 'RQM-TTSP-2025-0001', 19, 'active', NULL),
(75, 'TIMTIM', 'MABUTING', 'JELYN', '', 'TTSP-2025-0025', 2500, 'RQM-TTSP-2025-0001', 19, 'active', NULL),
(126, 'ALMUETE', 'MANTAHINAY', 'JOEMAR', '', 'TTSP-2025-0001', 2500, 'RQM-TTSP-2025-0001', 18, 'active', NULL),
(127, 'ARMOCILLA', 'PADORA', 'EMMANUEL', '', 'TTSP-2025-0002', 2500, 'RQM-TTSP-2025-0001', 18, 'active', NULL),
(128, 'BLANCO', 'BACLI-AN', 'CHARMILLE', '', 'TTSP-2025-0003', 2500, 'RQM-TTSP-2025-0001', 18, 'active', '2025-12-12'),
(129, 'BOHOL', 'GANTALAO', 'BHRIAN', '', 'TTSP-2025-0004', 2500, 'RQM-TTSP-2025-0001', 18, 'active', NULL),
(130, 'CALOGMOC', 'MAGBUTONG', 'LOUKIE', '', 'TTSP-2025-0005', 2500, 'RQM-TTSP-2025-0001', 18, 'active', NULL),
(131, 'CASTRO', 'CAMBONGGA', 'RAYMOND', '', 'TTSP-2025-0006', 2500, 'RQM-TTSP-2025-0001', 18, 'active', NULL),
(132, 'CEBA', 'BAYACAG', 'NELBOY', '', 'TTSP-2025-0007', 2500, 'RQM-TTSP-2025-0001', 18, 'active', NULL),
(133, 'DIANA', 'VAJA', 'LILIA', '', 'TTSP-2025-0008', 2500, 'RQM-TTSP-2025-0001', 18, 'active', NULL),
(134, 'DIAPANA', 'DE VERA', 'LEIZEL', '', 'TTSP-2025-0009', 2500, 'RQM-TTSP-2025-0001', 18, 'active', NULL),
(135, 'ESPINOSA', 'LADO', 'JAYCHA', '', 'TTSP-2025-0010', 2500, 'RQM-TTSP-2025-0001', 18, 'active', NULL),
(136, 'GALGO', 'RIN', 'CARMILA', '', 'TTSP-2025-0011', 2500, 'RQM-TTSP-2025-0001', 18, 'active', NULL),
(137, 'INTIG', 'DEMAYO', 'RACHELLE ', '', 'TTSP-2025-0012', 2500, 'RQM-TTSP-2025-0001', 18, 'active', NULL),
(138, 'JUBAN', 'DIAMANTE', 'ALCHER', '', 'TTSP-2025-0013', 2500, 'RQM-TTSP-2025-0001', 18, 'active', NULL),
(139, 'LAVILLA', 'APILAT', 'GLYCE', '', 'TTSP-2025-0014', 2500, 'RQM-TTSP-2025-0001', 18, 'active', NULL),
(140, 'LITANA', 'ORABA', 'NOLLY', '', 'TTSP-2025-0015', 2500, 'RQM-TTSP-2025-0001', 18, 'active', NULL),
(141, 'MABUTING', 'BOHOL', 'GUILLERMO', 'JR', 'TTSP-2025-0016', 2500, 'RQM-TTSP-2025-0001', 18, 'active', NULL),
(142, 'NONONG', 'BANOTBOT', 'ELPRELY', '', 'TTSP-2025-0017', 2500, 'RQM-TTSP-2025-0001', 18, 'active', NULL),
(143, 'ONGCAY', 'MANDAGUIO', 'REYNALDO', '', 'TTSP-2025-0018', 2500, 'RQM-TTSP-2025-0001', 18, 'active', NULL),
(144, 'PALACA', 'MANLOZA', 'LOLITA', '', 'TTSP-2025-0019', 2500, 'RQM-TTSP-2025-0001', 18, 'active', NULL),
(145, 'PARAN', 'EMBUDO', 'IRENE', '', 'TTSP-2025-0020', 2500, 'RQM-TTSP-2025-0001', 18, 'active', NULL),
(146, 'PAUL', 'DOROMAL', 'CHERILYN', '', 'TTSP-2025-0021', 2500, 'RQM-TTSP-2025-0001', 18, 'active', NULL),
(147, 'RAMOS', 'CONDE', 'MARICEL', '', 'TTSP-2025-0022', 2500, 'RQM-TTSP-2025-0001', 18, 'active', NULL),
(148, 'REYES', 'LAGUMBAY', 'ALVIN', '', 'TTSP-2025-0023', 2500, 'RQM-TTSP-2025-0001', 18, 'active', NULL),
(149, 'TALIP', 'CALE', 'ROCHELLE', '', 'TTSP-2025-0024', 2500, 'RQM-TTSP-2025-0001', 18, 'dropped', NULL),
(150, 'TIMTIM', 'MABUTING', 'JELYN', '', 'TTSP-2025-0025', 2500, 'RQM-TTSP-2025-0001', 18, 'dropped', NULL),
(151, 'ALMUETE', 'MANTAHINAY', 'JOEMAR', '', 'TTSP-2025-0001', 2500, 'RQM-TTSP-2025-0002', 19, 'active', NULL),
(152, 'ARMOCILLA', 'PADORA', 'EMMANUEL', '', 'TTSP-2025-0002', 2500, 'RQM-TTSP-2025-0002', 19, 'active', NULL),
(153, 'BLANCO', 'BACLI-AN', 'CHARMILLE', '', 'TTSP-2025-0003', 2500, 'RQM-TTSP-2025-0002', 19, 'active', '2025-12-12'),
(154, 'BOHOL', 'GANTALAO', 'BHRIAN', '', 'TTSP-2025-0004', 2500, 'RQM-TTSP-2025-0002', 19, 'active', NULL),
(155, 'CALOGMOC', 'MAGBUTONG', 'LOUKIE', '', 'TTSP-2025-0005', 2500, 'RQM-TTSP-2025-0002', 19, 'active', NULL),
(156, 'CASTRO', 'CAMBONGGA', 'RAYMOND', '', 'TTSP-2025-0006', 2500, 'RQM-TTSP-2025-0002', 19, 'active', NULL),
(157, 'CEBA', 'BAYACAG', 'NELBOY', '', 'TTSP-2025-0007', 2500, 'RQM-TTSP-2025-0002', 19, 'active', NULL),
(158, 'DIANA', 'VAJA', 'LILIA', '', 'TTSP-2025-0008', 2500, 'RQM-TTSP-2025-0002', 19, 'active', NULL),
(159, 'DIAPANA', 'DE VERA', 'LEIZEL', '', 'TTSP-2025-0009', 2500, 'RQM-TTSP-2025-0002', 19, 'active', NULL),
(160, 'ESPINOSA', 'LADO', 'JAYCHA', '', 'TTSP-2025-0010', 2500, 'RQM-TTSP-2025-0002', 19, 'active', NULL),
(161, 'GALGO', 'RIN', 'CARMILA', '', 'TTSP-2025-0011', 2500, 'RQM-TTSP-2025-0002', 19, 'active', NULL),
(162, 'INTIG', 'DEMAYO', 'RACHELLE ', '', 'TTSP-2025-0012', 2500, 'RQM-TTSP-2025-0002', 19, 'active', NULL),
(163, 'JUBAN', 'DIAMANTE', 'ALCHER', '', 'TTSP-2025-0013', 2500, 'RQM-TTSP-2025-0002', 19, 'active', NULL),
(164, 'LAVILLA', 'APILAT', 'GLYCE', '', 'TTSP-2025-0014', 2500, 'RQM-TTSP-2025-0002', 19, 'active', NULL),
(165, 'LITANA', 'ORABA', 'NOLLY', '', 'TTSP-2025-0015', 2500, 'RQM-TTSP-2025-0002', 19, 'active', NULL),
(166, 'MABUTING', 'BOHOL', 'GUILLERMO', 'JR', 'TTSP-2025-0016', 2500, 'RQM-TTSP-2025-0002', 19, 'active', NULL),
(167, 'NONONG', 'BANOTBOT', 'ELPRELY', '', 'TTSP-2025-0017', 2500, 'RQM-TTSP-2025-0002', 19, 'active', NULL),
(168, 'ONGCAY', 'MANDAGUIO', 'REYNALDO', '', 'TTSP-2025-0018', 2500, 'RQM-TTSP-2025-0002', 19, 'active', NULL),
(169, 'PALACA', 'MANLOZA', 'LOLITA', '', 'TTSP-2025-0019', 2500, 'RQM-TTSP-2025-0002', 19, 'active', NULL),
(170, 'PARAN', 'EMBUDO', 'IRENE', '', 'TTSP-2025-0020', 2500, 'RQM-TTSP-2025-0002', 19, 'active', NULL),
(171, 'PAUL', 'DOROMAL', 'CHERILYN', '', 'TTSP-2025-0021', 2500, 'RQM-TTSP-2025-0002', 19, 'active', NULL),
(172, 'RAMOS', 'CONDE', 'MARICEL', '', 'TTSP-2025-0022', 2500, 'RQM-TTSP-2025-0002', 19, 'active', NULL),
(173, 'REYES', 'LAGUMBAY', 'ALVIN', '', 'TTSP-2025-0023', 2500, 'RQM-TTSP-2025-0002', 19, 'active', NULL),
(174, 'TALIP', 'CALE', 'ROCHELLE', '', 'TTSP-2025-0024', 2500, 'RQM-TTSP-2025-0002', 19, 'active', NULL),
(175, 'TIMTIM', 'MABUTING', 'JELYN', '', 'TTSP-2025-0025', 2500, 'RQM-TTSP-2025-0002', 19, 'active', NULL),
(476, 'ALMUETE', 'MANTAHINAY', 'JOEMAR', '', 'TTSP-2025-0001', 2500, 'TEST 1', 19, 'active', NULL),
(477, 'ARMOCILLA', 'PADORA', 'EMMANUEL', '', 'TTSP-2025-0002', 2500, 'TEST 1', 19, 'active', NULL),
(478, 'BLANCO', 'BACLI-AN', 'CHARMILLE', '', 'TTSP-2025-0003', 2500, 'TEST 1', 19, 'active', NULL),
(479, 'BOHOL', 'GANTALAO', 'BHRIAN', '', 'TTSP-2025-0004', 2500, 'TEST 1', 19, 'active', NULL),
(480, 'CALOGMOC', 'MAGBUTONG', 'LOUKIE', '', 'TTSP-2025-0005', 2500, 'TEST 1', 19, 'active', NULL),
(481, 'CASTRO', 'CAMBONGGA', 'RAYMOND', '', 'TTSP-2025-0006', 2500, 'TEST 1', 19, 'active', NULL),
(482, 'CEBA', 'BAYACAG', 'NELBOY', '', 'TTSP-2025-0007', 2500, 'TEST 1', 19, 'active', NULL),
(483, 'DIANA', 'VAJA', 'LILIA', '', 'TTSP-2025-0008', 2500, 'TEST 1', 19, 'active', NULL),
(484, 'DIAPANA', 'DE VERA', 'LEIZEL', '', 'TTSP-2025-0009', 2500, 'TEST 1', 19, 'active', NULL),
(485, 'ESPINOSA', 'LADO', 'JAYCHA', '', 'TTSP-2025-0010', 2500, 'TEST 1', 19, 'active', NULL),
(486, 'GALGO', 'RIN', 'CARMILA', '', 'TTSP-2025-0011', 2500, 'TEST 1', 19, 'active', NULL),
(487, 'INTIG', 'DEMAYO', 'RACHELLE ', '', 'TTSP-2025-0012', 2500, 'TEST 1', 19, 'active', NULL),
(488, 'JUBAN', 'DIAMANTE', 'ALCHER', '', 'TTSP-2025-0013', 2500, 'TEST 1', 19, 'active', NULL),
(489, 'LAVILLA', 'APILAT', 'GLYCE', '', 'TTSP-2025-0014', 2500, 'TEST 1', 19, 'active', NULL),
(490, 'LITANA', 'ORABA', 'NOLLY', '', 'TTSP-2025-0015', 2500, 'TEST 1', 19, 'active', NULL),
(491, 'MABUTING', 'BOHOL', 'GUILLERMO', 'JR', 'TTSP-2025-0016', 2500, 'TEST 1', 19, 'active', NULL),
(492, 'NONONG', 'BANOTBOT', 'ELPRELY', '', 'TTSP-2025-0017', 2500, 'TEST 1', 19, 'active', NULL),
(493, 'ONGCAY', 'MANDAGUIO', 'REYNALDO', '', 'TTSP-2025-0018', 2500, 'TEST 1', 19, 'active', NULL),
(494, 'PALACA', 'MANLOZA', 'LOLITA', '', 'TTSP-2025-0019', 2500, 'TEST 1', 19, 'active', NULL),
(495, 'PARAN', 'EMBUDO', 'IRENE', '', 'TTSP-2025-0020', 2500, 'TEST 1', 19, 'active', NULL),
(496, 'PAUL', 'DOROMAL', 'CHERILYN', '', 'TTSP-2025-0021', 2500, 'TEST 1', 19, 'active', NULL),
(497, 'RAMOS', 'CONDE', 'MARICEL', '', 'TTSP-2025-0022', 2500, 'TEST 1', 19, 'active', NULL),
(498, 'REYES', 'LAGUMBAY', 'ALVIN', '', 'TTSP-2025-0023', 2500, 'TEST 1', 19, 'active', NULL),
(499, 'TALIP', 'CALE', 'ROCHELLE', '', 'TTSP-2025-0024', 2500, 'TEST 1', 19, 'active', NULL),
(500, 'TIMTIM', 'MABUTING', 'JELYN', '', 'TTSP-2025-0025', 0, 'TEST 1', 19, 'dropped', NULL),
(501, 'ALMUETE', 'MANTAHINAY', 'JOEMAR', '', 'TTSP-2025-0001', 2500, 'TEST 1', 18, 'active', NULL),
(502, 'ARMOCILLA', 'PADORA', 'EMMANUEL', '', 'TTSP-2025-0002', 2500, 'TEST 1', 18, 'active', NULL),
(503, 'BLANCO', 'BACLI-AN', 'CHARMILLE', '', 'TTSP-2025-0003', 2500, 'TEST 1', 18, 'active', NULL),
(504, 'BOHOL', 'GANTALAO', 'BHRIAN', '', 'TTSP-2025-0004', 2500, 'TEST 1', 18, 'active', NULL),
(505, 'CALOGMOC', 'MAGBUTONG', 'LOUKIE', '', 'TTSP-2025-0005', 2500, 'TEST 1', 18, 'active', NULL),
(506, 'CASTRO', 'CAMBONGGA', 'RAYMOND', '', 'TTSP-2025-0006', 2500, 'TEST 1', 18, 'active', NULL),
(507, 'CEBA', 'BAYACAG', 'NELBOY', '', 'TTSP-2025-0007', 2500, 'TEST 1', 18, 'active', NULL),
(508, 'DIANA', 'VAJA', 'LILIA', '', 'TTSP-2025-0008', 2500, 'TEST 1', 18, 'active', NULL),
(509, 'DIAPANA', 'DE VERA', 'LEIZEL', '', 'TTSP-2025-0009', 2500, 'TEST 1', 18, 'active', NULL),
(510, 'ESPINOSA', 'LADO', 'JAYCHA', '', 'TTSP-2025-0010', 2500, 'TEST 1', 18, 'active', NULL),
(511, 'GALGO', 'RIN', 'CARMILA', '', 'TTSP-2025-0011', 2500, 'TEST 1', 18, 'active', NULL),
(512, 'INTIG', 'DEMAYO', 'RACHELLE ', '', 'TTSP-2025-0012', 2500, 'TEST 1', 18, 'active', NULL),
(513, 'JUBAN', 'DIAMANTE', 'ALCHER', '', 'TTSP-2025-0013', 2500, 'TEST 1', 18, 'active', NULL),
(514, 'LAVILLA', 'APILAT', 'GLYCE', '', 'TTSP-2025-0014', 2500, 'TEST 1', 18, 'active', NULL),
(515, 'LITANA', 'ORABA', 'NOLLY', '', 'TTSP-2025-0015', 2500, 'TEST 1', 18, 'active', NULL),
(516, 'MABUTING', 'BOHOL', 'GUILLERMO', 'JR', 'TTSP-2025-0016', 2500, 'TEST 1', 18, 'active', NULL),
(517, 'NONONG', 'BANOTBOT', 'ELPRELY', '', 'TTSP-2025-0017', 2500, 'TEST 1', 18, 'active', NULL),
(518, 'ONGCAY', 'MANDAGUIO', 'REYNALDO', '', 'TTSP-2025-0018', 2500, 'TEST 1', 18, 'active', NULL),
(519, 'PALACA', 'MANLOZA', 'LOLITA', '', 'TTSP-2025-0019', 2500, 'TEST 1', 18, 'active', NULL),
(520, 'PARAN', 'EMBUDO', 'IRENE', '', 'TTSP-2025-0020', 2500, 'TEST 1', 18, 'active', NULL),
(521, 'PAUL', 'DOROMAL', 'CHERILYN', '', 'TTSP-2025-0021', 2500, 'TEST 1', 18, 'active', NULL),
(522, 'RAMOS', 'CONDE', 'MARICEL', '', 'TTSP-2025-0022', 2500, 'TEST 1', 18, 'active', NULL),
(523, 'REYES', 'LAGUMBAY', 'ALVIN', '', 'TTSP-2025-0023', 2500, 'TEST 1', 18, 'active', NULL),
(524, 'TALIP', 'CALE', 'ROCHELLE', '', 'TTSP-2025-0024', 0, 'TEST 1', 18, 'dropped', NULL),
(525, 'TIMTIM', 'MABUTING', 'JELYN', '', 'TTSP-2025-0025', 0, 'TEST 1', 18, 'dropped', NULL),
(526, 'ALMUETE', 'MANTAHINAY', 'JOEMAR', '', 'TTSP-2025-0001', 23391, 'TEST 1', 20, 'active', NULL),
(527, 'ARMOCILLA', 'PADORA', 'EMMANUEL', '', 'TTSP-2025-0002', 23391, 'TEST 1', 20, 'active', NULL),
(528, 'BLANCO', 'BACLI-AN', 'CHARMILLE', '', 'TTSP-2025-0003', 23391, 'TEST 1', 20, 'active', NULL),
(529, 'BOHOL', 'GANTALAO', 'BHRIAN', '', 'TTSP-2025-0004', 23391, 'TEST 1', 20, 'active', NULL),
(530, 'CALOGMOC', 'MAGBUTONG', 'LOUKIE', '', 'TTSP-2025-0005', 23391, 'TEST 1', 20, 'active', NULL),
(531, 'CASTRO', 'CAMBONGGA', 'RAYMOND', '', 'TTSP-2025-0006', 23391, 'TEST 1', 20, 'active', NULL),
(532, 'CEBA', 'BAYACAG', 'NELBOY', '', 'TTSP-2025-0007', 23391, 'TEST 1', 20, 'active', NULL),
(533, 'DIANA', 'VAJA', 'LILIA', '', 'TTSP-2025-0008', 23391, 'TEST 1', 20, 'active', NULL),
(534, 'DIAPANA', 'DE VERA', 'LEIZEL', '', 'TTSP-2025-0009', 23391, 'TEST 1', 20, 'active', NULL),
(535, 'ESPINOSA', 'LADO', 'JAYCHA', '', 'TTSP-2025-0010', 23391, 'TEST 1', 20, 'active', NULL),
(536, 'GALGO', 'RIN', 'CARMILA', '', 'TTSP-2025-0011', 23391, 'TEST 1', 20, 'active', NULL),
(537, 'INTIG', 'DEMAYO', 'RACHELLE ', '', 'TTSP-2025-0012', 23391, 'TEST 1', 20, 'active', NULL),
(538, 'JUBAN', 'DIAMANTE', 'ALCHER', '', 'TTSP-2025-0013', 23391, 'TEST 1', 20, 'active', NULL),
(539, 'LAVILLA', 'APILAT', 'GLYCE', '', 'TTSP-2025-0014', 23391, 'TEST 1', 20, 'active', NULL),
(540, 'LITANA', 'ORABA', 'NOLLY', '', 'TTSP-2025-0015', 23391, 'TEST 1', 20, 'active', NULL),
(541, 'MABUTING', 'BOHOL', 'GUILLERMO', 'JR', 'TTSP-2025-0016', 23391, 'TEST 1', 20, 'active', NULL),
(542, 'NONONG', 'BANOTBOT', 'ELPRELY', '', 'TTSP-2025-0017', 23391, 'TEST 1', 20, 'active', NULL),
(543, 'ONGCAY', 'MANDAGUIO', 'REYNALDO', '', 'TTSP-2025-0018', 23391, 'TEST 1', 20, 'active', NULL),
(544, 'PALACA', 'MANLOZA', 'LOLITA', '', 'TTSP-2025-0019', 23391, 'TEST 1', 20, 'active', NULL),
(545, 'PARAN', 'EMBUDO', 'IRENE', '', 'TTSP-2025-0020', 23391, 'TEST 1', 20, 'active', NULL),
(546, 'PAUL', 'DOROMAL', 'CHERILYN', '', 'TTSP-2025-0021', 23391, 'TEST 1', 20, 'active', NULL),
(547, 'RAMOS', 'CONDE', 'MARICEL', '', 'TTSP-2025-0022', 0, 'TEST 1', 20, 'dropped', NULL),
(548, 'REYES', 'LAGUMBAY', 'ALVIN', '', 'TTSP-2025-0023', 0, 'TEST 1', 20, 'dropped', NULL),
(549, 'TALIP', 'CALE', 'ROCHELLE', '', 'TTSP-2025-0024', 0, 'TEST 1', 20, 'dropped', NULL),
(550, 'TIMTIM', 'MABUTING', 'JELYN', '', 'TTSP-2025-0025', 0, 'TEST 1', 20, 'dropped', NULL),
(551, 'ALMUETE', 'MANTAHINAY', 'JOEMAR', '', 'TTSP-2025-0001', 400, 'TEST 2', 19, 'active', NULL),
(552, 'ARMOCILLA', 'PADORA', 'EMMANUEL', '', 'TTSP-2025-0002', 400, 'TEST 2', 19, 'active', NULL),
(553, 'BLANCO', 'BACLI-AN', 'CHARMILLE', '', 'TTSP-2025-0003', 400, 'TEST 2', 19, 'active', NULL),
(554, 'BOHOL', 'GANTALAO', 'BHRIAN', '', 'TTSP-2025-0004', 400, 'TEST 2', 19, 'active', NULL),
(555, 'CALOGMOC', 'MAGBUTONG', 'LOUKIE', '', 'TTSP-2025-0005', 400, 'TEST 2', 19, 'active', NULL),
(556, 'CASTRO', 'CAMBONGGA', 'RAYMOND', '', 'TTSP-2025-0006', 400, 'TEST 2', 19, 'active', NULL),
(557, 'CEBA', 'BAYACAG', 'NELBOY', '', 'TTSP-2025-0007', 400, 'TEST 2', 19, 'active', NULL),
(558, 'DIANA', 'VAJA', 'LILIA', '', 'TTSP-2025-0008', 400, 'TEST 2', 19, 'active', NULL),
(559, 'DIAPANA', 'DE VERA', 'LEIZEL', '', 'TTSP-2025-0009', 400, 'TEST 2', 19, 'active', NULL),
(560, 'ESPINOSA', 'LADO', 'JAYCHA', '', 'TTSP-2025-0010', 400, 'TEST 2', 19, 'active', NULL),
(561, 'GALGO', 'RIN', 'CARMILA', '', 'TTSP-2025-0011', 400, 'TEST 2', 19, 'active', NULL),
(562, 'INTIG', 'DEMAYO', 'RACHELLE ', '', 'TTSP-2025-0012', 400, 'TEST 2', 19, 'active', NULL),
(563, 'JUBAN', 'DIAMANTE', 'ALCHER', '', 'TTSP-2025-0013', 400, 'TEST 2', 19, 'active', NULL),
(564, 'LAVILLA', 'APILAT', 'GLYCE', '', 'TTSP-2025-0014', 400, 'TEST 2', 19, 'active', NULL),
(565, 'LITANA', 'ORABA', 'NOLLY', '', 'TTSP-2025-0015', 400, 'TEST 2', 19, 'active', NULL),
(566, 'MABUTING', 'BOHOL', 'GUILLERMO', 'JR', 'TTSP-2025-0016', 400, 'TEST 2', 19, 'active', NULL),
(567, 'NONONG', 'BANOTBOT', 'ELPRELY', '', 'TTSP-2025-0017', 400, 'TEST 2', 19, 'active', NULL),
(568, 'ONGCAY', 'MANDAGUIO', 'REYNALDO', '', 'TTSP-2025-0018', 400, 'TEST 2', 19, 'active', NULL),
(569, 'PALACA', 'MANLOZA', 'LOLITA', '', 'TTSP-2025-0019', 400, 'TEST 2', 19, 'active', NULL),
(570, 'PARAN', 'EMBUDO', 'IRENE', '', 'TTSP-2025-0020', 400, 'TEST 2', 19, 'active', NULL),
(571, 'PAUL', 'DOROMAL', 'CHERILYN', '', 'TTSP-2025-0021', 400, 'TEST 2', 19, 'active', NULL),
(572, 'RAMOS', 'CONDE', 'MARICEL', '', 'TTSP-2025-0022', 400, 'TEST 2', 19, 'active', NULL),
(573, 'REYES', 'LAGUMBAY', 'ALVIN', '', 'TTSP-2025-0023', 400, 'TEST 2', 19, 'active', NULL),
(574, 'TALIP', 'CALE', 'ROCHELLE', '', 'TTSP-2025-0024', 400, 'TEST 2', 19, 'active', NULL),
(575, 'TIMTIM', 'MABUTING', 'JELYN', '', 'TTSP-2025-0025', 400, 'TEST 2', 19, 'active', NULL),
(576, 'ALMUETE', 'MANTAHINAY', 'JOEMAR', '', 'TTSP-2025-0001', 800, 'TEST 2', 18, 'active', NULL),
(577, 'ARMOCILLA', 'PADORA', 'EMMANUEL', '', 'TTSP-2025-0002', 800, 'TEST 2', 18, 'active', NULL),
(578, 'BLANCO', 'BACLI-AN', 'CHARMILLE', '', 'TTSP-2025-0003', 800, 'TEST 2', 18, 'active', NULL),
(579, 'BOHOL', 'GANTALAO', 'BHRIAN', '', 'TTSP-2025-0004', 800, 'TEST 2', 18, 'active', NULL),
(580, 'CALOGMOC', 'MAGBUTONG', 'LOUKIE', '', 'TTSP-2025-0005', 800, 'TEST 2', 18, 'active', NULL),
(581, 'CASTRO', 'CAMBONGGA', 'RAYMOND', '', 'TTSP-2025-0006', 800, 'TEST 2', 18, 'active', NULL),
(582, 'CEBA', 'BAYACAG', 'NELBOY', '', 'TTSP-2025-0007', 800, 'TEST 2', 18, 'active', NULL),
(583, 'DIANA', 'VAJA', 'LILIA', '', 'TTSP-2025-0008', 800, 'TEST 2', 18, 'active', NULL),
(584, 'DIAPANA', 'DE VERA', 'LEIZEL', '', 'TTSP-2025-0009', 800, 'TEST 2', 18, 'active', NULL),
(585, 'ESPINOSA', 'LADO', 'JAYCHA', '', 'TTSP-2025-0010', 800, 'TEST 2', 18, 'active', NULL),
(586, 'GALGO', 'RIN', 'CARMILA', '', 'TTSP-2025-0011', 800, 'TEST 2', 18, 'active', NULL),
(587, 'INTIG', 'DEMAYO', 'RACHELLE ', '', 'TTSP-2025-0012', 800, 'TEST 2', 18, 'active', NULL),
(588, 'JUBAN', 'DIAMANTE', 'ALCHER', '', 'TTSP-2025-0013', 800, 'TEST 2', 18, 'active', NULL),
(589, 'LAVILLA', 'APILAT', 'GLYCE', '', 'TTSP-2025-0014', 800, 'TEST 2', 18, 'active', NULL),
(590, 'LITANA', 'ORABA', 'NOLLY', '', 'TTSP-2025-0015', 800, 'TEST 2', 18, 'active', NULL),
(591, 'MABUTING', 'BOHOL', 'GUILLERMO', 'JR', 'TTSP-2025-0016', 800, 'TEST 2', 18, 'active', NULL),
(592, 'NONONG', 'BANOTBOT', 'ELPRELY', '', 'TTSP-2025-0017', 800, 'TEST 2', 18, 'active', NULL),
(593, 'ONGCAY', 'MANDAGUIO', 'REYNALDO', '', 'TTSP-2025-0018', 800, 'TEST 2', 18, 'active', NULL),
(594, 'PALACA', 'MANLOZA', 'LOLITA', '', 'TTSP-2025-0019', 800, 'TEST 2', 18, 'active', NULL),
(595, 'PARAN', 'EMBUDO', 'IRENE', '', 'TTSP-2025-0020', 800, 'TEST 2', 18, 'active', NULL),
(596, 'PAUL', 'DOROMAL', 'CHERILYN', '', 'TTSP-2025-0021', 800, 'TEST 2', 18, 'active', NULL),
(597, 'RAMOS', 'CONDE', 'MARICEL', '', 'TTSP-2025-0022', 800, 'TEST 2', 18, 'active', NULL),
(598, 'REYES', 'LAGUMBAY', 'ALVIN', '', 'TTSP-2025-0023', 800, 'TEST 2', 18, 'active', NULL),
(599, 'TALIP', 'CALE', 'ROCHELLE', '', 'TTSP-2025-0024', 800, 'TEST 2', 18, 'active', NULL),
(600, 'TIMTIM', 'MABUTING', 'JELYN', '', 'TTSP-2025-0025', 800, 'TEST 2', 18, 'active', NULL),
(601, 'ALMUETE', 'MANTAHINAY', 'JOEMAR', '', 'TTSP-2025-0001', 1200, 'TEST 2', 20, 'active', NULL),
(602, 'ARMOCILLA', 'PADORA', 'EMMANUEL', '', 'TTSP-2025-0002', 1200, 'TEST 2', 20, 'active', NULL),
(603, 'BLANCO', 'BACLI-AN', 'CHARMILLE', '', 'TTSP-2025-0003', 1200, 'TEST 2', 20, 'active', NULL),
(604, 'BOHOL', 'GANTALAO', 'BHRIAN', '', 'TTSP-2025-0004', 1200, 'TEST 2', 20, 'active', NULL),
(605, 'CALOGMOC', 'MAGBUTONG', 'LOUKIE', '', 'TTSP-2025-0005', 1200, 'TEST 2', 20, 'active', NULL),
(606, 'CASTRO', 'CAMBONGGA', 'RAYMOND', '', 'TTSP-2025-0006', 1200, 'TEST 2', 20, 'active', NULL),
(607, 'CEBA', 'BAYACAG', 'NELBOY', '', 'TTSP-2025-0007', 1200, 'TEST 2', 20, 'active', NULL),
(608, 'DIANA', 'VAJA', 'LILIA', '', 'TTSP-2025-0008', 1200, 'TEST 2', 20, 'active', NULL),
(609, 'DIAPANA', 'DE VERA', 'LEIZEL', '', 'TTSP-2025-0009', 1200, 'TEST 2', 20, 'active', NULL),
(610, 'ESPINOSA', 'LADO', 'JAYCHA', '', 'TTSP-2025-0010', 1200, 'TEST 2', 20, 'active', NULL),
(611, 'GALGO', 'RIN', 'CARMILA', '', 'TTSP-2025-0011', 1200, 'TEST 2', 20, 'active', NULL),
(612, 'INTIG', 'DEMAYO', 'RACHELLE ', '', 'TTSP-2025-0012', 1200, 'TEST 2', 20, 'active', NULL),
(613, 'JUBAN', 'DIAMANTE', 'ALCHER', '', 'TTSP-2025-0013', 1200, 'TEST 2', 20, 'active', NULL),
(614, 'LAVILLA', 'APILAT', 'GLYCE', '', 'TTSP-2025-0014', 1200, 'TEST 2', 20, 'active', NULL),
(615, 'LITANA', 'ORABA', 'NOLLY', '', 'TTSP-2025-0015', 1200, 'TEST 2', 20, 'active', NULL),
(616, 'MABUTING', 'BOHOL', 'GUILLERMO', 'JR', 'TTSP-2025-0016', 1200, 'TEST 2', 20, 'active', NULL),
(617, 'NONONG', 'BANOTBOT', 'ELPRELY', '', 'TTSP-2025-0017', 1200, 'TEST 2', 20, 'active', NULL),
(618, 'ONGCAY', 'MANDAGUIO', 'REYNALDO', '', 'TTSP-2025-0018', 1200, 'TEST 2', 20, 'active', NULL),
(619, 'PALACA', 'MANLOZA', 'LOLITA', '', 'TTSP-2025-0019', 1200, 'TEST 2', 20, 'active', NULL),
(620, 'PARAN', 'EMBUDO', 'IRENE', '', 'TTSP-2025-0020', 1200, 'TEST 2', 20, 'active', NULL),
(621, 'PAUL', 'DOROMAL', 'CHERILYN', '', 'TTSP-2025-0021', 1200, 'TEST 2', 20, 'active', NULL),
(622, 'RAMOS', 'CONDE', 'MARICEL', '', 'TTSP-2025-0022', 1200, 'TEST 2', 20, 'active', NULL),
(623, 'REYES', 'LAGUMBAY', 'ALVIN', '', 'TTSP-2025-0023', 1200, 'TEST 2', 20, 'active', NULL),
(624, 'TALIP', 'CALE', 'ROCHELLE', '', 'TTSP-2025-0024', 1200, 'TEST 2', 20, 'active', NULL),
(625, 'TIMTIM', 'MABUTING', 'JELYN', '', 'TTSP-2025-0025', 1200, 'TEST 2', 20, 'active', NULL),
(626, 'ALMUETE', 'MANTAHINAY', 'JOEMAR', '', 'TTSP-2025-0001', 400, 'TEST 3', 19, 'active', NULL),
(627, 'ARMOCILLA', 'PADORA', 'EMMANUEL', '', 'TTSP-2025-0002', 400, 'TEST 3', 19, 'active', NULL),
(628, 'BLANCO', 'BACLI-AN', 'CHARMILLE', '', 'TTSP-2025-0003', 400, 'TEST 3', 19, 'active', NULL),
(629, 'BOHOL', 'GANTALAO', 'BHRIAN', '', 'TTSP-2025-0004', 400, 'TEST 3', 19, 'active', NULL),
(630, 'CALOGMOC', 'MAGBUTONG', 'LOUKIE', '', 'TTSP-2025-0005', 400, 'TEST 3', 19, 'active', NULL),
(631, 'CASTRO', 'CAMBONGGA', 'RAYMOND', '', 'TTSP-2025-0006', 400, 'TEST 3', 19, 'active', NULL),
(632, 'CEBA', 'BAYACAG', 'NELBOY', '', 'TTSP-2025-0007', 400, 'TEST 3', 19, 'active', NULL),
(633, 'DIANA', 'VAJA', 'LILIA', '', 'TTSP-2025-0008', 400, 'TEST 3', 19, 'active', NULL),
(634, 'DIAPANA', 'DE VERA', 'LEIZEL', '', 'TTSP-2025-0009', 400, 'TEST 3', 19, 'active', NULL),
(635, 'ESPINOSA', 'LADO', 'JAYCHA', '', 'TTSP-2025-0010', 400, 'TEST 3', 19, 'active', NULL),
(636, 'GALGO', 'RIN', 'CARMILA', '', 'TTSP-2025-0011', 400, 'TEST 3', 19, 'active', NULL),
(637, 'INTIG', 'DEMAYO', 'RACHELLE ', '', 'TTSP-2025-0012', 0, 'TEST 3', 19, 'dropped', NULL),
(638, 'JUBAN', 'DIAMANTE', 'ALCHER', '', 'TTSP-2025-0013', 0, 'TEST 3', 19, 'dropped', NULL),
(639, 'LAVILLA', 'APILAT', 'GLYCE', '', 'TTSP-2025-0014', 400, 'TEST 3', 19, 'active', NULL),
(640, 'LITANA', 'ORABA', 'NOLLY', '', 'TTSP-2025-0015', 400, 'TEST 3', 19, 'active', NULL),
(641, 'MABUTING', 'BOHOL', 'GUILLERMO', 'JR', 'TTSP-2025-0016', 400, 'TEST 3', 19, 'active', NULL),
(642, 'NONONG', 'BANOTBOT', 'ELPRELY', '', 'TTSP-2025-0017', 400, 'TEST 3', 19, 'active', NULL),
(643, 'ONGCAY', 'MANDAGUIO', 'REYNALDO', '', 'TTSP-2025-0018', 400, 'TEST 3', 19, 'active', NULL),
(644, 'PALACA', 'MANLOZA', 'LOLITA', '', 'TTSP-2025-0019', 400, 'TEST 3', 19, 'active', NULL),
(645, 'PARAN', 'EMBUDO', 'IRENE', '', 'TTSP-2025-0020', 400, 'TEST 3', 19, 'active', NULL),
(646, 'PAUL', 'DOROMAL', 'CHERILYN', '', 'TTSP-2025-0021', 400, 'TEST 3', 19, 'active', NULL),
(647, 'RAMOS', 'CONDE', 'MARICEL', '', 'TTSP-2025-0022', 400, 'TEST 3', 19, 'active', NULL),
(648, 'REYES', 'LAGUMBAY', 'ALVIN', '', 'TTSP-2025-0023', 400, 'TEST 3', 19, 'active', NULL),
(649, 'TALIP', 'CALE', 'ROCHELLE', '', 'TTSP-2025-0024', 400, 'TEST 3', 19, 'active', NULL),
(650, 'TIMTIM', 'MABUTING', 'JELYN', '', 'TTSP-2025-0025', 400, 'TEST 3', 19, 'active', NULL),
(651, 'ALMUETE', 'MANTAHINAY', 'JOEMAR', '', 'TTSP-2025-0001', 0, 'TEST 3', 18, 'dropped', NULL),
(652, 'ARMOCILLA', 'PADORA', 'EMMANUEL', '', 'TTSP-2025-0002', 0, 'TEST 3', 18, 'dropped', NULL),
(653, 'BLANCO', 'BACLI-AN', 'CHARMILLE', '', 'TTSP-2025-0003', 0, 'TEST 3', 18, 'dropped', '2025-12-12'),
(654, 'BOHOL', 'GANTALAO', 'BHRIAN', '', 'TTSP-2025-0004', 800, 'TEST 3', 18, 'active', NULL),
(655, 'CALOGMOC', 'MAGBUTONG', 'LOUKIE', '', 'TTSP-2025-0005', 800, 'TEST 3', 18, 'active', NULL),
(656, 'CASTRO', 'CAMBONGGA', 'RAYMOND', '', 'TTSP-2025-0006', 800, 'TEST 3', 18, 'active', NULL),
(657, 'CEBA', 'BAYACAG', 'NELBOY', '', 'TTSP-2025-0007', 800, 'TEST 3', 18, 'active', NULL),
(658, 'DIANA', 'VAJA', 'LILIA', '', 'TTSP-2025-0008', 800, 'TEST 3', 18, 'active', NULL),
(659, 'DIAPANA', 'DE VERA', 'LEIZEL', '', 'TTSP-2025-0009', 800, 'TEST 3', 18, 'active', NULL),
(660, 'ESPINOSA', 'LADO', 'JAYCHA', '', 'TTSP-2025-0010', 800, 'TEST 3', 18, 'active', NULL),
(661, 'GALGO', 'RIN', 'CARMILA', '', 'TTSP-2025-0011', 800, 'TEST 3', 18, 'active', NULL),
(662, 'INTIG', 'DEMAYO', 'RACHELLE ', '', 'TTSP-2025-0012', 0, 'TEST 3', 18, 'dropped', NULL),
(663, 'JUBAN', 'DIAMANTE', 'ALCHER', '', 'TTSP-2025-0013', 0, 'TEST 3', 18, 'dropped', NULL),
(664, 'LAVILLA', 'APILAT', 'GLYCE', '', 'TTSP-2025-0014', 800, 'TEST 3', 18, 'active', NULL),
(665, 'LITANA', 'ORABA', 'NOLLY', '', 'TTSP-2025-0015', 800, 'TEST 3', 18, 'active', NULL),
(666, 'MABUTING', 'BOHOL', 'GUILLERMO', 'JR', 'TTSP-2025-0016', 800, 'TEST 3', 18, 'active', NULL),
(667, 'NONONG', 'BANOTBOT', 'ELPRELY', '', 'TTSP-2025-0017', 800, 'TEST 3', 18, 'active', NULL),
(668, 'ONGCAY', 'MANDAGUIO', 'REYNALDO', '', 'TTSP-2025-0018', 800, 'TEST 3', 18, 'active', NULL),
(669, 'PALACA', 'MANLOZA', 'LOLITA', '', 'TTSP-2025-0019', 800, 'TEST 3', 18, 'active', NULL),
(670, 'PARAN', 'EMBUDO', 'IRENE', '', 'TTSP-2025-0020', 800, 'TEST 3', 18, 'active', NULL),
(671, 'PAUL', 'DOROMAL', 'CHERILYN', '', 'TTSP-2025-0021', 800, 'TEST 3', 18, 'active', NULL),
(672, 'RAMOS', 'CONDE', 'MARICEL', '', 'TTSP-2025-0022', 800, 'TEST 3', 18, 'active', NULL),
(673, 'REYES', 'LAGUMBAY', 'ALVIN', '', 'TTSP-2025-0023', 800, 'TEST 3', 18, 'active', NULL),
(674, 'TALIP', 'CALE', 'ROCHELLE', '', 'TTSP-2025-0024', 800, 'TEST 3', 18, 'active', NULL),
(675, 'TIMTIM', 'MABUTING', 'JELYN', '', 'TTSP-2025-0025', 800, 'TEST 3', 18, 'active', NULL),
(676, 'ALMUETE', 'MANTAHINAY', 'JOEMAR', '', 'TTSP-2025-0001', 0, 'TEST 3', 20, 'dropped', NULL),
(677, 'ARMOCILLA', 'PADORA', 'EMMANUEL', '', 'TTSP-2025-0002', 0, 'TEST 3', 20, 'dropped', NULL),
(678, 'BLANCO', 'BACLI-AN', 'CHARMILLE', '', 'TTSP-2025-0003', 0, 'TEST 3', 20, 'dropped', '2025-12-12'),
(679, 'BOHOL', 'GANTALAO', 'BHRIAN', '', 'TTSP-2025-0004', 1200, 'TEST 3', 20, 'active', NULL),
(680, 'CALOGMOC', 'MAGBUTONG', 'LOUKIE', '', 'TTSP-2025-0005', 1200, 'TEST 3', 20, 'active', NULL),
(681, 'CASTRO', 'CAMBONGGA', 'RAYMOND', '', 'TTSP-2025-0006', 1200, 'TEST 3', 20, 'active', NULL),
(682, 'CEBA', 'BAYACAG', 'NELBOY', '', 'TTSP-2025-0007', 1200, 'TEST 3', 20, 'active', NULL),
(683, 'DIANA', 'VAJA', 'LILIA', '', 'TTSP-2025-0008', 1200, 'TEST 3', 20, 'active', NULL),
(684, 'DIAPANA', 'DE VERA', 'LEIZEL', '', 'TTSP-2025-0009', 1200, 'TEST 3', 20, 'active', NULL),
(685, 'ESPINOSA', 'LADO', 'JAYCHA', '', 'TTSP-2025-0010', 1200, 'TEST 3', 20, 'active', NULL),
(686, 'GALGO', 'RIN', 'CARMILA', '', 'TTSP-2025-0011', 1200, 'TEST 3', 20, 'active', NULL),
(687, 'INTIG', 'DEMAYO', 'RACHELLE ', '', 'TTSP-2025-0012', 0, 'TEST 3', 20, 'dropped', NULL),
(688, 'JUBAN', 'DIAMANTE', 'ALCHER', '', 'TTSP-2025-0013', 0, 'TEST 3', 20, 'dropped', NULL),
(689, 'LAVILLA', 'APILAT', 'GLYCE', '', 'TTSP-2025-0014', 1200, 'TEST 3', 20, 'active', NULL),
(690, 'LITANA', 'ORABA', 'NOLLY', '', 'TTSP-2025-0015', 1200, 'TEST 3', 20, 'active', NULL),
(691, 'MABUTING', 'BOHOL', 'GUILLERMO', 'JR', 'TTSP-2025-0016', 1200, 'TEST 3', 20, 'active', NULL),
(692, 'NONONG', 'BANOTBOT', 'ELPRELY', '', 'TTSP-2025-0017', 1200, 'TEST 3', 20, 'active', NULL),
(693, 'ONGCAY', 'MANDAGUIO', 'REYNALDO', '', 'TTSP-2025-0018', 1200, 'TEST 3', 20, 'active', NULL),
(694, 'PALACA', 'MANLOZA', 'LOLITA', '', 'TTSP-2025-0019', 1200, 'TEST 3', 20, 'active', NULL),
(695, 'PARAN', 'EMBUDO', 'IRENE', '', 'TTSP-2025-0020', 1200, 'TEST 3', 20, 'active', NULL),
(696, 'PAUL', 'DOROMAL', 'CHERILYN', '', 'TTSP-2025-0021', 1200, 'TEST 3', 20, 'active', NULL),
(697, 'RAMOS', 'CONDE', 'MARICEL', '', 'TTSP-2025-0022', 1200, 'TEST 3', 20, 'active', NULL),
(698, 'REYES', 'LAGUMBAY', 'ALVIN', '', 'TTSP-2025-0023', 1200, 'TEST 3', 20, 'active', NULL),
(699, 'TALIP', 'CALE', 'ROCHELLE', '', 'TTSP-2025-0024', 1200, 'TEST 3', 20, 'active', NULL),
(700, 'TIMTIM', 'MABUTING', 'JELYN', '', 'TTSP-2025-0025', 1200, 'TEST 3', 20, 'active', NULL),
(701, 'ALMUETE', 'MANTAHINAY', 'JOEMAR', '', 'TTSP-2025-0001', 400, 'TEST 4', 19, 'active', NULL),
(702, 'ARMOCILLA', 'PADORA', 'EMMANUEL', '', 'TTSP-2025-0002', 400, 'TEST 4', 19, 'active', NULL),
(703, 'BLANCO', 'BACLI-AN', 'CHARMILLE', '', 'TTSP-2025-0003', 400, 'TEST 4', 19, 'active', NULL),
(704, 'BOHOL', 'GANTALAO', 'BHRIAN', '', 'TTSP-2025-0004', 400, 'TEST 4', 19, 'active', NULL),
(705, 'CALOGMOC', 'MAGBUTONG', 'LOUKIE', '', 'TTSP-2025-0005', 400, 'TEST 4', 19, 'active', NULL),
(706, 'CASTRO', 'CAMBONGGA', 'RAYMOND', '', 'TTSP-2025-0006', 400, 'TEST 4', 19, 'active', NULL),
(707, 'CEBA', 'BAYACAG', 'NELBOY', '', 'TTSP-2025-0007', 400, 'TEST 4', 19, 'active', NULL),
(708, 'DIANA', 'VAJA', 'LILIA', '', 'TTSP-2025-0008', 400, 'TEST 4', 19, 'active', NULL),
(709, 'DIAPANA', 'DE VERA', 'LEIZEL', '', 'TTSP-2025-0009', 400, 'TEST 4', 19, 'active', NULL),
(710, 'ESPINOSA', 'LADO', 'JAYCHA', '', 'TTSP-2025-0010', 400, 'TEST 4', 19, 'active', NULL),
(711, 'GALGO', 'RIN', 'CARMILA', '', 'TTSP-2025-0011', 400, 'TEST 4', 19, 'active', NULL),
(712, 'INTIG', 'DEMAYO', 'RACHELLE ', '', 'TTSP-2025-0012', 400, 'TEST 4', 19, 'active', NULL),
(713, 'JUBAN', 'DIAMANTE', 'ALCHER', '', 'TTSP-2025-0013', 400, 'TEST 4', 19, 'active', NULL),
(714, 'LAVILLA', 'APILAT', 'GLYCE', '', 'TTSP-2025-0014', 400, 'TEST 4', 19, 'active', NULL),
(715, 'LITANA', 'ORABA', 'NOLLY', '', 'TTSP-2025-0015', 400, 'TEST 4', 19, 'active', NULL),
(716, 'MABUTING', 'BOHOL', 'GUILLERMO', 'JR', 'TTSP-2025-0016', 400, 'TEST 4', 19, 'active', NULL),
(717, 'NONONG', 'BANOTBOT', 'ELPRELY', '', 'TTSP-2025-0017', 400, 'TEST 4', 19, 'active', NULL),
(718, 'ONGCAY', 'MANDAGUIO', 'REYNALDO', '', 'TTSP-2025-0018', 400, 'TEST 4', 19, 'active', NULL),
(719, 'PALACA', 'MANLOZA', 'LOLITA', '', 'TTSP-2025-0019', 400, 'TEST 4', 19, 'active', NULL),
(720, 'PARAN', 'EMBUDO', 'IRENE', '', 'TTSP-2025-0020', 400, 'TEST 4', 19, 'active', NULL),
(721, 'PAUL', 'DOROMAL', 'CHERILYN', '', 'TTSP-2025-0021', 400, 'TEST 4', 19, 'active', NULL),
(722, 'RAMOS', 'CONDE', 'MARICEL', '', 'TTSP-2025-0022', 400, 'TEST 4', 19, 'active', NULL),
(723, 'REYES', 'LAGUMBAY', 'ALVIN', '', 'TTSP-2025-0023', 400, 'TEST 4', 19, 'active', NULL),
(724, 'TALIP', 'CALE', 'ROCHELLE', '', 'TTSP-2025-0024', 400, 'TEST 4', 19, 'active', NULL),
(725, 'TIMTIM', 'MABUTING', 'JELYN', '', 'TTSP-2025-0025', 400, 'TEST 4', 19, 'active', NULL),
(726, 'ALMUETE', 'MANTAHINAY', 'JOEMAR', '', 'TTSP-2025-0001', 800, 'TEST 4', 18, 'active', NULL),
(727, 'ARMOCILLA', 'PADORA', 'EMMANUEL', '', 'TTSP-2025-0002', 800, 'TEST 4', 18, 'active', NULL),
(728, 'BLANCO', 'BACLI-AN', 'CHARMILLE', '', 'TTSP-2025-0003', 0, 'TEST 4', 18, 'dropped', '2025-12-12'),
(729, 'BOHOL', 'GANTALAO', 'BHRIAN', '', 'TTSP-2025-0004', 0, 'TEST 4', 18, 'dropped', '2025-12-12'),
(730, 'CALOGMOC', 'MAGBUTONG', 'LOUKIE', '', 'TTSP-2025-0005', 800, 'TEST 4', 18, 'active', NULL),
(731, 'CASTRO', 'CAMBONGGA', 'RAYMOND', '', 'TTSP-2025-0006', 800, 'TEST 4', 18, 'active', NULL),
(732, 'CEBA', 'BAYACAG', 'NELBOY', '', 'TTSP-2025-0007', 800, 'TEST 4', 18, 'active', NULL),
(733, 'DIANA', 'VAJA', 'LILIA', '', 'TTSP-2025-0008', 800, 'TEST 4', 18, 'active', NULL),
(734, 'DIAPANA', 'DE VERA', 'LEIZEL', '', 'TTSP-2025-0009', 800, 'TEST 4', 18, 'active', NULL),
(735, 'ESPINOSA', 'LADO', 'JAYCHA', '', 'TTSP-2025-0010', 800, 'TEST 4', 18, 'active', NULL),
(736, 'GALGO', 'RIN', 'CARMILA', '', 'TTSP-2025-0011', 800, 'TEST 4', 18, 'active', NULL),
(737, 'INTIG', 'DEMAYO', 'RACHELLE ', '', 'TTSP-2025-0012', 800, 'TEST 4', 18, 'active', NULL),
(738, 'JUBAN', 'DIAMANTE', 'ALCHER', '', 'TTSP-2025-0013', 800, 'TEST 4', 18, 'active', NULL),
(739, 'LAVILLA', 'APILAT', 'GLYCE', '', 'TTSP-2025-0014', 800, 'TEST 4', 18, 'active', NULL),
(740, 'LITANA', 'ORABA', 'NOLLY', '', 'TTSP-2025-0015', 800, 'TEST 4', 18, 'active', NULL),
(741, 'MABUTING', 'BOHOL', 'GUILLERMO', 'JR', 'TTSP-2025-0016', 800, 'TEST 4', 18, 'active', NULL),
(742, 'NONONG', 'BANOTBOT', 'ELPRELY', '', 'TTSP-2025-0017', 800, 'TEST 4', 18, 'active', NULL),
(743, 'ONGCAY', 'MANDAGUIO', 'REYNALDO', '', 'TTSP-2025-0018', 800, 'TEST 4', 18, 'active', NULL),
(744, 'PALACA', 'MANLOZA', 'LOLITA', '', 'TTSP-2025-0019', 800, 'TEST 4', 18, 'active', NULL),
(745, 'PARAN', 'EMBUDO', 'IRENE', '', 'TTSP-2025-0020', 800, 'TEST 4', 18, 'active', NULL),
(746, 'PAUL', 'DOROMAL', 'CHERILYN', '', 'TTSP-2025-0021', 800, 'TEST 4', 18, 'active', NULL),
(747, 'RAMOS', 'CONDE', 'MARICEL', '', 'TTSP-2025-0022', 800, 'TEST 4', 18, 'active', NULL),
(748, 'REYES', 'LAGUMBAY', 'ALVIN', '', 'TTSP-2025-0023', 800, 'TEST 4', 18, 'active', NULL),
(749, 'TALIP', 'CALE', 'ROCHELLE', '', 'TTSP-2025-0024', 800, 'TEST 4', 18, 'active', NULL),
(750, 'TIMTIM', 'MABUTING', 'JELYN', '', 'TTSP-2025-0025', 800, 'TEST 4', 18, 'active', NULL),
(751, 'ALMUETE', 'MANTAHINAY', 'JOEMAR', '', 'TTSP-2025-0001', 1200, 'TEST 4', 20, 'active', NULL),
(752, 'ARMOCILLA', 'PADORA', 'EMMANUEL', '', 'TTSP-2025-0002', 1200, 'TEST 4', 20, 'active', NULL),
(753, 'BLANCO', 'BACLI-AN', 'CHARMILLE', '', 'TTSP-2025-0003', 0, 'TEST 4', 20, 'dropped', '2025-12-12'),
(754, 'BOHOL', 'GANTALAO', 'BHRIAN', '', 'TTSP-2025-0004', 0, 'TEST 4', 20, 'dropped', '2025-12-12'),
(755, 'CALOGMOC', 'MAGBUTONG', 'LOUKIE', '', 'TTSP-2025-0005', 1200, 'TEST 4', 20, 'active', NULL),
(756, 'CASTRO', 'CAMBONGGA', 'RAYMOND', '', 'TTSP-2025-0006', 1200, 'TEST 4', 20, 'active', NULL),
(757, 'CEBA', 'BAYACAG', 'NELBOY', '', 'TTSP-2025-0007', 1200, 'TEST 4', 20, 'active', NULL),
(758, 'DIANA', 'VAJA', 'LILIA', '', 'TTSP-2025-0008', 1200, 'TEST 4', 20, 'active', NULL),
(759, 'DIAPANA', 'DE VERA', 'LEIZEL', '', 'TTSP-2025-0009', 1200, 'TEST 4', 20, 'active', NULL),
(760, 'ESPINOSA', 'LADO', 'JAYCHA', '', 'TTSP-2025-0010', 1200, 'TEST 4', 20, 'active', NULL),
(761, 'GALGO', 'RIN', 'CARMILA', '', 'TTSP-2025-0011', 1200, 'TEST 4', 20, 'active', NULL),
(762, 'INTIG', 'DEMAYO', 'RACHELLE ', '', 'TTSP-2025-0012', 1200, 'TEST 4', 20, 'active', NULL),
(763, 'JUBAN', 'DIAMANTE', 'ALCHER', '', 'TTSP-2025-0013', 1200, 'TEST 4', 20, 'active', NULL),
(764, 'LAVILLA', 'APILAT', 'GLYCE', '', 'TTSP-2025-0014', 1200, 'TEST 4', 20, 'active', NULL),
(765, 'LITANA', 'ORABA', 'NOLLY', '', 'TTSP-2025-0015', 1200, 'TEST 4', 20, 'active', NULL),
(766, 'MABUTING', 'BOHOL', 'GUILLERMO', 'JR', 'TTSP-2025-0016', 1200, 'TEST 4', 20, 'active', NULL),
(767, 'NONONG', 'BANOTBOT', 'ELPRELY', '', 'TTSP-2025-0017', 1200, 'TEST 4', 20, 'active', NULL),
(768, 'ONGCAY', 'MANDAGUIO', 'REYNALDO', '', 'TTSP-2025-0018', 1200, 'TEST 4', 20, 'active', NULL),
(769, 'PALACA', 'MANLOZA', 'LOLITA', '', 'TTSP-2025-0019', 1200, 'TEST 4', 20, 'active', NULL),
(770, 'PARAN', 'EMBUDO', 'IRENE', '', 'TTSP-2025-0020', 1200, 'TEST 4', 20, 'active', NULL),
(771, 'PAUL', 'DOROMAL', 'CHERILYN', '', 'TTSP-2025-0021', 1200, 'TEST 4', 20, 'active', NULL),
(772, 'RAMOS', 'CONDE', 'MARICEL', '', 'TTSP-2025-0022', 1200, 'TEST 4', 20, 'active', NULL),
(773, 'REYES', 'LAGUMBAY', 'ALVIN', '', 'TTSP-2025-0023', 1200, 'TEST 4', 20, 'active', NULL),
(774, 'TALIP', 'CALE', 'ROCHELLE', '', 'TTSP-2025-0024', 1200, 'TEST 4', 20, 'active', NULL),
(775, 'TIMTIM', 'MABUTING', 'JELYN', '', 'TTSP-2025-0025', 1200, 'TEST 4', 20, 'active', NULL),
(776, 'JOEMAR', 'MANTAHINAY', 'ALMUETE', '', 'TTSP-2025-0001', 400, 'TEST 5', 19, 'active', NULL),
(777, 'EMMANUEL', 'PADORA', 'ARMOCILLA', '', 'TTSP-2025-0002', 400, 'TEST 5', 19, 'active', NULL),
(778, 'CHARMILLE', 'BACLI-AN', 'BLANCO', '', 'TTSP-2025-0003', 400, 'TEST 5', 19, 'active', NULL),
(779, 'BHRIAN', 'GANTALAO', 'BOHOL', '', 'TTSP-2025-0004', 400, 'TEST 5', 19, 'active', NULL),
(780, 'LOUKIE', 'MAGBUTONG', 'CALOGMOC', '', 'TTSP-2025-0005', 400, 'TEST 5', 19, 'active', NULL),
(781, 'RAYMOND', 'CAMBONGGA', 'CASTRO', '', 'TTSP-2025-0006', 400, 'TEST 5', 19, 'active', NULL),
(782, 'NELBOY', 'BAYACAG', 'CEBA', '', 'TTSP-2025-0007', 400, 'TEST 5', 19, 'active', NULL),
(783, 'LILIA', 'VAJA', 'DIANA', '', 'TTSP-2025-0008', 400, 'TEST 5', 19, 'active', NULL),
(784, 'LEIZEL', 'DE VERA', 'DIAPANA', '', 'TTSP-2025-0009', 400, 'TEST 5', 19, 'active', NULL),
(785, 'JAYCHA', 'LADO', 'ESPINOSA', '', 'TTSP-2025-0010', 400, 'TEST 5', 19, 'active', NULL),
(786, 'CARMILA', 'RIN', 'GALGO', '', 'TTSP-2025-0011', 400, 'TEST 5', 19, 'active', NULL),
(787, 'RACHELLE ', 'DEMAYO', 'INTIG', '', 'TTSP-2025-0012', 400, 'TEST 5', 19, 'active', NULL),
(788, 'ALCHER', 'DIAMANTE', 'JUBAN', '', 'TTSP-2025-0013', 400, 'TEST 5', 19, 'active', NULL),
(789, 'GLYCE', 'APILAT', 'LAVILLA', '', 'TTSP-2025-0014', 400, 'TEST 5', 19, 'active', NULL),
(790, 'NOLLY', 'ORABA', 'LITANA', '', 'TTSP-2025-0015', 400, 'TEST 5', 19, 'active', NULL),
(791, 'GUILLERMO', 'BOHOL', 'MABUTING', 'JR', 'TTSP-2025-0016', 400, 'TEST 5', 19, 'active', NULL),
(792, 'ELPRELY', 'BANOTBOT', 'NONONG', '', 'TTSP-2025-0017', 400, 'TEST 5', 19, 'active', NULL),
(793, 'REYNALDO', 'MANDAGUIO', 'ONGCAY', '', 'TTSP-2025-0018', 400, 'TEST 5', 19, 'active', NULL),
(794, 'LOLITA', 'MANLOZA', 'PALACA', '', 'TTSP-2025-0019', 400, 'TEST 5', 19, 'active', NULL),
(795, 'IRENE', 'EMBUDO', 'PARAN', '', 'TTSP-2025-0020', 400, 'TEST 5', 19, 'active', NULL),
(796, 'CHERILYN', 'DOROMAL', 'PAUL', '', 'TTSP-2025-0021', 400, 'TEST 5', 19, 'active', NULL),
(797, 'MARICEL', 'CONDE', 'RAMOS', '', 'TTSP-2025-0022', 400, 'TEST 5', 19, 'active', NULL),
(798, 'ALVIN', 'LAGUMBAY', 'REYES', '', 'TTSP-2025-0023', 400, 'TEST 5', 19, 'active', NULL),
(799, 'ROCHELLE', 'CALE', 'TALIP', '', 'TTSP-2025-0024', 400, 'TEST 5', 19, 'active', NULL),
(800, 'JELYN', 'MABUTING', 'TIMTIM', '', 'TTSP-2025-0025', 400, 'TEST 5', 19, 'active', NULL),
(801, 'JOEMAR', 'MANTAHINAY', 'ALMUETE', '', 'TTSP-2025-0001', 0, 'TEST 5', 18, 'active', NULL),
(802, 'EMMANUEL', 'PADORA', 'ARMOCILLA', '', 'TTSP-2025-0002', 0, 'TEST 5', 18, 'active', NULL),
(803, 'CHARMILLE', 'BACLI-AN', 'BLANCO', '', 'TTSP-2025-0003', 0, 'TEST 5', 18, 'active', NULL),
(804, 'BHRIAN', 'GANTALAO', 'BOHOL', '', 'TTSP-2025-0004', 0, 'TEST 5', 18, 'active', NULL),
(805, 'LOUKIE', 'MAGBUTONG', 'CALOGMOC', '', 'TTSP-2025-0005', 0, 'TEST 5', 18, 'active', NULL),
(806, 'RAYMOND', 'CAMBONGGA', 'CASTRO', '', 'TTSP-2025-0006', 0, 'TEST 5', 18, 'active', NULL),
(807, 'NELBOY', 'BAYACAG', 'CEBA', '', 'TTSP-2025-0007', 0, 'TEST 5', 18, 'active', NULL),
(808, 'LILIA', 'VAJA', 'DIANA', '', 'TTSP-2025-0008', 0, 'TEST 5', 18, 'active', NULL),
(809, 'LEIZEL', 'DE VERA', 'DIAPANA', '', 'TTSP-2025-0009', 0, 'TEST 5', 18, 'active', NULL),
(810, 'JAYCHA', 'LADO', 'ESPINOSA', '', 'TTSP-2025-0010', 0, 'TEST 5', 18, 'active', NULL),
(811, 'CARMILA', 'RIN', 'GALGO', '', 'TTSP-2025-0011', 0, 'TEST 5', 18, 'active', NULL),
(812, 'RACHELLE ', 'DEMAYO', 'INTIG', '', 'TTSP-2025-0012', 0, 'TEST 5', 18, 'active', NULL),
(813, 'ALCHER', 'DIAMANTE', 'JUBAN', '', 'TTSP-2025-0013', 0, 'TEST 5', 18, 'active', NULL),
(814, 'GLYCE', 'APILAT', 'LAVILLA', '', 'TTSP-2025-0014', 0, 'TEST 5', 18, 'active', NULL),
(815, 'NOLLY', 'ORABA', 'LITANA', '', 'TTSP-2025-0015', 0, 'TEST 5', 18, 'active', NULL),
(816, 'GUILLERMO', 'BOHOL', 'MABUTING', 'JR', 'TTSP-2025-0016', 0, 'TEST 5', 18, 'active', NULL),
(817, 'ELPRELY', 'BANOTBOT', 'NONONG', '', 'TTSP-2025-0017', 0, 'TEST 5', 18, 'active', NULL),
(818, 'REYNALDO', 'MANDAGUIO', 'ONGCAY', '', 'TTSP-2025-0018', 0, 'TEST 5', 18, 'active', NULL),
(819, 'LOLITA', 'MANLOZA', 'PALACA', '', 'TTSP-2025-0019', 0, 'TEST 5', 18, 'active', NULL),
(820, 'IRENE', 'EMBUDO', 'PARAN', '', 'TTSP-2025-0020', 0, 'TEST 5', 18, 'active', NULL),
(821, 'CHERILYN', 'DOROMAL', 'PAUL', '', 'TTSP-2025-0021', 0, 'TEST 5', 18, 'active', NULL),
(822, 'MARICEL', 'CONDE', 'RAMOS', '', 'TTSP-2025-0022', 0, 'TEST 5', 18, 'active', NULL),
(823, 'ALVIN', 'LAGUMBAY', 'REYES', '', 'TTSP-2025-0023', 0, 'TEST 5', 18, 'active', NULL),
(824, 'ROCHELLE', 'CALE', 'TALIP', '', 'TTSP-2025-0024', 0, 'TEST 5', 18, 'active', NULL),
(825, 'JELYN', 'MABUTING', 'TIMTIM', '', 'TTSP-2025-0025', 0, 'TEST 5', 18, 'active', NULL),
(826, 'JOEMAR', 'MANTAHINAY', 'ALMUETE', '', 'TTSP-2025-0001', 0, 'TEST 5', 20, 'active', NULL),
(827, 'EMMANUEL', 'PADORA', 'ARMOCILLA', '', 'TTSP-2025-0002', 0, 'TEST 5', 20, 'active', NULL),
(828, 'CHARMILLE', 'BACLI-AN', 'BLANCO', '', 'TTSP-2025-0003', 0, 'TEST 5', 20, 'active', NULL),
(829, 'BHRIAN', 'GANTALAO', 'BOHOL', '', 'TTSP-2025-0004', 0, 'TEST 5', 20, 'active', NULL),
(830, 'LOUKIE', 'MAGBUTONG', 'CALOGMOC', '', 'TTSP-2025-0005', 0, 'TEST 5', 20, 'active', NULL),
(831, 'RAYMOND', 'CAMBONGGA', 'CASTRO', '', 'TTSP-2025-0006', 0, 'TEST 5', 20, 'active', NULL),
(832, 'NELBOY', 'BAYACAG', 'CEBA', '', 'TTSP-2025-0007', 0, 'TEST 5', 20, 'active', NULL),
(833, 'LILIA', 'VAJA', 'DIANA', '', 'TTSP-2025-0008', 0, 'TEST 5', 20, 'active', NULL),
(834, 'LEIZEL', 'DE VERA', 'DIAPANA', '', 'TTSP-2025-0009', 0, 'TEST 5', 20, 'active', NULL),
(835, 'JAYCHA', 'LADO', 'ESPINOSA', '', 'TTSP-2025-0010', 0, 'TEST 5', 20, 'active', NULL),
(836, 'CARMILA', 'RIN', 'GALGO', '', 'TTSP-2025-0011', 0, 'TEST 5', 20, 'active', NULL),
(837, 'RACHELLE ', 'DEMAYO', 'INTIG', '', 'TTSP-2025-0012', 0, 'TEST 5', 20, 'active', NULL),
(838, 'ALCHER', 'DIAMANTE', 'JUBAN', '', 'TTSP-2025-0013', 0, 'TEST 5', 20, 'active', NULL),
(839, 'GLYCE', 'APILAT', 'LAVILLA', '', 'TTSP-2025-0014', 0, 'TEST 5', 20, 'active', NULL),
(840, 'NOLLY', 'ORABA', 'LITANA', '', 'TTSP-2025-0015', 0, 'TEST 5', 20, 'active', NULL),
(841, 'GUILLERMO', 'BOHOL', 'MABUTING', 'JR', 'TTSP-2025-0016', 0, 'TEST 5', 20, 'active', NULL),
(842, 'ELPRELY', 'BANOTBOT', 'NONONG', '', 'TTSP-2025-0017', 0, 'TEST 5', 20, 'active', NULL),
(843, 'REYNALDO', 'MANDAGUIO', 'ONGCAY', '', 'TTSP-2025-0018', 0, 'TEST 5', 20, 'active', NULL),
(844, 'LOLITA', 'MANLOZA', 'PALACA', '', 'TTSP-2025-0019', 0, 'TEST 5', 20, 'active', NULL),
(845, 'IRENE', 'EMBUDO', 'PARAN', '', 'TTSP-2025-0020', 0, 'TEST 5', 20, 'active', NULL),
(846, 'CHERILYN', 'DOROMAL', 'PAUL', '', 'TTSP-2025-0021', 0, 'TEST 5', 20, 'active', NULL),
(847, 'MARICEL', 'CONDE', 'RAMOS', '', 'TTSP-2025-0022', 0, 'TEST 5', 20, 'active', NULL),
(848, 'ALVIN', 'LAGUMBAY', 'REYES', '', 'TTSP-2025-0023', 0, 'TEST 5', 20, 'active', NULL),
(849, 'ROCHELLE', 'CALE', 'TALIP', '', 'TTSP-2025-0024', 0, 'TEST 5', 20, 'active', NULL),
(850, 'JELYN', 'MABUTING', 'TIMTIM', '', 'TTSP-2025-0025', 0, 'TEST 5', 20, 'active', NULL),
(851, 'JOEMAR', 'MANTAHINAY', 'ALMUETE', '', 'TTSP-2025-0001', 4920, 'TEST 21', 19, 'active', NULL),
(852, 'EMMANUEL', 'PADORA', 'ARMOCILLA', '', 'TTSP-2025-0002', 4920, 'TEST 21', 19, 'active', NULL),
(853, 'CHARMILLE', 'BACLI-AN', 'BLANCO', '', 'TTSP-2025-0003', 4920, 'TEST 21', 19, 'active', NULL),
(854, 'BHRIAN', 'GANTALAO', 'BOHOL', '', 'TTSP-2025-0004', 4920, 'TEST 21', 19, 'active', NULL),
(855, 'LOUKIE', 'MAGBUTONG', 'CALOGMOC', '', 'TTSP-2025-0005', 4920, 'TEST 21', 19, 'active', NULL),
(856, 'RAYMOND', 'CAMBONGGA', 'CASTRO', '', 'TTSP-2025-0006', 4920, 'TEST 21', 19, 'active', NULL),
(857, 'NELBOY', 'BAYACAG', 'CEBA', '', 'TTSP-2025-0007', 4920, 'TEST 21', 19, 'active', NULL),
(858, 'LILIA', 'VAJA', 'DIANA', '', 'TTSP-2025-0008', 4920, 'TEST 21', 19, 'active', NULL),
(859, 'LEIZEL', 'DE VERA', 'DIAPANA', '', 'TTSP-2025-0009', 4920, 'TEST 21', 19, 'active', NULL),
(860, 'JAYCHA', 'LADO', 'ESPINOSA', '', 'TTSP-2025-0010', 4920, 'TEST 21', 19, 'active', NULL),
(861, 'CARMILA', 'RIN', 'GALGO', '', 'TTSP-2025-0011', 4920, 'TEST 21', 19, 'active', NULL),
(862, 'RACHELLE ', 'DEMAYO', 'INTIG', '', 'TTSP-2025-0012', 4920, 'TEST 21', 19, 'active', NULL),
(863, 'ALCHER', 'DIAMANTE', 'JUBAN', '', 'TTSP-2025-0013', 4920, 'TEST 21', 19, 'active', NULL),
(864, 'GLYCE', 'APILAT', 'LAVILLA', '', 'TTSP-2025-0014', 4920, 'TEST 21', 19, 'active', NULL),
(865, 'NOLLY', 'ORABA', 'LITANA', '', 'TTSP-2025-0015', 4920, 'TEST 21', 19, 'active', NULL),
(866, 'GUILLERMO', 'BOHOL', 'MABUTING', 'JR', 'TTSP-2025-0016', 4920, 'TEST 21', 19, 'active', NULL),
(867, 'ELPRELY', 'BANOTBOT', 'NONONG', '', 'TTSP-2025-0017', 4920, 'TEST 21', 19, 'active', NULL),
(868, 'REYNALDO', 'MANDAGUIO', 'ONGCAY', '', 'TTSP-2025-0018', 4920, 'TEST 21', 19, 'active', NULL),
(869, 'LOLITA', 'MANLOZA', 'PALACA', '', 'TTSP-2025-0019', 4920, 'TEST 21', 19, 'active', NULL),
(870, 'IRENE', 'EMBUDO', 'PARAN', '', 'TTSP-2025-0020', 4920, 'TEST 21', 19, 'active', NULL),
(871, 'CHERILYN', 'DOROMAL', 'PAUL', '', 'TTSP-2025-0021', 4920, 'TEST 21', 19, 'active', NULL),
(872, 'MARICEL', 'CONDE', 'RAMOS', '', 'TTSP-2025-0022', 4920, 'TEST 21', 19, 'active', NULL),
(873, 'ALVIN', 'LAGUMBAY', 'REYES', '', 'TTSP-2025-0023', 4920, 'TEST 21', 19, 'active', NULL),
(874, 'ROCHELLE', 'CALE', 'TALIP', '', 'TTSP-2025-0024', 4920, 'TEST 21', 19, 'active', NULL),
(875, 'JELYN', 'MABUTING', 'TIMTIM', '', 'TTSP-2025-0025', 4920, 'TEST 21', 19, 'active', NULL),
(876, 'JOEMAR', 'MANTAHINAY', 'ALMUETE', '', 'TTSP-2025-0001', 4920, 'TEST 21', 18, 'active', NULL),
(877, 'EMMANUEL', 'PADORA', 'ARMOCILLA', '', 'TTSP-2025-0002', 4920, 'TEST 21', 18, 'active', NULL),
(878, 'CHARMILLE', 'BACLI-AN', 'BLANCO', '', 'TTSP-2025-0003', 4920, 'TEST 21', 18, 'active', NULL),
(879, 'BHRIAN', 'GANTALAO', 'BOHOL', '', 'TTSP-2025-0004', 4920, 'TEST 21', 18, 'active', NULL),
(880, 'LOUKIE', 'MAGBUTONG', 'CALOGMOC', '', 'TTSP-2025-0005', 4920, 'TEST 21', 18, 'active', NULL),
(881, 'RAYMOND', 'CAMBONGGA', 'CASTRO', '', 'TTSP-2025-0006', 4920, 'TEST 21', 18, 'active', NULL),
(882, 'NELBOY', 'BAYACAG', 'CEBA', '', 'TTSP-2025-0007', 4920, 'TEST 21', 18, 'active', NULL),
(883, 'LILIA', 'VAJA', 'DIANA', '', 'TTSP-2025-0008', 4920, 'TEST 21', 18, 'active', NULL),
(884, 'LEIZEL', 'DE VERA', 'DIAPANA', '', 'TTSP-2025-0009', 4920, 'TEST 21', 18, 'active', NULL),
(885, 'JAYCHA', 'LADO', 'ESPINOSA', '', 'TTSP-2025-0010', 4920, 'TEST 21', 18, 'active', NULL),
(886, 'CARMILA', 'RIN', 'GALGO', '', 'TTSP-2025-0011', 4920, 'TEST 21', 18, 'active', NULL),
(887, 'RACHELLE ', 'DEMAYO', 'INTIG', '', 'TTSP-2025-0012', 4920, 'TEST 21', 18, 'active', NULL),
(888, 'ALCHER', 'DIAMANTE', 'JUBAN', '', 'TTSP-2025-0013', 4920, 'TEST 21', 18, 'active', NULL),
(889, 'GLYCE', 'APILAT', 'LAVILLA', '', 'TTSP-2025-0014', 4920, 'TEST 21', 18, 'active', NULL),
(890, 'NOLLY', 'ORABA', 'LITANA', '', 'TTSP-2025-0015', 4920, 'TEST 21', 18, 'active', NULL),
(891, 'GUILLERMO', 'BOHOL', 'MABUTING', 'JR', 'TTSP-2025-0016', 4920, 'TEST 21', 18, 'active', NULL),
(892, 'ELPRELY', 'BANOTBOT', 'NONONG', '', 'TTSP-2025-0017', 4920, 'TEST 21', 18, 'active', NULL),
(893, 'REYNALDO', 'MANDAGUIO', 'ONGCAY', '', 'TTSP-2025-0018', 4920, 'TEST 21', 18, 'active', NULL),
(894, 'LOLITA', 'MANLOZA', 'PALACA', '', 'TTSP-2025-0019', 4920, 'TEST 21', 18, 'active', NULL),
(895, 'IRENE', 'EMBUDO', 'PARAN', '', 'TTSP-2025-0020', 4920, 'TEST 21', 18, 'active', NULL),
(896, 'CHERILYN', 'DOROMAL', 'PAUL', '', 'TTSP-2025-0021', 4920, 'TEST 21', 18, 'active', NULL),
(897, 'MARICEL', 'CONDE', 'RAMOS', '', 'TTSP-2025-0022', 4920, 'TEST 21', 18, 'active', NULL),
(898, 'ALVIN', 'LAGUMBAY', 'REYES', '', 'TTSP-2025-0023', 4920, 'TEST 21', 18, 'active', NULL),
(899, 'ROCHELLE', 'CALE', 'TALIP', '', 'TTSP-2025-0024', 4920, 'TEST 21', 18, 'active', NULL),
(900, 'JELYN', 'MABUTING', 'TIMTIM', '', 'TTSP-2025-0025', 4920, 'TEST 21', 18, 'active', NULL),
(901, 'JOEMAR', 'MANTAHINAY', 'ALMUETE', '', 'TTSP-2025-0001', 4000, 'TEST 21', 20, 'active', NULL),
(902, 'EMMANUEL', 'PADORA', 'ARMOCILLA', '', 'TTSP-2025-0002', 4000, 'TEST 21', 20, 'active', NULL),
(903, 'CHARMILLE', 'BACLI-AN', 'BLANCO', '', 'TTSP-2025-0003', 4000, 'TEST 21', 20, 'active', NULL),
(904, 'BHRIAN', 'GANTALAO', 'BOHOL', '', 'TTSP-2025-0004', 4000, 'TEST 21', 20, 'active', NULL),
(905, 'LOUKIE', 'MAGBUTONG', 'CALOGMOC', '', 'TTSP-2025-0005', 4000, 'TEST 21', 20, 'active', NULL),
(906, 'RAYMOND', 'CAMBONGGA', 'CASTRO', '', 'TTSP-2025-0006', 4000, 'TEST 21', 20, 'active', NULL),
(907, 'NELBOY', 'BAYACAG', 'CEBA', '', 'TTSP-2025-0007', 4000, 'TEST 21', 20, 'active', NULL),
(908, 'LILIA', 'VAJA', 'DIANA', '', 'TTSP-2025-0008', 4000, 'TEST 21', 20, 'active', NULL),
(909, 'LEIZEL', 'DE VERA', 'DIAPANA', '', 'TTSP-2025-0009', 4000, 'TEST 21', 20, 'active', NULL),
(910, 'JAYCHA', 'LADO', 'ESPINOSA', '', 'TTSP-2025-0010', 4000, 'TEST 21', 20, 'active', NULL),
(911, 'CARMILA', 'RIN', 'GALGO', '', 'TTSP-2025-0011', 4000, 'TEST 21', 20, 'active', NULL),
(912, 'RACHELLE ', 'DEMAYO', 'INTIG', '', 'TTSP-2025-0012', 4000, 'TEST 21', 20, 'active', NULL),
(913, 'ALCHER', 'DIAMANTE', 'JUBAN', '', 'TTSP-2025-0013', 4000, 'TEST 21', 20, 'active', NULL),
(914, 'GLYCE', 'APILAT', 'LAVILLA', '', 'TTSP-2025-0014', 4000, 'TEST 21', 20, 'active', NULL),
(915, 'NOLLY', 'ORABA', 'LITANA', '', 'TTSP-2025-0015', 4000, 'TEST 21', 20, 'active', NULL),
(916, 'GUILLERMO', 'BOHOL', 'MABUTING', 'JR', 'TTSP-2025-0016', 4000, 'TEST 21', 20, 'active', NULL),
(917, 'ELPRELY', 'BANOTBOT', 'NONONG', '', 'TTSP-2025-0017', 4000, 'TEST 21', 20, 'active', NULL),
(918, 'REYNALDO', 'MANDAGUIO', 'ONGCAY', '', 'TTSP-2025-0018', 4000, 'TEST 21', 20, 'active', NULL),
(919, 'LOLITA', 'MANLOZA', 'PALACA', '', 'TTSP-2025-0019', 4000, 'TEST 21', 20, 'active', NULL),
(920, 'IRENE', 'EMBUDO', 'PARAN', '', 'TTSP-2025-0020', 4000, 'TEST 21', 20, 'active', NULL),
(921, 'CHERILYN', 'DOROMAL', 'PAUL', '', 'TTSP-2025-0021', 4000, 'TEST 21', 20, 'active', NULL);
INSERT INTO `trainees` (`id`, `fname`, `mname`, `lname`, `extension`, `sg_number`, `training_cost`, `ctrl_num`, `bt_id`, `status`, `date_dropped`) VALUES
(922, 'MARICEL', 'CONDE', 'RAMOS', '', 'TTSP-2025-0022', 4000, 'TEST 21', 20, 'active', NULL),
(923, 'ALVIN', 'LAGUMBAY', 'REYES', '', 'TTSP-2025-0023', 4000, 'TEST 21', 20, 'active', NULL),
(924, 'ROCHELLE', 'CALE', 'TALIP', '', 'TTSP-2025-0024', 4000, 'TEST 21', 20, 'active', NULL),
(925, 'JELYN', 'MABUTING', 'TIMTIM', '', 'TTSP-2025-0025', 4000, 'TEST 21', 20, 'active', NULL),
(926, 'JOEMAR', 'MANTAHINAY', 'ALMUETE', '', 'TTSP-2025-0001', 40, 'TEST 2026 FOR NOTIF', 19, 'active', NULL),
(927, 'EMMANUEL', 'PADORA', 'ARMOCILLA', '', 'TTSP-2025-0002', 40, 'TEST 2026 FOR NOTIF', 19, 'active', NULL),
(928, 'CHARMILLE', 'BACLI-AN', 'BLANCO', '', 'TTSP-2025-0003', 40, 'TEST 2026 FOR NOTIF', 19, 'active', NULL),
(929, 'BHRIAN', 'GANTALAO', 'BOHOL', '', 'TTSP-2025-0004', 40, 'TEST 2026 FOR NOTIF', 19, 'active', NULL),
(930, 'LOUKIE', 'MAGBUTONG', 'CALOGMOC', '', 'TTSP-2025-0005', 40, 'TEST 2026 FOR NOTIF', 19, 'active', NULL),
(931, 'RAYMOND', 'CAMBONGGA', 'CASTRO', '', 'TTSP-2025-0006', 40, 'TEST 2026 FOR NOTIF', 19, 'active', NULL),
(932, 'NELBOY', 'BAYACAG', 'CEBA', '', 'TTSP-2025-0007', 40, 'TEST 2026 FOR NOTIF', 19, 'active', NULL),
(933, 'LILIA', 'VAJA', 'DIANA', '', 'TTSP-2025-0008', 40, 'TEST 2026 FOR NOTIF', 19, 'active', NULL),
(934, 'LEIZEL', 'DE VERA', 'DIAPANA', '', 'TTSP-2025-0009', 40, 'TEST 2026 FOR NOTIF', 19, 'active', NULL),
(935, 'JAYCHA', 'LADO', 'ESPINOSA', '', 'TTSP-2025-0010', 40, 'TEST 2026 FOR NOTIF', 19, 'active', NULL),
(936, 'CARMILA', 'RIN', 'GALGO', '', 'TTSP-2025-0011', 40, 'TEST 2026 FOR NOTIF', 19, 'active', NULL),
(937, 'RACHELLE ', 'DEMAYO', 'INTIG', '', 'TTSP-2025-0012', 40, 'TEST 2026 FOR NOTIF', 19, 'active', NULL),
(938, 'ALCHER', 'DIAMANTE', 'JUBAN', '', 'TTSP-2025-0013', 40, 'TEST 2026 FOR NOTIF', 19, 'active', NULL),
(939, 'GLYCE', 'APILAT', 'LAVILLA', '', 'TTSP-2025-0014', 40, 'TEST 2026 FOR NOTIF', 19, 'active', NULL),
(940, 'NOLLY', 'ORABA', 'LITANA', '', 'TTSP-2025-0015', 40, 'TEST 2026 FOR NOTIF', 19, 'active', NULL),
(941, 'GUILLERMO', 'BOHOL', 'MABUTING', 'JR', 'TTSP-2025-0016', 40, 'TEST 2026 FOR NOTIF', 19, 'active', NULL),
(942, 'ELPRELY', 'BANOTBOT', 'NONONG', '', 'TTSP-2025-0017', 40, 'TEST 2026 FOR NOTIF', 19, 'active', NULL),
(943, 'REYNALDO', 'MANDAGUIO', 'ONGCAY', '', 'TTSP-2025-0018', 40, 'TEST 2026 FOR NOTIF', 19, 'active', NULL),
(944, 'LOLITA', 'MANLOZA', 'PALACA', '', 'TTSP-2025-0019', 40, 'TEST 2026 FOR NOTIF', 19, 'active', NULL),
(945, 'IRENE', 'EMBUDO', 'PARAN', '', 'TTSP-2025-0020', 40, 'TEST 2026 FOR NOTIF', 19, 'active', NULL),
(946, 'CHERILYN', 'DOROMAL', 'PAUL', '', 'TTSP-2025-0021', 40, 'TEST 2026 FOR NOTIF', 19, 'active', NULL),
(947, 'MARICEL', 'CONDE', 'RAMOS', '', 'TTSP-2025-0022', 40, 'TEST 2026 FOR NOTIF', 19, 'active', NULL),
(948, 'ALVIN', 'LAGUMBAY', 'REYES', '', 'TTSP-2025-0023', 40, 'TEST 2026 FOR NOTIF', 19, 'active', NULL),
(949, 'ROCHELLE', 'CALE', 'TALIP', '', 'TTSP-2025-0024', 40, 'TEST 2026 FOR NOTIF', 19, 'active', NULL),
(950, 'JELYN', 'MABUTING', 'TIMTIM', '', 'TTSP-2025-0025', 40, 'TEST 2026 FOR NOTIF', 19, 'active', NULL),
(951, 'JOEMAR', 'MANTAHINAY', 'ALMUETE', '', 'TTSP-2025-0001', 80, 'TEST 2026 FOR NOTIF', 18, 'active', NULL),
(952, 'EMMANUEL', 'PADORA', 'ARMOCILLA', '', 'TTSP-2025-0002', 80, 'TEST 2026 FOR NOTIF', 18, 'active', NULL),
(953, 'CHARMILLE', 'BACLI-AN', 'BLANCO', '', 'TTSP-2025-0003', 80, 'TEST 2026 FOR NOTIF', 18, 'active', NULL),
(954, 'BHRIAN', 'GANTALAO', 'BOHOL', '', 'TTSP-2025-0004', 80, 'TEST 2026 FOR NOTIF', 18, 'active', NULL),
(955, 'LOUKIE', 'MAGBUTONG', 'CALOGMOC', '', 'TTSP-2025-0005', 80, 'TEST 2026 FOR NOTIF', 18, 'active', NULL),
(956, 'RAYMOND', 'CAMBONGGA', 'CASTRO', '', 'TTSP-2025-0006', 80, 'TEST 2026 FOR NOTIF', 18, 'active', NULL),
(957, 'NELBOY', 'BAYACAG', 'CEBA', '', 'TTSP-2025-0007', 80, 'TEST 2026 FOR NOTIF', 18, 'active', NULL),
(958, 'LILIA', 'VAJA', 'DIANA', '', 'TTSP-2025-0008', 80, 'TEST 2026 FOR NOTIF', 18, 'active', NULL),
(959, 'LEIZEL', 'DE VERA', 'DIAPANA', '', 'TTSP-2025-0009', 80, 'TEST 2026 FOR NOTIF', 18, 'active', NULL),
(960, 'JAYCHA', 'LADO', 'ESPINOSA', '', 'TTSP-2025-0010', 80, 'TEST 2026 FOR NOTIF', 18, 'active', NULL),
(961, 'CARMILA', 'RIN', 'GALGO', '', 'TTSP-2025-0011', 80, 'TEST 2026 FOR NOTIF', 18, 'active', NULL),
(962, 'RACHELLE ', 'DEMAYO', 'INTIG', '', 'TTSP-2025-0012', 80, 'TEST 2026 FOR NOTIF', 18, 'active', NULL),
(963, 'ALCHER', 'DIAMANTE', 'JUBAN', '', 'TTSP-2025-0013', 80, 'TEST 2026 FOR NOTIF', 18, 'active', NULL),
(964, 'GLYCE', 'APILAT', 'LAVILLA', '', 'TTSP-2025-0014', 80, 'TEST 2026 FOR NOTIF', 18, 'active', NULL),
(965, 'NOLLY', 'ORABA', 'LITANA', '', 'TTSP-2025-0015', 80, 'TEST 2026 FOR NOTIF', 18, 'active', NULL),
(966, 'GUILLERMO', 'BOHOL', 'MABUTING', 'JR', 'TTSP-2025-0016', 80, 'TEST 2026 FOR NOTIF', 18, 'active', NULL),
(967, 'ELPRELY', 'BANOTBOT', 'NONONG', '', 'TTSP-2025-0017', 80, 'TEST 2026 FOR NOTIF', 18, 'active', NULL),
(968, 'REYNALDO', 'MANDAGUIO', 'ONGCAY', '', 'TTSP-2025-0018', 80, 'TEST 2026 FOR NOTIF', 18, 'active', NULL),
(969, 'LOLITA', 'MANLOZA', 'PALACA', '', 'TTSP-2025-0019', 80, 'TEST 2026 FOR NOTIF', 18, 'active', NULL),
(970, 'IRENE', 'EMBUDO', 'PARAN', '', 'TTSP-2025-0020', 80, 'TEST 2026 FOR NOTIF', 18, 'active', NULL),
(971, 'CHERILYN', 'DOROMAL', 'PAUL', '', 'TTSP-2025-0021', 80, 'TEST 2026 FOR NOTIF', 18, 'active', NULL),
(972, 'MARICEL', 'CONDE', 'RAMOS', '', 'TTSP-2025-0022', 80, 'TEST 2026 FOR NOTIF', 18, 'active', NULL),
(973, 'ALVIN', 'LAGUMBAY', 'REYES', '', 'TTSP-2025-0023', 80, 'TEST 2026 FOR NOTIF', 18, 'active', NULL),
(974, 'ROCHELLE', 'CALE', 'TALIP', '', 'TTSP-2025-0024', 80, 'TEST 2026 FOR NOTIF', 18, 'active', NULL),
(975, 'JELYN', 'MABUTING', 'TIMTIM', '', 'TTSP-2025-0025', 80, 'TEST 2026 FOR NOTIF', 18, 'active', NULL),
(976, 'JOEMAR', 'MANTAHINAY', 'ALMUETE', '', 'TTSP-2025-0001', 120, 'TEST 2026 FOR NOTIF', 20, 'active', NULL),
(977, 'EMMANUEL', 'PADORA', 'ARMOCILLA', '', 'TTSP-2025-0002', 120, 'TEST 2026 FOR NOTIF', 20, 'active', NULL),
(978, 'CHARMILLE', 'BACLI-AN', 'BLANCO', '', 'TTSP-2025-0003', 120, 'TEST 2026 FOR NOTIF', 20, 'active', NULL),
(979, 'BHRIAN', 'GANTALAO', 'BOHOL', '', 'TTSP-2025-0004', 120, 'TEST 2026 FOR NOTIF', 20, 'active', NULL),
(980, 'LOUKIE', 'MAGBUTONG', 'CALOGMOC', '', 'TTSP-2025-0005', 120, 'TEST 2026 FOR NOTIF', 20, 'active', NULL),
(981, 'RAYMOND', 'CAMBONGGA', 'CASTRO', '', 'TTSP-2025-0006', 120, 'TEST 2026 FOR NOTIF', 20, 'active', NULL),
(982, 'NELBOY', 'BAYACAG', 'CEBA', '', 'TTSP-2025-0007', 120, 'TEST 2026 FOR NOTIF', 20, 'active', NULL),
(983, 'LILIA', 'VAJA', 'DIANA', '', 'TTSP-2025-0008', 120, 'TEST 2026 FOR NOTIF', 20, 'active', NULL),
(984, 'LEIZEL', 'DE VERA', 'DIAPANA', '', 'TTSP-2025-0009', 120, 'TEST 2026 FOR NOTIF', 20, 'active', NULL),
(985, 'JAYCHA', 'LADO', 'ESPINOSA', '', 'TTSP-2025-0010', 120, 'TEST 2026 FOR NOTIF', 20, 'active', NULL),
(986, 'CARMILA', 'RIN', 'GALGO', '', 'TTSP-2025-0011', 120, 'TEST 2026 FOR NOTIF', 20, 'active', NULL),
(987, 'RACHELLE ', 'DEMAYO', 'INTIG', '', 'TTSP-2025-0012', 120, 'TEST 2026 FOR NOTIF', 20, 'active', NULL),
(988, 'ALCHER', 'DIAMANTE', 'JUBAN', '', 'TTSP-2025-0013', 120, 'TEST 2026 FOR NOTIF', 20, 'active', NULL),
(989, 'GLYCE', 'APILAT', 'LAVILLA', '', 'TTSP-2025-0014', 120, 'TEST 2026 FOR NOTIF', 20, 'active', NULL),
(990, 'NOLLY', 'ORABA', 'LITANA', '', 'TTSP-2025-0015', 120, 'TEST 2026 FOR NOTIF', 20, 'active', NULL),
(991, 'GUILLERMO', 'BOHOL', 'MABUTING', 'JR', 'TTSP-2025-0016', 120, 'TEST 2026 FOR NOTIF', 20, 'active', NULL),
(992, 'ELPRELY', 'BANOTBOT', 'NONONG', '', 'TTSP-2025-0017', 120, 'TEST 2026 FOR NOTIF', 20, 'active', NULL),
(993, 'REYNALDO', 'MANDAGUIO', 'ONGCAY', '', 'TTSP-2025-0018', 120, 'TEST 2026 FOR NOTIF', 20, 'active', NULL),
(994, 'LOLITA', 'MANLOZA', 'PALACA', '', 'TTSP-2025-0019', 120, 'TEST 2026 FOR NOTIF', 20, 'active', NULL),
(995, 'IRENE', 'EMBUDO', 'PARAN', '', 'TTSP-2025-0020', 120, 'TEST 2026 FOR NOTIF', 20, 'active', NULL),
(996, 'CHERILYN', 'DOROMAL', 'PAUL', '', 'TTSP-2025-0021', 120, 'TEST 2026 FOR NOTIF', 20, 'active', NULL),
(997, 'MARICEL', 'CONDE', 'RAMOS', '', 'TTSP-2025-0022', 120, 'TEST 2026 FOR NOTIF', 20, 'active', NULL),
(998, 'ALVIN', 'LAGUMBAY', 'REYES', '', 'TTSP-2025-0023', 120, 'TEST 2026 FOR NOTIF', 20, 'active', NULL),
(999, 'ROCHELLE', 'CALE', 'TALIP', '', 'TTSP-2025-0024', 120, 'TEST 2026 FOR NOTIF', 20, 'active', NULL),
(1000, 'JELYN', 'MABUTING', 'TIMTIM', '', 'TTSP-2025-0025', 120, 'TEST 2026 FOR NOTIF', 20, 'active', NULL),
(1001, 'JOEMAR', 'MANTAHINAY', 'ALMUETE', '', 'TTSP-2025-0001', 40, 'asdasdasdas', 19, 'active', NULL),
(1002, 'EMMANUEL', 'PADORA', 'ARMOCILLA', '', 'TTSP-2025-0002', 40, 'asdasdasdas', 19, 'active', NULL),
(1003, 'CHARMILLE', 'BACLI-AN', 'BLANCO', '', 'TTSP-2025-0003', 40, 'asdasdasdas', 19, 'active', NULL),
(1004, 'BHRIAN', 'GANTALAO', 'BOHOL', '', 'TTSP-2025-0004', 40, 'asdasdasdas', 19, 'active', NULL),
(1005, 'LOUKIE', 'MAGBUTONG', 'CALOGMOC', '', 'TTSP-2025-0005', 40, 'asdasdasdas', 19, 'active', NULL),
(1006, 'RAYMOND', 'CAMBONGGA', 'CASTRO', '', 'TTSP-2025-0006', 40, 'asdasdasdas', 19, 'active', NULL),
(1007, 'NELBOY', 'BAYACAG', 'CEBA', '', 'TTSP-2025-0007', 40, 'asdasdasdas', 19, 'active', NULL),
(1008, 'LILIA', 'VAJA', 'DIANA', '', 'TTSP-2025-0008', 40, 'asdasdasdas', 19, 'active', NULL),
(1009, 'LEIZEL', 'DE VERA', 'DIAPANA', '', 'TTSP-2025-0009', 40, 'asdasdasdas', 19, 'active', NULL),
(1010, 'JAYCHA', 'LADO', 'ESPINOSA', '', 'TTSP-2025-0010', 40, 'asdasdasdas', 19, 'active', NULL),
(1011, 'CARMILA', 'RIN', 'GALGO', '', 'TTSP-2025-0011', 40, 'asdasdasdas', 19, 'active', NULL),
(1012, 'RACHELLE ', 'DEMAYO', 'INTIG', '', 'TTSP-2025-0012', 40, 'asdasdasdas', 19, 'active', NULL),
(1013, 'ALCHER', 'DIAMANTE', 'JUBAN', '', 'TTSP-2025-0013', 40, 'asdasdasdas', 19, 'active', NULL),
(1014, 'GLYCE', 'APILAT', 'LAVILLA', '', 'TTSP-2025-0014', 40, 'asdasdasdas', 19, 'active', NULL),
(1015, 'NOLLY', 'ORABA', 'LITANA', '', 'TTSP-2025-0015', 40, 'asdasdasdas', 19, 'active', NULL),
(1016, 'GUILLERMO', 'BOHOL', 'MABUTING', 'JR', 'TTSP-2025-0016', 40, 'asdasdasdas', 19, 'active', NULL),
(1017, 'ELPRELY', 'BANOTBOT', 'NONONG', '', 'TTSP-2025-0017', 40, 'asdasdasdas', 19, 'active', NULL),
(1018, 'REYNALDO', 'MANDAGUIO', 'ONGCAY', '', 'TTSP-2025-0018', 40, 'asdasdasdas', 19, 'active', NULL),
(1019, 'LOLITA', 'MANLOZA', 'PALACA', '', 'TTSP-2025-0019', 40, 'asdasdasdas', 19, 'active', NULL),
(1020, 'IRENE', 'EMBUDO', 'PARAN', '', 'TTSP-2025-0020', 40, 'asdasdasdas', 19, 'active', NULL),
(1021, 'CHERILYN', 'DOROMAL', 'PAUL', '', 'TTSP-2025-0021', 40, 'asdasdasdas', 19, 'active', NULL),
(1022, 'MARICEL', 'CONDE', 'RAMOS', '', 'TTSP-2025-0022', 40, 'asdasdasdas', 19, 'active', NULL),
(1023, 'ALVIN', 'LAGUMBAY', 'REYES', '', 'TTSP-2025-0023', 40, 'asdasdasdas', 19, 'active', NULL),
(1024, 'ROCHELLE', 'CALE', 'TALIP', '', 'TTSP-2025-0024', 40, 'asdasdasdas', 19, 'active', NULL),
(1025, 'JELYN', 'MABUTING', 'TIMTIM', '', 'TTSP-2025-0025', 40, 'asdasdasdas', 19, 'active', NULL),
(1026, 'JOEMAR', 'MANTAHINAY', 'ALMUETE', '', 'TTSP-2025-0001', 92492, 'asdasdasdas', 18, 'active', NULL),
(1027, 'EMMANUEL', 'PADORA', 'ARMOCILLA', '', 'TTSP-2025-0002', 92492, 'asdasdasdas', 18, 'active', NULL),
(1028, 'CHARMILLE', 'BACLI-AN', 'BLANCO', '', 'TTSP-2025-0003', 92492, 'asdasdasdas', 18, 'active', NULL),
(1029, 'BHRIAN', 'GANTALAO', 'BOHOL', '', 'TTSP-2025-0004', 92492, 'asdasdasdas', 18, 'active', NULL),
(1030, 'LOUKIE', 'MAGBUTONG', 'CALOGMOC', '', 'TTSP-2025-0005', 92492, 'asdasdasdas', 18, 'active', NULL),
(1031, 'RAYMOND', 'CAMBONGGA', 'CASTRO', '', 'TTSP-2025-0006', 92492, 'asdasdasdas', 18, 'active', NULL),
(1032, 'NELBOY', 'BAYACAG', 'CEBA', '', 'TTSP-2025-0007', 92492, 'asdasdasdas', 18, 'active', NULL),
(1033, 'LILIA', 'VAJA', 'DIANA', '', 'TTSP-2025-0008', 92492, 'asdasdasdas', 18, 'active', NULL),
(1034, 'LEIZEL', 'DE VERA', 'DIAPANA', '', 'TTSP-2025-0009', 92492, 'asdasdasdas', 18, 'active', NULL),
(1035, 'JAYCHA', 'LADO', 'ESPINOSA', '', 'TTSP-2025-0010', 92492, 'asdasdasdas', 18, 'active', NULL),
(1036, 'CARMILA', 'RIN', 'GALGO', '', 'TTSP-2025-0011', 92492, 'asdasdasdas', 18, 'active', NULL),
(1037, 'RACHELLE ', 'DEMAYO', 'INTIG', '', 'TTSP-2025-0012', 92492, 'asdasdasdas', 18, 'active', NULL),
(1038, 'ALCHER', 'DIAMANTE', 'JUBAN', '', 'TTSP-2025-0013', 92492, 'asdasdasdas', 18, 'active', NULL),
(1039, 'GLYCE', 'APILAT', 'LAVILLA', '', 'TTSP-2025-0014', 92492, 'asdasdasdas', 18, 'active', NULL),
(1040, 'NOLLY', 'ORABA', 'LITANA', '', 'TTSP-2025-0015', 92492, 'asdasdasdas', 18, 'active', NULL),
(1041, 'GUILLERMO', 'BOHOL', 'MABUTING', 'JR', 'TTSP-2025-0016', 92492, 'asdasdasdas', 18, 'active', NULL),
(1042, 'ELPRELY', 'BANOTBOT', 'NONONG', '', 'TTSP-2025-0017', 92492, 'asdasdasdas', 18, 'active', NULL),
(1043, 'REYNALDO', 'MANDAGUIO', 'ONGCAY', '', 'TTSP-2025-0018', 92492, 'asdasdasdas', 18, 'active', NULL),
(1044, 'LOLITA', 'MANLOZA', 'PALACA', '', 'TTSP-2025-0019', 92492, 'asdasdasdas', 18, 'active', NULL),
(1045, 'IRENE', 'EMBUDO', 'PARAN', '', 'TTSP-2025-0020', 92492, 'asdasdasdas', 18, 'active', NULL),
(1046, 'CHERILYN', 'DOROMAL', 'PAUL', '', 'TTSP-2025-0021', 92492, 'asdasdasdas', 18, 'active', NULL),
(1047, 'MARICEL', 'CONDE', 'RAMOS', '', 'TTSP-2025-0022', 92492, 'asdasdasdas', 18, 'active', NULL),
(1048, 'ALVIN', 'LAGUMBAY', 'REYES', '', 'TTSP-2025-0023', 92492, 'asdasdasdas', 18, 'active', NULL),
(1049, 'ROCHELLE', 'CALE', 'TALIP', '', 'TTSP-2025-0024', 92492, 'asdasdasdas', 18, 'active', NULL),
(1050, 'JELYN', 'MABUTING', 'TIMTIM', '', 'TTSP-2025-0025', 92492, 'asdasdasdas', 18, 'active', NULL),
(1051, 'JOEMAR', 'MANTAHINAY', 'ALMUETE', '', 'TTSP-2025-0001', 124924, 'asdasdasdas', 20, 'active', NULL),
(1052, 'EMMANUEL', 'PADORA', 'ARMOCILLA', '', 'TTSP-2025-0002', 124924, 'asdasdasdas', 20, 'active', NULL),
(1053, 'CHARMILLE', 'BACLI-AN', 'BLANCO', '', 'TTSP-2025-0003', 124924, 'asdasdasdas', 20, 'active', NULL),
(1054, 'BHRIAN', 'GANTALAO', 'BOHOL', '', 'TTSP-2025-0004', 124924, 'asdasdasdas', 20, 'active', NULL),
(1055, 'LOUKIE', 'MAGBUTONG', 'CALOGMOC', '', 'TTSP-2025-0005', 124924, 'asdasdasdas', 20, 'active', NULL),
(1056, 'RAYMOND', 'CAMBONGGA', 'CASTRO', '', 'TTSP-2025-0006', 124924, 'asdasdasdas', 20, 'active', NULL),
(1057, 'NELBOY', 'BAYACAG', 'CEBA', '', 'TTSP-2025-0007', 124924, 'asdasdasdas', 20, 'active', NULL),
(1058, 'LILIA', 'VAJA', 'DIANA', '', 'TTSP-2025-0008', 124924, 'asdasdasdas', 20, 'active', NULL),
(1059, 'LEIZEL', 'DE VERA', 'DIAPANA', '', 'TTSP-2025-0009', 124924, 'asdasdasdas', 20, 'active', NULL),
(1060, 'JAYCHA', 'LADO', 'ESPINOSA', '', 'TTSP-2025-0010', 124924, 'asdasdasdas', 20, 'active', NULL),
(1061, 'CARMILA', 'RIN', 'GALGO', '', 'TTSP-2025-0011', 124924, 'asdasdasdas', 20, 'active', NULL),
(1062, 'RACHELLE ', 'DEMAYO', 'INTIG', '', 'TTSP-2025-0012', 124924, 'asdasdasdas', 20, 'active', NULL),
(1063, 'ALCHER', 'DIAMANTE', 'JUBAN', '', 'TTSP-2025-0013', 124924, 'asdasdasdas', 20, 'active', NULL),
(1064, 'GLYCE', 'APILAT', 'LAVILLA', '', 'TTSP-2025-0014', 124924, 'asdasdasdas', 20, 'active', NULL),
(1065, 'NOLLY', 'ORABA', 'LITANA', '', 'TTSP-2025-0015', 124924, 'asdasdasdas', 20, 'active', NULL),
(1066, 'GUILLERMO', 'BOHOL', 'MABUTING', 'JR', 'TTSP-2025-0016', 124924, 'asdasdasdas', 20, 'active', NULL),
(1067, 'ELPRELY', 'BANOTBOT', 'NONONG', '', 'TTSP-2025-0017', 124924, 'asdasdasdas', 20, 'active', NULL),
(1068, 'REYNALDO', 'MANDAGUIO', 'ONGCAY', '', 'TTSP-2025-0018', 124924, 'asdasdasdas', 20, 'active', NULL),
(1069, 'LOLITA', 'MANLOZA', 'PALACA', '', 'TTSP-2025-0019', 124924, 'asdasdasdas', 20, 'active', NULL),
(1070, 'IRENE', 'EMBUDO', 'PARAN', '', 'TTSP-2025-0020', 124924, 'asdasdasdas', 20, 'active', NULL),
(1071, 'CHERILYN', 'DOROMAL', 'PAUL', '', 'TTSP-2025-0021', 124924, 'asdasdasdas', 20, 'active', NULL),
(1072, 'MARICEL', 'CONDE', 'RAMOS', '', 'TTSP-2025-0022', 124924, 'asdasdasdas', 20, 'active', NULL),
(1073, 'ALVIN', 'LAGUMBAY', 'REYES', '', 'TTSP-2025-0023', 124924, 'asdasdasdas', 20, 'active', NULL),
(1074, 'ROCHELLE', 'CALE', 'TALIP', '', 'TTSP-2025-0024', 124924, 'asdasdasdas', 20, 'active', NULL),
(1075, 'JELYN', 'MABUTING', 'TIMTIM', '', 'TTSP-2025-0025', 124924, 'asdasdasdas', 20, 'active', NULL),
(1076, 'JOEMAR', 'MANTAHINAY', 'ALMUETE', '', 'TTSP-2025-0001', 124, 'asdasdasdas', 21, 'active', NULL),
(1077, 'EMMANUEL', 'PADORA', 'ARMOCILLA', '', 'TTSP-2025-0002', 124, 'asdasdasdas', 21, 'active', NULL),
(1078, 'CHARMILLE', 'BACLI-AN', 'BLANCO', '', 'TTSP-2025-0003', 124, 'asdasdasdas', 21, 'active', NULL),
(1079, 'BHRIAN', 'GANTALAO', 'BOHOL', '', 'TTSP-2025-0004', 124, 'asdasdasdas', 21, 'active', NULL),
(1080, 'LOUKIE', 'MAGBUTONG', 'CALOGMOC', '', 'TTSP-2025-0005', 124, 'asdasdasdas', 21, 'active', NULL),
(1081, 'RAYMOND', 'CAMBONGGA', 'CASTRO', '', 'TTSP-2025-0006', 124, 'asdasdasdas', 21, 'active', NULL),
(1082, 'NELBOY', 'BAYACAG', 'CEBA', '', 'TTSP-2025-0007', 124, 'asdasdasdas', 21, 'active', NULL),
(1083, 'LILIA', 'VAJA', 'DIANA', '', 'TTSP-2025-0008', 124, 'asdasdasdas', 21, 'active', NULL),
(1084, 'LEIZEL', 'DE VERA', 'DIAPANA', '', 'TTSP-2025-0009', 124, 'asdasdasdas', 21, 'active', NULL),
(1085, 'JAYCHA', 'LADO', 'ESPINOSA', '', 'TTSP-2025-0010', 124, 'asdasdasdas', 21, 'active', NULL),
(1086, 'CARMILA', 'RIN', 'GALGO', '', 'TTSP-2025-0011', 124, 'asdasdasdas', 21, 'active', NULL),
(1087, 'RACHELLE ', 'DEMAYO', 'INTIG', '', 'TTSP-2025-0012', 124, 'asdasdasdas', 21, 'active', NULL),
(1088, 'ALCHER', 'DIAMANTE', 'JUBAN', '', 'TTSP-2025-0013', 124, 'asdasdasdas', 21, 'active', NULL),
(1089, 'GLYCE', 'APILAT', 'LAVILLA', '', 'TTSP-2025-0014', 124, 'asdasdasdas', 21, 'active', NULL),
(1090, 'NOLLY', 'ORABA', 'LITANA', '', 'TTSP-2025-0015', 124, 'asdasdasdas', 21, 'active', NULL),
(1091, 'GUILLERMO', 'BOHOL', 'MABUTING', 'JR', 'TTSP-2025-0016', 124, 'asdasdasdas', 21, 'active', NULL),
(1092, 'ELPRELY', 'BANOTBOT', 'NONONG', '', 'TTSP-2025-0017', 124, 'asdasdasdas', 21, 'active', NULL),
(1093, 'REYNALDO', 'MANDAGUIO', 'ONGCAY', '', 'TTSP-2025-0018', 124, 'asdasdasdas', 21, 'active', NULL),
(1094, 'LOLITA', 'MANLOZA', 'PALACA', '', 'TTSP-2025-0019', 124, 'asdasdasdas', 21, 'active', NULL),
(1095, 'IRENE', 'EMBUDO', 'PARAN', '', 'TTSP-2025-0020', 124, 'asdasdasdas', 21, 'active', NULL),
(1096, 'CHERILYN', 'DOROMAL', 'PAUL', '', 'TTSP-2025-0021', 124, 'asdasdasdas', 21, 'active', NULL),
(1097, 'MARICEL', 'CONDE', 'RAMOS', '', 'TTSP-2025-0022', 124, 'asdasdasdas', 21, 'active', NULL),
(1098, 'ALVIN', 'LAGUMBAY', 'REYES', '', 'TTSP-2025-0023', 124, 'asdasdasdas', 21, 'active', NULL),
(1099, 'ROCHELLE', 'CALE', 'TALIP', '', 'TTSP-2025-0024', 124, 'asdasdasdas', 21, 'active', NULL),
(1100, 'JELYN', 'MABUTING', 'TIMTIM', '', 'TTSP-2025-0025', 124, 'asdasdasdas', 21, 'active', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `training_centers`
--

CREATE TABLE `training_centers` (
  `id` int(11) UNSIGNED NOT NULL,
  `description` varchar(150) NOT NULL,
  `abbre` varchar(20) DEFAULT NULL,
  `tc_type_id` int(10) UNSIGNED NOT NULL,
  `address` varchar(150) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `region` varchar(10) DEFAULT NULL,
  `administrator_id` int(10) UNSIGNED DEFAULT NULL,
  `sc_focal_id` int(10) UNSIGNED DEFAULT NULL,
  `cong_district` varchar(100) DEFAULT NULL,
  `datetime_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `list_sc_id` text,
  `list_q_id` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `training_centers`
--

INSERT INTO `training_centers` (`id`, `description`, `abbre`, `tc_type_id`, `address`, `province`, `region`, `administrator_id`, `sc_focal_id`, `cong_district`, `datetime_added`, `list_sc_id`, `list_q_id`) VALUES
(1, 'ASSUMPTION COLLEGE OF NABUNTURAN, INC.', 'ACN', 1, 'Purok 1, Poblacion Nabunturan, Compostela Valley Province', 'Davao de Oro', 'XI', NULL, NULL, '2ndd', '2025-01-09 13:42:01', '[4,8,2,3]', '[63,66,68,64]'),
(2, 'JEH INSTITUTE OF TECHNOLOGY, INC.', 'JIT', 1, NULL, 'Davao de Oro', 'XI', NULL, NULL, NULL, '2025-01-09 13:42:01', NULL, NULL),
(3, 'PROVINCIAL TRAINING CENTER DAVAO DE ORO', 'PTC', 2, 'Purok 8, Poblacion Montevista, Comval Province', 'Davao de Oro', 'XI', NULL, NULL, '1st', '2025-01-09 13:42:01', '[6]', '[80,79]'),
(4, 'DAVAO NATIONAL AGRICULTURAL SCHOOL', 'DNAS', 4, 'Purok 8, Poblacion Montevista, Comval Province', 'Davao de Oro', 'XI', NULL, NULL, '1st', '2025-01-09 13:42:01', NULL, NULL),
(5, 'SOUTHERN PHILIPPINES COLLEGE OF TECHNOLOGY OF COMVAL, INC.', 'SPCTC', 1, 'Purok 2, Samuag Poblacion, Monkayo, Davao de Oro', 'Davao de Oro', 'XI', NULL, NULL, NULL, '2025-01-09 13:42:01', NULL, NULL),
(6, 'DE ORO AGRI-TECH TRAINING CENTER, INC.', 'DATTC', 1, 'Lot 7 Block 9 Purok 12 Dagohoy Street Poblacion, Compostela, Davao de Oro', 'Davao de Oro', 'XI', NULL, NULL, NULL, '2025-01-09 13:42:01', NULL, NULL),
(7, 'ONE GLOBAL LINK TRAINING AND ASSESSMENT CENTER, INC.', 'OGLTAC', 1, 'Bayubay St., Purok 2, Poblacion, Compostela, Davao de Oro', 'Davao de Oro', 'XI', NULL, NULL, NULL, '2025-01-09 13:42:01', NULL, NULL),
(8, 'PRIME AGRI SKILLS TECHNICAL INSTITUTE INC.', 'PASTII', 1, 'Purok 2., Brgy. Manat, Nabunturan, Davao de Oro', 'Davao de Oro', 'XI', NULL, NULL, '2nd', '2025-01-09 13:42:01', NULL, NULL),
(9, 'MA\'SOB AGRICULTURAL LEARNING CENTER', 'MALC', 1, 'Sitio Patilan, Brgy. Bongbong, Pantukan, Davao de Oro', 'Davao de Oro', 'XI', NULL, NULL, '2nd', '2025-01-09 13:42:01', NULL, NULL),
(10, 'ENJAY AGRI TOURISM FARM', 'ENJAY', 1, 'Prk 11 Brgy. Gabi, Compostela, Davao de Oro', 'Davao de Oro', 'XI', NULL, NULL, '1st', '2025-01-09 13:42:01', '[5]', '[77]'),
(12, 'LAWAGON CACAO FARM', 'LCF', 1, 'Prk 11 Brgy. Gabi, Compostela, Davao de Oro', 'Davao de Oro', 'XI', NULL, NULL, '1st', '2025-01-09 13:42:01', NULL, NULL),
(13, 'MACO INSTITUTE OF TECHNOLOGY, INC.', 'MITI', 1, 'Binuangan, Maco, Compostela Valley', 'Davao de Oro', 'XI', NULL, NULL, '2nd', '2025-01-09 13:42:01', NULL, NULL),
(14, 'F. BERNAL AGRICULTURAL INTEGRATED FARM', 'FBAIF', 3, 'PUROK 4, BRGY. DAUMAN, MONTEVISTA, DAVAO DE ORO', 'Davao de Oro', 'XI', NULL, NULL, '1st', '2025-01-09 13:42:01', NULL, NULL),
(15, 'OCTA-M INSTITUTE OF TECHNOLOGY, INC.', 'OCTA-MIT', 1, 'Purok 3A Peñaranda St., Poblacion, Monkayo, Compostela Valley', 'Davao de Oro', 'XI', NULL, NULL, '1st', '2025-01-09 13:42:01', NULL, NULL),
(16, 'INFORMATIC TECHNICAL INSTITUTE OF COMVAL PROVINCE, INC.', 'ITICP', 1, 'Talisay St., Poblacion, Maragusan, Davao de Oro', 'Davao de Oro', 'XI', NULL, NULL, '1st', '2025-01-09 13:42:01', NULL, NULL),
(17, 'INFORMATIC TECHNOLOGICAL COLLEGE OF DAVAO REGION, INC.', 'ITCDR', 1, 'Governor Generoso, Davao Oriental', 'Davao de Oro', 'XI', NULL, NULL, '2nd', '2025-01-09 13:42:01', NULL, NULL),
(18, 'OCTA-M FARM PRODUCTS', 'OCTA-FP', 1, 'Purok 3A Peñaranda St., Poblacion, Monkayo, Compostela Valley', 'Davao de Oro', 'XI', NULL, NULL, '1st', '2025-01-09 13:42:01', NULL, NULL),
(19, 'LANTAW DE-ORO SKILLS/TRAINING/LEARNING AND ASSESSMENT CENTER', 'LDOSTLA', 1, NULL, 'Davao de Oro', 'XI', NULL, NULL, NULL, '2025-01-09 13:42:01', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `training_centers_type`
--

CREATE TABLE `training_centers_type` (
  `id` int(11) NOT NULL,
  `description` varchar(150) NOT NULL,
  `isPrivate` tinyint(4) NOT NULL,
  `datetime_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `training_centers_type`
--

INSERT INTO `training_centers_type` (`id`, `description`, `isPrivate`, `datetime_added`) VALUES
(1, 'Technical Technology Institution', 0, '2025-01-15 16:28:50'),
(2, 'Technical Vocation Institution', 1, '2025-01-15 16:28:50'),
(3, 'Farm School', 1, '2025-07-22 17:02:49'),
(4, 'TESDA Technology Institution', 0, '2025-07-22 17:49:20');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(10) UNSIGNED NOT NULL,
  `ut_id` int(10) UNSIGNED DEFAULT NULL,
  `tc_id` int(11) UNSIGNED DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `password` text NOT NULL,
  `profile_pic` varchar(255) DEFAULT 'default_pic.png',
  `isApproved` tinyint(3) UNSIGNED NOT NULL DEFAULT '0',
  `isActive` tinyint(3) UNSIGNED NOT NULL DEFAULT '0',
  `datetime_added` datetime NOT NULL,
  `e_sign` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `ut_id`, `tc_id`, `email`, `password`, `profile_pic`, `isApproved`, `isActive`, `datetime_added`, `e_sign`) VALUES
(1, 1, NULL, 'admin@gmail.com', '$2b$10$sachPvfDGf5xnrZOS7Jb2uB7GX.BHn5iZ/FN8nDnxCuJkDylFYyT6', 'images.jpeg', 1, 1, '2024-12-26 04:24:17', '462571274_1442787636395565_1637029702795809189_n.png'),
(2, 2, 1, 'maria.cruz@gmail.com', '$2a$10$R.xP9DsornADEWRBx2xF0upXKkLVRVqRppNYkws0BA/FYwjX808O6', 'default_pic.png', 1, 1, '2025-02-01 05:27:00', NULL),
(3, 3, 1, 'joel.cruz@gmail.com', '$2a$10$R.xP9DsornADEWRBx2xF0upXKkLVRVqRppNYkws0BA/FYwjX808O6', 'default_pic.png', 1, 1, '2025-02-03 21:17:34', NULL),
(4, 2, NULL, 'po.staff@gmail.com', '$2a$10$R.xP9DsornADEWRBx2xF0upXKkLVRVqRppNYkws0BA/FYwjX808O6', 'default_pic.png', 1, 1, '2025-02-04 10:36:09', NULL),
(5, 3, 1, 'tc.staff@gmail.com', '$2a$10$R.xP9DsornADEWRBx2xF0upXKkLVRVqRppNYkws0BA/FYwjX808O6', 'default_pic.png', 1, 1, '2025-02-05 10:38:15', NULL),
(6, 1, 1, 'tc2.staff@gmail.com', '$2b$10$edCmldLDGfuUQhyxGRuXe.AdWtnpwlUw03iCb018AU186iacLIjnC', 'default_pic.png', 1, 1, '2025-02-10 10:20:59', NULL),
(7, 1, 1, 'sample123@gmail.com', '$2b$10$V6EKmwUSB3o3bwX.onEEFOqcXNHpHiZYuWYalWAiXshK8s0w4l1/6', 'default_pic.png', 1, 1, '2025-03-18 01:17:29', NULL),
(8, 2, 1, 'po123@gmail.com', '$2b$10$97.VtTI2nKpJyZ9i7vH8IeZdVQZltjPGJ8FJEJHkaddC7SQsXPFLq', 'default_pic.png', 1, 1, '2025-03-18 01:17:57', NULL),
(9, 2, 1, 'po3@gmail.com', '$2b$10$ed.PjuSanu3L9yQ6KvtWAuqsuukEUAK5Pr63nZiVWqB0QkpHg18Y.', 'default_pic.png', 1, 1, '2025-03-18 01:54:58', NULL),
(10, 3, 1, 'tc.staff2@gmail.com', '$2b$10$mqGxJxlMsScJX2mV/ISKSObs06vwjdBFMzgopLwKs3EJOpjmbpto2', 'default_pic.png', 1, 1, '2025-03-18 01:55:23', NULL),
(11, 3, 1, 'tc.acn@gmail.com', '$2a$10$R.xP9DsornADEWRBx2xF0upXKkLVRVqRppNYkws0BA/FYwjX808O6', 'default_pic.png', 1, 1, '2025-02-05 10:38:15', NULL),
(12, 3, 2, 'tc.jit@gmail.com', '$2a$10$R.xP9DsornADEWRBx2xF0upXKkLVRVqRppNYkws0BA/FYwjX808O6', 'default_pic.png', 1, 1, '2025-02-05 10:38:15', NULL),
(13, 3, 3, 'tc.ptc@gmail.com', '$2a$10$R.xP9DsornADEWRBx2xF0upXKkLVRVqRppNYkws0BA/FYwjX808O6', 'default_pic.png', 1, 1, '2025-02-05 10:38:15', NULL),
(14, 3, 4, 'tc.dnas@gmail.com', '$2a$10$R.xP9DsornADEWRBx2xF0upXKkLVRVqRppNYkws0BA/FYwjX808O6', 'default_pic.png', 1, 1, '2025-02-05 10:38:15', NULL),
(15, 3, 5, 'tc.spctc@gmail.com', '$2a$10$R.xP9DsornADEWRBx2xF0upXKkLVRVqRppNYkws0BA/FYwjX808O6', 'default_pic.png', 1, 1, '2025-02-05 10:38:15', NULL),
(16, 3, 6, 'tc.dattc@gmail.com', '$2a$10$R.xP9DsornADEWRBx2xF0upXKkLVRVqRppNYkws0BA/FYwjX808O6', 'default_pic.png', 1, 1, '2025-02-05 10:38:15', NULL),
(17, 3, 7, 'tc.ogltac@gmail.com', '$2a$10$R.xP9DsornADEWRBx2xF0upXKkLVRVqRppNYkws0BA/FYwjX808O6', 'default_pic.png', 1, 1, '2025-02-05 10:38:15', NULL),
(18, 3, 8, 'tc.pastii@gmail.com', '$2a$10$R.xP9DsornADEWRBx2xF0upXKkLVRVqRppNYkws0BA/FYwjX808O6', 'default_pic.png', 1, 1, '2025-02-05 10:38:15', NULL),
(19, 3, 9, 'tc.malc@gmail.com', '$2a$10$R.xP9DsornADEWRBx2xF0upXKkLVRVqRppNYkws0BA/FYwjX808O6', 'default_pic.png', 1, 1, '2025-02-05 10:38:15', NULL),
(20, 3, 10, 'tc.enjay@gmail.com', '$2a$10$R.xP9DsornADEWRBx2xF0upXKkLVRVqRppNYkws0BA/FYwjX808O6', 'images.jpeg', 1, 1, '2025-02-05 10:38:15', '462571274_1442787636395565_1637029702795809189_n.png'),
(21, 3, 12, 'tc.lcf@gmail.com', '$2a$10$R.xP9DsornADEWRBx2xF0upXKkLVRVqRppNYkws0BA/FYwjX808O6', 'default_pic.png', 1, 1, '2025-02-05 10:38:15', NULL),
(22, 3, 13, 'tc.miti@gmail.com', '$2a$10$R.xP9DsornADEWRBx2xF0upXKkLVRVqRppNYkws0BA/FYwjX808O6', 'default_pic.png', 1, 1, '2025-02-05 10:38:15', NULL),
(23, 3, 14, 'tc.fbaif@gmail.com', '$2a$10$R.xP9DsornADEWRBx2xF0upXKkLVRVqRppNYkws0BA/FYwjX808O6', 'default_pic.png', 1, 1, '2025-02-05 10:38:15', NULL),
(24, 3, 15, 'tc.octamit@gmail.com', '$2a$10$R.xP9DsornADEWRBx2xF0upXKkLVRVqRppNYkws0BA/FYwjX808O6', 'default_pic.png', 1, 1, '2025-02-05 10:38:15', NULL),
(25, 3, 16, 'tc.iticp@gmail.com', '$2a$10$R.xP9DsornADEWRBx2xF0upXKkLVRVqRppNYkws0BA/FYwjX808O6', 'default_pic.png', 1, 1, '2025-02-05 10:38:15', NULL),
(26, 3, 17, 'tc.itcdr@gmail.com', '$2a$10$R.xP9DsornADEWRBx2xF0upXKkLVRVqRppNYkws0BA/FYwjX808O6', 'default_pic.png', 1, 1, '2025-02-05 10:38:15', NULL),
(27, 3, 18, 'tc.octafp@gmail.com', '$2a$10$R.xP9DsornADEWRBx2xF0upXKkLVRVqRppNYkws0BA/FYwjX808O6', 'default_pic.png', 1, 1, '2025-02-05 10:38:15', NULL),
(28, 3, 19, 'tc.ldostla@gmail.com', '$2a$10$R.xP9DsornADEWRBx2xF0upXKkLVRVqRppNYkws0BA/FYwjX808O6', 'default_pic.png', 1, 1, '2025-02-05 10:38:15', NULL),
(29, 3, 2, 'sample658354325345@gmail.com', '$2b$10$QKcRrQUZCI60.jHO1xiv..rbmGLWh6H7i3.llnBtf.g9r9xyWXuba', 'default_pic.png', 1, 1, '2025-11-25 13:03:12', NULL),
(37, 3, 10, 'tc.enjay2@gmail.com', '$2b$10$x.GZUw4lhOAba9qOtF9JCeB06oBLhU7RC9awcJvCmDlqTZuTxCrbO', 'default_pic.png', 1, 1, '2025-12-17 02:39:05', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_menu`
--

CREATE TABLE `user_menu` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `link` varchar(200) DEFAULT NULL,
  `datetime_added` datetime NOT NULL,
  `profile_pic` varchar(255) NOT NULL DEFAULT 'default_menu_icon.png',
  `isTitle` int(11) NOT NULL DEFAULT '0',
  `description` varchar(255) DEFAULT NULL,
  `isMenu` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_menu`
--

INSERT INTO `user_menu` (`id`, `name`, `title`, `link`, `datetime_added`, `profile_pic`, `isTitle`, `description`, `isMenu`) VALUES
(1, 'Dashboard', 'Dashboard', '/dashboard', '2025-01-06 00:00:00', 'icon_dashboard.png', 0, NULL, 1),
(2, 'Billing Record', 'Billing Record', '/billing_record?status=pending', '2025-01-06 00:00:00', 'icon_bill.png', 0, NULL, 1),
(3, 'Training Centers', 'Training Centers', '/training_centers', '2025-01-06 00:00:00', 'icon_tc.png', 0, NULL, 1),
(4, 'Qualification', 'Qualification', '/qualification', '2025-01-06 00:00:00', 'icon_qualification.png', 0, NULL, 1),
(5, 'Scholarship', 'Scholarship', '/scholarship', '2025-01-06 00:00:00', 'icon_scholarship.png', 0, NULL, 1),
(6, 'Reports', 'Reports', '/reports', '2025-01-06 00:00:00', 'icon_reports.png', 0, NULL, 1),
(7, 'Analytics', 'Analytics', '/analytics', '2025-01-06 00:00:00', 'icon_analytics.png', 0, NULL, 1),
(8, 'Billings', 'Billings', '/billings', '2025-02-01 02:53:00', 'icon_bill.png', 0, NULL, 1),
(9, 'Create Account', 'Create Account', '/', '2025-02-04 02:12:00', 'icon_accounts.png', 1, NULL, 1),
(10, 'Workback', 'Billings', '/billings/1', '2025-02-05 06:24:00', 'default_menu_icon.png', 0, NULL, 1),
(11, 'Create', 'Billings', '/billings/0', '2025-02-05 06:24:00', 'default_menu_icon.png', 0, NULL, 1),
(12, 'Utility User Menu', 'Utility User Menu', '/user_menu', '2025-03-01 00:00:00', 'default_menu_icon.png', 0, NULL, 1),
(13, 'Assign User Type', 'Assign User Type', '/assign_user_menu', '2025-03-01 00:00:00', 'default_menu_icon.png', 0, NULL, 1),
(14, 'Utilities', 'Utilities', '/', '2025-03-01 00:00:00', 'default_menu_icon.png', 1, NULL, 1),
(15, 'TC Staff', 'Create Account - TC Staff', '/accounts/3', '2025-03-18 01:45:07', 'default_menu_icon.png', 0, NULL, 1),
(16, 'PO Staff', 'Create Account - PO Staff', '/accounts/2', '2025-03-18 01:45:27', 'default_menu_icon.png', 0, NULL, 1),
(17, 'Billing Types', 'Billing Types', '/billing_types', '2025-07-21 15:20:44', 'default_menu_icon.png', 0, NULL, 1),
(18, 'Categories', 'Categories', '/categories', '2025-11-17 15:36:17', 'default_menu_icon.png', 0, NULL, 1),
(19, 'Notifications', 'Notifications', '/notifications', '2026-02-17 04:52:24', 'default_menu_icon.png', 0, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

CREATE TABLE `user_profile` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `fname` varchar(100) DEFAULT NULL,
  `mname` varchar(50) DEFAULT NULL,
  `lname` varchar(50) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `phone_number` varchar(11) DEFAULT NULL,
  `datetime_changed` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_profile`
--

INSERT INTO `user_profile` (`id`, `user_id`, `fname`, `mname`, `lname`, `gender`, `phone_number`, `datetime_changed`) VALUES
(1, 1, 'ADMIN', '', 'User', NULL, '09072340239', NULL),
(2, 2, 'Maria', NULL, 'Cruz', NULL, '09078274635', NULL),
(3, 3, 'Joel', NULL, 'Cruz', NULL, '09078274442', NULL),
(4, 4, 'PO', NULL, 'Staff', NULL, '09072843424', NULL),
(5, 5, 'TC', '', 'Staff', NULL, '09852449284', NULL),
(6, 6, 'FNAME', NULL, 'MNAME', NULL, NULL, NULL),
(7, 7, 'FNAME', NULL, 'MNAME', NULL, NULL, NULL),
(8, 8, 'FNAME', NULL, 'MNAME', NULL, NULL, NULL),
(9, 9, 'FNAME', NULL, 'MNAME', NULL, NULL, NULL),
(10, 10, 'FNAME', NULL, 'MNAME', NULL, NULL, NULL),
(11, 11, 'FNAMEAA', NULL, 'MNAME', NULL, NULL, NULL),
(12, 12, 'FNAME', NULL, 'MNAME', NULL, NULL, NULL),
(13, 13, 'FNAME', NULL, 'MNAME', NULL, NULL, NULL),
(14, 14, 'FNAME', NULL, 'MNAME', NULL, NULL, NULL),
(15, 15, 'FNAME', NULL, 'MNAME', NULL, NULL, NULL),
(16, 16, 'FNAME', NULL, 'MNAME', NULL, NULL, NULL),
(17, 17, 'FNAME', NULL, 'MNAME', NULL, NULL, NULL),
(18, 18, 'FNAME', NULL, 'MNAME', NULL, NULL, NULL),
(19, 19, 'FNAME', NULL, 'MNAME', NULL, NULL, NULL),
(20, 20, 'ENJAY', '', 'MNAME', NULL, '09851230523', NULL),
(21, 21, 'FNAME', NULL, 'MNAME', NULL, NULL, NULL),
(22, 22, 'FNAME', NULL, 'MNAME', NULL, NULL, NULL),
(23, 23, 'FNAME', NULL, 'MNAME', NULL, NULL, NULL),
(24, 24, 'FNAME', NULL, 'MNAME', NULL, NULL, NULL),
(25, 25, 'FNAME', NULL, 'MNAME', NULL, NULL, NULL),
(26, 26, 'FNAME', NULL, 'MNAME', NULL, NULL, NULL),
(27, 27, 'FNAME', NULL, 'MNAME', NULL, NULL, NULL),
(28, 28, 'FNAME', NULL, 'MNAME', NULL, NULL, NULL),
(29, 29, 'name', 'name', 'name', 'Male', '09679012830', NULL),
(32, 37, 'ENJAY', 'NEW', 'TC', 'Male', '09072312312', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_types`
--

CREATE TABLE `user_types` (
  `id` int(10) UNSIGNED NOT NULL,
  `description` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_types`
--

INSERT INTO `user_types` (`id`, `description`) VALUES
(1, 'Admin'),
(2, 'PO Staff'),
(3, 'TC Staff');

-- --------------------------------------------------------

--
-- Table structure for table `user_type_menu`
--

CREATE TABLE `user_type_menu` (
  `id` int(11) NOT NULL,
  `ut_id` int(11) NOT NULL,
  `um_id` int(11) NOT NULL,
  `datetime_added` datetime NOT NULL,
  `order_num` int(11) NOT NULL DEFAULT '1',
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `position` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_type_menu`
--

INSERT INTO `user_type_menu` (`id`, `ut_id`, `um_id`, `datetime_added`, `order_num`, `parent_id`, `position`) VALUES
(1, 1, 1, '2025-01-06 00:00:00', 1, 0, 1),
(2, 1, 2, '2025-01-06 00:00:00', 1, 0, 1),
(3, 1, 3, '2025-01-06 00:00:00', 1, 0, 1),
(4, 1, 4, '2025-01-06 00:00:00', 1, 0, 1),
(5, 1, 5, '2025-01-06 00:00:00', 1, 0, 1),
(6, 1, 6, '2025-01-06 00:00:00', 1, 0, 1),
(8, 2, 1, '2025-02-03 03:24:00', 1, 0, 1),
(9, 3, 1, '2025-02-03 02:20:00', 1, 0, 1),
(11, 3, 8, '2025-02-04 02:20:20', 1, 0, 1),
(13, 1, 9, '2025-02-04 04:22:11', 1, 0, 1),
(16, 3, 11, '2025-02-06 04:17:00', 1, 11, 2),
(17, 3, 10, '2025-02-06 04:17:00', 2, 11, 2),
(18, 1, 14, '2025-03-01 00:00:00', 1, 0, 1),
(19, 1, 12, '2025-03-18 00:00:00', 1, 18, 2),
(20, 1, 13, '2025-03-01 00:00:00', 1, 18, 2),
(21, 1, 16, '2025-03-18 01:45:39', 1, 13, 2),
(22, 1, 15, '2025-03-18 01:45:40', 1, 13, 2),
(23, 2, 9, '2025-03-18 01:46:18', 1, 0, 1),
(24, 2, 15, '2025-03-18 01:46:23', 1, 23, 2),
(25, 1, 17, '2025-07-21 15:35:36', 1, 0, 1),
(27, 2, 2, '2025-08-02 16:33:57', 1, 0, 1),
(28, 2, 5, '2025-08-02 16:36:11', 1, 0, 1),
(29, 3, 6, '2025-11-12 17:44:15', 1, 0, 1),
(30, 1, 18, '2025-11-17 15:36:22', 1, 0, 1),
(31, 1, 19, '2026-02-17 04:55:22', 1, 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `billing_periods`
--
ALTER TABLE `billing_periods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `billing_records`
--
ALTER TABLE `billing_records`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ctrl_num` (`ctrl_num`);

--
-- Indexes for table `billing_set_types`
--
ALTER TABLE `billing_set_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `billing_types`
--
ALTER TABLE `billing_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `insights`
--
ALTER TABLE `insights`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_type` (`type`),
  ADD KEY `idx_reference` (`reference_id`,`reference_type`),
  ADD KEY `idx_created_by` (`created_by`);

--
-- Indexes for table `notifications_recipients`
--
ALTER TABLE `notifications_recipients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_notification_user` (`notification_id`,`user_id`),
  ADD KEY `idx_user_read` (`user_id`,`is_read`);

--
-- Indexes for table `qualifications`
--
ALTER TABLE `qualifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `scholarships`
--
ALTER TABLE `scholarships`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trainees`
--
ALTER TABLE `trainees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `training_centers`
--
ALTER TABLE `training_centers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `training_centers_type`
--
ALTER TABLE `training_centers_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_menu`
--
ALTER TABLE `user_menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_types`
--
ALTER TABLE `user_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_type_menu`
--
ALTER TABLE `user_type_menu`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `billing_periods`
--
ALTER TABLE `billing_periods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT for table `billing_records`
--
ALTER TABLE `billing_records`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `billing_set_types`
--
ALTER TABLE `billing_set_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `billing_types`
--
ALTER TABLE `billing_types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `insights`
--
ALTER TABLE `insights`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `notifications_recipients`
--
ALTER TABLE `notifications_recipients`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `qualifications`
--
ALTER TABLE `qualifications`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `scholarships`
--
ALTER TABLE `scholarships`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `trainees`
--
ALTER TABLE `trainees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1101;

--
-- AUTO_INCREMENT for table `training_centers`
--
ALTER TABLE `training_centers`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `training_centers_type`
--
ALTER TABLE `training_centers_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `user_menu`
--
ALTER TABLE `user_menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `user_profile`
--
ALTER TABLE `user_profile`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `user_types`
--
ALTER TABLE `user_types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_type_menu`
--
ALTER TABLE `user_type_menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `fk_notifications_created_by` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications_recipients`
--
ALTER TABLE `notifications_recipients`
  ADD CONSTRAINT `fk_notification_recipients_notification` FOREIGN KEY (`notification_id`) REFERENCES `notifications` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_notification_recipients_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
