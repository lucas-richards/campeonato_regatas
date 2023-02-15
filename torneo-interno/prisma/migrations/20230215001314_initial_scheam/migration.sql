-- CreateTable
CREATE TABLE `Partido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gol_local` INTEGER NOT NULL,
    `gol_visitante` INTEGER NOT NULL,
    `local` INTEGER NOT NULL,
    `visitante` INTEGER NOT NULL,
    `timestamp` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `zona_id` INTEGER NOT NULL,

    INDEX `fk_Partido_equipo1_idx`(`local`),
    INDEX `fk_Partido_equipo2_idx`(`visitante`),
    INDEX `fk_Partido_zona1_idx`(`zona_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(45) NOT NULL,
    `ano_inicio` DATETIME(0) NOT NULL,
    `ano_fin` DATETIME(0) NOT NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `novedad_id` INTEGER NULL,
    `sexo` VARCHAR(1) NOT NULL,
    `juvenil` TINYINT NOT NULL,

    INDEX `fk_categoria_novedad1_idx`(`novedad_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `configuracion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(45) NOT NULL,
    `habilitado` TINYINT NOT NULL,
    `categoria_id` INTEGER NOT NULL,

    INDEX `fk_configuracion_categoria1_idx`(`categoria_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equipo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,
    `torneo_id` INTEGER NOT NULL,
    `capitan` INTEGER NOT NULL,
    `categoria_id` INTEGER NOT NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `zona_id` INTEGER NOT NULL,

    INDEX `fk_equipo_categoria1_idx`(`categoria_id`),
    INDEX `fk_equipo_jugador1_idx`(`capitan`),
    INDEX `fk_equipo_torneo1_idx`(`torneo_id`),
    INDEX `fk_equipo_zona1_idx`(`zona_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gol` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Partido_id` INTEGER NOT NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `jugador_infantil_id` INTEGER NOT NULL,

    INDEX `fk_gol_Partido1_idx`(`Partido_id`),
    INDEX `fk_gol_jugador_infantil1_idx`(`jugador_infantil_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jugador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dni` VARCHAR(45) NOT NULL,
    `nombre` VARCHAR(45) NOT NULL,
    `apellido` VARCHAR(45) NOT NULL,
    `mail` VARCHAR(45) NOT NULL,
    `telefono` VARCHAR(45) NOT NULL,
    `fecha_nacimiento` DATETIME(0) NOT NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `sexo` VARCHAR(45) NOT NULL,
    `nivel_observado` INTEGER NULL,

    INDEX `fk_jugador_nivel1_idx`(`nivel_observado`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jugador_equipo` (
    `equipo_id` INTEGER NOT NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `jugador_equipo_id` INTEGER NOT NULL AUTO_INCREMENT,
    `jugador_infantil_id` INTEGER NOT NULL,

    INDEX `fk_jugador_equipo_equipo1_idx`(`equipo_id`),
    INDEX `fk_jugador_equipo_jugador_infantil1_idx`(`jugador_infantil_id`),
    PRIMARY KEY (`jugador_equipo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jugador_infantil` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `telefono_emergencia` VARCHAR(45) NOT NULL,
    `socio` TINYINT NOT NULL,
    `puesto_id` INTEGER NOT NULL,
    `nivel_id` INTEGER NOT NULL,
    `capitan` TINYINT NOT NULL,
    `Torneo_id` INTEGER NOT NULL,
    `responsable_id` INTEGER NOT NULL,
    `habilitado` TINYINT NOT NULL DEFAULT 0,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `jugador_id` INTEGER NOT NULL,
    `tercer_hijo` TINYINT NOT NULL,
    `monto_inscripcion` FLOAT NOT NULL,
    `categoria_id` INTEGER NOT NULL,
    `equipo_id` INTEGER NULL,

    INDEX `fk_Inscripto_Torneo1_idx`(`Torneo_id`),
    INDEX `fk_Inscripto_jugador1_idx`(`jugador_id`),
    INDEX `fk_Inscripto_nivel1_idx`(`nivel_id`),
    INDEX `fk_Inscripto_puesto_idx`(`puesto_id`),
    INDEX `fk_Inscripto_responsable1_idx`(`responsable_id`),
    INDEX `fk_jugador_infantil_categoria1_idx`(`categoria_id`),
    INDEX `fk_jugador_infantil_equipo1_idx`(`equipo_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nivel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(45) NOT NULL,
    `valor` INTEGER NOT NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `novedad` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `novedad` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pago` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transferencia` TINYINT NOT NULL DEFAULT 0,
    `comprobante` VARCHAR(45) NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `responsable_id` INTEGER NOT NULL,

    INDEX `fk_pago_responsable1_idx`(`responsable_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pago_infantil` (
    `pago_id` INTEGER NOT NULL,
    `jugador_infantil_id` INTEGER NOT NULL,
    `pago_infantil_id` INTEGER NOT NULL AUTO_INCREMENT,

    INDEX `fk_pago_infantil_jugador_infantil1_idx`(`jugador_infantil_id`),
    INDEX `fk_pago_infantil_pago1_idx`(`pago_id`),
    PRIMARY KEY (`pago_infantil_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `puesto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(45) NOT NULL,
    `valor` INTEGER NOT NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `responsable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dni` VARCHAR(8) NOT NULL,
    `nombre` VARCHAR(45) NOT NULL,
    `apellido` VARCHAR(45) NOT NULL,
    `mail_contacto` VARCHAR(45) NOT NULL,
    `telefono` VARCHAR(45) NOT NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `dni_UNIQUE`(`dni`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `socio` (
    `dni` VARCHAR(9) NOT NULL,

    PRIMARY KEY (`dni`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tarifas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `socio` TINYINT NOT NULL,
    `valor` INTEGER NOT NULL,
    `juvenil` TINYINT NOT NULL,
    `momento` INTEGER NOT NULL,
    `torneo_id` INTEGER NOT NULL,
    `fecha_inicio` DATETIME(0) NOT NULL,
    `fecha_cierre` DATETIME(0) NOT NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_tarifas_torneo1_idx`(`torneo_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tarjeta` (
    `id` INTEGER NOT NULL,
    `jugador_id` INTEGER NOT NULL,
    `Partido_id` INTEGER NOT NULL,
    `amarilla` TINYINT NOT NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_tarjeta_Partido1_idx`(`Partido_id`),
    INDEX `fk_tarjeta_jugador1_idx`(`jugador_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `timestamps` (
    `create_time` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `update_time` TIMESTAMP(0) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `timestamps_1` (
    `create_time` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `update_time` TIMESTAMP(0) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `torneo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ano_torneo` VARCHAR(4) NOT NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(45) NULL,
    `password` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `zona` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(45) NOT NULL,
    `categoria_id` INTEGER NOT NULL,

    INDEX `fk_zona_categoria1_idx`(`categoria_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Partido` ADD CONSTRAINT `fk_Partido_equipo1` FOREIGN KEY (`local`) REFERENCES `equipo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Partido` ADD CONSTRAINT `fk_Partido_equipo2` FOREIGN KEY (`visitante`) REFERENCES `equipo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Partido` ADD CONSTRAINT `fk_Partido_zona1` FOREIGN KEY (`zona_id`) REFERENCES `zona`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `categoria` ADD CONSTRAINT `fk_categoria_novedad1` FOREIGN KEY (`novedad_id`) REFERENCES `novedad`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `configuracion` ADD CONSTRAINT `fk_configuracion_categoria1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `equipo` ADD CONSTRAINT `fk_equipo_categoria1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `equipo` ADD CONSTRAINT `fk_equipo_jugador1` FOREIGN KEY (`capitan`) REFERENCES `jugador`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `equipo` ADD CONSTRAINT `fk_equipo_torneo1` FOREIGN KEY (`torneo_id`) REFERENCES `torneo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `equipo` ADD CONSTRAINT `fk_equipo_zona1` FOREIGN KEY (`zona_id`) REFERENCES `zona`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `gol` ADD CONSTRAINT `fk_gol_Partido1` FOREIGN KEY (`Partido_id`) REFERENCES `Partido`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `gol` ADD CONSTRAINT `fk_gol_jugador_infantil1` FOREIGN KEY (`jugador_infantil_id`) REFERENCES `jugador_infantil`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `jugador` ADD CONSTRAINT `fk_jugador_nivel1` FOREIGN KEY (`nivel_observado`) REFERENCES `nivel`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `jugador_equipo` ADD CONSTRAINT `fk_jugador_equipo_equipo1` FOREIGN KEY (`equipo_id`) REFERENCES `equipo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `jugador_equipo` ADD CONSTRAINT `fk_jugador_equipo_jugador_infantil1` FOREIGN KEY (`jugador_infantil_id`) REFERENCES `jugador_infantil`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `jugador_infantil` ADD CONSTRAINT `fk_Inscripto_Torneo1` FOREIGN KEY (`Torneo_id`) REFERENCES `torneo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `jugador_infantil` ADD CONSTRAINT `fk_Inscripto_jugador1` FOREIGN KEY (`jugador_id`) REFERENCES `jugador`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `jugador_infantil` ADD CONSTRAINT `fk_Inscripto_nivel1` FOREIGN KEY (`nivel_id`) REFERENCES `nivel`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `jugador_infantil` ADD CONSTRAINT `fk_Inscripto_puesto` FOREIGN KEY (`puesto_id`) REFERENCES `puesto`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `jugador_infantil` ADD CONSTRAINT `fk_Inscripto_responsable1` FOREIGN KEY (`responsable_id`) REFERENCES `responsable`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `jugador_infantil` ADD CONSTRAINT `fk_jugador_infantil_categoria1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `jugador_infantil` ADD CONSTRAINT `fk_jugador_infantil_equipo1` FOREIGN KEY (`equipo_id`) REFERENCES `equipo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pago` ADD CONSTRAINT `fk_pago_responsable1` FOREIGN KEY (`responsable_id`) REFERENCES `responsable`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pago_infantil` ADD CONSTRAINT `fk_pago_infantil_jugador_infantil1` FOREIGN KEY (`jugador_infantil_id`) REFERENCES `jugador_infantil`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pago_infantil` ADD CONSTRAINT `fk_pago_infantil_pago1` FOREIGN KEY (`pago_id`) REFERENCES `pago`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tarifas` ADD CONSTRAINT `fk_tarifas_torneo1` FOREIGN KEY (`torneo_id`) REFERENCES `torneo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tarjeta` ADD CONSTRAINT `fk_tarjeta_Partido1` FOREIGN KEY (`Partido_id`) REFERENCES `Partido`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tarjeta` ADD CONSTRAINT `fk_tarjeta_jugador1` FOREIGN KEY (`jugador_id`) REFERENCES `jugador`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `zona` ADD CONSTRAINT `fk_zona_categoria1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- -----------------------------------------------------
-- Data for table `categoria`
-- -----------------------------------------------------
START TRANSACTION;
INSERT INTO `categoria` (`id`, `descripcion`, `ano_inicio`, `ano_fin`, `timestamp`, `novedad_id`, `sexo`, `juvenil`) VALUES (DEFAULT, 'A', '2016-12-31 09:00:00', '2018-12-31 09:00:00', DEFAULT, NULL, 'M', 0);
INSERT INTO `categoria` (`id`, `descripcion`, `ano_inicio`, `ano_fin`, `timestamp`, `novedad_id`, `sexo`, `juvenil`) VALUES (DEFAULT, 'B', '2014-12-31 09:00:00', '2016-12-31 09:00:00', DEFAULT, NULL, 'M', 0);
INSERT INTO `categoria` (`id`, `descripcion`, `ano_inicio`, `ano_fin`, `timestamp`, `novedad_id`, `sexo`, `juvenil`) VALUES (DEFAULT, 'C', '2012-12-31 09:00:00', '2014-12-31 09:00:00', DEFAULT, NULL, 'M', 0);
INSERT INTO `categoria` (`id`, `descripcion`, `ano_inicio`, `ano_fin`, `timestamp`, `novedad_id`, `sexo`, `juvenil`) VALUES (DEFAULT, 'D', '2010-12-31 09:00:00', '2012-12-31 09:00:00', DEFAULT, NULL, 'M', 0);
INSERT INTO `categoria` (`id`, `descripcion`, `ano_inicio`, `ano_fin`, `timestamp`, `novedad_id`, `sexo`, `juvenil`) VALUES (DEFAULT, 'E', '2008-12-31 09:00:00', '2010-12-31 09:00:00', DEFAULT, NULL, 'M', 0);
INSERT INTO `categoria` (`id`, `descripcion`, `ano_inicio`, `ano_fin`, `timestamp`, `novedad_id`, `sexo`, `juvenil`) VALUES (DEFAULT, 'F', '2005-12-31 09:00:00', '2008-12-31 09:00:00', DEFAULT, NULL, 'M', 1);
INSERT INTO `categoria` (`id`, `descripcion`, `ano_inicio`, `ano_fin`, `timestamp`, `novedad_id`, `sexo`, `juvenil`) VALUES (DEFAULT, 'G', '2001-12-31 09:00:00', '2005-12-31 09:00:00', DEFAULT, NULL, 'M', 1);
INSERT INTO `categoria` (`id`, `descripcion`, `ano_inicio`, `ano_fin`, `timestamp`, `novedad_id`, `sexo`, `juvenil`) VALUES (DEFAULT, 'H', '1990-12-31 09:00:00', '2001-12-31 09:00:00', DEFAULT, NULL, 'M', 1);
INSERT INTO `categoria` (`id`, `descripcion`, `ano_inicio`, `ano_fin`, `timestamp`, `novedad_id`, `sexo`, `juvenil`) VALUES (DEFAULT, 'M1', '2013-12-31 09:00:00', '2015-12-31 09:00:00', DEFAULT, NULL, 'F', 0);
INSERT INTO `categoria` (`id`, `descripcion`, `ano_inicio`, `ano_fin`, `timestamp`, `novedad_id`, `sexo`, `juvenil`) VALUES (DEFAULT, 'M2', '2011-12-31 09:00:00', '2013-12-31 09:00:00', DEFAULT, NULL, 'F', 0);
INSERT INTO `categoria` (`id`, `descripcion`, `ano_inicio`, `ano_fin`, `timestamp`, `novedad_id`, `sexo`, `juvenil`) VALUES (DEFAULT, 'M3', '2009-12-31 09:00:00', '2011-12-31 09:00:00', DEFAULT, NULL, 'F', 0);
INSERT INTO `categoria` (`id`, `descripcion`, `ano_inicio`, `ano_fin`, `timestamp`, `novedad_id`, `sexo`, `juvenil`) VALUES (DEFAULT, 'M4', '2007-12-31 09:00:00', '2009-12-31 09:00:00', DEFAULT, NULL, 'F', 0);

COMMIT;


-- -----------------------------------------------------
-- Data for table `nivel`
-- -----------------------------------------------------
START TRANSACTION;
INSERT INTO `nivel` (`id`, `descripcion`, `valor`, `timestamp`) VALUES (DEFAULT, 'Malo', 1, DEFAULT);
INSERT INTO `nivel` (`id`, `descripcion`, `valor`, `timestamp`) VALUES (DEFAULT, 'Regular', 2, DEFAULT);
INSERT INTO `nivel` (`id`, `descripcion`, `valor`, `timestamp`) VALUES (DEFAULT, 'Bueno', 3, DEFAULT);
INSERT INTO `nivel` (`id`, `descripcion`, `valor`, `timestamp`) VALUES (DEFAULT, 'Muy Bueno', 4, DEFAULT);
INSERT INTO `nivel` (`id`, `descripcion`, `valor`, `timestamp`) VALUES (DEFAULT, 'Excelente', 5, DEFAULT);

COMMIT;


-- -----------------------------------------------------
-- Data for table `puesto`
-- -----------------------------------------------------
START TRANSACTION;
INSERT INTO `puesto` (`id`, `descripcion`, `valor`, `timestamp`) VALUES (DEFAULT, 'Arquero', 1, DEFAULT);
INSERT INTO `puesto` (`id`, `descripcion`, `valor`, `timestamp`) VALUES (DEFAULT, 'Defensor', 2, DEFAULT);
INSERT INTO `puesto` (`id`, `descripcion`, `valor`, `timestamp`) VALUES (DEFAULT, 'Mediocampista', 3, DEFAULT);
INSERT INTO `puesto` (`id`, `descripcion`, `valor`, `timestamp`) VALUES (DEFAULT, 'Delantero', 4, DEFAULT);

COMMIT;
-- -----------------------------------------------------
-- Data for table `torneo`
-- -----------------------------------------------------
START TRANSACTION;
INSERT INTO `torneo` (`id`, `ano_torneo`, `timestamp`) VALUES (DEFAULT, '2023', DEFAULT);

COMMIT;

-- -----------------------------------------------------
-- Data for table `tarifas`
-- -----------------------------------------------------
START TRANSACTION;
INSERT INTO `tarifas` (`id`, `socio`, `valor`, `juvenil`, `momento`, `torneo_id`, `fecha_inicio`, `fecha_cierre`, `timestamp`) VALUES (DEFAULT, 1, 10000, 0, 1, 1, '2023-02-10 09:00:00', '2023-06-10 09:00:00', '2023-02-13 22:20:55');
INSERT INTO `tarifas` (`id`, `socio`, `valor`, `juvenil`, `momento`, `torneo_id`, `fecha_inicio`, `fecha_cierre`, `timestamp`) VALUES (DEFAULT, 0, 20000, 0, 1, 1, '2023-02-10 09:00:00', '2023-06-10 09:00:00', '2023-02-13 22:20:55');

COMMIT;