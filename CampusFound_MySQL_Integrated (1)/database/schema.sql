
CREATE DATABASE IF NOT EXISTS campusfound_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE campusfound_db;

-- USERS
-- Preserve the existing users table. Do not recreate it.

-- ITEM REPORTS
CREATE TABLE IF NOT EXISTS item_reports (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  reference_number VARCHAR(24) NOT NULL,
  title VARCHAR(160) NOT NULL,
  type ENUM('lost','found') NOT NULL,
  category VARCHAR(80) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(180) NOT NULL,
  event_date DATE NOT NULL,
  image_url VARCHAR(2048) NULL,
  reporter_id INT UNSIGNED NOT NULL,
  status ENUM('pending','approved','rejected','claimed','returned')
    NOT NULL DEFAULT 'pending',
  admin_remarks TEXT NULL,
  reviewed_by INT UNSIGNED NULL,
  reviewed_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

  UNIQUE KEY uq_item_reference (reference_number),
  KEY idx_items_status_type (status, type),
  KEY idx_items_reporter (reporter_id),

  CONSTRAINT fk_items_reporter
    FOREIGN KEY (reporter_id) REFERENCES users(id),

  CONSTRAINT fk_items_reviewer
    FOREIGN KEY (reviewed_by) REFERENCES users(id)
) ENGINE=InnoDB;

-- CLAIMS
CREATE TABLE IF NOT EXISTS claims (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  reference_number VARCHAR(24) NOT NULL,
  item_id INT UNSIGNED NOT NULL,
  claimant_id INT UNSIGNED NOT NULL,
  ownership_details TEXT NOT NULL,
  status ENUM('pending','approved','rejected','released')
    NOT NULL DEFAULT 'pending',
  admin_remarks TEXT NULL,
  reviewed_by INT UNSIGNED NULL,
  reviewed_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

  UNIQUE KEY uq_claim_reference (reference_number),
  KEY idx_claim_item_status (item_id, status),
  KEY idx_claim_claimant (claimant_id),

  CONSTRAINT fk_claim_item
    FOREIGN KEY (item_id) REFERENCES item_reports(id),

  CONSTRAINT fk_claimant
    FOREIGN KEY (claimant_id) REFERENCES users(id),

  CONSTRAINT fk_claim_reviewer
    FOREIGN KEY (reviewed_by) REFERENCES users(id)
) ENGINE=InnoDB;

-- NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  title VARCHAR(160) NOT NULL,
  message TEXT NOT NULL,
  is_read TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  KEY idx_notifications_user (user_id, is_read, created_at),

  CONSTRAINT fk_notification_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- ACTIVITY LOGS
CREATE TABLE IF NOT EXISTS activity_logs (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  actor_id INT UNSIGNED NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(60) NOT NULL,
  entity_id INT UNSIGNED NULL,
  details JSON NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  KEY idx_activity_created (created_at),

  CONSTRAINT fk_activity_actor
    FOREIGN KEY (actor_id) REFERENCES users(id)
    ON DELETE SET NULL
) ENGINE=InnoDB;
