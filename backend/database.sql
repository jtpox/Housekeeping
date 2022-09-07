CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `from_user` int(11) NOT NULL,
  `to_user` int(11) DEFAULT NULL,
  `action` varchar(255) NOT NULL,
  `log` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile_number` int(9) NOT NULL,
  `user_group` enum('user','manager','admin') NOT NULL DEFAULT 'user',
  `department` varchar(255) NOT NULL DEFAULT 'new',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `from_user` (`from_user`),
  ADD KEY `to_user` (`to_user`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `logs`
  ADD CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`from_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `logs_ibfk_2` FOREIGN KEY (`to_user`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

INSERT INTO `users` (`id`, `username`, `password`, `email`, `mobile_number`, `user_group`, `department`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'admin', '$argon2id$v=19$m=4096,t=3,p=1$F+Vop5kV1jwSeyay08idag$lNYcLwu2hib8WXpZFEzchunNENLinHx8s1nNx78QX3g', 'admin@admin.com', 123456789, 'admin', 'executive', '2022-09-07 13:07:48', '2022-09-07 13:07:48', NULL),
(2, 'user_1', '$argon2id$v=19$m=4096,t=3,p=1$raUCvLnLtHNHL5aTSyRn1g$WTbnLJUqYlhQbVQD+8NUmKadeJ61F3qyGcxUijhFr6o', 'user_1@user.com', 234567890, 'manager', 'IT', '2022-09-07 11:17:44', '2022-09-07 11:17:44', NULL),
(3, 'user_2', '$argon2id$v=19$m=4096,t=3,p=1$NvCLLn2jobou2jgpnBH/2Q$74D0fi2igkHNR6YJ2w6uakDzdmQ5QMgz0EomzL3fNG0', 'user_2@user.com', 345678901, 'user', 'IT', '2022-09-07 11:17:58', '2022-09-07 11:17:58', NULL),
(4, 'jtPox', '$argon2id$v=19$m=4096,t=3,p=1$kh2eygfPSGzVW5SzOtfYLw$7cO6Yd0AzwS6t6qNKNEnb+VmS/60chzHvPM2sEKojDQ', 'me@jtpox.com', 96567382, 'user', 'R&D', '2022-09-07 11:18:56', '2022-09-07 11:18:56', NULL);