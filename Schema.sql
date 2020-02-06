-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 16, 2019 at 02:49 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rifasbr`
--

-- --------------------------------------------------------

--
-- Table structure for table `raffle`
--

CREATE TABLE `raffle` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `value` int(11) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `finish` datetime NOT NULL,
  `winner_id` int(11) DEFAULT NULL,
  `img` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `terms`
--

CREATE TABLE `terms` (
  `term` text NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `terms`
--

INSERT INTO `terms` (`term`, `id`) VALUES
('1. Do Cadastro\n\nAo cadastrar, o usuário poderá participar de rifas de diversos produtos. O Usuário ao cadastrar declara ter lido e aceitado os termos e se compromete a segui-los com pena de ter a conta excluida. \n\nPara Cadastrar é necessário colocar seus dados de Email, mas não será divulgado para ninguém.\n\n2. Do Envolvimento do app Rifas BR\n\nO Rifas BR não se responsabiliza com os usuários que não ganham os sorteios, apenas se responsabiliza em entregar o prêmio ao vencedor.\n\n3. Do Recebimento dos Prêmios\n\nO Vencedor será notificado pelo Email cadastrando em até 72h para fazer o recebimento do prêmio.\n\n4. A Decisão do Vencedor do Prêmio\n\nHaverá apenas um Vencedor e ele será escolhido aleatoriamente pelo sistema.\n\n5. O Cancelamento da Rifa\n\nO Rifas BR poderá cancelar qualquer Rifa em qualquer momento.\n\n6. Proibições\n\n- Utilizar de Erros ou Bugs do Aplicativo para favorecer a sí próprio.\n\n\nO Rifas BR pode modificar a qualquer momento os Termos de Uso do Aplicativo.', 1);

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE `ticket` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `tickets` int(11) NOT NULL DEFAULT 0,
  `id` int(11) NOT NULL,
  `maxTickets` int(11) NOT NULL DEFAULT 20,
  `token` varchar(100) NOT NULL,
  `ticketsInNextRound` int(11) NOT NULL DEFAULT 0,
  `lastMoreAndMore` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Indexes for dumped tables
--

--
-- Indexes for table `raffle`
--
ALTER TABLE `raffle`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `terms`
--
ALTER TABLE `terms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `raffle`
--
ALTER TABLE `raffle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `terms`
--
ALTER TABLE `terms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ticket`
--
ALTER TABLE `ticket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=353;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
