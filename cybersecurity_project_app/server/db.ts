// server/db.ts
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

export let db: Database<sqlite3.Database, sqlite3.Statement>;

export const initializeDB = async () => {
  db = await open({
    filename: path.join(__dirname, 'database.sqlite'),
    driver: sqlite3.Database,
  });
  await db.exec(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      history TEXT,       -- JSON string for article/video history
      quizScores TEXT,    -- JSON string for quiz scores
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS bug_reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      when_happened DATETIME NOT NULL,
      page TEXT NOT NULL,
      contact TEXT,
      screenshots TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS individual_cybercrime_reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      device_or_site TEXT NOT NULL,
      screenshot TEXT,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS cybercrime_descriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      video_link TEXT NOT NULL,
      additional_info TEXT
    );
  `);
};


// Function to fetch all cybersecurity topics
export const getCyberSecurityTopics = async () => {
  return db.all('SELECT id, name FROM cybercrime_descriptions');
};

// Function to fetch details of a specific cybersecurity topic
export const getCyberSecurityDetails = async (name: string) => {
  return db.get('SELECT * FROM cybercrime_descriptions WHERE name = ?', [name]);
};