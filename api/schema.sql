-- --------------------------------------------------------

-- 
-- Table structure for table `sources`
-- 

CREATE TABLE `sources` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `author_code` int(6) NOT NULL,
  `type` enum('B','C','J','L','M','P') COLLATE utf8_bin DEFAULT NULL,
  `citation` text COLLATE utf8_bin,
  `url` text COLLATE utf8_bin,
  `comments` text COLLATE utf8_bin,
  `ordered` date DEFAULT NULL,
  `status_code` enum('N','E','M','R','X','XP','XR') COLLATE utf8_bin NOT NULL DEFAULT 'N',
  PRIMARY KEY (`id`),
  KEY `type` (`type`),
  KEY `author_code` (`author_code`),
  KEY `status_code` (`status_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

-- 
-- Table structure for table `works`
-- 

CREATE TABLE `works` (
  `author_code` int(6) NOT NULL AUTO_INCREMENT,
  `author_name` varchar(80) COLLATE utf8_bin DEFAULT NULL,
  `article_name` text COLLATE utf8_bin,
  `volume` smallint(4) DEFAULT NULL,
  `issue` smallint(10) DEFAULT NULL,
  `comments` text COLLATE utf8_bin,
  `bookpuller` text COLLATE utf8_bin,
  `duedate` date DEFAULT NULL,
  PRIMARY KEY (`author_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
