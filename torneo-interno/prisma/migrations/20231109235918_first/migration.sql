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
    `categoria_id` INTEGER NOT NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `zona_id` INTEGER NOT NULL,
    `capitan` INTEGER NOT NULL,

    INDEX `fk_equipo_categoria1_idx`(`categoria_id`),
    INDEX `fk_equipo_jugador_infantil1_idx`(`capitan`),
    INDEX `fk_equipo_torneo1_idx`(`torneo_id`),
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
    `simbolo` VARCHAR(5) NOT NULL,

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
    `simbolo` VARCHAR(3) NOT NULL,

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
CREATE TABLE `equipo_zona` (
    `Zona_id` INTEGER NOT NULL,
    `equipo_id` INTEGER NOT NULL,

    INDEX `fk_Zona_has_equipo_Zona1_idx`(`Zona_id`),
    INDEX `fk_Zona_has_equipo_equipo1_idx`(`equipo_id`),
    PRIMARY KEY (`Zona_id`, `equipo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `partido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `zona_id` INTEGER NOT NULL,
    `local` INTEGER NOT NULL,
    `visitante` INTEGER NOT NULL,
    `gol_local` INTEGER NULL,
    `gol_visitante` INTEGER NULL,
    `timestamp` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_partido_equipo1_idx`(`local`),
    INDEX `fk_partido_equipo2_idx`(`visitante`),
    INDEX `fk_partido_zona1_idx`(`zona_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `zona` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,
    `ronda` INTEGER NOT NULL,
    `tipo` VARCHAR(45) NOT NULL,
    `categoria_id` INTEGER NOT NULL,
    `torneo_id` INTEGER NOT NULL,

    INDEX `fk_Zona_categoria1_idx`(`categoria_id`),
    INDEX `fk_Zona_torneo1_idx`(`torneo_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `categoria` ADD CONSTRAINT `fk_categoria_novedad1` FOREIGN KEY (`novedad_id`) REFERENCES `novedad`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `configuracion` ADD CONSTRAINT `fk_configuracion_categoria1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `equipo` ADD CONSTRAINT `fk_equipo_categoria1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `equipo` ADD CONSTRAINT `fk_equipo_jugador_infantil1` FOREIGN KEY (`capitan`) REFERENCES `jugador_infantil`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `equipo` ADD CONSTRAINT `fk_equipo_torneo1` FOREIGN KEY (`torneo_id`) REFERENCES `torneo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
ALTER TABLE `equipo_zona` ADD CONSTRAINT `fk_Zona_has_equipo_Zona1` FOREIGN KEY (`Zona_id`) REFERENCES `zona`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `equipo_zona` ADD CONSTRAINT `fk_Zona_has_equipo_equipo1` FOREIGN KEY (`equipo_id`) REFERENCES `equipo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `partido` ADD CONSTRAINT `fk_partido_equipo1` FOREIGN KEY (`local`) REFERENCES `equipo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `partido` ADD CONSTRAINT `fk_partido_equipo2` FOREIGN KEY (`visitante`) REFERENCES `equipo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `partido` ADD CONSTRAINT `fk_partido_zona1` FOREIGN KEY (`zona_id`) REFERENCES `zona`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `zona` ADD CONSTRAINT `fk_Zona_categoria1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `zona` ADD CONSTRAINT `fk_Zona_torneo1` FOREIGN KEY (`torneo_id`) REFERENCES `torneo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
